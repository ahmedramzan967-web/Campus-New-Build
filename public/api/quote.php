<?php
/**
 * Estimation Campus Inc. — Official Form Submission & Authenticated Zoho SMTP Delivery Handler
 * Target Recipient: info@estimationcampusinc.com
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// --------------------------------------------------------------------------
// 1. Load Configuration from Environment, .env, or smtp_config.php
// --------------------------------------------------------------------------
$config = [
    'SMTP_HOST'     => 'smtppro.zoho.com',
    'SMTP_PORT'     => 465,
    'SMTP_SECURE'   => 'true',
    'SMTP_USER'     => 'info@estimationcampusinc.com',
    'SMTP_PASSWORD' => '',
    'EMAIL_TO'      => 'info@estimationcampusinc.com',
    'EMAIL_FROM'    => 'Estimation Campus Inc. <info@estimationcampusinc.com>',
];

// Check smtp_config.php if present
$configFile = __DIR__ . '/smtp_config.php';
if (file_exists($configFile)) {
    $fileConfig = include $configFile;
    if (is_array($fileConfig)) {
        $config = array_merge($config, array_filter($fileConfig));
    }
}

// Check .env files (check current, parent, or grandparent)
$envPaths = [__DIR__ . '/.env', __DIR__ . '/../.env', __DIR__ . '/../../.env'];
foreach ($envPaths as $envPath) {
    if (file_exists($envPath)) {
        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line) || $line[0] === '#') continue;
            if (strpos($line, '=') !== false) {
                list($k, $v) = explode('=', $line, 2);
                $k = trim($k);
                $v = trim(trim($v), '"\'');
                if (isset($config[$k]) && !empty($v)) {
                    $config[$k] = $v;
                }
            }
        }
        break;
    }
}

// Override with system environment variables if set
foreach (['SMTP_HOST', 'SMTP_PORT', 'SMTP_SECURE', 'SMTP_USER', 'SMTP_PASSWORD', 'EMAIL_TO', 'EMAIL_FROM'] as $key) {
    $envVal = getenv($key) ?: ($_ENV[$key] ?? ($_SERVER[$key] ?? ''));
    if (!empty($envVal)) {
        $config[$key] = $envVal;
    }
}

// --------------------------------------------------------------------------
// 2. Direct Authenticated SMTP Socket Function for Zoho Mail
// --------------------------------------------------------------------------
function send_zoho_smtp($config, $subject, $htmlContent, $textContent, $replyToEmail, $replyToName, $attachments = []) {
    $host = $config['SMTP_HOST'];
    $port = (int)$config['SMTP_PORT'];
    $user = $config['SMTP_USER'];
    $pass = $config['SMTP_PASSWORD'];
    $from = $config['SMTP_USER']; // In Zoho, From address MUST be the authenticated user
    $to   = $config['EMAIL_TO'];

    if (empty($user) || empty($pass)) {
        return [
            'success' => false,
            'error'   => 'SMTP credentials (SMTP_USER or SMTP_PASSWORD) are not configured. Please configure your Zoho App Password in your server environment variables or in public/api/smtp_config.php.'
        ];
    }

    $context = stream_context_create([
        'ssl' => [
            'verify_peer'       => false,
            'verify_peer_name'  => false,
            'allow_self_signed' => true
        ]
    ]);

    $protocol = ((int)$port === 465) ? 'ssl://' : '';
    $socket = @stream_socket_client($protocol . $host . ':' . $port, $errno, $errstr, 20, STREAM_CLIENT_CONNECT, $context);

    if (!$socket) {
        return [
            'success' => false,
            'error'   => "Failed to connect to Zoho SMTP ($host:$port): $errstr (Code $errno)"
        ];
    }

    $readResponse = function() use ($socket) {
        $data = '';
        while ($line = fgets($socket, 515)) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        return $data;
    };

    $sendCommand = function($cmd, $expectedCode) use ($socket, $readResponse) {
        fputs($socket, $cmd . "\r\n");
        $res = $readResponse();
        $code = (int)substr($res, 0, 3);
        if ($code !== (int)$expectedCode) {
            return ['ok' => false, 'code' => $code, 'response' => trim($res)];
        }
        return ['ok' => true, 'code' => $code, 'response' => trim($res)];
    };

    // 1. Initial Greeting (220)
    $greeting = $readResponse();
    if ((int)substr($greeting, 0, 3) !== 220) {
        fclose($socket);
        return ['success' => false, 'error' => "Unexpected greeting from Zoho: $greeting"];
    }

    // 2. EHLO
    $r = $sendCommand('EHLO estimationcampusinc.com', 250);
    if (!$r['ok']) {
        fclose($socket);
        return ['success' => false, 'error' => "EHLO failed: {$r['response']}"];
    }

    // 3. STARTTLS if port 587
    if ((int)$port === 587) {
        $r = $sendCommand('STARTTLS', 220);
        if (!$r['ok']) {
            fclose($socket);
            return ['success' => false, 'error' => "STARTTLS failed: {$r['response']}"];
        }
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT);
        $sendCommand('EHLO estimationcampusinc.com', 250);
    }

    // 4. AUTH LOGIN
    $r = $sendCommand('AUTH LOGIN', 334);
    if (!$r['ok']) {
        fclose($socket);
        return ['success' => false, 'error' => "AUTH LOGIN rejected: {$r['response']}"];
    }

    // 5. Send Username
    $r = $sendCommand(base64_encode($user), 334);
    if (!$r['ok']) {
        fclose($socket);
        return ['success' => false, 'error' => "Username rejected by Zoho: {$r['response']}"];
    }

    // 6. Send Password
    $r = $sendCommand(base64_encode($pass), 235);
    if (!$r['ok']) {
        fclose($socket);
        return [
            'success' => false,
            'error'   => "Zoho SMTP Authentication Failed ({$r['response']}). Please ensure Two-Factor Authentication is supported by using a dedicated Zoho App Password rather than your regular login password."
        ];
    }

    // 7. MAIL FROM
    $r = $sendCommand("MAIL FROM:<$from>", 250);
    if (!$r['ok']) {
        fclose($socket);
        return ['success' => false, 'error' => "MAIL FROM rejected: {$r['response']}"];
    }

    // 8. RCPT TO
    $r = $sendCommand("RCPT TO:<$to>", 250);
    if (!$r['ok']) {
        fclose($socket);
        return ['success' => false, 'error' => "RCPT TO rejected: {$r['response']}"];
    }

    // 9. DATA
    $r = $sendCommand("DATA", 354);
    if (!$r['ok']) {
        fclose($socket);
        return ['success' => false, 'error' => "DATA rejected: {$r['response']}"];
    }

    // 10. Build Multipart MIME Message
    $boundary = "----=_Part_" . md5(uniqid(time()));
    $altBoundary = "----=_Alt_" . md5(uniqid(time()));

    $headers = [
        "From: " . $config['EMAIL_FROM'],
        "To: <$to>",
        "Reply-To: \"$replyToName\" <$replyToEmail>",
        "Subject: $subject",
        "MIME-Version: 1.0",
        "Date: " . date('r'),
        "Message-ID: <" . md5(uniqid(time())) . "@estimationcampusinc.com>",
        "Content-Type: multipart/mixed; boundary=\"$boundary\""
    ];

    $payload = implode("\r\n", $headers) . "\r\n\r\n";
    $payload .= "--$boundary\r\n";
    $payload .= "Content-Type: multipart/alternative; boundary=\"$altBoundary\"\r\n\r\n";

    // Plain text part
    $payload .= "--$altBoundary\r\n";
    $payload .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $payload .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $payload .= $textContent . "\r\n\r\n";

    // HTML part
    $payload .= "--$altBoundary\r\n";
    $payload .= "Content-Type: text/html; charset=UTF-8\r\n";
    $payload .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $payload .= $htmlContent . "\r\n\r\n";
    $payload .= "--$altBoundary--\r\n\r\n";

    // Attachments
    foreach ($attachments as $att) {
        $payload .= "--$boundary\r\n";
        $payload .= "Content-Type: {$att['type']}; name=\"{$att['name']}\"\r\n";
        $payload .= "Content-Disposition: attachment; filename=\"{$att['name']}\"\r\n";
        $payload .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $payload .= chunk_split(base64_encode($att['content'])) . "\r\n\r\n";
    }
    $payload .= "--$boundary--\r\n";

    // End of message is <CRLF>.<CRLF>
    fputs($socket, $payload . "\r\n.\r\n");
    $dataResponse = $readResponse();
    $dataCode = (int)substr($dataResponse, 0, 3);

    fputs($socket, "QUIT\r\n");
    fclose($socket);

    if ($dataCode !== 250) {
        return ['success' => false, 'error' => "Zoho rejected the message payload: $dataResponse"];
    }

    return ['success' => true, 'response' => trim($dataResponse)];
}

// --------------------------------------------------------------------------
// 3. Diagnostics & Health Check (GET /api/quote.php or GET /api/quote)
// --------------------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'GET' || $_SERVER['REQUEST_METHOD'] === 'HEAD') {
    $hasPass = !empty($config['SMTP_PASSWORD']);
    $isTest = isset($_GET['test']) || isset($_GET['send_test']);

    if ($isTest) {
        if (!$hasPass) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Zoho SMTP test failed: SMTP_PASSWORD is not set yet.',
                'error'   => 'Please configure your Zoho App Password in Hostinger environment variables or in public/api/smtp_config.php.',
                'recipient' => $config['EMAIL_TO'],
                'smtpUser'  => $config['SMTP_USER']
            ], JSON_PRETTY_PRINT);
            exit;
        }

        $testSend = send_zoho_smtp(
            $config,
            'Zoho SMTP Test — Estimation Campus Inc. [' . date('g:i:s A') . ']',
            '<h3>Zoho SMTP Verification Test</h3><p>Your website at <strong>estimationcampusinc.com</strong> is successfully connected to Zoho Mail SMTP (smtppro.zoho.com:465). Form submissions will arrive directly in your inbox.</p>',
            'Zoho SMTP Verification Test - estimationcampusinc.com. Connection verified successfully.',
            $config['SMTP_USER'],
            'Estimation Campus System'
        );

        if ($testSend['success']) {
            echo json_encode([
                'success'      => true,
                'message'      => 'Zoho SMTP test email successfully delivered to ' . $config['EMAIL_TO'] . '!',
                'zohoResponse' => $testSend['response'],
                'recipient'    => $config['EMAIL_TO'],
                'timestamp'    => date('c')
            ], JSON_PRETTY_PRINT);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Zoho SMTP connection or authentication failed.',
                'error'   => $testSend['error'],
                'hint'    => 'Please ensure you are using a Zoho Application-Specific Password from Zoho Accounts -> Security -> App Passwords.'
            ], JSON_PRETTY_PRINT);
        }
        exit;
    }

    echo json_encode([
        'success'        => true,
        'status'         => 'active',
        'service'        => 'Estimation Campus Form API',
        'message'        => 'Endpoint is active and ready to receive form inquiries via POST.',
        'recipient'      => $config['EMAIL_TO'],
        'smtpHost'       => $config['SMTP_HOST'],
        'smtpPort'       => $config['SMTP_PORT'],
        'smtpUser'       => $config['SMTP_USER'],
        'smtpConfigured' => $hasPass,
        'testInstructions' => 'To send a live test email to ' . $config['EMAIL_TO'] . ', add ?test=1 to this URL.'
    ], JSON_PRETTY_PRINT);
    exit;
}

// Anti-Spam Honeypot Verification
$honeypot = $_POST['website_url'] ?? $_POST['_hp_check'] ?? '';
if (!empty($honeypot)) {
    // Silently succeed for bots
    echo json_encode([
        'success'     => true,
        'referenceId' => 'EC-' . date('Y') . '-SPAM',
        'message'     => 'Thank you for contacting Estimation Campus Inc. Your inquiry has been submitted successfully.'
    ]);
    exit;
}

function clean_str($val) {
    return trim(str_replace(["\r", "\n"], ' ', $val ?? ''));
}

$fullName           = clean_str($_POST['fullName'] ?? $_POST['name'] ?? '');
$companyName        = clean_str($_POST['companyName'] ?? $_POST['company'] ?? '');
$email              = filter_var(clean_str($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone              = clean_str($_POST['phone'] ?? '');
$serviceKey         = clean_str($_POST['serviceRequired'] ?? $_POST['service'] ?? 'permit-drawings');
$projectLocation    = clean_str($_POST['projectLocation'] ?? $_POST['location'] ?? '');
$projectType        = clean_str($_POST['projectType'] ?? 'Commercial');
$timeline           = clean_str($_POST['timeline'] ?? 'Standard (1–2 weeks)');
$projectDescription = trim($_POST['projectDescription'] ?? $_POST['message'] ?? '');
$fileLink           = clean_str($_POST['fileLink'] ?? '');
$isGeneralInquiry   = ($_POST['formType'] ?? '') === 'contact';

$serviceMap = [
    'permit-drawings'         => 'Permit Support, Design & Drawings',
    'construction-estimating' => 'Construction Estimating & Takeoffs',
    'project-scheduling'      => 'Project Scheduling (CPM)',
    '3d-renderings'           => '3D Renderings & Walkthroughs',
    'shop-drawings'           => 'Shop Drawings & As-Builts',
    'multiple'                => 'Multiple Services / Comprehensive Scope'
];
$serviceName = $serviceMap[$serviceKey] ?? $serviceKey;

// Validation
if (empty($fullName) || strlen($fullName) < 2) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide your full name.']);
    exit;
}

if (!$email) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid work email address.']);
    exit;
}

$digits = preg_replace('/\D/', '', $phone);
if (strlen($digits) < 10) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid 10-digit phone number.']);
    exit;
}

if (empty($projectLocation) && !$isGeneralInquiry) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide the project location (City, State).']);
    exit;
}

if (strlen($projectDescription) < 15) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a description of your project scope (minimum 15 characters).']);
    exit;
}

// Check if SMTP is configured before proceeding
if (empty($config['SMTP_PASSWORD'])) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => "We couldn't submit your inquiry at this time. Please try again or email us directly at info@estimationcampusinc.com.",
        'error'   => "SMTP password is not set on the server. Please enter your Zoho App Password in your Hostinger environment or in public/api/smtp_config.php."
    ]);
    exit;
}

// Attachments
$allowedExts = ['pdf', 'dwg', 'dxf', 'xlsx', 'xls', 'docx', 'doc', 'jpg', 'jpeg', 'png', 'zip'];
$attachments = [];
$totalSize = 0;

if (!empty($_FILES['attachments'])) {
    $fileData = $_FILES['attachments'];
    $count = is_array($fileData['name']) ? count($fileData['name']) : 1;

    for ($i = 0; $i < $count; $i++) {
        $name  = is_array($fileData['name']) ? $fileData['name'][$i] : $fileData['name'];
        $tmp   = is_array($fileData['tmp_name']) ? $fileData['tmp_name'][$i] : $fileData['tmp_name'];
        $size  = is_array($fileData['size']) ? $fileData['size'][$i] : $fileData['size'];
        $error = is_array($fileData['error']) ? $fileData['error'][$i] : $fileData['error'];

        if ($error === UPLOAD_ERR_OK && is_uploaded_file($tmp)) {
            $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
            if (!in_array($ext, $allowedExts)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => "File .$ext is not supported. Please upload PDF, DWG, DXF, XLSX, DOCX, JPG, PNG, or ZIP."]);
                exit;
            }
            if ($size > 15 * 1024 * 1024) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Uploaded file exceeds 15MB limit.']);
                exit;
            }
            $totalSize += $size;
            $safeName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $name);
            $attachments[] = [
                'name'    => $safeName,
                'content' => file_get_contents($tmp),
                'size'    => $size,
                'type'    => mime_content_type($tmp) ?: 'application/octet-stream'
            ];
        }
    }
}

if ($totalSize > 15 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Total attachments exceed 15MB limit. Please provide a Google Drive / OneDrive link.']);
    exit;
}

$referenceId = 'EC-' . date('Y') . '-' . rand(10000, 99999);
$dateStr = date('l, F j, Y g:i A T');

$subject = $isGeneralInquiry
    ? "New Website Inquiry — Estimation Campus Inc. — $fullName"
    : "New Quote Request — $serviceName — $fullName";

// HTML & Plain Text Templates
$attHtml = count($attachments) > 0 ? '<ul>' : 'None';
$attText = count($attachments) > 0 ? '' : 'None';
foreach ($attachments as $a) {
    $mb = round($a['size'] / (1024 * 1024), 2);
    $attHtml .= "<li><strong>" . htmlspecialchars($a['name']) . "</strong> ({$mb} MB)</li>";
    $attText .= "- {$a['name']} ({$mb} MB)\n";
}
if (count($attachments) > 0) $attHtml .= '</ul>';

$htmlContent = "
<!DOCTYPE html>
<html>
<body style=\"font-family: Arial, sans-serif; color: #1e293b; background: #f8fafc; padding: 20px;\">
  <div style=\"max-width: 600px; margin: auto; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden;\">
    <div style=\"background: #0D47A1; color: #fff; padding: 24px;\">
      <h2 style=\"margin:0; font-size: 20px;\">ESTIMATION CAMPUS INC.</h2>
      <p style=\"margin: 4px 0 0 0; color: #bfdbfe; font-size: 13px;\">" . ($isGeneralInquiry ? 'WEBSITE INQUIRY' : 'NEW PROJECT SCOPE SUBMISSION') . "</p>
    </div>
    <div style=\"padding: 24px;\">
      <p style=\"font-size: 12px; color: #64748b;\">Reference ID: <strong>$referenceId</strong> | $dateStr</p>
      <hr style=\"border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;\">
      <h3 style=\"color: #0f172a;\">Client Details</h3>
      <p><strong>Name:</strong> " . htmlspecialchars($fullName) . "<br>
         <strong>Company:</strong> " . htmlspecialchars($companyName ?: 'Not specified') . "<br>
         <strong>Email:</strong> <a href=\"mailto:$email\">$email</a><br>
         <strong>Phone:</strong> " . htmlspecialchars($phone) . "</p>
      <h3 style=\"color: #0f172a;\">Project Scope</h3>
      <p><strong>Service:</strong> " . htmlspecialchars($serviceName) . "<br>
         <strong>Location:</strong> " . htmlspecialchars($projectLocation ?: 'Not specified') . "<br>
         <strong>Type:</strong> " . htmlspecialchars($projectType) . "<br>
         <strong>Timeline:</strong> " . htmlspecialchars($timeline) . "<br>
         <strong>Cloud Link:</strong> " . ($fileLink ? "<a href=\"$fileLink\">$fileLink</a>" : 'None') . "</p>
      <h3 style=\"color: #0f172a;\">Scope Description</h3>
      <div style=\"background: #f1f5f9; padding: 14px; border-radius: 6px; white-space: pre-wrap;\">" . htmlspecialchars($projectDescription) . "</div>
      <h3 style=\"color: #0f172a;\">Attachments (" . count($attachments) . ")</h3>
      $attHtml
      <div style=\"text-align: center; margin-top: 25px;\">
        <a href=\"mailto:$email?subject=RE:%20Estimation%20Campus%20Proposal%20$referenceId\" style=\"background: #0D47A1; color: #fff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;\">
          Reply Directly to $fullName
        </a>
      </div>
    </div>
  </div>
</body>
</html>
";

$textContent = "
ESTIMATION CAMPUS INC. — NEW INQUIRY NOTIFICATION
=================================================
Reference ID: $referenceId
Date: $dateStr

Full Name: $fullName
Company: " . ($companyName ?: 'Not specified') . "
Email: $email
Phone: $phone

Service: $serviceName
Location: " . ($projectLocation ?: 'Not specified') . "
Type: $projectType
Timeline: $timeline
Link: " . ($fileLink ?: 'None') . "

Description:
$projectDescription

Attachments:
$attText
";

// --------------------------------------------------------------------------
// 5. Send via Authenticated Zoho SMTP
// --------------------------------------------------------------------------
$sendResult = send_zoho_smtp(
    $config,
    $subject,
    $htmlContent,
    $textContent,
    $email,
    $fullName,
    $attachments
);

if ($sendResult['success']) {
    echo json_encode([
        'success'     => true,
        'referenceId' => $referenceId,
        'message'     => 'Thank you for contacting Estimation Campus Inc. Your inquiry has been submitted successfully. Our team will review your information and get back to you.',
        'delivery'    => [
            'accepted'         => true,
            'recipient'        => $config['EMAIL_TO'],
            'attachmentsCount' => count($attachments)
        ]
    ]);
} else {
    // Return explicit error - DO NOT RETURN FAKE SUCCESS!
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => "We couldn't submit your inquiry at this time. Please try again or email us directly at info@estimationcampusinc.com.",
        'error'   => $sendResult['error']
    ]);
}

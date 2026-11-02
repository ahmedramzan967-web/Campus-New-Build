<?php
/**
 * Estimation Campus Inc. — Official Form Submission & Email Delivery Handler
 * Compatible with Hostinger Shared Web Hosting & Apache/PHP Environments
 * Recipient: info@estimationcampusinc.com
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Target Recipient
$OFFICIAL_RECIPIENT = 'info@estimationcampusinc.com';

// 1. Anti-Spam Honeypot Verification
$honeypot = $_POST['website_url'] ?? $_POST['_hp_check'] ?? '';
if (!empty($honeypot)) {
    // Silently succeed for bots
    echo json_encode([
        'success' => true,
        'referenceId' => 'EC-' . date('Y') . '-SPAM',
        'message' => 'Thank you for contacting Estimation Campus Inc. Your inquiry has been submitted successfully.'
    ]);
    exit;
}

// 2. Extract & Sanitize Input Fields
function clean_header($str) {
    return trim(str_replace(["\r", "\n"], ' ', $str ?? ''));
}

$fullName = clean_header($_POST['fullName'] ?? $_POST['name'] ?? '');
$companyName = clean_header($_POST['companyName'] ?? $_POST['company'] ?? '');
$email = filter_var(clean_header($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone = clean_header($_POST['phone'] ?? '');
$serviceKey = clean_header($_POST['serviceRequired'] ?? $_POST['service'] ?? 'permit-drawings');
$projectLocation = clean_header($_POST['projectLocation'] ?? $_POST['location'] ?? '');
$projectType = clean_header($_POST['projectType'] ?? 'Commercial');
$timeline = clean_header($_POST['timeline'] ?? 'Standard (1–2 weeks)');
$projectDescription = trim($_POST['projectDescription'] ?? $_POST['message'] ?? '');
$fileLink = clean_header($_POST['fileLink'] ?? '');
$isGeneralInquiry = ($_POST['formType'] ?? '') === 'contact';

$serviceNames = [
    'permit-drawings' => 'Permit Support, Design & Drawings',
    'construction-estimating' => 'Construction Estimating & Takeoffs',
    'project-scheduling' => 'Project Scheduling (CPM)',
    '3d-renderings' => '3D Renderings & Walkthroughs',
    'shop-drawings' => 'Shop Drawings & As-Builts',
    'multiple' => 'Multiple Services / Comprehensive Scope'
];
$serviceName = $serviceNames[$serviceKey] ?? $serviceKey;

// 3. Validation
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

$referenceId = 'EC-' . date('Y') . '-' . rand(10000, 99999);
$dateStr = date('l, F j, Y g:i A T');

// 4. Attachments Handling
$allowed_exts = ['pdf', 'dwg', 'dxf', 'xlsx', 'xls', 'docx', 'doc', 'jpg', 'jpeg', 'png', 'zip'];
$attachments = [];
$totalAttachmentSize = 0;

if (!empty($_FILES['attachments'])) {
    $fileData = $_FILES['attachments'];
    $fileCount = is_array($fileData['name']) ? count($fileData['name']) : 1;

    for ($i = 0; $i < $fileCount; $i++) {
        $name = is_array($fileData['name']) ? $fileData['name'][$i] : $fileData['name'];
        $tmp = is_array($fileData['tmp_name']) ? $fileData['tmp_name'][$i] : $fileData['tmp_name'];
        $size = is_array($fileData['size']) ? $fileData['size'][$i] : $fileData['size'];
        $error = is_array($fileData['error']) ? $fileData['error'][$i] : $fileData['error'];

        if ($error === UPLOAD_ERR_OK && is_uploaded_file($tmp)) {
            $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
            if (!in_array($ext, $allowed_exts)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => "File extension .$ext is not supported. Please upload PDF, DWG, DXF, XLSX, DOCX, JPG, PNG, or ZIP."]);
                exit;
            }
            if ($size > 15 * 1024 * 1024) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Uploaded file exceeds 15MB limit.']);
                exit;
            }
            $totalAttachmentSize += $size;
            $safeName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $name);
            $attachments[] = [
                'name' => $safeName,
                'content' => file_get_contents($tmp),
                'size' => $size,
                'type' => mime_content_type($tmp) ?: 'application/octet-stream'
            ];
        }
    }
}

if ($totalAttachmentSize > 15 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Total attachments exceed 15MB limit. Please provide a Google Drive / OneDrive link.']);
    exit;
}

// 5. Subject & Email Body
$subject = $isGeneralInquiry
    ? "New Website Inquiry — Estimation Campus Inc. — $fullName"
    : "New Quote Request — $serviceName — $fullName";

$boundary = md5(time());

// Headers
$headers = "From: Estimation Campus Portal <$OFFICIAL_RECIPIENT>\r\n";
$headers .= "Reply-To: $fullName <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// Plain Text & HTML Body
$attachmentListHtml = count($attachments) > 0 ? '<ul>' : 'None';
$attachmentListText = count($attachments) > 0 ? '' : 'None';
foreach ($attachments as $att) {
    $sizeMb = round($att['size'] / (1024 * 1024), 2);
    $attachmentListHtml .= "<li><strong>" . htmlspecialchars($att['name']) . "</strong> ({$sizeMb} MB)</li>";
    $attachmentListText .= "- " . $att['name'] . " ({$sizeMb} MB)\n";
}
if (count($attachments) > 0) $attachmentListHtml .= '</ul>';

$htmlContent = "
<html>
<body style='font-family: Arial, sans-serif; color: #1e293b; background: #f8fafc; padding: 20px;'>
  <div style='max-width: 600px; margin: auto; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden;'>
    <div style='background: #0D47A1; color: #fff; padding: 20px;'>
      <h2 style='margin:0;'>ESTIMATION CAMPUS INC.</h2>
      <p style='margin:5px 0 0 0; color: #bfdbfe; font-size: 13px;'>NEW PROJECT SCOPE SUBMISSION</p>
    </div>
    <div style='padding: 20px;'>
      <p style='font-size: 12px; color: #64748b;'>Reference ID: <strong>$referenceId</strong> | $dateStr</p>
      <hr style='border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;'>
      <h3>Client Details</h3>
      <p><strong>Name:</strong> " . htmlspecialchars($fullName) . "<br>
         <strong>Company:</strong> " . htmlspecialchars($companyName ?: 'Not specified') . "<br>
         <strong>Email:</strong> <a href='mailto:$email'>$email</a><br>
         <strong>Phone:</strong> $phone</p>
      <h3>Project Scope</h3>
      <p><strong>Service:</strong> " . htmlspecialchars($serviceName) . "<br>
         <strong>Location:</strong> " . htmlspecialchars($projectLocation ?: 'Not specified') . "<br>
         <strong>Type:</strong> " . htmlspecialchars($projectType) . "<br>
         <strong>Timeline:</strong> " . htmlspecialchars($timeline) . "<br>
         <strong>Cloud Link:</strong> " . ($fileLink ? "<a href='$fileLink'>$fileLink</a>" : 'None') . "</p>
      <h3>Description</h3>
      <div style='background: #f1f5f9; padding: 12px; border-radius: 6px; white-space: pre-wrap;'>" . htmlspecialchars($projectDescription) . "</div>
      <h3>Attachments (" . count($attachments) . ")</h3>
      $attachmentListHtml
    </div>
  </div>
</body>
</html>
";

$body = "--$boundary\r\n";
$body .= "Content-Type: text/html; charset=utf-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $htmlContent . "\r\n\r\n";

foreach ($attachments as $att) {
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: {$att['type']}; name=\"{$att['name']}\"\r\n";
    $body .= "Content-Disposition: attachment; filename=\"{$att['name']}\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $body .= chunk_split(base64_encode($att['content'])) . "\r\n\r\n";
}
$body .= "--$boundary--";

// 6. Send Email
$mailSent = @mail($OFFICIAL_RECIPIENT, $subject, $body, $headers);

if ($mailSent) {
    echo json_encode([
        'success' => true,
        'referenceId' => $referenceId,
        'message' => 'Thank you for contacting Estimation Campus Inc. Your inquiry has been submitted successfully. Our team will review your information and get back to you.'
    ]);
} else {
    // If native mail failed, return required fallback message
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => "We couldn't submit your inquiry at this time. Please try again or email us directly at info@estimationcampusinc.com."
    ]);
}

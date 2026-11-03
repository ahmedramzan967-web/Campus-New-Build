import { ServiceItem } from '../types';

export const SERVICES_DATA: Record<string, ServiceItem> = {
  'permit-drawings': {
    id: 'permit-drawings',
    slug: 'permit-drawings',
    name: 'Permit Support, Design & Drawings',
    tagline: 'Code-compliant architectural drafting, permit drawing packages, and city review comment response support.',
    shortDescription: 'Comprehensive permit plan preparation, architectural drafting, structural drawing coordination, and building department comment responses for residential and commercial construction.',
    metaTitle: 'Permit Support, Design & Drawings | Building Permit Plans | Estimation Campus',
    metaDescription: 'Professional permit drawing packages, architectural drafting, and building department plan-check responses for US residential and commercial projects.',
    heroImage: '/images/service_permit_drawings_clean_1792810880085.jpg',
    keyOfferings: [
      'Residential Building Permit Drawings (New Construction, Additions, ADUs, Remodels)',
      'Commercial Tenant Improvement (TI) Permit Sets',
      'Architectural Drafting & Dimensioned Floor Plans',
      'Exterior Elevations, Building Sections & Wall Details',
      'Structural Drawing Coordination with Licensed PE Partners',
      'Site Plans, Zoning Setbacks & ADA Accessibility Compliance Details',
      'Building Department Plan-Check Comment & RFI Response Support',
      'Electrical, Plumbing & Mechanical (MEP) Schematic Coordination'
    ],
    deliverables: [
      'Complete Architectural Permit Set in PDF (Standard Arch D / 24x36 or ANSI D)',
      'Fully Layered AutoCAD / Revit (.DWG / .RVT) Source Files',
      'Plan Check Response Matrix addressing municipal examiner review notes',
      'Site plan with lot coverage, zoning calculations, and setback dimensions',
      'Door, window, and finish schedules formatted to municipal standards'
    ],
    targetAudience: [
      'General Contractors & Design-Builders',
      'Architects & Engineering Consultants needing overflow drafting support',
      'Real Estate Developers & Commercial Property Managers',
      'Homeowners & Investors planning custom homes or renovations'
    ],
    projectTypes: [
      'Single-Family Residences & Custom Homes',
      'Accessory Dwelling Units (ADUs) & Garage Conversions',
      'Commercial Tenant Improvements (Retail, Medical, Office, Dining)',
      'Multi-Family Renovations & Exterior Modifications',
      'Industrial Storage & Warehouse Interior Upgrades'
    ],
    processSteps: [
      {
        title: 'Project Discovery & Zoning Review',
        description: 'We review your sketches, site surveys, jurisdiction requirements, and zoning codes to define the precise permit scope.'
      },
      {
        title: 'Drafting & Plan Set Preparation',
        description: 'Our drafting team develops full architectural sheets including plans, elevations, sections, schedules, and structural coordination.'
      },
      {
        title: 'Quality Audit & Code Verification',
        description: 'Drawings undergo internal peer check against current IBC/IRC standards and local municipal code guidelines before delivery.'
      },
      {
        title: 'Submittal Assistance & Comment Response',
        description: 'Deliver ready-to-submit digital sheets. If the building department issues plan check comments, we update drawings promptly.'
      }
    ],
    benefits: [
      {
        title: 'Faster Municipal Approvals',
        description: 'Formatted and dimensioned to meet strict building department criteria, reducing costly back-and-forth revision cycles.'
      },
      {
        title: 'Code Compliance Grounding',
        description: 'Deep familiarity with IBC (International Building Code), IRC, and local city amendments across various US regions.'
      },
      {
        title: 'Licensed Professional Alignment',
        description: 'We coordinate smoothly with licensed architects and professional engineers (PE) whenever structural seals are legally mandated.'
      },
      {
        title: 'Clear Construction Documentation',
        description: 'Precise lines, callouts, and schedules ensure contractors build accurately without ambiguous field interpretations.'
      }
    ],
    faqs: [
      {
        question: 'Do you guarantee permit approval from the city or county?',
        answer: 'No reputable firm can guarantee instantaneous approval, because building officials and plan examiners have final jurisdiction authority. However, our drawings are crafted to adhere strictly to IBC/IRC standards and municipal guidelines, and our service includes revising plans in response to plan check review comments until compliance is achieved.'
      },
      {
        question: 'Do you provide stamped structural engineering drawings?',
        answer: 'Any engineering or professional architectural services requiring state-specific licensure are performed or reviewed by appropriately licensed professional engineers (PE) or registered architects where legally mandated. We coordinate drawing sets directly with licensed professionals or with your existing engineer of record.'
      },
      {
        question: 'What information do I need to supply to get started?',
        answer: 'Typically, a hand sketch with dimensions, property survey or parcel map, existing conditions photos, and your municipal building department location are sufficient for our team to produce an initial scope and cost proposal.'
      },
      {
        question: 'How fast can a permit drawing package be completed?',
        answer: 'Turnaround depends on project complexity. Standard residential additions or ADUs typically take 5 to 10 business days for the initial draft, while commercial tenant improvements range between 10 to 18 business days.'
      }
    ]
  },

  'construction-estimating': {
    id: 'construction-estimating',
    slug: 'construction-estimating',
    name: 'Construction Estimating, Quantity Takeoffs & Bid Support',
    tagline: 'Precision material takeoffs, trade-specific cost estimates, and competitive bid packages aligned with CSI MasterFormat.',
    shortDescription: 'Detailed construction cost estimates, itemized material quantity takeoffs, conceptual budgeting, and bid leveling for general contractors, subcontractors, and developers.',
    metaTitle: 'Construction Estimating & Quantity Takeoff Services | Estimation Campus',
    metaDescription: 'Accurate construction cost estimating, quantity takeoffs, and bid support for US general contractors, subcontractors, and commercial builders.',
    heroImage: '/images/service_estimating_clean_1792810879814.jpg',
    keyOfferings: [
      'Comprehensive Material Quantity Takeoffs (All 16/50 CSI MasterFormat Divisions)',
      'Detailed Construction Cost Estimates with Material, Labor & Equipment Breakdown',
      'Subcontractor Trade-Specific Takeoffs (Drywall, Concrete, Framing, MEP, Painting, Earthwork)',
      'Bid Preparation Support & Proposal Letter Assistance',
      'Conceptual Cost Modeling & Early Stage Feasibility Budgets',
      'Scope Review, Addenda Tracking & Bid Leveling Analysis',
      'Value Engineering Recommendations & Material Substitution Analysis',
      'Location-Specific Material & Labor Cost Index Adjustments across US Metro Areas'
    ],
    deliverables: [
      'Itemized Microsoft Excel (.xlsx) takeoff spreadsheet with formulas and summary tabs',
      'Color-coded, marked-up PDF takeoff plans showing exact measured counts, lengths, and areas',
      'Comprehensive CSI MasterFormat division summary with material unit pricing and labor rates',
      'Bid proposal draft with clear inclusions, exclusions, and scope qualifications',
      'Digital Planswift / Bluebeam takeoff archive files upon request'
    ],
    targetAudience: [
      'General Contractors bidding public, commercial, and multi-family tenders',
      'Subcontractors requiring high-volume trade takeoffs without hiring full-time staff',
      'Real Estate Developers budgeting ground-up developments and capital projects',
      'Lenders and Owners wanting independent third-party cost verification'
    ],
    projectTypes: [
      'Commercial Retail, Office & Hospitality',
      'Multi-Family Apartments & Condominium Developments',
      'Luxury Residential & Production Home Subdivisions',
      'Institutional, Educational & Healthcare Facilities',
      'Civil, Site Infrastructure & Earthwork Packages'
    ],
    processSteps: [
      {
        title: 'Drawing & Specification Intake',
        description: 'You upload the architectural, structural, and MEP plan sheets, specifications, and addenda. We review scope completeness.'
      },
      {
        title: 'Digital Quantity Measurement',
        description: 'Our estimators perform on-screen takeoffs using industry-standard tools, isolating every linear foot, square foot, volume, and piece count.'
      },
      {
        title: 'Cost Application & US Regional Indexing',
        description: 'We apply current localized labor rates, union/open-shop prevailing wage indices, and current wholesale material costs.'
      },
      {
        title: 'Final Review & Deliverable Transfer',
        description: 'A senior estimator audits the estimate before sending the formatted Excel sheet and marked-up verification drawings.'
      }
    ],
    benefits: [
      {
        title: 'Win More Profitable Bids',
        description: 'Submit competitive bids backed by verified quantities rather than guesswork or rushed calculations.'
      },
      {
        title: 'Protect Profit Margins',
        description: 'Exhaustive scope accounting prevents overlooked items, unexpected field change orders, and painful bottom-line erosion.'
      },
      {
        title: 'Scale Bid Volume Instantly',
        description: 'Bid 3x to 5x more projects per month without expanding fixed overhead or hiring expensive in-house estimators.'
      },
      {
        title: 'Auditable Visual Proof',
        description: 'Every measurement is visually marked and color-coded on the PDF plan sheets for quick spot-checking and subcontractor verification.'
      }
    ],
    faqs: [
      {
        question: 'Which software do your estimators use?',
        answer: 'We utilize industry-recognized platforms including Bluebeam Revu, Planswift, Trimble, RSMeans data, and structured Microsoft Excel takeoff templates with open formulas so you can modify unit rates anytime.'
      },
      {
        question: 'Can you provide trade-specific takeoffs for specialized subcontractors?',
        answer: 'Yes. We frequently provide trade-focused takeoffs for drywall and framing contractors, concrete/masonry contractors, MEP trades, roofing, flooring, painting, and civil site work contractors.'
      },
      {
        question: 'How do you account for regional differences in labor and material prices?',
        answer: 'We utilize localized cost data reflecting zip-code level wage rates, state sales tax, union vs. open-shop parameters, and regional supplier material indices across all US markets.'
      },
      {
        question: 'What is the typical turnaround time for a complete estimate?',
        answer: 'Standard trade takeoffs generally deliver in 2 to 4 business days. Comprehensive commercial or multi-family full-scope estimates usually require 4 to 8 business days depending on sheet count and trade complexity.'
      }
    ]
  },

  'project-scheduling': {
    id: 'project-scheduling',
    slug: 'project-scheduling',
    name: 'Project Scheduling',
    tagline: 'Critical Path Method (CPM) baseline schedules, progress updates, and delay mitigation for US construction projects.',
    shortDescription: 'Professional CPM baseline schedule creation, resource-loaded milestones, bi-weekly progress updates, and lookahead schedules using Primavera P6 and Microsoft Project.',
    metaTitle: 'Construction Project Scheduling & CPM Baseline Services | Estimation Campus',
    metaDescription: 'Expert construction project scheduling, CPM baseline schedules, logic-driven Gantt charts, and progress tracking for US contractors and developers.',
    heroImage: '/images/service_scheduling_clean_1792810880049.jpg',
    keyOfferings: [
      'Critical Path Method (CPM) Baseline Schedule Development',
      'Primavera P6 (.XER) and Microsoft Project (.MPP) Native Deliverables',
      'Construction Phasing, Logic Linking & Predecessor/Successor Coordination',
      'Monthly & Bi-Weekly Schedule Updates with Variance Analysis',
      '3-Week & 6-Week Rolling Lookahead Schedules for Field Superintendents',
      'Resource & Manpower Leveling across Major Trade Sequences',
      'Contractor Delay Claim Analysis & Time Impact Analysis (TIA)',
      'Submittal, Procurement & Long-Lead Equipment Tracking Schedules'
    ],
    deliverables: [
      'Native Primavera P6 (.xer) or Microsoft Project (.mpp) schedule file',
      'Comprehensive PDF Gantt Chart (plot-ready 11x17 or 24x36)',
      'Critical Path Narrative detailing top float risks and driver activities',
      'Milestone tracking summary for owner and architect monthly billing meetings',
      'Lookahead schedule templates formatted for field superintendent daily logs'
    ],
    targetAudience: [
      'Commercial General Contractors fulfilling contractual owner scheduling specs',
      'Owners & Construction Managers monitoring project delivery timelines',
      'Subcontractors requiring milestone clarity to coordinate fabrication & crews',
      'Lenders monitoring progress milestones for loan draw disbursements'
    ],
    projectTypes: [
      'Commercial Office, Retail & Industrial Logistics Facilities',
      'Multi-Family Housing & High-Rise Residential Construction',
      'Municipal, Educational & Public Works Infrastructure',
      'Hospitality, Hotel & Senior Living Centers',
      'Large-Scale Residential Remodels and Custom Estates'
    ],
    processSteps: [
      {
        title: 'Contract & Specification Review',
        description: 'We review project contracts, spec section 01310/013200 (Progress Schedules), milestone requirements, and subcontractor scopes.'
      },
      {
        title: 'Work Breakdown Structure (WBS) Creation',
        description: 'We construct an organized WBS dividing preconstruction, submittals, procurement, structural, MEP rough-in, finishes, and closeout.'
      },
      {
        title: 'Logic Linking & CPM Float Analysis',
        description: 'We link all activities with sound logic, removing artificial constraints and identifying the true critical path.'
      },
      {
        title: 'Owner Submittal & Ongoing Maintenance',
        description: 'We deliver the baseline schedule package with written narrative. We provide recurring monthly update services as construction progresses.'
      }
    ],
    benefits: [
      {
        title: 'Fulfill Tough Contract Specs',
        description: 'Meet demanding owner, architect, and government contract scheduling specifications without buying costly enterprise software.'
      },
      {
        title: 'Prevent Costly Field Delays',
        description: 'Identify long-lead procurement bottlenecks and trade stacking issues weeks before they impact jobsite productivity.'
      },
      {
        title: 'Strong Delay Defense Documentation',
        description: 'Maintain an auditable, logic-driven record that substantiates justifiable time extensions and protects against liquidated damages.'
      },
      {
        title: 'Empower Jobsite Superintendents',
        description: 'Clear, concise 3-week lookahead charts give field foremen tangible daily milestones rather than overwhelming 1,000-line spreadsheets.'
      }
    ],
    faqs: [
      {
        question: 'Do you work in Primavera P6 or Microsoft Project?',
        answer: 'We support both Primavera P6 (versions 8 through current, outputting native .xer files) and Microsoft Project (.mpp). We tailor the software platform to your project owner specifications.'
      },
      {
        question: 'Can you provide ongoing monthly schedule updates during construction?',
        answer: 'Yes. Most contractors engage us to manage their recurring monthly progress updates, incorporating actual start/finish dates, percent completes, and generating the required owner narrative report.'
      },
      {
        question: 'What is Time Impact Analysis (TIA)?',
        answer: 'Time Impact Analysis is an industry-standard scheduling technique used to evaluate the impact of an unforeseen delay (such as design revisions, weather, or owner changes) on the project completion date for formal change order requests.'
      },
      {
        question: 'How quickly can you generate an initial baseline schedule?',
        answer: 'For small-to-medium commercial or residential projects, a draft CPM baseline schedule is usually completed in 5 to 7 business days following receipt of drawings and milestone dates.'
      }
    ]
  },

  '3d-renderings': {
    id: '3d-renderings',
    slug: '3d-renderings',
    name: '3D Renderings & Architectural Walkthroughs',
    tagline: 'Photorealistic architectural visualizations, interior design renderings, and cinematic 3D walkthroughs.',
    shortDescription: 'High-impact 3D exterior renderings, interior architectural visualization, daylight studies, and immersive animated walkthroughs for pre-sales, investor pitching, and client sign-offs.',
    metaTitle: 'Architectural 3D Renderings & Walkthroughs | Estimation Campus',
    metaDescription: 'Photorealistic 3D architectural renderings, interior and exterior visualizations, and 3D walkthrough animations for US architects, builders, and developers.',
    heroImage: '/images/service_3d_clean_1792810900802.jpg',
    keyOfferings: [
      'Photorealistic Exterior Architectural 3D Renderings (Day, Dusk, Night Lighting)',
      'Interior Design & Finish Material Visualizations with Accurate Texturing',
      'High-Definition 3D Animated Video Walkthroughs and Fly-Arounds',
      'Residential Custom Home & Multi-Family Pre-Sales Marketing Imagery',
      'Commercial Development, Retail Plaza & Office Spatial Visuals',
      'Landscape, Hardscape & Site Integration Visualizations',
      '360-Degree Interactive Panorama Virtual Tours',
      'Architectural Presentation Boards & Marketing Collateral Ready Assets'
    ],
    deliverables: [
      'High-resolution print-ready still renders (4K / 5K / 8K resolution, JPEG & PNG)',
      'Ultra-HD MP4 video animations with smooth camera gimbal panning and soundtrack',
      'Interactive 360-degree panoramic files for web and virtual tours',
      'Post-processed imagery with color grading, lifelike entourage, landscaping, and lighting'
    ],
    targetAudience: [
      'Architects and Interior Designers presenting concepts to discerning clients',
      'Custom Home Builders closing prospective homeowner contracts before framing',
      'Real Estate Developers and Brokers launching pre-construction sales campaigns',
      'Commercial Property Owners seeking pre-leasing tenant commitments'
    ],
    projectTypes: [
      'Luxury Single-Family Estates & Modern Residences',
      'Multi-Family Condos, Apartments & Townhomes',
      'Commercial Mixed-Use, Retail Storefronts & Restaurants',
      'Hospitality Resorts, Boutique Hotels & Event Venues',
      'Corporate Headquarters, Tech Campuses & Industrial Parks'
    ],
    processSteps: [
      {
        title: '3D Geometry Modeling',
        description: 'We build exact 3D BIM/CAD models from your 2D plans, elevations, sections, and material finish specifications.'
      },
      {
        title: 'Material Mapping & Lighting Setup',
        description: 'We assign physical textures (wood grain, stone, polished concrete, glass) and establish realistic sun angles and interior fixtures.'
      },
      {
        title: 'Draft Camera Angle Preview',
        description: 'We provide low-resolution draft camera angles so you can select the most compelling perspectives and request initial tweaks.'
      },
      {
        title: 'Final Render & Post-Production',
        description: 'We render the final views in full resolution, applying realistic depth of field, landscaping, entourage, and professional color grading.'
      }
    ],
    benefits: [
      {
        title: 'Accelerate Pre-Sales & Funding',
        description: 'Engage investors, buyers, and board members with tangible photorealistic imagery before breaking ground.'
      },
      {
        title: 'Eliminate Design Misunderstandings',
        description: 'Allow clients to see exact materials, lighting moods, and spatial relationships, preventing costly change orders midway through construction.'
      },
      {
        title: 'Speed Up Architectural Approvals',
        description: 'Help municipal zoning boards, HOAs, and design review commissions visualize project aesthetic fit immediately.'
      },
      {
        title: 'Cost-Effective Marketing Assets',
        description: 'Gain stunning marketing imagery for brochures, billboards, websites, and social media without staging a physical mock-up.'
      }
    ],
    faqs: [
      {
        question: 'What file formats can I supply for 3D renderings?',
        answer: 'We accept 2D PDF plans/elevations, AutoCAD (.dwg), Revit (.rvt), SketchUp (.skp), Rhino (.3dm), and ArchiCAD files. Even simple hand sketches and material photos can be turned into full 3D models.'
      },
      {
        question: 'Are revisions included in rendering packages?',
        answer: 'Yes. Our rendering process includes structured review milestones: camera angle sign-off, material/color adjustment round, and final lighting touch-up to ensure your vision is achieved.'
      },
      {
        question: 'Can you match specific manufacturer paint colors and tile products?',
        answer: 'Absolutely. Provide manufacturer specifications, cut sheets, or material swatches (e.g. Benjamin Moore paint codes, specific engineered hardwood brands, stone veneers) and our artists will texture match them.'
      },
      {
        question: 'How long does a typical rendering project take?',
        answer: 'Still exterior or interior renders are typically delivered in 4 to 7 business days. Complex multi-minute 3D video walkthroughs usually take 10 to 14 business days.'
      }
    ]
  },

  'shop-drawings': {
    id: 'shop-drawings',
    slug: 'shop-drawings',
    name: 'Shop Drawings & As-Built Drawings',
    tagline: 'Precision trade fabrication shop drawings, MEP coordination sets, and certified as-built documentation.',
    shortDescription: 'Detailed fabrication shop drawings, structural steel detailing, millwork and casework drawings, MEP coordination, and final field-verified as-built drawing sets for US builders and fabricators.',
    metaTitle: 'Shop Drawings & As-Built Drawing Services | Estimation Campus',
    metaDescription: 'Professional construction shop drawings, fabrication detailing, MEP coordination, and as-built record drawing packages for US contractors.',
    heroImage: '/images/service_shop_clean_1792810902199.jpg',
    keyOfferings: [
      'Structural Steel & Miscellaneous Metals Fabrication Shop Drawings',
      'Architectural Millwork, Cabinetry & Casework Detailing',
      'MEP (Mechanical, Electrical, Plumbing) Coordination & Installation Drawings',
      'Storefront, Glazing & Curtain Wall Shop Submittal Drawings',
      'HVAC Ductwork & Piping Spool Detailing',
      'Field-Verified As-Built Record Drawings from Redline Markups',
      'Precast Concrete & Rebar Placement Drawings',
      'Architect / Engineer of Record (EOR) Submittal Review Package Formatting'
    ],
    deliverables: [
      'Fully dimensioned shop submittal drawing set in plot-ready PDF',
      'Native AutoCAD (.dwg) source files with standard layering and title block',
      'Bill of Materials (BOM) and component schedules integrated directly onto drawing sheets',
      'Final Record As-Built packages matching project closeout specifications',
      'Submittal transmittal cover sheet prepared for general contractor review'
    ],
    targetAudience: [
      'Fabricators & Specialty Subcontractors needing fast submittal packages',
      'General Contractors managing trade coordination and submittal workflows',
      'Commercial Glazing, Millwork & Steel Erectors',
      'Facility Managers and Building Owners requiring accurate as-built records'
    ],
    projectTypes: [
      'Commercial Steel Buildings & Canopies',
      'High-End Architectural Millwork & Custom Hospitality Interiors',
      'Commercial HVAC & Industrial Mechanical Rooms',
      'Curtain Walls, Storefronts & Skylights',
      'Renovations Requiring Clean As-Built Conversion from Old Paper Blueprints'
    ],
    processSteps: [
      {
        title: 'Design Document & Spec Analysis',
        description: 'We review the architect and engineer contract drawings, division specifications, and project submittal requirements.'
      },
      {
        title: 'Field Verification & Detailing',
        description: 'We incorporate verified site field measurements, manufacturer product data, and assembly connection details.'
      },
      {
        title: 'Internal Quality & Collision Review',
        description: 'Drawings undergo dimensional checks, weld/fastener verification, and clash checks against neighboring trades.'
      },
      {
        title: 'Submittal Delivery & Redline Support',
        description: 'We deliver formatted drawing packages ready for A/E stamping. When redline submittal markups return, we update sheets promptly.'
      }
    ],
    benefits: [
      {
        title: 'Fast Submittal Approvals',
        description: 'Structured to meet architect and structural engineer scrutiny on the first submittal pass, eliminating schedule bottlenecks.'
      },
      {
        title: 'Flawless Shop Fabrication',
        description: 'Precise dimensions, cut lists, and weld symbols reduce shop errors, material scrap, and expensive field rework.'
      },
      {
        title: 'Turnkey Project Closeout',
        description: 'Rapidly convert field redlines into pristine digital as-built sets so you can collect final retainage payments without delay.'
      },
      {
        title: 'Lower Overhead for Fabricators',
        description: 'Access seasoned drafters on-demand during peak bidding and fabrication periods without adding full-time CAD salaries.'
      }
    ],
    faqs: [
      {
        question: 'What is the difference between design drawings and shop drawings?',
        answer: 'Design drawings (created by architects/engineers) convey overall design intent and performance criteria. Shop drawings are created for fabricators and installers, detailing precise dimensions, manufacturing tolerances, fasteners, material gauges, and installation instructions.'
      },
      {
        question: 'How do you create as-built drawings?',
        answer: 'We take the contractor field redlines (scanned markups, PDF annotations, or field notes recorded by superintendents) and update the original CAD or BIM drawing sets to document exact installed conditions for project closeout.'
      },
      {
        question: 'Can you coordinate with our shop title blocks and CAD standards?',
        answer: 'Yes. We routinely adopt your company title block, font preferences, layer naming conventions, and dimension styles so deliverables look 100% native to your fabrication business.'
      },
      {
        question: 'What is your standard turnaround for shop drawing submittals?',
        answer: 'Standard trade shop drawing submittals (such as storefronts, stairs, or millwork rooms) typically take 5 to 8 business days for the initial submittal set.'
      }
    ]
  }
};

export const SERVICES_LIST: ServiceItem[] = Object.values(SERVICES_DATA);

import { ResourceArticle } from '../types';

export const RESOURCES_DATA: ResourceArticle[] = [
  {
    id: 'permit-drawing-checklist',
    slug: 'permit-drawing-checklist-building-department',
    title: 'How to Prepare Plans for Fast Building Department Permit Approval',
    category: 'Permits & Design',
    readTime: '6 min read',
    publishDate: 'October 2026',
    excerpt: 'Key strategies for drafting clear architectural and structural drawing sets that satisfy municipal plan examiners and minimize correction comments.',
    content: [
      'Submitting plans to a municipal building department can quickly become a bottleneck if basic jurisdictional requirements are missing or ambiguous. Whether submitting in California, Texas, Florida, or New York, building officials follow a structured plan check protocol.',
      '1. Verify Applicable Code Cycles: Municipalities adopt model codes (like IBC 2021 or 2024, IRC, NEC, and IECC) with specific local amendments. Stating the exact code editions and design criteria (wind speed, seismic design category, snow load, soil bearing capacity) directly on Sheet T-1 or A-1 is mandatory.',
      '2. Complete Life Safety & Egress Analysis: For commercial tenant improvements and multi-family projects, clearly document occupant loads, exit path widths, fire-rated assembly UL design numbers, and travel distances. Ambiguity here triggers immediate plan check rejections.',
      '3. Site Plan & Zoning Compliance: Ensure setbacks, lot coverage percentages, building heights, easements, and utility tie-ins are distinctly dimensioned. Missing setback dimensions or lot coverage calculations are the #1 cause for residential permit delay.',
      '4. Plan Check Comment Response Protocol: When comments are issued, always return a formal Response Matrix itemizing every examiner note alongside the exact sheet and detail where the revision was incorporated.'
    ],
    checklist: [
      'Title block includes correct owner, parcel number (APN), and street address',
      'Governing building code editions and design load criteria cited on Cover Sheet',
      'Site plan indicates property lines, north arrow, zoning setbacks, and easements',
      'Floor plans are dimensioned to wall centerlines or rough framing faces',
      'Door and window schedules cross-reference plan tags, rough openings, and egress ratings',
      'Wall types cross-reference fire-resistance ratings and acoustic STC ratings',
      'Structural drawings coordinated with architectural layouts and bearing points'
    ]
  },
  {
    id: 'csi-masterformat-estimating-guide',
    slug: 'csi-masterformat-quantity-takeoffs-guide',
    title: 'CSI MasterFormat Breakdown: Why Structured Takeoffs Win Competitive Bids',
    category: 'Construction Estimating',
    readTime: '8 min read',
    publishDate: 'September 2026',
    excerpt: 'How organizing your quantity takeoff according to CSI MasterFormat protects profit margins and speeds up subcontractor bid leveling.',
    content: [
      'In commercial and high-end residential bidding, accuracy and structure are paramount. Rushed lump-sum guesstimates frequently lead either to losing the job because you were unnecessarily high, or winning a job that bleeds money because critical scopes were missed.',
      'The Construction Specifications Institute (CSI) MasterFormat provides the universal classification standard across the North American construction industry. Aligning your quantity takeoff directly to CSI divisions creates transparent, auditable bids that clients and lenders trust.',
      'Key CSI divisions every general contractor should track carefully: Division 03 (Concrete) where rebar weights, forms, and pump fees are often undercounted; Division 05 (Metals) where miscellaneous iron, embeds, and anchor bolts are omitted; Division 09 (Finishes) where waste factors for high-end tile and Level 5 drywall can swing numbers by tens of thousands of dollars.',
      'By pairing formatted Excel sheets with color-coded Bluebeam takeoff sheets, estimators provide bulletproof backup when negotiating with project owners.'
    ],
    checklist: [
      'Organize takeoffs by CSI MasterFormat 50-division system',
      'Separate material purchases, equipment rentals, and labor hours',
      'Maintain color-coded visual takeoff overlays for every trade',
      'Apply waste factors appropriate to project geometry (e.g. 10-15% for complex tile or framing)',
      'Adjust labor rates against local zip-code wage determinations and prevailing wage rules',
      'Document explicit scope inclusions and exclusions in bid proposal cover letters'
    ]
  },
  {
    id: 'cpm-scheduling-delay-prevention',
    slug: 'cpm-scheduling-preventing-contractor-delays',
    title: 'The Contractor\'s Guide to CPM Scheduling & Preventing Delay Claims',
    category: 'Project Scheduling',
    readTime: '7 min read',
    publishDate: 'August 2026',
    excerpt: 'How logic-driven Critical Path Method (CPM) baseline schedules protect general contractors from liquidated damages and keep subcontractors aligned.',
    content: [
      'A construction schedule is not merely a bar chart created to satisfy a contract requirement; it is a live operational blueprint and your strongest legal shield if unforeseen site conditions arise.',
      'The Critical Path is the longest sequence of dependent activities that directly determines the overall project completion date. An activity on the critical path has zero total float—if that activity slips by even one day, the final completion date slips by one day unless corrective action is taken.',
      'Common scheduling pitfalls include: using artificial "date constraints" instead of true logic links, failing to account for long-lead equipment procurement (such as electrical switchgear or custom elevators), and neglecting monthly updates.',
      'When an owner issues an unexpected design change, a contractor with a validated CPM schedule can immediately run a Time Impact Analysis (TIA) to demonstrate the exact float consumption and substantiate a contractual time extension.'
    ],
    checklist: [
      'Establish a contractual baseline schedule before starting physical work',
      'Link all activities with realistic finish-to-start (FS) logic where feasible',
      'Include separate procurement activities for long-lead mechanical and electrical equipment',
      'Conduct bi-weekly progress updates with field superintendent input',
      'Generate rolling 3-week lookaheads for trade foreman coordination',
      'Document unforeseen delays contemporaneously with formal written notifications'
    ]
  },
  {
    id: 'shop-drawings-vs-design-drawings',
    slug: 'shop-drawings-vs-design-drawings-guide',
    title: 'Shop Drawings vs. Design Drawings: Understanding Roles and Responsibilities',
    category: 'Shop Drawings',
    readTime: '5 min read',
    publishDate: 'July 2026',
    excerpt: 'Clarifying the vital boundary between architectural design documents and precision fabrication shop drawings to ensure zero jobsite clashes.',
    content: [
      'One of the most frequent misconceptions on construction jobsites involves the difference between the contract drawings prepared by architects/engineers and the shop drawings prepared by fabricators and trade contractors.',
      'Design drawings establish the design intent, overall geometry, performance specifications, and aesthetic vision. However, design drawings do not tell the fabrication shop which CNC tool paths to use, what precise bolt hole clearances to drill, or how structural steel trusses will be segmented for transport over highway bridges.',
      'Shop drawings bridge that gap. Prepared by specialized detailers, shop drawings represent the exact physical components that will be manufactured in the shop and assembled in the field.',
      'A thorough submittal review process—where the general contractor and the Architect/Engineer of Record (EOR) review and stamp shop drawings—guarantees that fabrication aligns precisely with structural and architectural design intent before metal is cut or concrete is poured.'
    ]
  }
];

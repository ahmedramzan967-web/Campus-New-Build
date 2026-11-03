import { ProjectItem } from '../types';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-permit-austin',
    title: 'Austin Multi-Family Residential Permit Package',
    category: 'permit-drawings',
    categoryName: 'Permit Support, Design & Drawings',
    location: 'Austin, TX',
    scopeSummary: 'Complete architectural permit plan set for a 12-unit residential garden complex, including site planning, life safety plans, and municipal plan review compliance coordination.',
    deliverableType: 'Architectural Permit Set (32 Sheets, Arch D)',
    image: '/images/proj_austin_multifamily_1792810925905.jpg',
    details: [
      'Comprehensive architectural drafting meeting City of Austin Land Development Code',
      'ADA accessibility routes, parking calculations, and egress life safety drawings',
      'Direct coordination with client civil and structural engineering consultants',
      'Plan-check comment responses finalized within 4 business days of city feedback'
    ]
  },
  {
    id: 'proj-permit-phoenix',
    title: 'Phoenix Commercial Medical Tenant Improvement',
    category: 'permit-drawings',
    categoryName: 'Permit Support, Design & Drawings',
    location: 'Phoenix, AZ',
    scopeSummary: 'Permit submittal package for an 8,500 sq ft medical clinic suite, coordinating interior partitions, plumbing schematics, and City of Phoenix building safety submittal requirements.',
    deliverableType: 'Commercial TI Permit Drawings (18 Sheets)',
    image: '/images/project_commercial_phx_1792810902881.jpg',
    details: [
      'Partition schedules, door hardware schedules, and wall type acoustic assemblies',
      'Reflected ceiling plans, lighting switching coordination, and exit sign schematics',
      'Plumbing rough-in coordination for exam rooms and specialized sanitation fixtures'
    ]
  },
  {
    id: 'proj-est-dallas',
    title: 'Dallas Mixed-Use Commercial Takeoff & Bid Package',
    category: 'construction-estimating',
    categoryName: 'Construction Estimating & Takeoffs',
    location: 'Dallas, TX',
    scopeSummary: 'Detailed CSI MasterFormat takeoff and cost estimate for a 65,000 sq ft mixed-use retail and office development for a general contractor competitive bid.',
    deliverableType: 'Itemized Excel Takeoff & Color-Marked PDF Set',
    image: '/images/proj_dallas_takeoff_1792810926948.jpg',
    details: [
      'Full coverage of Divisions 02 through 16 with material, equipment, and crew labor rates',
      'Over 280 distinct line items with auditable Bluebeam visual takeoff markups',
      'Subcontractor bid leveling sheet comparing 3 competing trade bids per major scope',
      'Delivered in 5 business days, enabling the general contractor to secure the contract'
    ]
  },
  {
    id: 'proj-est-denver',
    title: 'Denver Custom Residence Framing & Drywall Trade Takeoff',
    category: 'construction-estimating',
    categoryName: 'Construction Estimating & Takeoffs',
    location: 'Denver, CO',
    scopeSummary: 'Trade-specific lumber, shear wall hardware, and drywall quantity takeoff for a luxury 7,200 sq ft hillside residence with vaulted architectural ceilings.',
    deliverableType: 'Trade Quantity Takeoff & Material List',
    image: '/images/proj_denver_framing_1792810927732.jpg',
    details: [
      'Accurate board footage, engineered joist counts, and structural tie-down schedules',
      'Drywall square footage categorized by Level 4 and Level 5 finish areas',
      'Cut waste factors modeled explicitly based on geometric roof slopes and wall heights'
    ]
  },
  {
    id: 'proj-sched-atlanta',
    title: 'Atlanta 4-Story Commercial Facility Baseline Schedule',
    category: 'project-scheduling',
    categoryName: 'Project Scheduling',
    location: 'Atlanta, GA',
    scopeSummary: 'Critical Path Method (CPM) baseline construction schedule compliant with Division 013200 project specifications in Primavera P6 format.',
    deliverableType: 'Primavera P6 (.xer) Baseline & 24x36 Gantt Chart',
    image: '/images/proj_atlanta_cpm_1792810927115.jpg',
    details: [
      '520 logic-linked activities spanning procurement, structural erection, MEP rough-ins, and finishes',
      'Detailed float risk narrative identifying long-lead curtain wall glass and switchgear milestones',
      'Bi-weekly progress update templates configured for jobsite superintendent iPad entry'
    ]
  },
  {
    id: 'proj-sched-seattle',
    title: 'Pacific Northwest Logistics Distribution Center Phasing Plan',
    category: 'project-scheduling',
    categoryName: 'Project Scheduling',
    location: 'Seattle, WA',
    scopeSummary: 'Multi-phase construction sequence schedule for a 220,000 sq ft warehouse facility, sequencing slab pours, tilt-up panel lifting, and roof decking.',
    deliverableType: 'CPM Schedule & 6-Week Rolling Lookaheads',
    image: '/images/proj_seattle_warehouse_1792810946886.jpg',
    details: [
      'Sequenced crane positioning and tilt-up concrete cure times to minimize idle crew hours',
      'Owner milestone tracking for early tenant access to server and automation rooms',
      'Monthly delay variance reports submitted for bank draw and owner progress meetings'
    ]
  },
  {
    id: 'proj-3d-bellevue',
    title: 'Bellevue Modern Lakefront Estate 3D Visualization',
    category: '3d-renderings',
    categoryName: '3D Renderings & Walkthroughs',
    location: 'Bellevue, WA',
    scopeSummary: 'High-end photorealistic 3D exterior and interior renderings showing custom floor-to-ceiling curtain wall glazing, warm western cedar accents, and landscape terraces.',
    deliverableType: '8K Still Visuals & 4K 60fps Video Walkthrough',
    image: '/images/proj_bellevue_lakefront_1792810947402.jpg',
    details: [
      'Exact material replication for custom Italian cabinetry, terrazzo floors, and blackened steel railings',
      'Accurate solar daylight orientation simulation across morning, midday, and twilight hours',
      'Cinematic camera fly-through showcasing the open-concept living spaces and outdoor infinity pool'
    ]
  },
  {
    id: 'proj-3d-miami',
    title: 'Miami Coastal Boutique Commercial Plaza Visuals',
    category: '3d-renderings',
    categoryName: '3D Renderings & Walkthroughs',
    location: 'Miami, FL',
    scopeSummary: 'Marketing visualization package for a two-story waterfront dining and boutique retail promenade to support pre-leasing tenant presentations.',
    deliverableType: 'Architectural Rendering Package (8 Views + 360 Panorama)',
    image: '/images/proj_miami_plaza_1792810948038.jpg',
    details: [
      'Vibrant tropical landscaping, outdoor patron seating, and evening ambient architectural illumination',
      '360-degree interactive virtual tour embeddable on leasing broker presentation portal'
    ]
  },
  {
    id: 'proj-shop-chicago',
    title: 'Chicago Structural Steel Framing Shop Drawings',
    category: 'shop-drawings',
    categoryName: 'Shop Drawings & As-Builts',
    location: 'Chicago, IL',
    scopeSummary: 'Detailed steel fabrication and erection shop drawing submittal for a commercial canopy and mezzanine structure, coordinating anchor bolts and shear connections.',
    deliverableType: 'Fabrication Shop Drawing Set (22 Sheets, Arch D)',
    image: '/images/proj_chicago_steel_1792810969664.jpg',
    details: [
      'Comprehensive piece mark lists, assembly marks, and weld detail callouts (AWS standards)',
      'Direct coordination with structural engineer of record (EOR) submittal standards',
      'Anchor bolt setting plans delivered 10 days ahead of scheduled foundation pour'
    ]
  },
  {
    id: 'proj-shop-orlando',
    title: 'Orlando Commercial Facility MEP Coordination & As-Built Package',
    category: 'shop-drawings',
    categoryName: 'Shop Drawings & As-Builts',
    location: 'Orlando, FL',
    scopeSummary: 'Turnkey as-built record drawings compiled from superintendent redlines for a 45,000 sq ft technical training center for certificate of occupancy closeout.',
    deliverableType: 'As-Built CAD & Bound PDF Record Set',
    image: '/images/proj_orlando_mep_1792810948254.jpg',
    details: [
      'Incorporated 140+ field modifications into clean, layered AutoCAD drawings',
      'Updated mechanical duct routings, junction box locations, and plumbing tie-ins',
      'Delivered structured digital archive meeting owner facility management handover criteria'
    ]
  }
];

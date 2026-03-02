import React, { useState } from "react";

const palette = {
  bg: "#0f1a0e",
  surface: "#162114",
  card: "#1c2a1a",
  border: "#2d4028",
  gold: "#c8952a",
  goldLight: "#e8b84b",
  sage: "#7aad6e",
  sageLight: "#9fd48f",
  wheat: "#d4b483",
  stone: "#8a9080",
  red: "#c0392b",
  redLight: "#e74c3c",
  white: "#f0ede6",
  muted: "#7a8a72",
  accent: "#4a8f3f",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #0f1a0e; color: #f0ede6; }
  
  .app { min-height: 100vh; background: #0f1a0e; }
  
  .hero { 
    background: linear-gradient(135deg, #0a1208 0%, #162114 50%, #0f1a0e 100%);
    padding: 40px 32px 32px;
    border-bottom: 1px solid #2d4028;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200,149,42,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-tag {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #c8952a;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .hero-tag::before {
    content: '';
    display: inline-block;
    width: 24px; height: 1px;
    background: #c8952a;
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 900;
    line-height: 1.1;
    color: #f0ede6;
    margin-bottom: 8px;
  }
  .hero-title span { color: #c8952a; }
  .hero-sub {
    font-size: 14px;
    color: #7a8a72;
    max-width: 600px;
    line-height: 1.6;
    margin-bottom: 24px;
  }
  .hero-meta {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  .meta-pill {
    background: #1c2a1a;
    border: 1px solid #2d4028;
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 12px;
    color: #9fd48f;
    font-family: 'DM Mono', monospace;
  }

  .nav-bar {
    background: #162114;
    border-bottom: 1px solid #2d4028;
    padding: 0 32px;
    display: flex;
    gap: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .nav-bar::-webkit-scrollbar { display: none; }
  .nav-btn {
    padding: 16px 20px;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: #7a8a72;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
    letter-spacing: 0.3px;
  }
  .nav-btn:hover { color: #f0ede6; }
  .nav-btn.active { 
    color: #c8952a; 
    border-bottom-color: #c8952a;
    font-weight: 600;
  }

  .content { padding: 32px; max-width: 1100px; margin: 0 auto; }

  .verdict-banner {
    background: linear-gradient(135deg, #2a0a08, #3d1008);
    border: 1px solid #8a2020;
    border-left: 4px solid #c0392b;
    border-radius: 8px;
    padding: 20px 24px;
    margin-bottom: 32px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }
  .verdict-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
  .verdict-text h3 {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    color: #e74c3c;
    margin-bottom: 6px;
    font-weight: 700;
  }
  .verdict-text p {
    font-size: 14px;
    color: #d4a090;
    line-height: 1.6;
  }

  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #c8952a;
    margin-bottom: 8px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: #f0ede6;
    margin-bottom: 8px;
    line-height: 1.2;
  }
  .section-intro {
    font-size: 15px;
    color: #8a9080;
    line-height: 1.7;
    max-width: 720px;
    margin-bottom: 32px;
  }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  @media(max-width:700px) { .grid-2, .grid-3 { grid-template-columns: 1fr; } }

  .card {
    background: #1c2a1a;
    border: 1px solid #2d4028;
    border-radius: 10px;
    padding: 20px;
  }
  .card-gold { border-color: rgba(200,149,42,0.4); }
  .card-red { border-color: rgba(192,57,43,0.4); }
  .card-green { border-color: rgba(122,173,110,0.4); }

  .fail-item {
    display: flex;
    gap: 12px;
    padding: 16px;
    background: rgba(192,57,43,0.06);
    border: 1px solid rgba(192,57,43,0.2);
    border-radius: 8px;
    margin-bottom: 12px;
    transition: border-color 0.2s;
    cursor: default;
  }
  .fail-item:hover { border-color: rgba(192,57,43,0.5); }
  .fail-num {
    width: 28px; height: 28px;
    background: rgba(192,57,43,0.15);
    border: 1px solid rgba(192,57,43,0.4);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #e74c3c;
    flex-shrink: 0;
  }
  .fail-body h4 {
    font-size: 14px;
    font-weight: 600;
    color: #f0ede6;
    margin-bottom: 4px;
  }
  .fail-body p {
    font-size: 13px;
    color: #7a8a72;
    line-height: 1.5;
  }
  .fix-tag {
    display: inline-block;
    margin-top: 8px;
    background: rgba(74,143,63,0.15);
    border: 1px solid rgba(74,143,63,0.4);
    border-radius: 4px;
    padding: 3px 8px;
    font-size: 11px;
    color: #9fd48f;
    font-family: 'DM Mono', monospace;
  }

  .compare-header {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 12px; margin-bottom: 12px;
  }
  .compare-label-bad {
    background: rgba(192,57,43,0.1);
    border: 1px solid rgba(192,57,43,0.3);
    border-radius: 6px;
    padding: 10px 14px;
    font-size: 12px;
    font-weight: 600;
    color: #e74c3c;
    display: flex; align-items: center; gap: 6px;
  }
  .compare-label-good {
    background: rgba(74,143,63,0.1);
    border: 1px solid rgba(74,143,63,0.3);
    border-radius: 6px;
    padding: 10px 14px;
    font-size: 12px;
    font-weight: 600;
    color: #9fd48f;
    display: flex; align-items: center; gap: 6px;
  }
  .compare-row {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 12px; margin-bottom: 8px;
  }
  .compare-cell-bad {
    background: rgba(192,57,43,0.05);
    border: 1px solid rgba(192,57,43,0.15);
    border-radius: 6px;
    padding: 12px;
    font-size: 13px;
    color: #c4a090;
    line-height: 1.5;
  }
  .compare-cell-good {
    background: rgba(74,143,63,0.06);
    border: 1px solid rgba(74,143,63,0.2);
    border-radius: 6px;
    padding: 12px;
    font-size: 13px;
    color: #b0d4a0;
    line-height: 1.5;
  }

  .zone-map {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 3px;
    height: 280px;
    background: #0f1a0e;
    border: 1px solid #2d4028;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 16px;
  }
  .zone-cell {
    border-radius: 3px;
    cursor: pointer;
    transition: transform 0.15s, filter 0.15s;
    position: relative;
  }
  .zone-cell:hover { transform: scale(1.15); filter: brightness(1.3); z-index: 10; }

  .legend-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
  .legend-item {
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; color: #8a9080;
  }
  .legend-dot { width: 12px; height: 12px; border-radius: 2px; }

  .capital-bar-row {
    display: flex; align-items: center; gap: 12px; margin-bottom: 14px;
  }
  .capital-label { width: 110px; font-size: 13px; color: #8a9080; flex-shrink: 0; }
  .capital-bar-wrap { flex: 1; background: #162114; border-radius: 4px; height: 22px; overflow: hidden; position: relative; }
  .capital-bar-old { 
    height: '100%'; position: absolute; left: 0; top: 0;
    background: rgba(192,57,43,0.5); border-radius: 4px;
    transition: width 1s;
  }
  .capital-bar-new { 
    height: '100%'; position: absolute; left: 0; top: 0;
    background: rgba(74,143,63,0.7); border-radius: 4px;
    transition: width 1s;
  }
  .capital-score { 
    width: 40px; font-size: 12px; font-family: 'DM Mono', monospace; text-align: right; flex-shrink: 0;
  }

  .cluster-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .cluster-card {
    background: #1c2a1a;
    border: 1px solid #2d4028;
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
    transition: border-color 0.2s;
  }
  .cluster-card:hover, .cluster-card.active { border-color: #c8952a; }
  .cluster-name {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: #f0ede6;
    margin-bottom: 4px;
  }
  .cluster-sub { font-size: 12px; color: #7a8a72; margin-bottom: 14px; }
  .housing-mix { display: flex; height: 8px; border-radius: 4px; overflow: hidden; gap: 1px; margin-bottom: 12px; }
  .housing-seg {
    transition: flex 0.5s;
    border-radius: 2px;
  }
  .mix-legend { display: flex; flex-wrap: wrap; gap: 8px; }
  .mix-item { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #7a8a72; }
  .mix-dot { width: 8px; height: 8px; border-radius: 1px; flex-shrink: 0; }

  .phase-timeline { position: relative; padding-left: 24px; }
  .phase-timeline::before {
    content: '';
    position: absolute;
    left: 6px; top: 8px; bottom: 8px;
    width: 2px; background: #2d4028;
  }
  .phase-item {
    position: relative;
    margin-bottom: 28px;
  }
  .phase-dot {
    position: absolute;
    left: -22px;
    top: 6px;
    width: 14px; height: 14px;
    border-radius: 50%;
    border: 2px solid;
    background: #0f1a0e;
    z-index: 1;
  }
  .phase-header {
    display: flex; align-items: baseline; gap: 12px; margin-bottom: 8px;
  }
  .phase-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 3px;
  }
  .phase-title { font-size: 16px; font-weight: 600; color: #f0ede6; }
  .phase-years { font-size: 12px; color: #7a8a72; font-family: 'DM Mono', monospace; }
  .phase-body { font-size: 13px; color: #7a8a72; line-height: 1.6; }
  .phase-delivers {
    margin-top: 10px;
    display: flex; flex-wrap: wrap; gap: 6px;
  }
  .deliver-tag {
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 3px;
    border: 1px solid;
  }

  .prt-lane {
    border: 1px solid #2d4028;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 12px;
    transition: border-color 0.2s;
  }
  .prt-lane:hover { border-color: #c8952a; }
  .lane-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .lane-badge {
    width: 36px; height: 36px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 16px;
    font-family: 'Playfair Display', serif;
  }
  .lane-name { font-size: 15px; font-weight: 600; color: #f0ede6; }
  .lane-desc { font-size: 13px; color: #7a8a72; line-height: 1.6; }
  .lane-items { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
  .lane-item {
    font-size: 11px;
    padding: 4px 10px;
    border-radius: 4px;
    font-family: 'DM Mono', monospace;
  }

  .five-cap {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px;
    margin-bottom: 24px;
  }
  @media(max-width:600px) { .five-cap { grid-template-columns: repeat(3, 1fr); } }
  .cap-card {
    background: #1c2a1a;
    border: 1px solid #2d4028;
    border-radius: 8px;
    padding: 16px 12px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  .cap-card:hover, .cap-card.active { 
    border-color: #c8952a;
    background: #253420;
  }
  .cap-icon { font-size: 24px; margin-bottom: 8px; }
  .cap-name { font-size: 11px; color: #8a9080; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
  .cap-score { font-family: 'DM Mono', monospace; font-size: 18px; font-weight: 700; margin-top: 4px; }

  .expandable {
    background: #162114;
    border: 1px solid #2d4028;
    border-radius: 8px;
    margin-bottom: 8px;
    overflow: hidden;
  }
  .expand-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 20px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: #f0ede6;
  }
  .expand-header:hover { background: rgba(255,255,255,0.02); }
  .expand-body {
    padding: 0 20px 16px;
    font-size: 13px;
    color: #8a9080;
    line-height: 1.7;
  }

  .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 28px; }
  @media(max-width:600px) { .stat-grid { grid-template-columns: repeat(2, 1fr); } }
  .stat-card {
    background: #1c2a1a;
    border: 1px solid #2d4028;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
  }
  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: #c8952a;
    line-height: 1;
    margin-bottom: 4px;
  }
  .stat-label { font-size: 12px; color: #7a8a72; }

  .tooltip {
    position: fixed;
    background: #253420;
    border: 1px solid #c8952a;
    border-radius: 6px;
    padding: 10px 14px;
    font-size: 12px;
    color: #f0ede6;
    max-width: 200px;
    pointer-events: none;
    z-index: 1000;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  }
  .tooltip-title { font-weight: 700; margin-bottom: 4px; font-size: 13px; }
  .tooltip-sub { color: #8a9080; }

  .cta-bar {
    background: linear-gradient(135deg, #1c2a0a, #253420);
    border: 1px solid #4a8f3f;
    border-radius: 12px;
    padding: 28px 32px;
    margin-top: 40px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 20px; flex-wrap: wrap;
  }
  .cta-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #f0ede6;
    margin-bottom: 6px;
  }
  .cta-sub { font-size: 13px; color: #7a8a72; }
  .cta-btn {
    background: #c8952a;
    color: #0f1a0e;
    border: none;
    border-radius: 6px;
    padding: 12px 24px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.3px;
  }
  .cta-btn:hover { background: #e8b84b; }

  .manifesto {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 18px;
    color: #c8952a;
    border-left: 3px solid #c8952a;
    padding-left: 20px;
    margin: 24px 0;
    line-height: 1.7;
  }

  hr.divider { border: none; border-top: 1px solid #2d4028; margin: 32px 0; }
`;

// === DATA ===
const FAILURES = [
  {
    id: "01", title: "Housing Segregation by Type",
    desc: "Single-family lots on one side, manufactured homes clustered separately, row housing in another block, seniors in multi-unit. This is textbook 1950s zoning — every study shows income/type segregation breeds isolation, reduced resilience, and community fragility.",
    fix: "REPLACE WITH: Blended neighborhood clusters — every cluster contains all types, all income levels, all ages, woven together."
  },
  {
    id: "02", title: "Parks as Leftover Space — Not Productive Commons",
    desc: "3.38 ha of passive green space. No food production. No stormwater function. No RCCS value. Just dead turf that costs money to mow and generates zero community wealth or ecological uplift.",
    fix: "REPLACE WITH: Productive commons — food forests, bioswales, prairie restoration, solar commons, community orchard."
  },
  {
    id: "03", title: "Zero Enterprise Fabric — Pure Bedroom Community",
    desc: "300 homes. Zero live-work. Zero artisan/maker space. Zero community enterprise. Every dollar earned in Vulcan gets spent in Lethbridge (1 hour away). No local economic circulation. No place-based economy.",
    fix: "REPLACE WITH: A Village Heart with maker hub, food hub, co-working, FuturVille accelerator, community enterprise."
  },
  {
    id: "04", title: "One-Time Revenue — Lot Sales as Exit Strategy",
    desc: "The entire capital model is: sell lots, pocket proceeds, walk away. No ongoing stewardship income. No credit streams. No community wealth accumulation. Developer extracts; community gets nothing that compounds.",
    fix: "REPLACE WITH: PRT Lane A/B/C integration — land in LRLT, RCCS credits, community bonds, perpetual NOI."
  },
  {
    id: "05", title: "No Story of Place — Prairie Blindness",
    desc: "Zero reference to Vulcan's shortgrass prairie ecology, Whispering Creek watershed, indigenous land history, agricultural heritage, or Star Trek tourism identity. Streets named by committee. Nature treated as backdrop, not foundation.",
    fix: "REPLACE WITH: Story of Place methodology — design from what this prairie land is already trying to become."
  },
  {
    id: "06", title: "No LRLT — Land Permanently Alienated",
    desc: "All 63 acres will be subdivided and sold to individual owners with no conservation covenants, no stewardship obligations, no community ownership stake. Value extraction is complete and permanent.",
    fix: "REPLACE WITH: Prairie Vista Regenerative Land Trust (LRLT) holding all commons, corridors, and open space in perpetuity."
  },
  {
    id: "07", title: "District Heating from a Dead Firm",
    desc: "O'Keefe Energy Consulting — defunct. Their plan: one district heating system for 300 units. This was the only energy ambition in the document. No solar. No geothermal. No microgrid. No community energy ownership.",
    fix: "REPLACE WITH: Community energy microgrid — solar commons, ground-source heat, battery storage, community ownership."
  },
  {
    id: "08", title: "Infrastructure Baseline 18 Years Old",
    desc: "The undersized north-south water main was flagged in 2008. Stormwater management plan was never completed. Engineering by BSEI (now CIMA+) needs full re-evaluation. Every number in the ASP should be treated as expired.",
    fix: "REQUIRED ACTION: Fresh infrastructure assessment before any permit application."
  },
];

const CLUSTERS = [
  {
    id: "north", name: "North Commons Cluster",
    sub: "Adjacent to Allen Subdivision — Arrival District",
    units: 72, color: "#4a8f3f",
    mix: [
      { label: "Market-Rate Homes", pct: 30, color: "#7aad6e" },
      { label: "Attainable Entry", pct: 25, color: "#c8952a" },
      { label: "Senior-Accessible", pct: 20, color: "#6b9dd4" },
      { label: "Live-Work Units", pct: 15, color: "#d4b483" },
      { label: "Shared Equity", pct: 10, color: "#9b59b6" },
    ],
    commons: "Community Market Hall + Prairie Arrival Garden",
    notes: "Gateway cluster. Mixed 2- and 3-storey buildings stepping down to the street. Market hall anchors the corner at Maple/Cottonwood, activating the connection to the existing Allen neighbourhood."
  },
  {
    id: "heart", name: "Village Heart District",
    sub: "Central Core — Enterprise + Community",
    units: 0, color: "#c8952a",
    mix: [],
    commons: "Maker Hub · Food Hub · Co-Working · FuturVille Accelerator",
    notes: "No residential. Pure enterprise and community infrastructure. The economic heart of the development. 1.2 ha. Designed to serve all of Vulcan, not just Prairie Vista residents. Anchors RCCS Social + Human Capital credits."
  },
  {
    id: "west", name: "Golf Edge Cluster",
    sub: "Southwest — Golf Course Interface + Prairie Commons",
    units: 68, color: "#7aad6e",
    mix: [
      { label: "Market-Rate Homes", pct: 40, color: "#7aad6e" },
      { label: "Attainable Entry", pct: 20, color: "#c8952a" },
      { label: "Senior-Accessible", pct: 25, color: "#6b9dd4" },
      { label: "Live-Work Units", pct: 10, color: "#d4b483" },
      { label: "Shared Equity", pct: 5, color: "#9b59b6" },
    ],
    commons: "Prairie Restoration Commons + Golf Edge Trail",
    notes: "Premium location commanding golf-course views. Mix shifts toward larger market-rate to capture land value while maintaining intergenerational design. Prairie restoration buffer creates RCCS Natural Capital credits from day one."
  },
  {
    id: "east", name: "East Stewardship Cluster",
    sub: "Stormwater + Bioswale Commons — Productive Landscape",
    units: 65, color: "#6b9dd4",
    mix: [
      { label: "Market-Rate Homes", pct: 25, color: "#7aad6e" },
      { label: "Attainable Entry", pct: 30, color: "#c8952a" },
      { label: "Senior-Accessible", pct: 20, color: "#6b9dd4" },
      { label: "Live-Work Units", pct: 15, color: "#d4b483" },
      { label: "Shared Equity", pct: 10, color: "#9b59b6" },
    ],
    commons: "Wetland Bioswale + Food Forest + Community Gardens",
    notes: "Built around the stormwater management zone — transforming the required detention ponds into a productive wetland commons with community gardens, food forest, and trail system. Highest affordable housing ratio, served by transit link."
  },
  {
    id: "south", name: "South Entry Cluster",
    sub: "Phase 3 — 1st Avenue South Interface",
    units: 75, color: "#d4b483",
    mix: [
      { label: "Market-Rate Homes", pct: 28, color: "#7aad6e" },
      { label: "Attainable Entry", pct: 27, color: "#c8952a" },
      { label: "Senior-Accessible", pct: 22, color: "#6b9dd4" },
      { label: "Live-Work Units", pct: 13, color: "#d4b483" },
      { label: "Shared Equity", pct: 10, color: "#9b59b6" },
    ],
    commons: "Community Orchard + Solar Commons Array",
    notes: "Southern gateway. Fronts 1st Avenue South with active street-facing live-work units creating commercial vitality at the entry. Hosts the community solar commons array generating shared energy income and RCCS Built Capital credits."
  },
];

const PHASES = [
  {
    phase: "Phase 0", title: "Story of Place + LRLT Formation",
    years: "2026 (months 1-8)",
    color: "#c8952a",
    body: "Before a single stake goes in the ground, we listen. Story of Place methodology with Bill Reed's integrative process. Ecological baseline, watershed mapping, cultural history, community co-discovery. ORRSC pre-application consultation. Fresh infrastructure assessment. LRLT formation. RCCS baselines established.",
    delivers: ["Story of Place Document", "LRLT Registered", "RCCS Baselines", "ASP Amendment Filed", "Infra Report", "Community Engagement"],
    deliverColors: ["#c8952a", "#7aad6e", "#6b9dd4", "#d4b483", "#8a9080", "#9b59b6"]
  },
  {
    phase: "Phase 1", title: "Village Heart + North Commons Cluster",
    years: "2027-2028",
    color: "#7aad6e",
    body: "Infrastructure spine built. Whispering Greens extension completed with right-of-way upgrades. Water main relocated and upgraded. Village Heart shell constructed. North Commons Cluster — 72 blended units — delivered. Community energy microgrid Phase 1 online. RCCS credit issuance begins.",
    delivers: ["72 Blended Units", "Village Heart Shell", "Energy Microgrid P1", "North Bioswale", "RCCS First Issuance", "Community Market"],
    deliverColors: ["#7aad6e", "#c8952a", "#6b9dd4", "#7aad6e", "#6b9dd4", "#c8952a"]
  },
  {
    phase: "Phase 2", title: "Golf Edge + East Stewardship Clusters",
    years: "2029-2030",
    color: "#6b9dd4",
    body: "Golf Edge Cluster (68 units) and East Stewardship Cluster (65 units) built. Wetland bioswale system fully operational. Food forest planted. Prairie restoration corridor established. Village Heart programs launched — maker hub, food hub, FuturVille accelerator operational. RCCS credit stream growing.",
    delivers: ["133 Blended Units", "Wetland Commons", "Food Forest", "Prairie Corridor", "Hub Programs Live", "PRT Lane B Active"],
    deliverColors: ["#7aad6e", "#6b9dd4", "#7aad6e", "#9fd48f", "#c8952a", "#d4b483"]
  },
  {
    phase: "Phase 3", title: "South Entry Cluster + Full Community",
    years: "2031-2032",
    color: "#9fd48f",
    body: "South Entry Cluster (75 units) completes the community. Solar commons array at full capacity. Community orchard mature. LRLT fully operational with stewardship income. RCCS credits across all Five Capitals in issuance. PRT Lane A/B/C fully integrated. Prairie Vista becomes a proof-of-concept for regenerative development in Alberta.",
    delivers: ["75 Blended Units", "Solar Array Full", "Community Orchard", "Full RCCS Suite", "LRLT Stewardship NOI", "Alberta Proof Case"],
    deliverColors: ["#7aad6e", "#c8952a", "#9fd48f", "#6b9dd4", "#d4b483", "#9b59b6"]
  },
];

const CAPITALS = [
  { name: "Natural", icon: "🌿", old: 5, new: 82, desc: "Prairie restoration, bioswale wetland, food forest, pollinator corridors, stormwater reuse — all measured and converted to RCCS Natural Capital Credits (NCUs)." },
  { name: "Human", icon: "🧑‍🌾", old: 12, new: 75, desc: "Live-work units, FuturVille accelerator, maker hub, community food hub, lifelong learning programs integrated with Regenity and Regenesis Group curricula." },
  { name: "Social", icon: "🤝", old: 20, new: 88, desc: "Blended income clusters eliminate segregation. Village Heart creates genuine third-place community infrastructure. LRLT governance gives residents real ownership and voice." },
  { name: "Built", icon: "🏗️", old: 35, new: 78, desc: "Community energy microgrid, living building systems for construction materials, stormwater as infrastructure, district-scale solar commons, upgraded water main as community asset." },
  { name: "Financial", icon: "💰", old: 40, new: 72, desc: "PRT Lane A/B/C integration, RCCS credit streams, community bond program, shared equity housing, LRLT stewardship NOI, provincial housing grants, municipal PPP on infrastructure." },
];

const ZONE_MAP = [
  // Row 0 (top) — Allen Subdivision border / North
  "road","road","road","road","road","road","road","road","road","road",
  // Row 1
  "north","north","north","north","north","north","north","multi","multi","east",
  // Row 2
  "north","north","north","north","commons","commons","commons","multi","multi","east",
  // Row 3
  "west","west","heart","heart","commons","commons","east","east","east","east",
  // Row 4
  "west","west","heart","heart","south","south","east","east","east","edge",
  // Row 5 (bottom) — 1st Avenue South
  "road","west","west","south","south","south","south","east","edge","road",
];

const ZONE_COLORS = {
  north: "#4a8f3f",
  west: "#7aad6e",
  east: "#5580b0",
  south: "#c8952a",
  heart: "#d4762a",
  commons: "#2d6b2a",
  multi: "#8a9080",
  edge: "#c8952a",
  road: "#162114",
};

const ZONE_LABELS = {
  north: "North Commons Cluster",
  west: "Golf Edge Cluster",
  east: "East Stewardship Cluster",
  south: "South Entry Cluster",
  heart: "Village Heart District",
  commons: "Productive Commons",
  multi: "Senior+Multi Hub",
  edge: "Golf Edge Interface",
  road: "Streets / Infrastructure",
};


// ════════════════════════════════════════════════════════════════════════════
// FINANCE MODEL — Prairie Vista Estates · Gate-Triggered Phased ROI
// ════════════════════════════════════════════════════════════════════════════

const SUPABASE_URL = "https://uvojezuorjgqzmhhgluu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2b2plenVvcmpncXptaGhnbHV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMTQ3MTcsImV4cCI6MjA4Njg5MDcxN30.1irtkNYnTJbvg8VJMQh-VpByqpmIRiASwR1qTOZ6RiQ";
const SB_HDR = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" };
async function sbGet(key, fb) {
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/prt_storage?key=eq.${encodeURIComponent(key)}&select=value`, { headers: SB_HDR });
    const d = await r.json();
    if (Array.isArray(d) && d[0]?.value) return JSON.parse(d[0].value);
  } catch {}
  return fb;
}
async function sbSet(key, val) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/prt_storage`, {
      method: "POST", headers: { ...SB_HDR, Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify({ key, value: JSON.stringify(val), updated_at: new Date().toISOString() }),
    });
  } catch {}
}

const fM = (v, d = 1) => v === 0 ? "—" : `$${(v / 1e6).toFixed(d)}M`;
const fK = (v) => `$${(v / 1e3).toFixed(0)}K`;
const fD = (v) => Math.abs(v) >= 1e6 ? fM(v) : Math.abs(v) >= 1e3 ? fK(v) : `$${Number(v).toFixed(0)}`;
const fP = (v) => `${(v * 100).toFixed(1)}%`;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Revenue streams keyed by phase
const PV_STREAMS = [
  // Phase 0 — no revenue, only costs
  // Phase 1A — Stewardship + Hub (conditional)
  { id: "hub_hospitality",  phase: "p1a", name: "Hospitality Hub — Agri-tourism & Glamping", icon: "🏕", yr1Lo: 0, yr1Hi: 0, yr3Lo: 180e3, yr3Hi: 320e3, conditional: true, condNote: "Gate: Phase 0 Feasibility Study confirms proceed", capDelta: { Natural: 1, Human: 2, Social: 2, Manufactured: 1, Financial: 1 }, on: false },
  { id: "prairie_exp",      phase: "p1a", name: "Prairie Experience Centre — Events & Programs", icon: "🌾", yr1Lo: 0, yr1Hi: 0, yr3Lo: 60e3, yr3Hi: 120e3, conditional: true, condNote: "Gate: Hub construction confirmed", capDelta: { Natural: 0, Human: 2, Social: 3, Manufactured: 0, Financial: 0 }, on: false },
  { id: "rccs_ncu_p1",      phase: "p1a", name: "RCCS Natural Capital Credits (NCU) — Prairie Restoration", icon: "🌿", yr1Lo: 0, yr1Hi: 0, yr3Lo: 40e3, yr3Hi: 90e3, capDelta: { Natural: 3, Human: 0, Social: 0, Manufactured: 0, Financial: 1 }, on: true },
  { id: "rccs_scu_p1",      phase: "p1a", name: "RCCS Social Capital Credits (SCU) — Community Baseline", icon: "🤝", yr1Lo: 0, yr1Hi: 0, yr3Lo: 15e3, yr3Hi: 35e3, capDelta: { Natural: 0, Human: 0, Social: 2, Manufactured: 0, Financial: 0 }, on: true },
  // Phase 1B — Servicing Spine (concurrent with 1A, no direct revenue)
  // Phase 2 — Living Neighbourhoods North
  { id: "lot_sales_p2",     phase: "p2",  name: "Residential Lot Sales — Phase 2 North (68 lots)", icon: "🏘", yr1Lo: 0, yr1Hi: 0, yr3Lo: 1200e3, yr3Hi: 2200e3, oneTime: false, capDelta: { Natural: 0, Human: 1, Social: 1, Manufactured: 2, Financial: 3 }, on: true },
  { id: "land_lease_p2",    phase: "p2",  name: "CLT Land-Lease — Affordable & Workforce Units", icon: "🔑", yr1Lo: 0, yr1Hi: 0, yr3Lo: 85e3, yr3Hi: 160e3, capDelta: { Natural: 0, Human: 2, Social: 2, Manufactured: 0, Financial: 1 }, on: true },
  { id: "energy_coop",      phase: "p2",  name: "Community Energy Cooperative — Solar + Geothermal", icon: "⚡", yr1Lo: 0, yr1Hi: 0, yr3Lo: 45e3, yr3Hi: 95e3, capDelta: { Natural: 1, Human: 0, Social: 1, Manufactured: 2, Financial: 1 }, on: true },
  { id: "rccs_ncu_p2",      phase: "p2",  name: "RCCS Natural Capital Credits (NCU) — Wetland + Carbon", icon: "🌊", yr1Lo: 0, yr1Hi: 0, yr3Lo: 80e3, yr3Hi: 160e3, capDelta: { Natural: 3, Human: 0, Social: 0, Manufactured: 0, Financial: 1 }, on: true },
  { id: "rccs_hcu",         phase: "p2",  name: "RCCS Human Capital Credits (HCU)", icon: "🧠", yr1Lo: 0, yr1Hi: 0, yr3Lo: 20e3, yr3Hi: 50e3, capDelta: { Natural: 0, Human: 3, Social: 0, Manufactured: 0, Financial: 0 }, on: true },
  { id: "market_hall",      phase: "p2",  name: "Market Hall & Community Kitchen — Vendor Fees", icon: "🍽", yr1Lo: 0, yr1Hi: 0, yr3Lo: 30e3, yr3Hi: 65e3, capDelta: { Natural: 0, Human: 1, Social: 2, Manufactured: 0, Financial: 0 }, on: true },
  // Phase 3 — Living Neighbourhoods South
  { id: "lot_sales_p3",     phase: "p3",  name: "Residential Lot Sales — Phase 3 South (65 lots)", icon: "🏡", yr1Lo: 0, yr1Hi: 0, yr3Lo: 1100e3, yr3Hi: 2000e3, capDelta: { Natural: 0, Human: 1, Social: 1, Manufactured: 2, Financial: 3 }, on: true },
  { id: "land_lease_p3",    phase: "p3",  name: "CLT Land-Lease — Phase 3 Units", icon: "🔑", yr1Lo: 0, yr1Hi: 0, yr3Lo: 80e3, yr3Hi: 150e3, capDelta: { Natural: 0, Human: 1, Social: 2, Manufactured: 0, Financial: 1 }, on: true },
  { id: "rccs_full",        phase: "p3",  name: "RCCS Full Portfolio — All Five Capital Credits", icon: "📊", yr1Lo: 0, yr1Hi: 0, yr3Lo: 120e3, yr3Hi: 280e3, capDelta: { Natural: 2, Human: 2, Social: 2, Manufactured: 1, Financial: 2 }, on: true },
  { id: "futvrville_lic",   phase: "p3",  name: "FuturVille Platform Licensing — Village #1 IP", icon: "🌐", yr1Lo: 0, yr1Hi: 0, yr3Lo: 40e3, yr3Hi: 120e3, capDelta: { Natural: 0, Human: 1, Social: 1, Manufactured: 0, Financial: 2 }, on: false },
  { id: "inav_reporting",   phase: "p3",  name: "INAV Impact Asset — CLT Balance Sheet Recognition", icon: "🏦", yr1Lo: 0, yr1Hi: 0, yr3Lo: 0, yr3Hi: 0, capDelta: { Natural: 1, Human: 1, Social: 1, Manufactured: 1, Financial: 2 }, on: true, noteText: "Non-cash — ecological appreciation recognized on CLT balance sheet" },
];

const PV_PHASES = {
  p0:  { label: "Phase 0", sublabel: "Alignment & Feasibility", color: "#c8952a", desc: "Story of Place · FPIC · CLT formation · Feasibility Studies · RCCS baselines. No construction — 100% foundation work." },
  p1a: { label: "Phase 1A", sublabel: "Stewardship + Hub (conditional)", color: "#7aad6e", desc: "Ecological restoration begins. RCCS credits start accruing. Hub activation conditional on Phase 0 Feasibility Study." },
  p2:  { label: "Phase 2", sublabel: "Living Neighbourhoods North", color: "#4a8f9f", desc: "First residential lots. CLT land-lease affordable units. Community energy coop. Market Hall operational." },
  p3:  { label: "Phase 3", sublabel: "Living Neighbourhoods South", color: "#9f6a4a", desc: "Full buildout. Complete RCCS portfolio issuing. INAV reporting begins. FuturVille replication potential." },
};

const PV_CAPITALS = [
  { key: "Natural",      icon: "🌿", color: "#7aad6e", desc: "Prairie ecology · soil carbon · wetland · biodiversity" },
  { key: "Human",        icon: "🧠", color: "#c8952a", desc: "Skills · education · intergenerational design · wellbeing" },
  { key: "Social",       icon: "🤝", color: "#4a8f9f", desc: "Community cohesion · FPIC · governance · belonging" },
  { key: "Manufactured", icon: "🏗", color: "#9f6a4a", desc: "Infrastructure · energy · buildings · servicing" },
  { key: "Financial",    icon: "💰", color: "#a09f6a", desc: "Returns · land appreciation · RCCS revenue · NOI" },
];

const PV_BASE_SCORES = { Natural: 3, Human: 3, Social: 4, Manufactured: 4, Financial: 3 };

const PV_CAPEX = {
  p0:  { lo: 280e3,  hi: 420e3,  note: "Story of Place, legal, ORRSC, baseline studies, CLT formation" },
  p1a: { lo: 350e3,  hi: 900e3,  note: "Stewardship + Hub (if confirmed: +$600K–$1.4M for Hub construction)" },
  p1b: { lo: 2800e3, hi: 4200e3, note: "Whispering Greens Rd extension + trunk utilities + microgrid spine" },
  p2:  { lo: 3200e3, hi: 5500e3, note: "Phase 2 residential servicing, lot preparation, CLT covenant registration" },
  p3:  { lo: 2800e3, hi: 4800e3, note: "Phase 3 residential servicing, full RCCS monitoring infrastructure" },
};

function PvSlider({ label, val, set, min, max, step, fmt, color = "#c8952a", sub }) {
  const pct = ((val - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: "#8a9080" }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "DM Mono,monospace" }}>{fmt(val)}</span>
      </div>
      {sub && <div style={{ fontSize: 10, color: "#6a7a62", marginBottom: 3 }}>{sub}</div>}
      <div style={{ position: "relative", height: 5, background: "#2d4028", borderRadius: 3 }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${color}60,${color})`, borderRadius: 3 }} />
        <input type="range" min={min} max={max} step={step} value={val} onChange={e => set(Number(e.target.value))}
          style={{ position: "absolute", top: -10, left: 0, width: "100%", opacity: 0, cursor: "pointer", height: 24 }} />
      </div>
    </div>
  );
}

function PvKpi({ label, value, sub, color = "#c8b483" }) {
  return (
    <div style={{ background: "#1c2a1a", border: "1px solid #2d4028", borderRadius: 8, padding: "10px 12px" }}>
      <div style={{ fontSize: 9, color: "#6a7a62", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 800, color, fontFamily: "DM Mono,monospace", lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: "#6a7a62", marginTop: 4, lineHeight: 1.4 }}>{sub}</div>}
    </div>
  );
}

function PvCapBar({ cap, score, delta }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 12 }}>{cap.icon}</span>
          <span style={{ fontSize: 11, color: "#c8b483", fontWeight: 600 }}>{cap.key}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {delta !== 0 && <span style={{ fontSize: 9, fontFamily: "DM Mono,monospace", color: delta > 0 ? "#7aad6e" : "#c0392b", fontWeight: 700 }}>{delta > 0 ? "+" : ""}{delta}</span>}
          <span style={{ fontSize: 12, fontFamily: "DM Mono,monospace", fontWeight: 700, color: cap.color }}>{score.toFixed(1)}/10</span>
        </div>
      </div>
      <div style={{ height: 5, background: "#2d4028", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${clamp(score, 0, 10) * 10}%`, background: `linear-gradient(90deg,${cap.color}60,${cap.color})`, borderRadius: 3, transition: "width 0.5s ease" }} />
      </div>
      <div style={{ fontSize: 9, color: "#6a7a62", marginTop: 2 }}>{cap.desc}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRAIRIE VISTA FINANCE MODEL v2 — PRT Gate-Triggered · All CAD
// Sources: RCCS v2.0i L4.Eq.Kernel, PRT Exec Sum v1.7
// Carbon: AB TIER offset market ~$22/t (oversupply; compliance frozen $95);
//         MOU trajectory ~$65/t mid-case; Verra VCS ~$18/t
// Glamping ADR: Alberta rural $175–$295 CAD/night; occ 40–60% (Hipcamp AB 2025)
// Lots: Vulcan/Whispering Greens area $55K–$95K serviced + regen premium
// CLT land-lease: ~$950/mo (30% below Vulcan market ~$1,350/mo)
// Community dividend: 10% per RCCS v2.0i S1 (canonical minimum)
// ════════════════════════════════════════════════════════════════════════════

const PV2_SB_URL = "https://uvojezuorjgqzmhhgluu.supabase.co";
const PV2_SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2b2plenVvcmpncXptaGhnbHV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMTQ3MTcsImV4cCI6MjA4Njg5MDcxN30.1irtkNYnTJbvg8VJMQh-VpByqpmIRiASwR1qTOZ6RiQ";
const PV2_HDR = { apikey: PV2_SB_KEY, Authorization: `Bearer ${PV2_SB_KEY}`, "Content-Type": "application/json" };
const PV2_SK_SETTINGS = "prt:pv:settings:v2";
const PV2_SK_SESSION  = "prt:pv:session:v2";

async function pv2Get(key, fallback) {
  try {
    const r = await fetch(`${PV2_SB_URL}/rest/v1/prt_storage?key=eq.${encodeURIComponent(key)}&select=value`, { headers: PV2_HDR });
    const d = await r.json();
    if (Array.isArray(d) && d[0]?.value) return JSON.parse(d[0].value);
  } catch {}
  return fallback;
}
async function pv2Set(key, val) {
  try {
    await fetch(`${PV2_SB_URL}/rest/v1/prt_storage`, {
      method: "POST",
      headers: { ...PV2_HDR, Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify({ key, value: JSON.stringify(val), updated_at: new Date().toISOString() }),
    });
  } catch {}
}

const fC   = (v, d=0) => `$${Number(v).toLocaleString("en-CA",{minimumFractionDigits:d,maximumFractionDigits:d})}`;
const fCM  = (v, d=1) => `$${(v/1e6).toFixed(d)}M`;
const fCK  = (v)      => `$${Math.round(v/1e3)}K`;
const fCD  = (v)      => Math.abs(v)>=1e6?fCM(v,1):Math.abs(v)>=1e3?fCK(v):`$${Math.round(v)}`;
const fPct = (v)      => `${(v*100).toFixed(1)}%`;
const fYr  = (v)      => v<=0?"N/A":v>30?">30 yrs":`${v.toFixed(1)} yrs`;
const pvClamp = (v,a,b) => Math.max(a, Math.min(b, v));

// ─── DEFAULT SETTINGS (ALL CAD) ─────────────────────────────────────────────
const PV2_DEFAULTS = {
  projectName: "Prairie Vista Estates",
  location: "Vulcan, Alberta",
  totalAcres: 63,
  landCostBasis: 3200000,

  // RCCS Natural Capital — Carbon
  restorationAcres:    18,    // prairie + wetland eligible for NCU credits
  carbonTonnesPerAcre: 1.2,   // tCO2e/ac/yr — AB mixed prairie restoration protocol
  carbonPriceTIER:     22,    // CAD/t — AB TIER offset market (oversupply; ClearBlue Nov 2025)
  carbonPriceMOU:      65,    // CAD/t — MOU $130 aspirational; $65 mid-case by project maturity
  carbonPriceVerra:    18,    // CAD/t — Verra VCS voluntary
  monitoringCostPerHa: 420,   // CAD/ha/yr — baseline + field monitoring + verification
  communityDividendPct: 0.10, // 10% — RCCS v2.0i S1 canonical minimum

  // RCCS Human Capital
  hcuParticipantsYr3:  180,   // program participants/yr at Phase 2 maturity
  hcuRevenuePerPart:   220,   // CAD/participant — workshops, education, skills

  // RCCS Social Capital
  scuAnnualRevCAD: 28000,     // CAD/yr — community benefit, governance programming

  // RCCS Manufactured (Energy Coop)
  mcuKwhPerYear:    180000,   // kWh/yr — community solar + geothermal generation
  mcuRateCAD:       0.14,     // CAD/kWh — Alberta retail avg (Epcor 2025)

  // Hospitality Hub (Phase 0 feasibility gate required)
  hubUnits:       10,         // glamping units (prairie experience)
  hubADR:         235,        // CAD/night — rural AB $175–$295 (Hipcamp AB 2025/26)
  hubOccupancy:   0.52,       // 52% — rural AB seasonal; summer peak ~70%
  hubOpCostPct:   0.44,       // 44% — hospitality operating cost
  hubCapexBase:   950000,     // CAD — units + Prairie Experience Centre fit-out
  hubProgramsCAD: 55000,      // CAD/yr — events, tours, FuturVille programming

  // CLT Land-Lease (affordable + workforce housing)
  cltUnitsP2:     14,   cltRateP2: 950,   // Phase 2: $950/mo (~30% below $1,350 Vulcan market)
  cltUnitsP3:     13,   cltRateP3: 980,   // Phase 3: modest increase

  // Lot Sales (Vulcan + regen premium)
  lotsP2:         68,  lotPriceP2: 82000,  absP2: 14,  // $55K–$95K + ~$17K regen premium
  lotsP3:         65,  lotPriceP3: 88000,  absP3: 14,

  // Other recurring revenue
  energyCoopCAD:  32000,  // CAD/yr net — solar/geothermal coop after operating costs
  marketHallCAD:  42000,  // CAD/yr — vendor fees, kitchen rentals, events
  futurvilleCAD:  55000,  // CAD/yr — FuturVille platform IP licensing (Phase 3+)

  // Phase Capex Lo / Hi (CAD)
  p0Lo: 285000,  p0Hi: 415000,
  p1aLo: 320000, p1aHi: 560000,
  hubLo: 750000, hubHi: 1380000,
  p1bLo: 2800000,p1bHi: 4500000,
  p2Lo: 3200000, p2Hi: 5500000,
  p3Lo: 2800000, p3Hi: 4800000,

  // Operating cost % of gross (non-lot) revenue
  p1aOpPct: 0.42,
  p2OpPct:  0.38,
  p3OpPct:  0.35,
  lotMargin: 0.22,  // 22% margin on lot sales after infrastructure + servicing costs

  // PRT Capital Architecture
  totalInvestCAD: 7500000,
  laneAPct: 0.65,  // Land + Dev LP
  laneBPct: 0.25,  // RCCS Credit Rail
  laneCPct: 0.10,  // FuturVille Platform
  laneAIRR:  0.14, // 14% target IRR — steward-aligned
  laneAHurdle: 0.08,
  mgmtFeePct: 0.015,

  // Covenantal Waterfall
  wfCLTPct:   0.40,
  wfPlacePct: 0.20,
  wfPRTPct:   0.20,
  wfInvPct:   0.20,

  // Five Capitals Baselines
  baseNatural:      3.5,
  baseHuman:        3.0,
  baseSocial:       4.0,
  baseManufactured: 4.5,
  baseFinancial:    2.5,
};

// Five Capitals deltas contributed by each stream when active
const PV2_DELTAS = {
  rccs_ncu:    { Natural:3,  Human:0,  Social:0,  Manufactured:0, Financial:1 },
  rccs_hcu:    { Natural:0,  Human:3,  Social:1,  Manufactured:0, Financial:0 },
  rccs_scu:    { Natural:0,  Human:0,  Social:3,  Manufactured:0, Financial:0 },
  rccs_mcu:    { Natural:1,  Human:0,  Social:0,  Manufactured:2, Financial:1 },
  hub:         { Natural:1,  Human:2,  Social:2,  Manufactured:1, Financial:2 },
  clt:         { Natural:0,  Human:2,  Social:3,  Manufactured:0, Financial:1 },
  lots:        { Natural:0,  Human:1,  Social:1,  Manufactured:2, Financial:3 },
  energy:      { Natural:1,  Human:0,  Social:1,  Manufactured:2, Financial:1 },
  market:      { Natural:0,  Human:1,  Social:2,  Manufactured:0, Financial:1 },
  futurville:  { Natural:0,  Human:1,  Social:1,  Manufactured:0, Financial:2 },
};

const PV2_CAPS = [
  { key:"Natural",      icon:"🌿", color:"#7aad6e", desc:"Prairie · wetland · soil carbon · biodiversity" },
  { key:"Human",        icon:"🧠", color:"#c8952a", desc:"Skills · wellness · education · intergenerational" },
  { key:"Social",       icon:"🤝", color:"#4a8f9f", desc:"FPIC · governance · community cohesion" },
  { key:"Manufactured", icon:"🏗",  color:"#9f6a4a", desc:"Infrastructure · energy · buildings" },
  { key:"Financial",    icon:"💰", color:"#a09f6a", desc:"Returns · land appreciation · RCCS · NOI" },
];

// ─── SMALL UI ATOMS ──────────────────────────────────────────────────────────
function Pv2Slider({label,val,set,min,max,step,fmt,color="#c8952a",sub,disabled}){
  const pct=((val-min)/(max-min))*100;
  return(
    <div style={{marginBottom:12,opacity:disabled?0.4:1}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
        <span style={{fontSize:11,color:"#8a9080"}}>{label}</span>
        <span style={{fontSize:12,fontWeight:700,color,fontFamily:"'DM Mono',monospace"}}>{fmt(val)}</span>
      </div>
      {sub&&<div style={{fontSize:10,color:"#6a7a62",marginBottom:3}}>{sub}</div>}
      <div style={{position:"relative",height:5,background:"#2d4028",borderRadius:3}}>
        <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${pct}%`,
          background:`linear-gradient(90deg,${color}60,${color})`,borderRadius:3}}/>
        <input type="range" min={min} max={max} step={step} value={val} disabled={disabled}
          onChange={e=>set(Number(e.target.value))}
          style={{position:"absolute",top:-10,left:0,width:"100%",opacity:0,height:24,
            cursor:disabled?"not-allowed":"pointer"}}/>
      </div>
    </div>
  );
}

function Pv2NumInput({label,val,set,prefix="$",suffix="",note,step=1000,wide}){
  return(
    <div style={{marginBottom:10,gridColumn:wide?"1/-1":"auto"}}>
      <div style={{fontSize:10,color:"#6a7a62",marginBottom:3}}>{label}</div>
      {note&&<div style={{fontSize:9,color:"#6a7a62",opacity:.75,marginBottom:3,lineHeight:1.4}}>{note}</div>}
      <div style={{display:"flex",alignItems:"center",background:"#1a2a18",borderRadius:5,
        border:"1px solid #2d4028",overflow:"hidden"}}>
        {prefix&&<span style={{fontSize:11,color:"#6a7a62",padding:"0 7px",flexShrink:0}}>{prefix}</span>}
        <input type="number" value={val} step={step}
          onChange={e=>set(Number(e.target.value)||0)}
          style={{flex:1,background:"transparent",border:"none",outline:"none",
            color:"#c8b483",fontFamily:"'DM Mono',monospace",fontSize:12,
            padding:"6px 4px 6px 0",minWidth:0}}/>
        {suffix&&<span style={{fontSize:11,color:"#6a7a62",padding:"0 7px",flexShrink:0}}>{suffix}</span>}
      </div>
    </div>
  );
}

function Pv2Kpi({label,value,sub,color="#c8b483",warn}){
  return(
    <div style={{background:"#1c2a1a",border:`1px solid ${warn?"#c0392b40":"#2d4028"}`,borderRadius:8,padding:"10px 12px"}}>
      <div style={{fontSize:9,color:"#6a7a62",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>{label}</div>
      <div style={{fontSize:14,fontWeight:800,color:warn?"#e74c3c":color,
        fontFamily:"'DM Mono',monospace",lineHeight:1.1}}>{value}</div>
      {sub&&<div style={{fontSize:10,color:"#6a7a62",marginTop:4,lineHeight:1.4}}>{sub}</div>}
    </div>
  );
}

function Pv2CapBar({cap,score,delta}){
  return(
    <div style={{marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <span style={{fontSize:12}}>{cap.icon}</span>
          <span style={{fontSize:11,color:"#c8b483",fontWeight:600}}>{cap.key}</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          {delta!==0&&<span style={{fontSize:9,fontFamily:"'DM Mono',monospace",
            color:delta>0?"#7aad6e":"#c0392b",fontWeight:700}}>
            {delta>0?`+${delta}`:delta}</span>}
          <span style={{fontSize:12,fontFamily:"'DM Mono',monospace",fontWeight:700,color:cap.color}}>
            {score.toFixed(1)}/10</span>
        </div>
      </div>
      <div style={{height:5,background:"#2d4028",borderRadius:3,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pvClamp(score,0,10)*10}%`,
          background:`linear-gradient(90deg,${cap.color}60,${cap.color})`,
          borderRadius:3,transition:"width 0.4s ease"}}/>
      </div>
      <div style={{fontSize:9,color:"#6a7a62",marginTop:2}}>{cap.desc}</div>
    </div>
  );
}

function Pv2SectBox({title,color="#c8952a",children}){
  const [open,setOpen] = React.useState(true);
  return(
    <div style={{marginBottom:18}}>
      <button onClick={()=>setOpen(!open)} style={{display:"flex",alignItems:"center",
        gap:8,width:"100%",background:"transparent",border:"none",cursor:"pointer",
        borderBottom:`1px solid ${color}40`,paddingBottom:7,marginBottom:open?12:0}}>
        <span style={{fontSize:9,color,fontWeight:700,letterSpacing:"0.12em",
          textTransform:"uppercase",flex:1,textAlign:"left"}}>{title}</span>
        <span style={{fontSize:11,color:"#6a7a62"}}>{open?"▲":"▼"}</span>
      </button>
      {open&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>{children}</div>}
    </div>
  );
}

// ─── SETTINGS PAGE ───────────────────────────────────────────────────────────
function Pv2Settings({ S, setS, onClose }) {
  const set = (k,v) => setS(p=>({...p,[k]:v}));
  return(
    <div style={{padding:"20px 24px",fontFamily:"Inter,system-ui,sans-serif"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:9,color:"#c8952a",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:3}}>Finance Model — Configuration</div>
          <div style={{fontSize:20,fontWeight:800,fontFamily:"'Cormorant Garamond',Georgia,serif",color:"#d4b483"}}>Settings — {S.projectName}</div>
          <div style={{fontSize:11,color:"#6a7a62",marginTop:3}}>All values in Canadian Dollars (CAD) · Changes auto-saved to Supabase</div>
        </div>
        <button onClick={onClose} style={{padding:"8px 18px",borderRadius:7,border:"1px solid #c8952a",
          background:"#c8952a20",color:"#c8952a",cursor:"pointer",fontWeight:700,fontSize:12}}>← Back to Model</button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:28}}>

        {/* COL 1 */}
        <div>
          <Pv2SectBox title="Project Identity">
            <div style={{gridColumn:"1/-1",marginBottom:10}}>
              <div style={{fontSize:10,color:"#6a7a62",marginBottom:3}}>Project Name</div>
              <input value={S.projectName} onChange={e=>set("projectName",e.target.value)}
                style={{width:"100%",background:"#1a2a18",border:"1px solid #2d4028",borderRadius:5,
                  color:"#c8b483",fontFamily:"'DM Mono',monospace",fontSize:12,padding:"6px 10px",
                  outline:"none",boxSizing:"border-box"}}/>
            </div>
            <Pv2NumInput label="Total Acres" val={S.totalAcres} set={v=>set("totalAcres",v)} prefix="" suffix=" ac" step={1}/>
            <Pv2NumInput label="Land Cost Basis (CAD)" val={S.landCostBasis} set={v=>set("landCostBasis",v)} step={100000}
              note="Angela's estimated acquisition cost basis"/>
          </Pv2SectBox>

          <Pv2SectBox title="RCCS — Natural Capital (Carbon)" color="#7aad6e">
            <Pv2NumInput label="RCCS Restoration Acres" val={S.restorationAcres} set={v=>set("restorationAcres",v)} prefix="" suffix=" ac" step={1}
              note="Of 63 ac: prairie + wetland eligible for NCU credits"/>
            <Pv2NumInput label="Sequestration Rate" val={S.carbonTonnesPerAcre} set={v=>set("carbonTonnesPerAcre",v)} prefix="" suffix=" t CO2/ac/yr" step={0.1}
              note="AB mixed prairie restoration: 0.8–1.8 t/ac/yr"/>
            <Pv2NumInput label="AB TIER Offset Price" val={S.carbonPriceTIER} set={v=>set("carbonPriceTIER",v)} suffix=" CAD/t"
              note="Market ~$22/t (oversupply; ClearBlue Nov 2025)"/>
            <Pv2NumInput label="MOU Trajectory Price" val={S.carbonPriceMOU} set={v=>set("carbonPriceMOU",v)} suffix=" CAD/t"
              note="$130/t MOU aspirational; $65 mid-case at maturity"/>
            <Pv2NumInput label="Verra VCS Voluntary" val={S.carbonPriceVerra} set={v=>set("carbonPriceVerra",v)} suffix=" CAD/t"
              note="Verra voluntary carbon market ~$18 CAD/t"/>
            <Pv2NumInput label="Monitoring Cost" val={S.monitoringCostPerHa} set={v=>set("monitoringCostPerHa",v)} suffix=" CAD/ha/yr"
              note="Baseline studies + field monitoring + 3rd-party verification"/>
            <Pv2NumInput label="Community Dividend %" val={Math.round(S.communityDividendPct*100)} set={v=>set("communityDividendPct",v/100)} prefix="" suffix=" %" step={1}
              note="RCCS v2.0i S1: 10% canonical minimum — do not reduce"/>
          </Pv2SectBox>

          <Pv2SectBox title="RCCS — Human, Social & Manufactured" color="#4a8f9f">
            <Pv2NumInput label="HCU Participants at Yr3" val={S.hcuParticipantsYr3} set={v=>set("hcuParticipantsYr3",v)} prefix="" suffix=" people" step={10}/>
            <Pv2NumInput label="HCU Revenue / Participant" val={S.hcuRevenuePerPart} set={v=>set("hcuRevenuePerPart",v)} suffix=" CAD"
              note="Workshops, education, skills certification"/>
            <Pv2NumInput label="SCU Annual Revenue (Yr3)" val={S.scuAnnualRevCAD} set={v=>set("scuAnnualRevCAD",v)}
              note="Community benefit agreements, governance value"/>
            <Pv2NumInput label="Energy Output (Yr3)" val={S.mcuKwhPerYear} set={v=>set("mcuKwhPerYear",v)} prefix="" suffix=" kWh/yr" step={10000}
              note="Community solar + geothermal cooperative"/>
            <Pv2NumInput label="Energy Rate" val={S.mcuRateCAD} set={v=>set("mcuRateCAD",v)} prefix="" suffix=" CAD/kWh" step={0.01}
              note="Alberta retail avg ~$0.14/kWh (Epcor 2025)"/>
          </Pv2SectBox>
        </div>

        {/* COL 2 */}
        <div>
          <Pv2SectBox title="Hospitality Hub — Phase 0 Feasibility Gate" color="#c8952a">
            <Pv2NumInput label="Glamping Units" val={S.hubUnits} set={v=>set("hubUnits",v)} prefix="" suffix=" units" step={1}
              note="Prairie experience glamping (Star Trek Vulcan appeal)"/>
            <Pv2NumInput label="ADR (Avg Daily Rate)" val={S.hubADR} set={v=>set("hubADR",v)} suffix=" CAD/night"
              note="Alberta rural glamping $175–$295 (Hipcamp AB 2025/26)"/>
            <Pv2NumInput label="Target Occupancy %" val={Math.round(S.hubOccupancy*100)} set={v=>set("hubOccupancy",v/100)} prefix="" suffix=" %" step={1}
              note="Rural AB seasonal baseline 40–60%; summer peak ~70%"/>
            <Pv2NumInput label="Hub Operating Cost %" val={Math.round(S.hubOpCostPct*100)} set={v=>set("hubOpCostPct",v/100)} prefix="" suffix=" %" step={1}
              note="Hospitality industry norm: 40–50%"/>
            <Pv2NumInput label="Events & Programs (Yr3)" val={S.hubProgramsCAD} set={v=>set("hubProgramsCAD",v)}
              note="Tours, events, FuturVille programming revenue"/>
            <Pv2NumInput label="Hub Base Capex" val={S.hubCapexBase} set={v=>set("hubCapexBase",v)} step={50000}
              note="Units + Prairie Experience Centre fit-out"/>
          </Pv2SectBox>

          <Pv2SectBox title="CLT Land-Lease — Affordable Housing" color="#7aad6e">
            <Pv2NumInput label="Phase 2 CLT Units" val={S.cltUnitsP2} set={v=>set("cltUnitsP2",v)} prefix="" suffix=" units" step={1}
              note="~20% of Phase 2 lots held as CLT affordable"/>
            <Pv2NumInput label="Phase 2 Monthly Rate" val={S.cltRateP2} set={v=>set("cltRateP2",v)} suffix=" CAD/mo"
              note="~30% below Vulcan market ($1,250–$1,400/mo)"/>
            <Pv2NumInput label="Phase 3 CLT Units" val={S.cltUnitsP3} set={v=>set("cltUnitsP3",v)} prefix="" suffix=" units" step={1}/>
            <Pv2NumInput label="Phase 3 Monthly Rate" val={S.cltRateP3} set={v=>set("cltRateP3",v)} suffix=" CAD/mo"/>
          </Pv2SectBox>

          <Pv2SectBox title="Lot Sales" color="#9f6a4a">
            <Pv2NumInput label="Phase 2 Total Lots" val={S.lotsP2} set={v=>set("lotsP2",v)} prefix="" suffix=" lots" step={1}
              note="Golf Edge + East Stewardship clusters"/>
            <Pv2NumInput label="Phase 2 Price / Lot" val={S.lotPriceP2} set={v=>set("lotPriceP2",v)} step={5000}
              note="Vulcan/Whispering Greens area $55K–$95K + ~$17K regen premium"/>
            <Pv2NumInput label="Phase 2 Absorption Rate" val={S.absP2} set={v=>set("absP2",v)} prefix="" suffix=" lots/yr" step={1}
              note="~5 yr to absorb 68 lots; conservative for rural AB"/>
            <Pv2NumInput label="Phase 2 Lot Margin %" val={Math.round(S.lotMargin*100)} set={v=>set("lotMargin",v/100)} prefix="" suffix=" %" step={1}
              note="22% after infrastructure, servicing, DA costs"/>
            <Pv2NumInput label="Phase 3 Total Lots" val={S.lotsP3} set={v=>set("lotsP3",v)} prefix="" suffix=" lots" step={1}/>
            <Pv2NumInput label="Phase 3 Price / Lot" val={S.lotPriceP3} set={v=>set("lotPriceP3",v)} step={5000}
              note="Phase 3 premium: demonstrated community"/>
            <Pv2NumInput label="Phase 3 Absorption Rate" val={S.absP3} set={v=>set("absP3",v)} prefix="" suffix=" lots/yr" step={1}/>
          </Pv2SectBox>

          <Pv2SectBox title="Other Recurring Revenue" color="#a09f6a">
            <Pv2NumInput label="Community Energy Coop (Yr3 net)" val={S.energyCoopCAD} set={v=>set("energyCoopCAD",v)}
              note="180K kWh × $0.14 − operating costs"/>
            <Pv2NumInput label="Market Hall & Kitchen (Yr3)" val={S.marketHallCAD} set={v=>set("marketHallCAD",v)}
              note="Vendor fees, kitchen rentals, events"/>
            <Pv2NumInput label="FuturVille IP Licensing (Yr3)" val={S.futurvilleCAD} set={v=>set("futurvilleCAD",v)}
              note="Village #1 design + governance IP — Angela's platform"/>
          </Pv2SectBox>
        </div>

        {/* COL 3 */}
        <div>
          <Pv2SectBox title="Phase Capex — Low / High Range (CAD)" color="#9f6a4a">
            <Pv2NumInput label="Phase 0 — Low" val={S.p0Lo} set={v=>set("p0Lo",v)} step={25000} note="Story of Place · CLT formation · baselines · legal"/>
            <Pv2NumInput label="Phase 0 — High" val={S.p0Hi} set={v=>set("p0Hi",v)} step={25000}/>
            <Pv2NumInput label="Phase 1A — Low" val={S.p1aLo} set={v=>set("p1aLo",v)} step={25000} note="Stewardship · RCCS sensors · CLT activation"/>
            <Pv2NumInput label="Phase 1A — High" val={S.p1aHi} set={v=>set("p1aHi",v)} step={25000}/>
            <Pv2NumInput label="Hub Add-On — Low (conditional)" val={S.hubLo} set={v=>set("hubLo",v)} step={50000}/>
            <Pv2NumInput label="Hub Add-On — High" val={S.hubHi} set={v=>set("hubHi",v)} step={50000}/>
            <Pv2NumInput label="Phase 1B Servicing Spine — Low" val={S.p1bLo} set={v=>set("p1bLo",v)} step={100000} note="Road · trunk utilities · microgrid backbone"/>
            <Pv2NumInput label="Phase 1B — High" val={S.p1bHi} set={v=>set("p1bHi",v)} step={100000}/>
            <Pv2NumInput label="Phase 2 — Low" val={S.p2Lo} set={v=>set("p2Lo",v)} step={100000}/>
            <Pv2NumInput label="Phase 2 — High" val={S.p2Hi} set={v=>set("p2Hi",v)} step={100000}/>
            <Pv2NumInput label="Phase 3 — Low" val={S.p3Lo} set={v=>set("p3Lo",v)} step={100000}/>
            <Pv2NumInput label="Phase 3 — High" val={S.p3Hi} set={v=>set("p3Hi",v)} step={100000}/>
          </Pv2SectBox>

          <Pv2SectBox title="Operating Costs & Margins" color="#c8952a">
            <Pv2NumInput label="Phase 1A Op Cost %" val={Math.round(S.p1aOpPct*100)} set={v=>set("p1aOpPct",v/100)} prefix="" suffix=" %" step={1}
              note="Stewardship + Hub hospitality if active"/>
            <Pv2NumInput label="Phase 2 Op Cost %" val={Math.round(S.p2OpPct*100)} set={v=>set("p2OpPct",v/100)} prefix="" suffix=" %" step={1}/>
            <Pv2NumInput label="Phase 3 Op Cost %" val={Math.round(S.p3OpPct*100)} set={v=>set("p3OpPct",v/100)} prefix="" suffix=" %" step={1}/>
            <Pv2NumInput label="Lot Sales Net Margin %" val={Math.round(S.lotMargin*100)} set={v=>set("lotMargin",v/100)} prefix="" suffix=" %" step={1}
              note="After infrastructure, servicing, DA costs"/>
          </Pv2SectBox>

          <Pv2SectBox title="PRT Capital Architecture" color="#4a8f9f">
            <Pv2NumInput label="Total Project Investment" val={S.totalInvestCAD} set={v=>set("totalInvestCAD",v)} step={250000}
              note="Lane A + B + C combined (CAD)"/>
            <Pv2NumInput label="Lane A % (Land + Dev LP)" val={Math.round(S.laneAPct*100)} set={v=>set("laneAPct",v/100)} prefix="" suffix=" %" step={5}/>
            <Pv2NumInput label="Lane B % (RCCS Rail)" val={Math.round(S.laneBPct*100)} set={v=>set("laneBPct",v/100)} prefix="" suffix=" %" step={5}/>
            <Pv2NumInput label="Lane C % (FuturVille)" val={Math.round(S.laneCPct*100)} set={v=>set("laneCPct",v/100)} prefix="" suffix=" %" step={5}/>
            <Pv2NumInput label="Lane A Target IRR" val={Math.round(S.laneAIRR*100)} set={v=>set("laneAIRR",v/100)} prefix="" suffix=" %" step={1}/>
            <Pv2NumInput label="Hurdle / Preferred Return" val={Math.round(S.laneAHurdle*100)} set={v=>set("laneAHurdle",v/100)} prefix="" suffix=" %" step={1}/>
            <Pv2NumInput label="PRT Management Fee" val={Math.round(S.mgmtFeePct*1000)/10} set={v=>set("mgmtFeePct",v/100)} prefix="" suffix=" %/yr" step={0.25}
              note="Applied to total AUM annually"/>
          </Pv2SectBox>

          <Pv2SectBox title="Covenantal Waterfall — RCCS v2.0i" color="#7aad6e">
            <Pv2NumInput label="CLT Reinvestment %" val={Math.round(S.wfCLTPct*100)} set={v=>set("wfCLTPct",v/100)} prefix="" suffix=" %" step={5}
              note="Compounds locally — Life before Profits"/>
            <Pv2NumInput label="Place Fund %" val={Math.round(S.wfPlacePct*100)} set={v=>set("wfPlacePct",v/100)} prefix="" suffix=" %" step={5}/>
            <Pv2NumInput label="PRT Governance %" val={Math.round(S.wfPRTPct*100)} set={v=>set("wfPRTPct",v/100)} prefix="" suffix=" %" step={5}/>
            <Pv2NumInput label="Investor Distributions %" val={Math.round(S.wfInvPct*100)} set={v=>set("wfInvPct",v/100)} prefix="" suffix=" %" step={5}/>
          </Pv2SectBox>

          <Pv2SectBox title="Five Capitals Baseline Scores (0–10)" color="#7aad6e">
            {PV2_CAPS.map(c=>(
              <Pv2NumInput key={c.key} label={`${c.icon} ${c.key}`}
                val={S[`base${c.key}`]} set={v=>set(`base${c.key}`,pvClamp(Number(v),0,10))}
                prefix="" step={0.5} note={c.desc}/>
            ))}
          </Pv2SectBox>
        </div>
      </div>

      <div style={{borderTop:"1px solid #2d4028",marginTop:20,paddingTop:14,
        display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <div style={{fontSize:10,color:"#6a7a62",maxWidth:560}}>
          Auto-saved to Supabase · All values CAD · Sources: RCCS v2.0i S1, PRT Exec Sum v1.7,
          Alberta TIER/ClearBlue Markets 2025–26, Hipcamp AB 2025/26, Vulcan MLS® 2024–25, Epcor AB 2025
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setS(PV2_DEFAULTS)}
            style={{padding:"7px 14px",borderRadius:6,border:"1px solid #c0392b",
              background:"transparent",color:"#c0392b",cursor:"pointer",fontSize:11}}>Reset Defaults</button>
          <button onClick={onClose}
            style={{padding:"7px 18px",borderRadius:6,border:"1px solid #c8952a",
              background:"#c8952a20",color:"#c8952a",cursor:"pointer",fontWeight:700,fontSize:12}}>Save & Return →</button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN FINANCE MODEL ──────────────────────────────────────────────────────
function FinanceModel() {
  const [S, setS]           = React.useState(PV2_DEFAULTS);
  const [loaded, setLoaded] = React.useState(false);
  const [view, setView]     = React.useState("model"); // "model" | "settings"
  const [phases, setPhases] = React.useState({ p0:true, p1a:false, p2:false, p3:false });
  const [hub, setHub]       = React.useState(false);
  const [scenario, setScenario] = React.useState("mid");
  const [capexV, setCapexV] = React.useState(0.5);
  const [carbon, setCarbon] = React.useState("tier");
  const [flash, setFlash]   = React.useState(false);
  const saveRef = React.useRef(null);

  // Load from Supabase on mount
  React.useEffect(()=>{(async()=>{
    const sv = await pv2Get(PV2_SK_SETTINGS, null);
    const ss = await pv2Get(PV2_SK_SESSION, null);
    if(sv) setS({...PV2_DEFAULTS,...sv});
    if(ss){
      if(ss.phases) setPhases(ss.phases);
      if(ss.hub!==undefined) setHub(ss.hub);
      if(ss.scenario) setScenario(ss.scenario);
      if(ss.capexV!==undefined) setCapexV(ss.capexV);
      if(ss.carbon) setCarbon(ss.carbon);
    }
    setLoaded(true);
  })();},[]);

  // Auto-save (debounced 900ms)
  React.useEffect(()=>{
    if(!loaded) return;
    if(saveRef.current) clearTimeout(saveRef.current);
    saveRef.current = setTimeout(async()=>{
      await pv2Set(PV2_SK_SETTINGS, S);
      await pv2Set(PV2_SK_SESSION, { phases, hub, scenario, capexV, carbon });
      setFlash(true); setTimeout(()=>setFlash(false), 1800);
    }, 900);
  },[phases, hub, scenario, capexV, carbon, S, loaded]);

  // ─── CALCULATIONS ─────────────────────────────────────────────────────────
  const calc = React.useMemo(()=>{
    const carbonPrice = { tier:S.carbonPriceTIER, mou:S.carbonPriceMOU, verra:S.carbonPriceVerra }[carbon];
    const rM = { low:0.35, mid:0.55, high:0.80 }[scenario];  // yr1 ramp multiplier
    const fM = { low:0.65, mid:1.00, high:1.30 }[scenario];  // yr3 full multiplier
    const lerp = (lo,hi) => lo + (hi-lo)*capexV;

    // Capex
    const p0Cap  = phases.p0  ? lerp(S.p0Lo, S.p0Hi) : 0;
    const p1aCap = phases.p1a ? lerp(S.p1aLo, S.p1aHi) + (hub ? lerp(S.hubLo,S.hubHi) : 0) : 0;
    const p1bCap = (phases.p2||phases.p3) ? lerp(S.p1bLo, S.p1bHi) : 0;
    const p2Cap  = phases.p2  ? lerp(S.p2Lo, S.p2Hi) : 0;
    const p3Cap  = phases.p3  ? lerp(S.p3Lo, S.p3Hi) : 0;
    const totCap = p0Cap + p1aCap + p1bCap + p2Cap + p3Cap;

    // Revenue streams
    const ncuGrossYr3 = S.restorationAcres * S.carbonTonnesPerAcre * carbonPrice;
    const ncuMonitor  = S.monitoringCostPerHa * S.restorationAcres * 0.405; // ac→ha
    const ncu3 = Math.max(0, ncuGrossYr3*(1-S.communityDividendPct) - ncuMonitor) * fM;
    const hcu3 = S.hcuParticipantsYr3 * S.hcuRevenuePerPart * fM;
    const scu3 = S.scuAnnualRevCAD * fM;
    const mcu3 = S.mcuKwhPerYear * S.mcuRateCAD * 0.5 * fM; // 50% MCU credit recognition

    const hubGr3 = phases.p1a && hub ? (S.hubUnits * S.hubADR * 365 * S.hubOccupancy + S.hubProgramsCAD) * fM : 0;
    const hubGr1 = phases.p1a && hub ? (S.hubUnits * S.hubADR * 365 * S.hubOccupancy * 0.4 + S.hubProgramsCAD * 0.3) * rM : 0;

    const lots2yr1 = phases.p2 ? S.absP2 * S.lotPriceP2 * rM : 0;
    const lots2yr3 = phases.p2 ? S.absP2 * S.lotPriceP2 * fM : 0;
    const clt2yr1  = phases.p2 ? S.cltUnitsP2 * S.cltRateP2 * 12 * rM * 0.5 : 0;
    const clt2yr3  = phases.p2 ? S.cltUnitsP2 * S.cltRateP2 * 12 * fM : 0;
    const engy2yr3 = phases.p2 ? S.energyCoopCAD * fM : 0;
    const mkt2yr3  = phases.p2 ? S.marketHallCAD * fM : 0;
    const rccs2yr3 = phases.p2 ? (ncu3 + hcu3 * 0.7 + scu3 * 0.7) : 0;

    const lots3yr1 = phases.p3 ? S.absP3 * S.lotPriceP3 * rM : 0;
    const lots3yr3 = phases.p3 ? S.absP3 * S.lotPriceP3 * fM : 0;
    const clt3yr3  = phases.p3 ? S.cltUnitsP3 * S.cltRateP3 * 12 * fM : 0;
    const rccs3yr3 = phases.p3 ? (ncu3 + hcu3 + scu3 + mcu3) : 0;
    const futr3yr3 = phases.p3 ? S.futurvilleCAD * fM : 0;

    // Phase 1A recurring (if active, not in P2)
    const rccs1yr3 = phases.p1a && !phases.p2 ? (ncu3 * 0.4 + hcu3 * 0.2 + scu3 * 0.2) : 0;

    const totYr1 = hubGr1 + lots2yr1 + clt2yr1 + lots3yr1;
    const totYr3 = rccs1yr3 + hubGr3 + lots2yr3 + clt2yr3 + engy2yr3 + mkt2yr3 + rccs2yr3
                 + lots3yr3 + clt3yr3 + rccs3yr3 + futr3yr3;

    // NOI — lot sales at lotMargin; recurring at phase opPct
    const opPct = phases.p3 ? S.p3OpPct : phases.p2 ? S.p2OpPct : S.p1aOpPct;
    const totLots = lots2yr3 + lots3yr3;
    const totRecur = totYr3 - totLots;
    const noi = totRecur * (1 - opPct) + totLots * S.lotMargin;

    // Lane architecture
    const laneA = S.totalInvestCAD * S.laneAPct;
    const laneB = S.totalInvestCAD * S.laneBPct;
    const laneC = S.totalInvestCAD * S.laneCPct;
    const laneARet = laneA * S.laneAIRR;
    const mgmtFee  = S.totalInvestCAD * S.mgmtFeePct;

    // Dev metrics
    const devYield = totCap > 0 && noi > 0 ? noi / totCap : null;
    const payback  = totCap > 0 && noi > 0 ? totCap / noi : null;

    // INAV
    const iNAVContracted = noi > 0 ? noi / 0.065 : 0; // 6.5% cap rate (regenerative premium)
    const iNAVUplift = (rccs3yr3 + rccs2yr3) * 3.0; // uncontracted RCCS × 3× premium (INAV only)

    // Waterfall
    const hurdle = laneA * S.laneAHurdle;
    const surplus = Math.max(0, noi - hurdle);
    const wfCLT   = surplus * S.wfCLTPct;
    const wfPlace = surplus * S.wfPlacePct;
    const wfPRT   = surplus * S.wfPRTPct;
    const wfInv   = surplus * S.wfInvPct;

    // Five Capitals
    const deltas = { Natural:0, Human:0, Social:0, Manufactured:0, Financial:0 };
    const addDelta = (key, scale=1) => { PV2_CAPS.forEach(c=>{ deltas[c.key] += (PV2_DELTAS[key][c.key]||0)*scale; }); };
    if(phases.p1a){ addDelta("rccs_ncu",0.4); addDelta("rccs_hcu",0.3); addDelta("rccs_scu",0.3); if(hub)addDelta("hub"); }
    if(phases.p2){ addDelta("lots"); addDelta("clt"); addDelta("energy"); addDelta("market"); addDelta("rccs_ncu",0.3); addDelta("rccs_hcu",0.4); addDelta("rccs_scu",0.4); }
    if(phases.p3){ addDelta("lots",0.5); addDelta("clt",0.5); addDelta("rccs_mcu"); addDelta("futurville"); }
    const scores = {};
    PV2_CAPS.forEach(c=>{ scores[c.key] = pvClamp(S[`base${c.key}`] + deltas[c.key], 0, 10); });
    const composite = Object.values(scores).reduce((a,b)=>a+b,0)/5;

    // Stream rows for table
    const rows = [
      { ph:"p1a", ic:"🌿", nm:"RCCS Natural Capital (NCU)", y1:0, y3:rccs1yr3, on:phases.p1a&&!phases.p2 },
      { ph:"p1a", ic:"🧠", nm:"RCCS Human Capital (HCU, P1A)", y1:0, y3:phases.p1a&&!phases.p2?hcu3*0.2:0, on:phases.p1a&&!phases.p2 },
      { ph:"p1a", ic:"🏕", nm:"Hub Glamping + Programs", y1:hubGr1, y3:hubGr3, on:phases.p1a&&hub, gate:true },
      { ph:"p2",  ic:"🏘", nm:"Lot Sales — Phase 2 (North)", y1:lots2yr1, y3:lots2yr3, on:phases.p2 },
      { ph:"p2",  ic:"🔑", nm:"CLT Land-Lease — Phase 2", y1:clt2yr1, y3:clt2yr3, on:phases.p2 },
      { ph:"p2",  ic:"⚡", nm:"Community Energy Cooperative", y1:0, y3:engy2yr3, on:phases.p2 },
      { ph:"p2",  ic:"🍽", nm:"Market Hall & Community Kitchen", y1:0, y3:mkt2yr3, on:phases.p2 },
      { ph:"p2",  ic:"📊", nm:"RCCS Portfolio — Phase 2", y1:0, y3:rccs2yr3, on:phases.p2 },
      { ph:"p3",  ic:"🏡", nm:"Lot Sales — Phase 3 (South)", y1:lots3yr1, y3:lots3yr3, on:phases.p3 },
      { ph:"p3",  ic:"🔑", nm:"CLT Land-Lease — Phase 3", y1:0, y3:clt3yr3, on:phases.p3 },
      { ph:"p3",  ic:"📊", nm:"RCCS Portfolio Mature (P3)", y1:0, y3:rccs3yr3, on:phases.p3 },
      { ph:"p3",  ic:"🌐", nm:"FuturVille IP Licensing", y1:0, y3:futr3yr3, on:phases.p3 },
    ].filter(r=>r.on);

    return {
      p0Cap,p1aCap,p1bCap,p2Cap,p3Cap,totCap,
      totYr1,totYr3,noi,devYield,payback,
      laneA,laneB,laneC,laneARet,mgmtFee,
      iNAVContracted,iNAVUplift,
      surplus,hurdle,wfCLT,wfPlace,wfPRT,wfInv,
      deltas,scores,composite,
      rows,carbonPrice,
      opPct,
    };
  },[phases,hub,scenario,capexV,carbon,S]);

  const anyRev = (phases.p1a||phases.p2||phases.p3);
  const phC = { p0:"#c8952a", p1a:"#7aad6e", p2:"#4a8f9f", p3:"#9f6a4a" };
  const phD = {
    p0:"Story of Place · CLT formation · ORRSC · RCCS baselines · Feasibility study.",
    p1a:"Prairie restoration starts · RCCS credits accrue · Hub if feasibility gate passes.",
    p2:"68 lots · CLT affordable units · Energy coop · Market Hall · RCCS maturing.",
    p3:"65 lots · Full RCCS portfolio · INAV reporting · FuturVille replication.",
  };

  if(view==="settings") return <Pv2Settings S={S} setS={setS} onClose={()=>setView("model")}/>;

  return(
    <div style={{fontFamily:"Inter,system-ui,sans-serif"}}>

      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",
        marginBottom:22,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:11,fontFamily:"'DM Mono',monospace",color:"#c8952a",
            letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:6}}>PRT Finance Model v2 — Gate-Triggered · CAD</div>
          <h2 style={{fontSize:26,fontWeight:800,fontFamily:"'Cormorant Garamond',Georgia,serif",
            color:"#d4b483",margin:"0 0 6px"}}>Prairie Vista Estates</h2>
          <p style={{fontSize:12,color:"#8a9080",maxWidth:680,lineHeight:1.7,margin:0}}>
            Toggle phases to model activation sequences. Each phase unlocks when readiness gates pass — not calendar dates.
            Hub revenue is conditional on Phase 0 Feasibility Study. All in Canadian Dollars.
          </p>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
          <span style={{fontSize:9,fontFamily:"'DM Mono',monospace",
            color:flash?"#7aad6e":"#6a7a62",transition:"color 0.5s"}}>
            {flash?"● saved to Supabase":"○ auto-save"}
          </span>
          <button onClick={()=>setView("settings")}
            style={{padding:"7px 16px",borderRadius:6,border:"1px solid #4a8f9f",
              background:"#4a8f9f18",color:"#4a8f9f",cursor:"pointer",fontWeight:700,fontSize:11}}>
            ⚙️ Finance Settings
          </button>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"255px 1fr 254px",gap:18}}>

        {/* ── LEFT ── */}
        <div>
          {/* Scenario */}
          <div style={{background:"#1c2a1a",border:"1px solid #2d4028",borderRadius:8,
            padding:"10px 12px",marginBottom:12}}>
            <div style={{fontSize:9,color:"#6a7a62",letterSpacing:"0.12em",textTransform:"uppercase",
              marginBottom:8,fontWeight:600}}>Revenue Scenario</div>
            <div style={{display:"flex",gap:4,marginBottom:12}}>
              {[["low","Conservative"],["mid","Base Case"],["high","Upside"]].map(([k,l])=>(
                <button key={k} onClick={()=>setScenario(k)}
                  style={{flex:1,padding:"5px 2px",borderRadius:5,
                    border:`1px solid ${scenario===k?"#c8952a":"#2d4028"}`,
                    background:scenario===k?"#c8952a22":"transparent",
                    color:scenario===k?"#c8952a":"#8a9080",fontSize:10,
                    fontWeight:scenario===k?700:400,cursor:"pointer"}}>{l}</button>
              ))}
            </div>

            <div style={{fontSize:9,color:"#6a7a62",letterSpacing:"0.12em",textTransform:"uppercase",
              marginBottom:6,fontWeight:600}}>Carbon Credit Adapter</div>
            <div style={{display:"flex",gap:3}}>
              {[["tier",`TIER $${S.carbonPriceTIER}/t`],["mou",`MOU $${S.carbonPriceMOU}/t`],["verra",`Verra $${S.carbonPriceVerra}/t`]].map(([k,l])=>(
                <button key={k} onClick={()=>setCarbon(k)}
                  style={{flex:1,padding:"4px 1px",borderRadius:5,
                    border:`1px solid ${carbon===k?"#7aad6e":"#2d4028"}`,
                    background:carbon===k?"#7aad6e18":"transparent",
                    color:carbon===k?"#7aad6e":"#8a9080",fontSize:9,
                    fontWeight:carbon===k?700:400,cursor:"pointer"}}>{l}</button>
              ))}
            </div>
          </div>

          {/* Hub gate toggle */}
          <div style={{background:hub?"#162114":"#1a1a0e",
            border:`1px solid ${hub?"#7aad6e50":"#c8952a50"}`,
            borderRadius:8,padding:"10px 12px",marginBottom:12,cursor:"pointer"}}
            onClick={()=>setHub(!hub)}>
            <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
              <div style={{width:14,height:14,borderRadius:3,border:`2px solid #7aad6e`,
                background:hub?"#7aad6e":"transparent",flexShrink:0,marginTop:1,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                {hub&&<span style={{fontSize:9,color:"#0f1a0e",fontWeight:900,lineHeight:1}}>✓</span>}
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:hub?"#7aad6e":"#c8952a",marginBottom:3}}>
                  🏕 Hub Feasibility Gate
                </div>
                <div style={{fontSize:9,color:"#6a7a62",lineHeight:1.5}}>
                  {hub
                    ? `${S.hubUnits} units × $${S.hubADR}/nt × ${Math.round(S.hubOccupancy*100)}% occ · Gate confirmed`
                    : "OFF = stewardship-only. Phase 0 feasibility study required to unlock."}
                </div>
              </div>
            </div>
            {hub&&<div style={{marginTop:8,padding:"5px 8px",background:"#0f1a0e",borderRadius:4,
              fontSize:10,color:"#7aad6e",fontFamily:"'DM Mono',monospace"}}>
              Yr3: {fCD(S.hubUnits*S.hubADR*365*S.hubOccupancy)} gross + {fCD(S.hubProgramsCAD)} programs
            </div>}
          </div>

          {/* Phase toggles */}
          {Object.entries({p0:"Phase 0 — Alignment",p1a:"Phase 1A — Stewardship",p2:"Phase 2 — North Nbhds",p3:"Phase 3 — South Nbhds"}).map(([pid,pname])=>{
            const on=phases[pid]; const pc=phC[pid];
            return(
              <div key={pid} style={{marginBottom:8}}>
                <div onClick={()=>setPhases(p=>({...p,[pid]:!p[pid]}))}
                  style={{display:"flex",alignItems:"flex-start",gap:8,width:"100%",
                    padding:"8px 10px",borderRadius:7,border:`2px solid ${on?pc:"#2d4028"}`,
                    background:on?`${pc}12`:"#1c2a1a",cursor:"pointer"}}>
                  <div style={{width:14,height:14,borderRadius:3,border:`2px solid ${pc}`,
                    background:on?pc:"transparent",flexShrink:0,marginTop:1,
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {on&&<span style={{fontSize:9,color:"#0f1a0e",fontWeight:900,lineHeight:1}}>✓</span>}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,fontWeight:700,color:on?pc:"#c8b483"}}>{pname}</div>
                    <div style={{fontSize:9,color:"#6a7a62",lineHeight:1.4,marginTop:2}}>{phD[pid]}</div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Capex slider */}
          <div style={{marginTop:12,borderTop:"1px solid #2d4028",paddingTop:12}}>
            <Pv2Slider label="Capex Assumption" val={capexV} set={setCapexV}
              min={0} max={1} step={0.1} color="#9f6a4a"
              fmt={v=>v===0?"← Low":v===1?"High →":"Mid"}
              sub="Slides between Lo/Hi capex for all phases"/>
          </div>
          <button onClick={()=>setView("settings")}
            style={{width:"100%",marginTop:10,padding:"7px",borderRadius:6,
              border:"1px solid #4a8f9f40",background:"transparent",color:"#4a8f9f",
              cursor:"pointer",fontSize:11}}>⚙️ Edit all defaults →</button>
        </div>

        {/* ── CENTER ── */}
        <div>
          {/* KPI Row 1 */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:8}}>
            <Pv2Kpi label="Yr 3 Gross Revenue" value={anyRev?fCM(calc.totYr3,2):"—"} color="#c8952a" sub="All active phases · CAD"/>
            <Pv2Kpi label="Yr 3 NOI" value={anyRev?fCM(calc.noi,2):"—"} color="#7aad6e"
              sub={anyRev&&calc.totYr3>0?`${fPct(calc.noi/calc.totYr3)} blended margin`:""}/>
            <Pv2Kpi label="Total Dev Capex" value={anyRev||phases.p0?fCM(calc.totCap,1):"—"} color="#9f6a4a" sub={capexV===0?"Low estimate":capexV===1?"High estimate":"Mid estimate"}/>
          </div>
          {/* KPI Row 2 */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:12}}>
            <Pv2Kpi label="Dev Yield on Capex" value={calc.devYield?fPct(calc.devYield):"N/A"} color="#c8b483"
              sub={calc.payback?`${fYr(calc.payback)} payback`:""}/>
            <Pv2Kpi label="Lane A Annual Return" value={fCM(calc.laneARet,2)} color="#7aad6e"
              sub={`${fPct(S.laneAIRR)} on ${fCM(calc.laneA,1)} CAD`}/>
            <Pv2Kpi label="INAV (Contracted)" value={anyRev?fCM(calc.iNAVContracted,1):"—"} color="#4a8f9f"
              sub="6.5% cap rate · NAV-grade"/>
            <Pv2Kpi label="Mgmt Fee / yr" value={fCK(calc.mgmtFee)} color="#a09f6a"
              sub={`${fPct(S.mgmtFeePct)} on ${fCM(S.totalInvestCAD,1)}`}/>
          </div>

          {/* Capex breakdown */}
          <div style={{background:"#1c2a1a",border:"1px solid #2d4028",borderRadius:9,
            padding:"12px 14px",marginBottom:12}}>
            <div style={{fontSize:10,fontWeight:700,color:"#c8b483",marginBottom:10}}>
              📐 Phase Capex — {capexV===0?"Low":capexV===1?"High":"Mid"} Assumption (CAD)
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>
              {[
                {pid:"p0", lbl:"P0 Align", cap:calc.p0Cap, note:"Foundation"},
                {pid:"p1a",lbl:"P1A Stew.", cap:calc.p1aCap, note:hub?"incl. Hub":"Hub excl."},
                {pid:"p1b",lbl:"P1B Serv.", cap:calc.p1bCap, note:"Road+utilities"},
                {pid:"p2", lbl:"P2 North", cap:calc.p2Cap,  note:"68 lots"},
                {pid:"p3", lbl:"P3 South", cap:calc.p3Cap,  note:"65 lots"},
              ].map(({pid,lbl,cap,note})=>{
                const on = pid==="p0"?phases.p0 : pid==="p1b"?(phases.p2||phases.p3) : phases[pid];
                const pc = phC[pid]||"#c8952a";
                return(
                  <div key={pid} style={{background:on?"#162114":"#0f1a0e",
                    border:`1px solid ${on?"#2d4028":"#1a2418"}`,borderRadius:6,
                    padding:"8px 7px",opacity:on?1:0.35,textAlign:"center"}}>
                    <div style={{fontSize:9,color:pc,fontWeight:700,marginBottom:3}}>{lbl}</div>
                    <div style={{fontSize:12,fontWeight:800,color:"#c8b483",fontFamily:"'DM Mono',monospace"}}>
                      {on?fCD(cap):"—"}</div>
                    <div style={{fontSize:8,color:"#6a7a62",marginTop:2}}>{note}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stream table */}
          {anyRev && calc.rows.length>0 && (
            <div style={{background:"#1c2a1a",border:"1px solid #2d4028",borderRadius:9,
              padding:"11px 12px",marginBottom:12}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 68px 88px 78px",gap:4,
                padding:"0 6px 7px",borderBottom:"1px solid #2d4028"}}>
                {["Revenue Stream","Yr 1 (ramp)","Yr 3 Gross","Yr 3 NOI"].map(h=>(
                  <div key={h} style={{fontSize:8,color:"#6a7a62",textTransform:"uppercase",
                    letterSpacing:"0.08em",textAlign:h.startsWith("R")?"left":"right"}}>{h}</div>
                ))}
              </div>
              {["p1a","p2","p3"].map(pid=>{
                const rows=calc.rows.filter(r=>r.ph===pid);
                if(!rows.length) return null;
                const pc = phC[pid];
                const opP = pid==="p1a"?S.p1aOpPct:pid==="p2"?S.p2OpPct:S.p3OpPct;
                return(
                  <div key={pid} style={{marginBottom:8}}>
                    <div style={{fontSize:8,color:pc,fontWeight:700,letterSpacing:"0.1em",
                      textTransform:"uppercase",padding:"4px 6px 2px"}}>
                      {pid==="p1a"?"Phase 1A":pid==="p2"?"Phase 2":"Phase 3"}
                    </div>
                    {rows.map((r,i)=>{
                      const isLot = r.nm.includes("Lot Sales");
                      const noi3 = r.y3 * (isLot ? S.lotMargin : (1-opP));
                      return(
                        <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 68px 88px 78px",
                          gap:4,padding:"3px 6px",borderRadius:4,background:"#162114",
                          marginBottom:2,borderLeft:`3px solid ${pc}`}}>
                          <div style={{display:"flex",gap:4,alignItems:"center",overflow:"hidden"}}>
                            <span style={{fontSize:11,flexShrink:0}}>{r.ic}</span>
                            <span style={{fontSize:9,color:"#c8b483",overflow:"hidden",
                              textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.nm}</span>
                            {r.gate&&<span style={{fontSize:8,color:"#c8952a",
                              background:"#c8952a20",borderRadius:3,padding:"1px 4px",flexShrink:0}}>gate</span>}
                          </div>
                          <div style={{fontSize:10,fontFamily:"'DM Mono',monospace",textAlign:"right",
                            color:r.y1>0?"#c8b483":"#6a7a62"}}>{r.y1>0?fCD(r.y1):"—"}</div>
                          <div style={{fontSize:10,fontFamily:"'DM Mono',monospace",textAlign:"right",
                            color:r.y3>0?pc:"#6a7a62",fontWeight:r.y3>0?700:400}}>
                            {r.y3>0?fCD(r.y3):"—"}</div>
                          <div style={{fontSize:10,fontFamily:"'DM Mono',monospace",textAlign:"right",
                            color:r.y3>0?"#7aad6e":"#6a7a62"}}>{r.y3>0?fCD(noi3):"—"}</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              <div style={{display:"grid",gridTemplateColumns:"1fr 68px 88px 78px",gap:4,
                padding:"7px 6px 2px",borderTop:"1px solid #2d4028"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#c8b483"}}>Total (Active Phases)</div>
                <div style={{fontSize:11,fontWeight:800,fontFamily:"'DM Mono',monospace",
                  color:"#c8b483",textAlign:"right"}}>{fCD(calc.totYr1)}</div>
                <div style={{fontSize:11,fontWeight:800,fontFamily:"'DM Mono',monospace",
                  color:"#c8952a",textAlign:"right"}}>{fCD(calc.totYr3)}</div>
                <div style={{fontSize:11,fontWeight:800,fontFamily:"'DM Mono',monospace",
                  color:"#7aad6e",textAlign:"right"}}>{fCD(calc.noi)}</div>
              </div>
            </div>
          )}

          {/* INAV + Waterfall */}
          {anyRev && calc.surplus > 0 && (
            <div style={{background:"#1c2a1a",border:"1px solid #4a8f9f40",borderRadius:9,
              padding:"12px 14px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                {/* INAV */}
                <div>
                  <div style={{fontSize:9,color:"#4a8f9f",fontWeight:700,letterSpacing:"0.1em",
                    textTransform:"uppercase",marginBottom:8}}>INAV — Dual-Lens Reporting</div>
                  <div style={{marginBottom:8}}>
                    <div style={{fontSize:9,color:"#6a7a62",marginBottom:2}}>Base NAV (contracted rev @ 6.5% cap)</div>
                    <div style={{fontSize:17,fontWeight:800,color:"#4a8f9f",fontFamily:"'DM Mono',monospace"}}>{fCM(calc.iNAVContracted,1)}</div>
                  </div>
                  <div style={{marginBottom:8,paddingTop:6,borderTop:"1px solid #2d4028"}}>
                    <div style={{fontSize:9,color:"#6a7a62",marginBottom:2}}>+ INAV Uplift (uncontracted RCCS × 3×)</div>
                    <div style={{fontSize:14,fontWeight:700,color:"#7aad6e",fontFamily:"'DM Mono',monospace"}}>+{fCM(calc.iNAVUplift,1)}</div>
                    <div style={{fontSize:9,color:"#6a7a62",marginTop:2}}>Verified but unsold · INAV only, not NAV</div>
                  </div>
                  <div style={{paddingTop:6,borderTop:"1px solid #2d4028"}}>
                    <div style={{fontSize:9,color:"#4a8f9f",fontWeight:700}}>Total INAV</div>
                    <div style={{fontSize:21,fontWeight:900,color:"#4a8f9f",fontFamily:"'DM Mono',monospace"}}>
                      {fCM(calc.iNAVContracted+calc.iNAVUplift,1)}</div>
                    <div style={{fontSize:9,color:"#6a7a62",marginTop:2}}>Per RCCS v2.0i S1 dual-lens method · Illustrative</div>
                  </div>
                </div>
                {/* Waterfall */}
                <div>
                  <div style={{fontSize:9,color:"#7aad6e",fontWeight:700,letterSpacing:"0.1em",
                    textTransform:"uppercase",marginBottom:8}}>Covenantal Waterfall — RCCS v2.0i</div>
                  <div style={{fontSize:9,color:"#6a7a62",marginBottom:8}}>
                    Surplus over {fPct(S.laneAHurdle)} hurdle:{" "}
                    <span style={{color:"#c8952a",fontFamily:"'DM Mono',monospace",fontWeight:700}}>
                      {fCD(calc.surplus)}</span>
                  </div>
                  {[
                    {lbl:"CLT Reinvestment",v:calc.wfCLT,p:S.wfCLTPct,c:"#7aad6e",note:"Local compounding"},
                    {lbl:"Place Fund",v:calc.wfPlace,p:S.wfPlacePct,c:"#4a8f9f"},
                    {lbl:"PRT Governance",v:calc.wfPRT,p:S.wfPRTPct,c:"#c8952a"},
                    {lbl:"Investor Dist.",v:calc.wfInv,p:S.wfInvPct,c:"#a09f6a",note:"Lane A holders"},
                  ].map(w=>(
                    <div key={w.lbl} style={{display:"flex",justifyContent:"space-between",
                      alignItems:"center",marginBottom:5,padding:"3px 0",borderBottom:"1px solid #2d4028"}}>
                      <div style={{display:"flex",gap:6,alignItems:"center"}}>
                        <div style={{width:3,height:12,borderRadius:2,background:w.c,flexShrink:0}}/>
                        <div>
                          <span style={{fontSize:10,color:"#c8b483"}}>{w.lbl}</span>
                          {w.note&&<span style={{fontSize:9,color:"#6a7a62",marginLeft:5}}>{w.note}</span>}
                        </div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <span style={{fontSize:10,fontFamily:"'DM Mono',monospace",color:w.c,fontWeight:700}}>{fCD(w.v)}</span>
                        <span style={{fontSize:9,color:"#6a7a62",marginLeft:5}}>({fPct(w.p)})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!anyRev&&(
            <div style={{textAlign:"center",padding:"60px 20px",color:"#6a7a62"}}>
              <div style={{fontSize:32,marginBottom:10}}>☐</div>
              <div style={{fontSize:14,marginBottom:8,color:"#8a9080"}}>Activate phases in the left panel to run the model</div>
              <div style={{fontSize:11}}>Start with Phase 0 + Phase 1A for a stewardship-only view.</div>
            </div>
          )}
        </div>

        {/* ── RIGHT ── */}
        <div>
          <div style={{fontSize:9,color:"#6a7a62",letterSpacing:"0.12em",textTransform:"uppercase",
            marginBottom:12,fontWeight:600}}>Five Capitals — Live Scoring</div>
          {PV2_CAPS.map(cap=>(
            <Pv2CapBar key={cap.key} cap={cap}
              score={anyRev?calc.scores[cap.key]:S[`base${cap.key}`]}
              delta={anyRev?calc.deltas[cap.key]:0}/>
          ))}
          {anyRev&&(
            <div style={{background:"#1c2a1a",border:"1px solid #c8952a40",borderRadius:7,
              padding:"10px",marginTop:6,textAlign:"center"}}>
              <div style={{fontSize:8,color:"#c8952a",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:4}}>
                Five Capitals Composite
              </div>
              <div style={{fontSize:24,fontWeight:900,color:"#c8952a",fontFamily:"'DM Mono',monospace"}}>
                {calc.composite.toFixed(1)}<span style={{fontSize:12,fontWeight:400}}>/10</span>
              </div>
            </div>
          )}

          {/* Lane Architecture */}
          <div style={{marginTop:16}}>
            <div style={{fontSize:9,color:"#6a7a62",letterSpacing:"0.12em",textTransform:"uppercase",
              marginBottom:10,fontWeight:600}}>PRT Lane Architecture</div>
            {[
              { lane:"Lane A", icon:"🏘", color:"#9f6a4a", title:"Land + Development LP",
                items:[`${fCM(calc.laneA,1)} (${fPct(S.laneAPct)})`,`${fPct(S.laneAIRR)} IRR · ${fPct(S.laneAHurdle)} hurdle`,`${fCM(calc.laneARet,2)}/yr annual return`]},
              { lane:"Lane B", icon:"🌿", color:"#7aad6e", title:"RCCS Credit Rail",
                items:[`${fCM(calc.laneB,1)} (${fPct(S.laneBPct)})`,`AB TIER · Verra VCS adapters`,`10% community dividend (RCCS S1)`]},
              { lane:"Lane C", icon:"🌐", color:"#4a8f9f", title:"FuturVille Platform",
                items:[`${fCM(calc.laneC,1)} (${fPct(S.laneCPct)})`,`Village #1 design + governance IP`,"Angela's platform — Lane C asset"]},
            ].map(l=>(
              <div key={l.lane} style={{background:"#1c2a1a",border:`1px solid ${l.color}40`,
                borderLeft:`3px solid ${l.color}`,borderRadius:7,padding:"9px 11px",marginBottom:8}}>
                <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:6}}>
                  <span style={{fontSize:14}}>{l.icon}</span>
                  <div>
                    <div style={{fontSize:9,color:l.color,fontFamily:"'DM Mono',monospace",fontWeight:700}}>{l.lane}</div>
                    <div style={{fontSize:11,fontWeight:700,color:"#c8b483"}}>{l.title}</div>
                  </div>
                </div>
                {l.items.map((item,i)=>(
                  <div key={i} style={{display:"flex",gap:6,marginBottom:3}}>
                    <span style={{color:l.color,fontSize:10,flexShrink:0}}>›</span>
                    <span style={{fontSize:10,color:"#8a9080",lineHeight:1.4}}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* RCCS Formula */}
          <div style={{background:"#1c2a1a",border:"1px solid #2d4028",borderRadius:7,
            padding:"10px 12px",marginTop:4}}>
            <div style={{fontSize:9,color:"#7aad6e",fontWeight:700,letterSpacing:"0.1em",
              textTransform:"uppercase",marginBottom:6}}>RCCS Issuance Kernel — v2.0i S1</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#c8b483",
              background:"#0f1a0e",borderRadius:5,padding:"7px 10px",marginBottom:7}}>
              Q = ΔI × v<sup>α</sup> × a<sup>β</sup> × P × S × (1−U)
            </div>
            {[
              ["ΔI","Integrity Delta — verified improvement from baseline"],
              ["v / a","Velocity & Acceleration — rate + persistence of gain"],
              ["P","Permanence — conservation easement durability"],
              ["S","Stewardship — FPIC binary gate (cannot be partial)"],
              ["U","Uncertainty discount — scientific conservatism"],
            ].map(([sym,desc])=>(
              <div key={sym} style={{display:"flex",gap:7,marginBottom:4}}>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#c8952a",
                  fontWeight:700,minWidth:30,flexShrink:0}}>{sym}</span>
                <span style={{fontSize:9,color:"#6a7a62",lineHeight:1.5}}>{desc}</span>
              </div>
            ))}
          </div>

          <div style={{marginTop:10,padding:"9px 11px",background:"#1a1a0e",
            border:"1px solid #c8952a25",borderRadius:7}}>
            <div style={{fontSize:9,color:"#c8952a",fontWeight:700,marginBottom:3}}>⚠ Illustrative Model · CAD</div>
            <div style={{fontSize:9,color:"#6a7a62",lineHeight:1.6}}>
              Planning purposes only. Not investment advice. Carbon prices: ClearBlue Markets/ICAP Nov–Dec 2025.
              Glamping ADR: Hipcamp AB 2025/26. Lots: Vulcan MLS® 2024–25. Energy: Epcor AB 2025.
              Phase 0 Feasibility Study produces verified numbers.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
export default function App() {
  const [tab, setTab] = useState("diagnosis");
  const [openFail, setOpenFail] = useState(null);
  const [activeCluster, setActiveCluster] = useState("north");
  const [activeCap, setActiveCap] = useState(0);
  const [tooltip, setTooltip] = useState(null);
  const [compareMode, setCompareMode] = useState("housing");

  const tabs = [
    { id: "diagnosis", label: "🔴 Diagnosis" },
    { id: "model", label: "🌱 New Model" },
    { id: "landuse", label: "🗺️ Land Use" },
    { id: "capitals", label: "⚖️ Five Capitals" },
    { id: "capital_stack", label: "💰 PRT Capital" },
    { id: "phasing", label: "📅 Phasing" },
    { id: "finance", label: "📊 Finance Model" },
    { id: "nextsteps", label: "🚀 Next Steps" },
  ];

  const clusterData = CLUSTERS.find(c => c.id === activeCluster) || CLUSTERS[0];

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* HERO */}
        <div className="hero">
          <div className="hero-tag">PRT · REGEN-MODE · AUTHOR-MODE-DAVE</div>
          <h1 className="hero-title">
            Prairie Vista <span>Reimagined</span>
          </h1>
          <div className="hero-title" style={{fontSize: 'clamp(16px,2.5vw,22px)', fontWeight:400, fontStyle:'italic', color:'#d4b483', marginTop:4}}>
            From Extractive Subdivision to Regenerative Blended Community
          </div>
          <p className="hero-sub" style={{marginTop:16}}>
            A full diagnostic of why the 2008 ASP fails — and a complete regenerative redesign for Angela Faye's 63 acres in Vulcan, Alberta. Built on PRT canon, Story of Place, Five Capitals, and RCCS architecture.
          </p>
          <div className="hero-meta">
            <span className="meta-pill">63 acres · Vulcan, AB</span>
            <span className="meta-pill">ASP Bylaw 1358-08</span>
            <span className="meta-pill">Owner: Angela Faye</span>
            <span className="meta-pill">Framework: PRT / RDC / RCCS</span>
            <span className="meta-pill">Feb 2026</span>
          </div>
        </div>

        {/* NAV */}
        <div className="nav-bar">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`nav-btn${tab === t.id ? ' active' : ''}`}
              onClick={() => setTab(t.id)}
            >{t.label}</button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="content">

          {/* === DIAGNOSIS === */}
          {tab === "diagnosis" && (
            <div>
              <div style={{background:"#1c2a1a",border:"1px solid #3a5a2a",borderLeft:"4px solid #c8952a",borderRadius:10,padding:"20px 24px",marginBottom:28}}>
                <div style={{fontSize:11,fontFamily:"DM Mono,monospace",color:"#c8952a",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:8}}>Diagnostic Overview</div>
                <p style={{fontSize:14,color:"#c8b483",lineHeight:1.85,margin:0}}>
                  The 2008 Area Structure Plan (Bylaw 1358-08) was written for a different era and a different ambition.
                  It segregates housing by type and income, converts productive prairie into decorative lawn, and generates wealth exactly once — on closing day — then exits.
                  After 17 years of dormancy, the DC rezoning (Bylaw 1470-18) has already signalled that the Town expects something different.
                  The eight structural failures documented below are not accidents of planning. They are the predictable outputs of an extraction-first model applied to land that deserves regeneration.
                  Every one of them is correctable. The Finance Model tab shows the numbers.
                </p>
              </div>

              <div className="section-label">DIAGNOSTIC REPORT</div>
              <div className="section-title">Eight Fatal Design Flaws</div>
              <p className="section-intro">
                Every one of these failures is a design choice, not an accident. The 2008 ASP was built to maximize lot yield and minimize developer risk — not to create a thriving community. Here's what's broken and why it matters.
              </p>

              {FAILURES.map((f, i) => (
                <div
                  key={f.id}
                  className="fail-item"
                  onClick={() => setOpenFail(openFail === i ? null : i)}
                  style={{cursor:'pointer'}}
                >
                  <div className="fail-num">{f.id}</div>
                  <div className="fail-body" style={{flex:1}}>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                    {openFail === i && (
                      <div style={{marginTop:10, padding:'12px', background:'rgba(74,143,63,0.08)', border:'1px solid rgba(74,143,63,0.2)', borderRadius:6}}>
                        <span className="fix-tag">REGENERATIVE FIX</span>
                        <p style={{marginTop:8, fontSize:13, color:'#9fd48f', lineHeight:1.5}}>{f.fix}</p>
                      </div>
                    )}
                    {openFail !== i && <span className="fix-tag" style={{marginTop:8}}>click to see fix →</span>}
                  </div>
                  <div style={{color: openFail === i ? '#9fd48f' : '#3d5430', fontSize:18, alignSelf:'center'}}>
                    {openFail === i ? '▾' : '▸'}
                  </div>
                </div>
              ))}

              <div className="manifesto" style={{marginTop:32}}>
                "A subdivision that sells lots and exits is not community development. It is land liquidation with landscaping. The only question that matters is not 'how many lots can we fit?' but 'what is this place trying to become — and how do we serve that becoming?'"
                <div style={{fontSize:13, color:'#7a8a72', fontStyle:'normal', marginTop:8}}>— PRT Canon, Story of Place Methodology</div>
              </div>

              <hr className="divider" />

              <div className="section-label">DIRECT COMPARISON</div>
              <div className="section-title">Old Model vs. Regenerative Model</div>

              <div style={{display:'flex', gap:8, marginBottom:16, flexWrap:'wrap'}}>
                {["housing","commons","capital","governance","energy"].map(m => (
                  <button
                    key={m}
                    onClick={() => setCompareMode(m)}
                    style={{
                      padding:'6px 14px', borderRadius:4,
                      background: compareMode===m ? '#c8952a' : '#1c2a1a',
                      border: `1px solid ${compareMode===m ? '#c8952a' : '#2d4028'}`,
                      color: compareMode===m ? '#0f1a0e' : '#8a9080',
                      fontSize:12, cursor:'pointer', fontFamily:'DM Mono', textTransform:'uppercase', letterSpacing:1
                    }}
                  >{m}</button>
                ))}
              </div>

              {compareMode === "housing" && (
                <>
                  <div className="compare-header">
                    <div className="compare-label-bad">⛔ 2008 ASP — Segregated</div>
                    <div className="compare-label-good">✅ Regenerative Model — Blended</div>
                  </div>
                  {[
                    ["151 single-family lots isolated in one zone", "Every cluster has all types: market, attainable, senior, live-work"],
                    ["13 manufactured homes ghettoized in their own block", "No 'manufactured home zone' — dignified homes woven into mixed clusters"],
                    ["Row housing separated from single family by distance", "Row/townhouse form used in every cluster as transition type"],
                    ["Seniors in their own multi-unit building — separated by design", "Senior-accessible units in every cluster; intergenerational by default"],
                    ["No live-work anywhere — 300 homes, zero enterprise", "15% live-work in every cluster + dedicated Village Heart"],
                    ["No shared equity or community ownership path", "10% shared equity in every cluster; LRLT community membership"],
                  ].map(([bad, good], i) => (
                    <div key={i} className="compare-row">
                      <div className="compare-cell-bad">{bad}</div>
                      <div className="compare-cell-good">{good}</div>
                    </div>
                  ))}
                </>
              )}
              {compareMode === "commons" && (
                <>
                  <div className="compare-header">
                    <div className="compare-label-bad">⛔ 2008 — Dead Turf</div>
                    <div className="compare-label-good">✅ Regenerative — Productive Commons</div>
                  </div>
                  {[
                    ["3.38 ha of passive park space — mow, maintain, forget", "Productive commons: food forests, orchard, gardens, prairie restoration"],
                    ["Parks as leftover grease between lots — no function", "Each commons generates RCCS credits — measured, verified, monetized"],
                    ["Stormwater = detention ponds hidden in low spots", "Stormwater bioswale system = wetland commons, habitat, food production"],
                    ["4 linear park corridors with no ecological role", "Biodiversity ribbons: pollinator corridors, native prairie restoration"],
                    ["No community food production anywhere on site", "Community garden plots allocated to every household + food forest"],
                    ["Open space cost centres (maintenance budget)", "Productive landscape generates income: credits, food, tourism, programs"],
                  ].map(([bad, good], i) => (
                    <div key={i} className="compare-row">
                      <div className="compare-cell-bad">{bad}</div>
                      <div className="compare-cell-good">{good}</div>
                    </div>
                  ))}
                </>
              )}
              {compareMode === "capital" && (
                <>
                  <div className="compare-header">
                    <div className="compare-label-bad">⛔ 2008 — Extract & Exit</div>
                    <div className="compare-label-good">✅ Regenerative — Perpetual NOI</div>
                  </div>
                  {[
                    ["Revenue = lot sales only. One-time. Done.", "Revenue = lot/unit sales + RCCS credits + energy + food + programs + enterprise"],
                    ["Developer exits. Community owns nothing collectively.", "LRLT holds commons. Community equity compounds over generations."],
                    ["No impact measurement. No reporting. No credits.", "Five Capitals baseline → RCCS credits → INAV → PRT Lane B revenue"],
                    ["No access to PRT, CDFIs, grants, or catalytic capital", "PRT Lane A/B/C + provincial housing grants + CMHC + catalytic capital"],
                    ["All value captured at sale. Nothing retained.", "10% stewardship set-aside on all credit sales flows back to LRLT"],
                    ["No community bonds or shared financial instruments", "Community bond program: residents co-invest in shared infrastructure"],
                  ].map(([bad, good], i) => (
                    <div key={i} className="compare-row">
                      <div className="compare-cell-bad">{bad}</div>
                      <div className="compare-cell-good">{good}</div>
                    </div>
                  ))}
                </>
              )}
              {compareMode === "governance" && (
                <>
                  <div className="compare-header">
                    <div className="compare-label-bad">⛔ 2008 — No Governance</div>
                    <div className="compare-label-good">✅ Regenerative — LRLT + Covenants</div>
                  </div>
                  {[
                    ["Homeowners Association with fence bylaws. That's it.", "Prairie Vista LRLT with binding stewardship covenants on all commons"],
                    ["No story of place. No ecological baseline. No cultural mapping.", "Story of Place process: watershed, ecology, history, community co-discovery"],
                    ["Town of Vulcan reviews permits case-by-case. No vision.", "ASP amendment creates regenerative DC text with community vision baked in"],
                    ["No community co-governance structure", "LRLT community board: residents, Angela, Town, ecological stewards"],
                    ["No intergenerational planning horizon", "Multi-generational covenants: 50-year stewardship commitments"],
                    ["No dispute resolution or transition protocol", "Readiness gate architecture: capital release tied to community + ecological performance"],
                  ].map(([bad, good], i) => (
                    <div key={i} className="compare-row">
                      <div className="compare-cell-bad">{bad}</div>
                      <div className="compare-cell-good">{good}</div>
                    </div>
                  ))}
                </>
              )}
              {compareMode === "energy" && (
                <>
                  <div className="compare-header">
                    <div className="compare-label-bad">⛔ 2008 — One Dead Plan</div>
                    <div className="compare-label-good">✅ Regenerative — Community Energy</div>
                  </div>
                  {[
                    ["O'Keefe Energy Consulting — district heating plan — now defunct", "Community energy microgrid: solar + ground-source heat + battery storage"],
                    ["Energy as a utility — residents as ratepayers", "Energy as a community-owned asset — residents as shareholders"],
                    ["No solar anywhere in the plan", "Solar commons array: south cluster + rooftop program for all homes"],
                    ["No stormwater reuse system (mentioned but never designed)", "Bioswale system → stormwater capture → irrigation reuse for all commons"],
                    ["No RCCS Built Capital credits from energy", "Community energy generates RCCS Built Capital Credits (BCUs) — monetized"],
                    ["No resilience against utility price shocks", "Microgrid island capability: community energy independence in outages"],
                  ].map(([bad, good], i) => (
                    <div key={i} className="compare-row">
                      <div className="compare-cell-bad">{bad}</div>
                      <div className="compare-cell-good">{good}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* === NEW MODEL === */}
          {tab === "model" && (
            <div>
              <div className="section-label">REGENERATIVE REDESIGN</div>
              <div className="section-title">Prairie Vista — A Blended Living Community</div>
              <p className="section-intro">
                The new model replaces segregated lot types with blended neighborhood clusters, dead parks with productive commons, and a one-time extraction model with a perpetual stewardship economy. Every cluster contains all housing types. Every commons generates RCCS value. The Village Heart creates a local economy that keeps money circulating in Vulcan.
              </p>

              <div className="stat-grid">
                <div className="stat-card">
                  <div className="stat-num">280</div>
                  <div className="stat-label">Blended Units Across 4 Clusters</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">5</div>
                  <div className="stat-label">Distinct Neighborhood Clusters</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">12+</div>
                  <div className="stat-label">Acres Productive Commons</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">5</div>
                  <div className="stat-label">RCCS Capital Credit Classes</div>
                </div>
              </div>

              <div className="manifesto">
                "The old model asks: how many lots fit? The new model asks: what does this place need to thrive — and how do we build a community worthy of that question?"
              </div>

              <hr className="divider" />

              <div className="section-label">NEIGHBORHOOD CLUSTERS</div>
              <div style={{marginBottom:24}}>
                <div style={{display:'flex', gap:8, flexWrap:'wrap', marginBottom:16}}>
                  {CLUSTERS.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCluster(c.id)}
                      style={{
                        padding:'8px 16px', borderRadius:6,
                        background: activeCluster === c.id ? c.color : '#1c2a1a',
                        border: `1px solid ${activeCluster === c.id ? c.color : '#2d4028'}`,
                        color: activeCluster === c.id ? '#0f1a0e' : '#8a9080',
                        fontSize:12, cursor:'pointer', fontWeight: activeCluster===c.id ? 700 : 400,
                        transition:'all 0.2s'
                      }}
                    >{c.name}</button>
                  ))}
                </div>

                <div className="card card-green" style={{padding:24}}>
                  <div style={{display:'flex', gap:12, alignItems:'baseline', marginBottom:4}}>
                    <div style={{width:12, height:12, borderRadius:2, background:clusterData.color, flexShrink:0, marginTop:4}}/>
                    <div>
                      <div style={{fontFamily:'Playfair Display, serif', fontSize:20, fontWeight:700, color:'#f0ede6'}}>{clusterData.name}</div>
                      <div style={{fontSize:13, color:'#7a8a72', marginTop:2}}>{clusterData.sub}</div>
                    </div>
                    {clusterData.units > 0 && (
                      <div style={{marginLeft:'auto', textAlign:'right'}}>
                        <div style={{fontFamily:'Playfair Display, serif', fontSize:28, fontWeight:700, color:clusterData.color}}>{clusterData.units}</div>
                        <div style={{fontSize:11, color:'#7a8a72'}}>units</div>
                      </div>
                    )}
                  </div>

                  {clusterData.mix.length > 0 && (
                    <>
                      <div style={{marginTop:16, marginBottom:8}}>
                        <div style={{fontSize:11, color:'#7a8a72', marginBottom:6, letterSpacing:1, textTransform:'uppercase', fontFamily:'DM Mono'}}>Housing Mix (Blended — Not Segregated)</div>
                        <div className="housing-mix">
                          {clusterData.mix.map(m => (
                            <div
                              key={m.label}
                              className="housing-seg"
                              style={{flex: m.pct, background: m.color, height:12}}
                              title={`${m.label}: ${m.pct}%`}
                            />
                          ))}
                        </div>
                        <div className="mix-legend" style={{marginTop:8}}>
                          {clusterData.mix.map(m => (
                            <div key={m.label} className="mix-item">
                              <div className="mix-dot" style={{background:m.color}}/>
                              {m.label} ({m.pct}%)
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <div style={{marginTop:16, padding:'12px 16px', background:'rgba(74,143,63,0.08)', border:'1px solid rgba(74,143,63,0.2)', borderRadius:6}}>
                    <div style={{fontSize:11, color:'#7aad6e', letterSpacing:1, textTransform:'uppercase', fontFamily:'DM Mono', marginBottom:6}}>Shared Commons</div>
                    <div style={{fontSize:14, color:'#c8952a', fontWeight:600}}>{clusterData.commons}</div>
                  </div>

                  <div style={{marginTop:12, fontSize:13, color:'#8a9080', lineHeight:1.7}}>{clusterData.notes}</div>
                </div>
              </div>

              <hr className="divider" />

              <div className="section-label">PRODUCTIVE COMMONS SYSTEM</div>
              <div className="section-title" style={{fontSize:22}}>What Replaces the Dead Parks</div>

              <div className="grid-2" style={{marginTop:16}}>
                {[
                  { icon:"🌾", name:"Prairie Restoration Corridor", desc:"Native shortgrass prairie and forb restoration along all linear corridors. Pollinator habitat. Carbon sequestration. RCCS NCUs from day one. Connects to golf course green buffer in southwest." },
                  { icon:"🌲", name:"Community Food Forest + Orchard", desc:"1.0 ha food forest with fruit trees, nut trees, berry shrubs, and understory edibles. Community-managed. Produces food income and RCCS Human Capital Credits (HCUs)." },
                  { icon:"💧", name:"Wetland Bioswale Commons", desc:"Stormwater detention ponds redesigned as productive wetland commons. Native plantings, habitat, trails, community gardens adjacent. Generates RCCS NCUs and BCUs from water retention data." },
                  { icon:"☀️", name:"Solar Commons Array", desc:"Community-owned solar array on south cluster and rooftop program for all units. Residents are shareholders, not ratepayers. RCCS Built Capital Credits sold to offset grid costs." },
                  { icon:"🌱", name:"Community Garden Plots", desc:"Individual allotment garden plots allocated to every household. Shared tools, seed library, composting. Adjacent to food forest. Programs integrated with Regenity education curriculum." },
                  { icon:"🤝", name:"Village Heart Commons", desc:"The economic heart: maker hub, food hub, co-working, FuturVille accelerator, health node, community market. Serves all of Vulcan — not just Prairie Vista. Generates RCCS Social Capital Credits." },
                ].map((item, i) => (
                  <div key={i} className="card" style={{display:'flex', gap:14, alignItems:'flex-start'}}>
                    <div style={{fontSize:28, flexShrink:0, marginTop:2}}>{item.icon}</div>
                    <div>
                      <div style={{fontWeight:700, fontSize:14, color:'#f0ede6', marginBottom:4}}>{item.name}</div>
                      <div style={{fontSize:13, color:'#7a8a72', lineHeight:1.5}}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === LAND USE MAP === */}
          {tab === "landuse" && (
            <div>
              <div className="section-label">SPATIAL REDESIGN</div>
              <div className="section-title">Regenerative Land Use — Concept Map</div>
              <p className="section-intro">
                An interactive schematic of the new land use vision. Each colored zone represents a distinct cluster or commons type. Hover any cell to see its identity. This replaces the monotonous yellow sea of single-family lots with a living, heterogeneous community fabric.
              </p>

              <div style={{background:'#162114', border:'1px solid #2d4028', borderRadius:12, padding:20, marginBottom:20}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                  <div>
                    <div style={{fontSize:11, color:'#c8952a', letterSpacing:2, fontFamily:'DM Mono', textTransform:'uppercase'}}>Concept Schematic — 63 Acres</div>
                    <div style={{fontSize:12, color:'#7a8a72', marginTop:2}}>10×6 grid representation · North ↑ (Allen Subdivision) · South ↓ (1st Avenue South)</div>
                  </div>
                  <div style={{fontSize:11, color:'#4a8f3f', fontFamily:'DM Mono'}}>hover cells →</div>
                </div>

                <div
                  style={{
                    display:'grid',
                    gridTemplateColumns:'repeat(10, 1fr)',
                    gridTemplateRows:'repeat(6, 1fr)',
                    gap:3,
                    height:260,
                    position:'relative'
                  }}
                  onMouseLeave={() => setTooltip(null)}
                >
                  {ZONE_MAP.map((zone, i) => (
                    <div
                      key={i}
                      style={{
                        background: ZONE_COLORS[zone] || '#2d4028',
                        borderRadius:3,
                        cursor:'pointer',
                        opacity: zone === 'road' ? 0.3 : 0.85,
                        transition:'transform 0.1s, opacity 0.1s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.zIndex = '10';
                        setTooltip({
                          x: e.clientX + 12,
                          y: e.clientY + 12,
                          zone: zone,
                          label: ZONE_LABELS[zone]
                        });
                      }}
                      onMouseMove={(e) => {
                        setTooltip(prev => prev ? {...prev, x: e.clientX+12, y: e.clientY+12} : null);
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = zone==='road'?'0.3':'0.85';
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.zIndex = 'auto';
                      }}
                    />
                  ))}
                </div>

                <div style={{display:'flex', flexWrap:'wrap', gap:12, marginTop:16}}>
                  {Object.entries(ZONE_LABELS).filter(([k]) => k !== 'road').map(([key, label]) => (
                    <div key={key} style={{display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#8a9080'}}>
                      <div style={{width:12, height:12, borderRadius:2, background: ZONE_COLORS[key]}}/>
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid-2">
                <div className="card card-red">
                  <div style={{fontFamily:'DM Mono', fontSize:11, color:'#e74c3c', letterSpacing:2, textTransform:'uppercase', marginBottom:12}}>2008 ASP — Land Use</div>
                  {[
                    ["Single Family Residential", "151 lots / 10.67 ha"],
                    ["Row/Townhouse", "±2.9 ha"],
                    ["Multi-Unit/Seniors", "±1.4 ha"],
                    ["Manufactured Homes", "13 lots / 0.66 ha"],
                    ["Open Space (passive)", "±3.38 ha"],
                    ["Roads & Lanes", "±5.84 ha"],
                    ["Golf Course Buffer", "SW corner"],
                  ].map(([label, val]) => (
                    <div key={label} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(192,57,43,0.1)', fontSize:13}}>
                      <span style={{color:'#c4a090'}}>{label}</span>
                      <span style={{color:'#8a7070', fontFamily:'DM Mono', fontSize:12}}>{val}</span>
                    </div>
                  ))}
                  <div style={{marginTop:12, padding:'10px', background:'rgba(192,57,43,0.08)', borderRadius:6, fontSize:12, color:'#e74c3c'}}>
                    ⚠ All types segregated. No blending. No productive commons. No LRLT.
                  </div>
                </div>

                <div className="card card-green">
                  <div style={{fontFamily:'DM Mono', fontSize:11, color:'#9fd48f', letterSpacing:2, textTransform:'uppercase', marginBottom:12}}>Regenerative Model — Land Use</div>
                  {[
                    ["North Commons Cluster (blended)", "72 units / ~5 ha"],
                    ["Golf Edge Cluster (blended)", "68 units / ~5 ha"],
                    ["East Stewardship Cluster (blended)", "65 units / ~5 ha"],
                    ["South Entry Cluster (blended)", "75 units / ~5 ha"],
                    ["Village Heart District", "~1.2 ha"],
                    ["Productive Commons (all types)", "~12 acres total"],
                    ["Community Energy + Infrastructure", "~2 ha"],
                  ].map(([label, val]) => (
                    <div key={label} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(74,143,63,0.1)', fontSize:13}}>
                      <span style={{color:'#b0d4a0'}}>{label}</span>
                      <span style={{color:'#7a9070', fontFamily:'DM Mono', fontSize:12}}>{val}</span>
                    </div>
                  ))}
                  <div style={{marginTop:12, padding:'10px', background:'rgba(74,143,63,0.08)', borderRadius:6, fontSize:12, color:'#9fd48f'}}>
                    ✅ All clusters blended. Commons productive. LRLT holds all open space.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* === FIVE CAPITALS === */}
          {tab === "capitals" && (
            <div>
              <div className="section-label">FIVE CAPITALS ASSESSMENT</div>
              <div className="section-title">Old Model vs. Regenerative Model</div>
              <p className="section-intro">
                The Five Capitals framework — Natural, Human, Social, Built, and Financial — is how PRT and RCCS measure the whole health of a place. Click any capital to see the scoring rationale and what the regenerative model changes.
              </p>

              <div className="five-cap">
                {CAPITALS.map((cap, i) => (
                  <div
                    key={i}
                    className={`cap-card${activeCap === i ? ' active' : ''}`}
                    onClick={() => setActiveCap(i)}
                  >
                    <div className="cap-icon">{cap.icon}</div>
                    <div className="cap-name">{cap.name}</div>
                    <div className="cap-score" style={{color: '#e74c3c'}}>{cap.old}/100</div>
                    <div style={{fontSize:10, color:'#4a5a42', fontFamily:'DM Mono'}}>ASP 2008</div>
                    <div className="cap-score" style={{color: '#7aad6e', marginTop:8}}>{cap.new}/100</div>
                    <div style={{fontSize:10, color:'#4a8f3f', fontFamily:'DM Mono'}}>REGEN MODEL</div>
                  </div>
                ))}
              </div>

              <div className="card card-gold" style={{padding:24, marginBottom:24}}>
                <div style={{display:'flex', gap:16, alignItems:'flex-start'}}>
                  <div style={{fontSize:36}}>{CAPITALS[activeCap].icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:'Playfair Display, serif', fontSize:20, fontWeight:700, color:'#f0ede6', marginBottom:4}}>
                      {CAPITALS[activeCap].name} Capital
                    </div>
                    <div style={{display:'flex', gap:20, marginBottom:12}}>
                      <div>
                        <span style={{fontSize:11, color:'#7a8a72', fontFamily:'DM Mono'}}>ASP 2008: </span>
                        <span style={{fontSize:16, fontWeight:700, color:'#e74c3c', fontFamily:'DM Mono'}}>{CAPITALS[activeCap].old}/100</span>
                      </div>
                      <div>
                        <span style={{fontSize:11, color:'#7a8a72', fontFamily:'DM Mono'}}>REGEN MODEL: </span>
                        <span style={{fontSize:16, fontWeight:700, color:'#7aad6e', fontFamily:'DM Mono'}}>{CAPITALS[activeCap].new}/100</span>
                      </div>
                      <div>
                        <span style={{fontSize:11, color:'#7a8a72', fontFamily:'DM Mono'}}>GAIN: </span>
                        <span style={{fontSize:16, fontWeight:700, color:'#c8952a', fontFamily:'DM Mono'}}>+{CAPITALS[activeCap].new - CAPITALS[activeCap].old}</span>
                      </div>
                    </div>
                    <div style={{fontSize:14, color:'#8a9080', lineHeight:1.7}}>{CAPITALS[activeCap].desc}</div>
                  </div>
                </div>
              </div>

              <div className="section-label" style={{marginTop:32}}>FIVE CAPITALS SCORE COMPARISON</div>
              <div style={{background:'#1c2a1a', border:'1px solid #2d4028', borderRadius:10, padding:20}}>
                <div style={{display:'flex', gap:16, marginBottom:16}}>
                  <div style={{display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#8a9080'}}>
                    <div style={{width:16, height:8, borderRadius:2, background:'rgba(192,57,43,0.5)'}}/>
                    2008 ASP Score
                  </div>
                  <div style={{display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#8a9080'}}>
                    <div style={{width:16, height:8, borderRadius:2, background:'rgba(74,143,63,0.7)'}}/>
                    Regenerative Model Score
                  </div>
                </div>
                {CAPITALS.map((cap, i) => (
                  <div key={i} style={{marginBottom:16}}>
                    <div style={{display:'flex', justifyContent:'space-between', marginBottom:4}}>
                      <div style={{fontSize:13, color: activeCap===i ? '#c8952a' : '#8a9080', fontWeight: activeCap===i ? 600 : 400}}>
                        {cap.icon} {cap.name}
                      </div>
                      <div style={{fontSize:12, fontFamily:'DM Mono', color:'#c8952a'}}>+{cap.new - cap.old} pts</div>
                    </div>
                    <div style={{position:'relative', height:12, background:'#162114', borderRadius:4, overflow:'hidden'}}>
                      <div style={{
                        position:'absolute', left:0, top:0, height:'100%',
                        width: `${cap.old}%`,
                        background:'rgba(192,57,43,0.5)',
                        borderRadius:4,
                        transition:'width 0.8s'
                      }}/>
                      <div style={{
                        position:'absolute', left:0, top:0, height:'100%',
                        width: `${cap.new}%`,
                        background:'rgba(74,143,63,0.35)',
                        borderRadius:4,
                        transition:'width 0.8s'
                      }}/>
                    </div>
                  </div>
                ))}
                <div style={{
                  marginTop:20, padding:'16px', 
                  background:'rgba(200,149,42,0.08)', 
                  border:'1px solid rgba(200,149,42,0.3)',
                  borderRadius:8,
                  display:'flex', justifyContent:'space-between', alignItems:'center'
                }}>
                  <div>
                    <div style={{fontSize:11, color:'#c8952a', fontFamily:'DM Mono', letterSpacing:2, textTransform:'uppercase'}}>Total Five Capitals Score</div>
                    <div style={{fontSize:12, color:'#7a8a72', marginTop:2}}>Average across all five capitals</div>
                  </div>
                  <div style={{display:'flex', gap:24}}>
                    <div style={{textAlign:'center'}}>
                      <div style={{fontFamily:'Playfair Display, serif', fontSize:28, fontWeight:700, color:'#e74c3c'}}>
                        {Math.round(CAPITALS.reduce((a,c)=>a+c.old,0)/5)}/100
                      </div>
                      <div style={{fontSize:11, color:'#7a8a72', fontFamily:'DM Mono'}}>2008 ASP</div>
                    </div>
                    <div style={{textAlign:'center'}}>
                      <div style={{fontFamily:'Playfair Display, serif', fontSize:28, fontWeight:700, color:'#7aad6e'}}>
                        {Math.round(CAPITALS.reduce((a,c)=>a+c.new,0)/5)}/100
                      </div>
                      <div style={{fontSize:11, color:'#7a8a72', fontFamily:'DM Mono'}}>REGEN MODEL</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* === PRT CAPITAL === */}
          {tab === "capital_stack" && (
            <div>
              <div className="section-label">CAPITAL ARCHITECTURE</div>
              <div className="section-title">PRT Integration — Prairie Vista</div>
              <p className="section-intro">
                Prairie Vista is a natural Lane A project in the PRT architecture — a regenerative real asset generating RCCS credits (Lane B) while Angela's FuturVille platform represents a Lane C enabler. Here is how the capital stack assembles.
              </p>

              <div className="manifesto">
                "Stewardship is not a cost line. When you can measure, verify, and own the upside, regeneration becomes a superior alpha strategy — one that compounds value precisely by improving the conditions that make all other portfolios possible."
                <div style={{fontSize:13, color:'#7a8a72', fontStyle:'normal', marginTop:8}}>— PRT Intro v1.87</div>
              </div>

              {[
                {
                  lane: "A", name: "Lane A — Regenerative Real Assets",
                  badge_bg: "#2d4a20", badge_color: "#7aad6e",
                  desc: "Prairie Vista's land and built assets enter the PRT Lane A structure. Land held in the Prairie Vista LRLT with binding covenants. Operating assets (housing, Village Heart, energy, food hub) in SPVs under regenerative charters. NAV grows as the place regenerates.",
                  target: "$8M–$15M SPV (illustrative)", irr: "12–20%+",
                  items: ["Prairie Vista LRLT", "Housing SPV (280 units)", "Village Heart SPV", "Community Energy SPV", "Food Commons SPV"]
                },
                {
                  lane: "B", name: "Lane B — RCCS Credit Rail",
                  badge_bg: "#1a3a4a", badge_color: "#6b9dd4",
                  desc: "RCCS baselines established at Phase 0. As prairie is restored, bioswales built, food produced, energy generated, and community programs run — RCCS credits are issued across all Five Capitals. Credits sold to compliance buyers, local anchors (Town of Vulcan, Lethbridge Health), and PRT's market lane.",
                  target: "Credit-linked catalytic capital (illustrative)", irr: "6–8%+ from credit NOI",
                  items: ["NCU: Prairie restoration", "NCU: Wetland bioswale", "BCU: Solar commons", "BCU: Stormwater reuse", "HCU: Food production", "SCU: Village Heart programs"]
                },
                {
                  lane: "C", name: "Lane C — FuturVille as Enabler Platform",
                  badge_bg: "#3a2a10", badge_color: "#c8952a",
                  desc: "Angela's FuturVille — '1M property owners, 2,000 villages of the future by 2028' — is a Lane C enabling platform in the PRT architecture. Prairie Vista is FuturVille's first proof-of-concept. Success here generates IP, curriculum, playbooks, and replicable models that serve the broader PRT portfolio globally.",
                  target: "IP + royalties + platform licensing (illustrative)", irr: "8%–20%+ (platform scale)",
                  items: ["FuturVille Accelerator (on-site)", "Place-Based Dev Curriculum", "Regenity integration", "Life AI Future City Portal", "Replication playbook"]
                },
              ].map((lane) => (
                <div key={lane.lane} className="prt-lane" style={{marginBottom:16}}>
                  <div className="lane-header">
                    <div className="lane-badge" style={{background: lane.badge_bg, color: lane.badge_color, border:`1px solid ${lane.badge_color}33`}}>
                      {lane.lane}
                    </div>
                    <div>
                      <div className="lane-name">{lane.name}</div>
                      <div style={{fontSize:12, color:'#7a8a72', fontFamily:'DM Mono'}}>
                        Target: {lane.target} · IRR: {lane.irr}
                      </div>
                    </div>
                    <div style={{marginLeft:'auto', padding:'4px 10px', borderRadius:4, background: `${lane.badge_color}20`, border:`1px solid ${lane.badge_color}40`, fontSize:11, color: lane.badge_color, fontFamily:'DM Mono'}}>
                      LANE {lane.lane}
                    </div>
                  </div>
                  <div className="lane-desc">{lane.desc}</div>
                  <div className="lane-items">
                    {lane.items.map(item => (
                      <div key={item} className="lane-item" style={{background:`${lane.badge_color}12`, border:`1px solid ${lane.badge_color}30`, color: lane.badge_color}}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <hr className="divider" />

              <div className="section-label">ADDITIONAL CAPITAL SOURCES</div>
              <div className="grid-2" style={{marginTop:16}}>
                {[
                  { icon:"🏛️", label:"Provincial Housing Programs", desc:"CMHC Affordable Housing programs, Alberta Attainable Homes grants, and municipal PPP with Town of Vulcan for infrastructure cost-sharing. Direct application to affordable unit component." },
                  { icon:"🌾", label:"Community Bond Program", desc:"Prairie Vista residents co-invest in shared infrastructure (energy microgrid, food commons, Village Heart) through community bonds. Returns paid from stewardship NOI and RCCS credit sales." },
                  { icon:"🌱", label:"Catalytic / DAF Capital", desc:"PRT catalytic capital (~$10M/year across portfolio) available for Phase 0 readiness work: Story of Place, LRLT formation, RCCS baselines, infrastructure assessment. Non-dilutive, forgivable-on-performance." },
                  { icon:"🏦", label:"CDFI + Blended Finance", desc:"Mission-aligned CDFIs and blended finance structures for affordable housing component. First-loss position available to reduce private capital risk. Combined with PRT Lane A." },
                ].map((item, i) => (
                  <div key={i} className="card" style={{display:'flex', gap:14}}>
                    <div style={{fontSize:24, flexShrink:0}}>{item.icon}</div>
                    <div>
                      <div style={{fontWeight:700, fontSize:13, color:'#f0ede6', marginBottom:4}}>{item.label}</div>
                      <div style={{fontSize:12, color:'#7a8a72', lineHeight:1.5}}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === PHASING === */}
          {tab === "phasing" && (
            <div>
              <div className="section-label">IMPLEMENTATION STRATEGY</div>
              <div className="section-title">Four-Phase Deployment</div>
              <p className="section-intro">
                Phase 0 is not optional — it is the most important investment you'll make. No shovel hits ground until the Story of Place is complete, the LRLT is registered, and the RCCS baselines are set. Then each phase builds on verified performance, not speculation.
              </p>

              <div className="phase-timeline">
                {PHASES.map((p, i) => (
                  <div key={i} className="phase-item">
                    <div className="phase-dot" style={{background: p.color, borderColor: p.color}}/>
                    <div className="phase-header">
                      <span className="phase-label" style={{background:`${p.color}20`, color:p.color, border:`1px solid ${p.color}40`}}>{p.phase}</span>
                      <span className="phase-title">{p.title}</span>
                      <span className="phase-years">{p.years}</span>
                    </div>
                    <div className="phase-body">{p.body}</div>
                    <div className="phase-delivers">
                      {p.delivers.map((d, j) => (
                        <span key={j} className="deliver-tag" style={{
                          background:`${p.deliverColors[j]}15`,
                          borderColor:`${p.deliverColors[j]}40`,
                          color: p.deliverColors[j]
                        }}>{d}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="manifesto" style={{marginTop:32}}>
                "Capital releases follow readiness gates — ecological, social, and financial performance verified before the next tranche unlocks. This sequencing shortens entitlement cycles, reduces conflict risk, and lifts total return stability."
              </div>
            </div>
          )}

          {/* === NEXT STEPS === */}

          {/* ═══ FINANCE MODEL TAB ═══════════════════════════════════════════ */}
          {tab === "finance" && <FinanceModel palette={palette} />}

          {tab === "nextsteps" && (
            <div>
              <div className="section-label">IMMEDIATE ACTION AGENDA</div>
              <div className="section-title">What Happens Next</div>
              <p className="section-intro">
                Seven concrete actions before Phase 1 can proceed. None of these require a development permit. All of them are within Angela's control right now.
              </p>

              {[
                {
                  num:"01", title:"Obtain the 2023 Vulcan Housing Needs Assessment",
                  urgent: true,
                  body:"ORRSC completed this in December 2023. It is the single most important planning document for your application case. It will show the gap between what Vulcan needs and what the market is providing — and your blended model will speak directly to that gap. Contact Kattie Schlamp at ORRSC (403-329-1344). Cost: negligible."
                },
                {
                  num:"02", title:"Commission Story of Place Engagement",
                  urgent: true,
                  body:"Engage Bill Reed / Regenesis Group to run the Story of Place process with Vulcan's community. This is not a delay — it is the foundation that makes everything that follows legitimate, durable, and community-supported. It is also what differentiates this from every other developer who has walked into the Town of Vulcan. Budget 3-4 months."
                },
                {
                  num:"03", title:"Register the Prairie Vista LRLT",
                  urgent: true,
                  body:"The LRLT is the legal architecture that holds the commons in perpetuity and enables RCCS credit issuance. It also unlocks PRT Lane A investment. This is not optional. Alberta law allows for Land Trust structures — engage regenerative legal counsel familiar with Alberta's charitable land trust mechanisms."
                },
                {
                  num:"04", title:"RCCS Baseline Assessment",
                  urgent: false,
                  body:"Establish ecological and social baselines for the site according to RCCS methodology. This creates the 'before' picture against which all verified improvements are measured. Without baselines, you cannot issue credits. This work runs concurrent with Story of Place."
                },
                {
                  num:"05", title:"Confirm ASP Amendment Pathway with ORRSC",
                  urgent: false,
                  body:"Meet with Kattie Schlamp and Rita Hovde (Town development officer) for pre-application consultation under MGA protocols. Understand what the 2018 DC text prescribes, and whether an ASP amendment or a new DC Outline Plan better serves your vision. The Town has a planning hinge point waiting for you."
                },
                {
                  num:"06", title:"Fresh Infrastructure Assessment via CIMA+",
                  urgent: false,
                  body:"The 2008 engineering baseline (BSEI, now CIMA+) is expired. Commission a current servicing assessment: sanitary sewer capacity, the undersized north-south water main, stormwater, and shallow utilities. This will define your actual infrastructure obligations and costs before any capital is committed."
                },
                {
                  num:"07", title:"Confirm Golf Course Agreement",
                  urgent: false,
                  body:"The Vulcan Golf & Country Club arrangement for the southwest corner needs confirmation. Is the expansion agreement still active? Expired? The Club's ongoing operation is an asset — their long-term planning should align with your commons and trail vision for the golf edge corridor."
                },
              ].map((step, i) => (
                <div key={i} className="expandable" style={{marginBottom:8}}>
                  <div className="expand-header" onClick={() => setOpenFail(openFail === `next${i}` ? null : `next${i}`)}>
                    <div style={{display:'flex', alignItems:'center', gap:12}}>
                      <div style={{
                        fontFamily:'DM Mono', fontSize:11,
                        padding:'2px 8px', borderRadius:3,
                        background: step.urgent ? 'rgba(200,149,42,0.15)' : 'rgba(74,143,63,0.1)',
                        border: `1px solid ${step.urgent ? 'rgba(200,149,42,0.4)' : 'rgba(74,143,63,0.3)'}`,
                        color: step.urgent ? '#c8952a' : '#7aad6e',
                        flexShrink:0,
                      }}>{step.num}</div>
                      <span>{step.title}</span>
                      {step.urgent && (
                        <span style={{fontSize:10, fontFamily:'DM Mono', color:'#c8952a', background:'rgba(200,149,42,0.1)', padding:'2px 6px', borderRadius:3, border:'1px solid rgba(200,149,42,0.3)'}}>PRIORITY</span>
                      )}
                    </div>
                    <span style={{color: openFail === `next${i}` ? '#9fd48f' : '#3d5430', fontSize:16}}>
                      {openFail === `next${i}` ? '▾' : '▸'}
                    </span>
                  </div>
                  {openFail === `next${i}` && (
                    <div className="expand-body">{step.body}</div>
                  )}
                </div>
              ))}

              <hr className="divider" />

              <div className="grid-2" style={{marginBottom:24}}>
                <div className="card card-gold">
                  <div style={{fontFamily:'DM Mono', fontSize:11, color:'#c8952a', letterSpacing:2, textTransform:'uppercase', marginBottom:12}}>Key Contacts</div>
                  {[
                    ["Kattie Schlamp", "ORRSC Planner for Vulcan", "403-329-1344"],
                    ["Rita Hovde", "Development Officer, Town of Vulcan", "rhovde@townofvulcan.ca"],
                    ["Eric Amyot", "CEO, Oliizoi Inc.", "hello@oliizoi.com"],
                    ["Bill Reed", "Regenesis Group (Story of Place)", "bill@regenesisgroup.com"],
                  ].map(([name, role, contact]) => (
                    <div key={name} style={{padding:'8px 0', borderBottom:'1px solid rgba(200,149,42,0.1)'}}>
                      <div style={{fontSize:13, fontWeight:600, color:'#f0ede6'}}>{name}</div>
                      <div style={{fontSize:12, color:'#7a8a72'}}>{role}</div>
                      <div style={{fontSize:11, fontFamily:'DM Mono', color:'#c8952a'}}>{contact}</div>
                    </div>
                  ))}
                </div>
                <div className="card card-green">
                  <div style={{fontFamily:'DM Mono', fontSize:11, color:'#7aad6e', letterSpacing:2, textTransform:'uppercase', marginBottom:12}}>Readiness Gate Checklist</div>
                  {[
                    [true, "Land ownership confirmed (Angela Faye)"],
                    [true, "ASP legally in effect (2008, amended 2018)"],
                    [true, "DC zone enabling flexible approval (2018)"],
                    [false, "Story of Place complete"],
                    [false, "LRLT registered"],
                    [false, "RCCS baselines established"],
                    [false, "2023 Housing Needs Assessment obtained"],
                    [false, "Fresh infrastructure assessment"],
                    [false, "ASP amendment or DC Outline Plan filed"],
                    [false, "PRT Lane A SPV structured"],
                  ].map(([done, item], i) => (
                    <div key={i} style={{display:'flex', gap:8, alignItems:'flex-start', padding:'7px 0', borderBottom:'1px solid rgba(74,143,63,0.08)', fontSize:13}}>
                      <span style={{color: done ? '#7aad6e' : '#3d5430', flexShrink:0, marginTop:1}}>
                        {done ? '✅' : '⬜'}
                      </span>
                      <span style={{color: done ? '#b0d4a0' : '#7a8a72'}}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cta-bar">
                <div>
                  <div className="cta-title">This is the moment, Angela.</div>
                  <div className="cta-sub">
                    Vulcan's dominant developer is exiting. The land has been dormant for 17 years. The DC zone is open. The PRT architecture is ready. The only thing left is to begin — with a Story of Place, an LRLT, and the conviction that this prairie patch can become a proof case for the whole regenerative development canon.
                  </div>
                </div>
              </div>

              <div className="manifesto" style={{marginTop:32}}>
                "Tend the soil, mind the water, keep the stories that bind people to place. Then — and only then — let the capital in."
                <div style={{fontSize:13, color:'#7a8a72', fontStyle:'normal', marginTop:8}}>— PRT Canon · Life before Profits</div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* TOOLTIP */}
      {tooltip && (
        <div className="tooltip" style={{left: tooltip.x, top: tooltip.y}}>
          <div className="tooltip-title">{tooltip.label}</div>
          <div className="tooltip-sub" style={{fontSize:11, fontFamily:'DM Mono', marginTop:4}}>ZONE: {tooltip.zone.toUpperCase()}</div>
        </div>
      )}
    </>
  );
}

/**
 * Single content source for the portfolio.
 * Everything rendered on the site comes from this file.
 * No phone number or home address is published (privacy decision).
 */

export const identity = {
  name: 'Nishen Madava',
  handle: 'VOIDINJECTOR',
  team: 'Team N4X',
  headline: 'Cybersecurity Undergraduate',
  subline: 'Aspiring Penetration Tester / SOC Analyst',
  location: 'Sri Lanka',
  email: 'nishenmadawa15@gmail.com',
  languages: ['Sinhala', 'English'],
  openTo: 'Cybersecurity internships (SOC, pentest, general security) and freelance web projects',
  openToShort: 'cybersecurity internships (SOC / pentest / general security) and freelance web projects',
  photo: { src: '/profile/nishen.webp', width: 800, height: 1000, alt: 'Portrait of Nishen Madava' },
  resumeUrl: '/resume/Nishen_Madava_CV.pdf',
  siteUrl: 'https://voidinjector-portfolio.netlify.app/',
  summary:
    'BSc (Hons) Cyber Security student at SLTC Research University. I spent six months as a Cybersecurity Intern at CodeZela, where I designed and built SOCWatch, a Wazuh SOC monitoring lab on AWS with real detection evidence. I compete in CTFs with Team N4X and build secure web applications on the side.',
}

export const links = [
  { label: 'Email', value: identity.email, href: `mailto:${identity.email}`, external: false },
  { label: 'LinkedIn', value: 'in/nishen-madava', href: 'https://www.linkedin.com/in/nishen-madava', external: true },
  { label: 'GitHub', value: 'nishenmadawa15-collab', href: 'https://github.com/nishenmadawa15-collab', external: true },
  { label: 'Hack The Box', value: 'VoidInjector', href: 'https://app.hackthebox.com/public/users/3219196', external: true },
]

export const navLinks = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'ctf', label: 'CTF' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'skills', label: 'Skills' },
  { id: 'background', label: 'Background' },
  { id: 'contact', label: 'Contact' },
]

/** Short, verifiable milestones shown as the hero "log". Newest first. */
export const timeline = [
  { when: '2026-10', text: 'DEADFACE CTF 2026 "Operation Kingmaker" — international, with VAMP_07' },
  { when: '2026-09', text: 'Completed 6-month Cybersecurity Internship at CodeZela' },
  { when: '2026-04', text: 'Started SOCWatch capstone — Wazuh SOC lab on AWS' },
  { when: '2026-03', text: 'Google Cybersecurity Certificate courses (Coursera)' },
  { when: '2025', text: 'ANIMUS 1.0 — 5th place nationally with Team N4X' },
  { when: '2024', text: 'Began BSc (Hons) Cyber Security, SLTC Research University' },
]

export const experience = [
  {
    role: 'Cybersecurity Intern',
    org: 'CodeZela',
    period: 'Apr 2026 – Sep 2026',
    duration: '6 months · completed',
    summary:
      'Capstone project SOCWatch: designed and built a Wazuh SOC monitoring lab on AWS, then proved it works with captured detection evidence.',
    bullets: [
      'Built the AWS environment from scratch: VPC, security groups, IAM, root MFA and budget alerts.',
      'Deployed one Wazuh manager (server, indexer and dashboard, v4.14.7) and enrolled three endpoints: Ubuntu, Debian and Windows Server 2022, all agents active.',
      'Proved four detection use cases end-to-end: centralised log ingestion, file integrity monitoring (create / modify / delete with hash diffs), vulnerability detection from the CVE feed, and authentication-failure / brute-force detection with single and correlated rules.',
      'Captured a genuine internet-sourced brute-force attempt against the lab during evidence collection.',
      'Produced the full project report, runbook, presentation deck and weekly evidence log.',
    ],
    stack: ['Wazuh', 'AWS', 'Linux', 'Windows Server', 'SIEM'],
    link: { label: 'SOCWatch on GitHub', href: 'https://github.com/nishenmadawa15-collab/SOCWatch' },
  },
]

export const projects = [
  {
    id: 'socwatch',
    name: 'SOCWatch',
    kind: 'SOC monitoring lab',
    status: 'Complete',
    featured: true,
    summary:
      'Wazuh SOC monitoring lab on AWS. One manager, three enrolled endpoints (Ubuntu, Debian, Windows Server 2022) and four detection use cases proven with real captured evidence: log ingestion, file integrity monitoring, CVE-based vulnerability detection and brute-force detection.',
    highlights: ['3 agents active', 'FIM with hash diffs', 'CVE feed detection', 'Correlated brute-force rules'],
    stack: ['Wazuh', 'AWS', 'Linux', 'Windows Server'],
    image: {
      src: '/projects/socwatch-agents.webp',
      width: 1200,
      height: 542,
      alt: 'Wazuh dashboard showing three enrolled SOCWatch agents in active status',
    },
    links: [{ label: 'GitHub', href: 'https://github.com/nishenmadawa15-collab/SOCWatch' }],
  },
  {
    id: 'flagvora',
    name: 'FLAGVORA',
    kind: 'CTF platform',
    status: 'In development',
    privateRepo: true,
    summary:
      'Original CTF platform brand ("Find the flaw. Earn the flag.") built on the GZ::CTF open-source core (AGPLv3) with custom patches. Work so far covers security hardening, admin 2FA, an admin app and a deployment kit.',
    highlights: ['Security hardening', 'Admin 2FA', 'Deployment kit'],
    stack: ['C#', 'Python', 'GZ::CTF'],
    links: [],
  },
  {
    id: 'nexskill',
    name: 'NexSkill',
    kind: 'Internship matching platform',
    status: 'Complete',
    summary:
      'SLTC team project (CCS2360). Students are ranked against internships by an explainable weighted match score (skills 45%, GPA 20%, preferences 15%, year 10%, certs 10%) with three-tier skill similarity including from-scratch TF-IDF cosine similarity, a skill-gap analyser and Row-Level Security on every table. 90% precision and recall in evaluation.',
    highlights: ['Explainable match score', 'From-scratch TF-IDF', 'RLS on every table'],
    stack: ['Next.js', 'React', 'Supabase', 'PostgreSQL', 'Tailwind'],
    links: [{ label: 'GitHub', href: 'https://github.com/nishenmadawa15-collab/nexskill' }],
  },
  {
    id: 'nursery',
    name: 'Southern Plant Nursery',
    kind: 'Secure e-commerce platform',
    status: 'In development',
    privateRepo: true,
    summary:
      'Full-stack store with WhatsApp-first ordering and separate customer, admin and careers portals. Security work includes OTP login, role-separated portals, time-limited file links, Zod input validation, Prisma parameterised queries and migration preflight checks.',
    highlights: ['OTP login', 'Role-separated portals', 'Zod + Prisma validation'],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'MySQL', 'Tailwind'],
    links: [],
  },
  {
    id: 'extensions',
    name: 'Privacy-first Chrome extensions',
    kind: 'Four browser extensions',
    status: 'Complete',
    summary:
      'Gramo (grammar and spelling helper), YouTube Timestamp Saver, AdBlock Pro and Window Resizer. Zero personal data collected, no tracking, settings stored locally and a public privacy policy for each.',
    highlights: ['No data collection', 'Local-only settings', 'Public privacy policies'],
    stack: ['JavaScript', 'Chrome Extensions API'],
    links: [],
  },
  {
    id: 'bg-remover',
    name: 'BG Remover',
    kind: 'Client-side image tool',
    status: 'Live',
    summary:
      'Background remover for solid-colour backgrounds that runs entirely in the browser: canvas-based colour keying, adjustable sensitivity and transparent PNG export. Images never leave the device.',
    highlights: ['Runs fully client-side', 'Adjustable sensitivity', 'Transparent PNG export'],
    stack: ['JavaScript', 'Canvas API'],
    links: [
      { label: 'Live', href: 'https://nishenmadawa15-collab.github.io/bg-remover/' },
      { label: 'GitHub', href: 'https://github.com/nishenmadawa15-collab/bg-remover' },
    ],
  },
  {
    id: 'portfolio',
    name: 'VOIDINJECTOR portfolio',
    kind: 'This website',
    status: 'Live',
    summary:
      'Static single-page portfolio with a single content file, strict Content-Security-Policy and security headers, no tracking, and optimised images. Deployed from the main branch to Netlify.',
    highlights: ['Strict CSP', 'No tracking', 'Static build'],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Netlify'],
    links: [{ label: 'GitHub', href: 'https://github.com/nishenmadawa15-collab/voidinjector-portfolio' }],
  },
]

export const ctf = {
  team: 'Team N4X (SLTC)',
  headline: {
    event: 'ANIMUS 1.0',
    result: '5th place nationally',
    host: 'University of Ruhuna · CSSC + VULNHAT',
    year: '2025',
    domains: ['Web', 'Digital Forensics', 'Crypto', 'Reverse Engineering', 'OSINT', 'Network Security'],
    image: {
      src: '/ctf/animus-certificate.webp',
      width: 1000,
      height: 1333,
      alt: 'ANIMUS 1.0 certificate of participation awarded to Nishen Madava, Team N4X',
    },
  },
  events: [
    {
      event: 'DEADFACE CTF 2026 — "Operation Kingmaker"',
      host: 'Cyber Hacktics',
      when: 'Oct 2026',
      note: 'International CTF, competitor badge. Played as VoidInjector with teammate VAMP_07 among hundreds of teams worldwide.',
      scope: 'International',
    },
    { event: 'IIT CTF Challenge', host: 'IIT', when: '2025', scope: 'National' },
    { event: 'CyberQuest CTF', host: 'NSBM Green University', when: '2025', scope: 'National' },
    {
      event: 'CYPHER 4.0',
      host: 'IEEE Student Branch, Kotelawala Defence University',
      when: '',
      note: 'First CTF.',
      scope: 'National',
    },
  ],
  practice: 'Ongoing practice on Hack The Box and TryHackMe labs.',
}

export const certifications = [
  {
    group: 'Google Cybersecurity Certificate (Coursera) · Mar 2026',
    items: [
      { name: 'Play It Safe: Manage Security Risks', image: '/certificates/google-play-it-safe.webp', w: 922, h: 715 },
      { name: 'Connect and Protect: Networks and Network Security', image: '/certificates/google-connect-protect.webp', w: 1000, h: 772 },
      { name: 'Tools of the Trade: Linux and SQL', image: '/certificates/google-tools-of-the-trade.webp', w: 1000, h: 776 },
      { name: 'Assets, Threats, and Vulnerabilities', image: '/certificates/google-assets-threats.webp', w: 1000, h: 775 },
    ],
  },
  {
    group: 'Programmes, workshops and events',
    cols: 3,
    items: [
      { name: 'E|Hacking Workshop V02', issuer: 'Hands-on ethical hacking workshop', image: '/certificates/ehacking-workshop.webp', w: 970, h: 685 },
      { name: 'ISACA Cyber Camp', issuer: 'University of Sri Jayewardenepura', image: '/certificates/isaca-cyber-camp.webp', w: 1000, h: 670 },
      { name: 'DEADFACE CTF 2026 Competitor', issuer: 'Cyber Hacktics · Oct 2026' },
      { name: 'Certificate in Cyber Security & Ethical Hacking (C|CSEH)' },
      { name: 'Foundation in Cyber Security', issuer: 'CICRA Campus' },
      { name: 'Diploma in Cyber Security', issuer: 'SITC Campus' },
    ],
  },
]

export const skills = [
  {
    group: 'Security',
    items: [
      'SOC monitoring & SIEM (Wazuh)',
      'Log analysis',
      'File integrity monitoring',
      'Vulnerability assessment',
      'Web application security (OWASP Top 10, SQLi, XSS)',
      'Penetration testing methodology',
      'Network traffic analysis',
      'Digital forensics',
      'OSINT',
      'Risk assessment',
      'Secure coding',
    ],
  },
  {
    group: 'Tools',
    items: ['Kali Linux', 'Burp Suite', 'Nmap', 'Wireshark', 'Metasploit', 'Nessus', 'OWASP ZAP', 'Wazuh'],
  },
  {
    group: 'Cloud & systems',
    items: ['AWS (EC2, VPC, IAM, security groups)', 'Linux (Ubuntu, Debian)', 'Windows Server'],
  },
  {
    group: 'Programming & web',
    items: ['Python', 'C/C++', 'JavaScript', 'TypeScript', 'SQL', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'Supabase', 'Prisma', 'MySQL'],
  },
  {
    group: 'Working style',
    items: ['Analytical thinking', 'Problem solving', 'Teamwork', 'Communication', 'Leadership'],
  },
]

export const leadership = [
  {
    role: 'Publicity & PR Director',
    org: 'ISACA Student Group, SLTC',
    note: 'Organises cyber-awareness initiatives, CTF challenges and technical workshops.',
  },
  {
    role: 'Member',
    org: 'SLTC LEO Club',
    note: 'Community service and leadership.',
  },
]

export const education = [
  {
    degree: 'BSc (Hons) Cyber Security',
    school: 'SLTC Research University (Sri Lanka Technological Campus)',
    period: '2024 – 2028 (expected)',
    note: 'Coursework: Network Security, Ethical Hacking, Cryptography, Cyber Forensics, Security Policies & Risk Management.',
  },
  { degree: 'Foundation in Cyber Security', school: 'CICRA Campus', period: '2023 – 2024' },
  { degree: 'Diploma in Cyber Security', school: 'SITC Campus', period: '' },
]

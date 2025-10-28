const navLinks = [
  {
    name: "Home",
    link: "#hero",
  },
  {
    name: "Projects",
    link: "#projects",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Blog",
    link: "#blog",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 4, suffix: "+", label: "Years of Experience" },
  { value: 52, suffix: "+", label: "Completed Projects" },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const socialImgs = [
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    url: "https://www.linkedin.com/in/md-nr-db/",
  },
];

const projects = [
  {
    id: 1,
    title: "SOC Stack",
    description: "Automated SIEM deployment using Wazuh, Graylog, and Grafana.",
    image: "/images/project1.webp",
    technologies: ["Bash", "Wazuh", "Python", "Sysmon"],
    githubUrl: "https://github.com/MohamedNourDerbeli/SOC-SIEM",
    featured: true,
  },
  {
    id: 2,
    title: "TrustFi",
    description:
      "Portable on-chain Trust Scores to represent achievements and reputations.",
    image: "/images/project2.jpeg",
    technologies: ["Polkadot", "Solidity", "Hardhat", "React", "Vite"],
    githubUrl: "https://github.com/MohamedNourDerbeli/TrustFi",
  },
  {
    id: 3,
    title: "Linux From Scratch",
    description:
      "Automating the LFS build pipeline for reproducible system builds.",
    image: "/images/project3.jpg",
    technologies: ["Roff", "Shell", "Python"],
    githubUrl: "https://github.com/MohamedNourDerbeli/Linux-From-Scratch",
  },
];

const skillCategories = [
  {
    title: "Frontend Development",
    description: "Modern web interfaces & user experiences",
    icon: "🎨",
    skills: [
      { name: "React", level: 70, icon: "/images/logos/react.png" },
      { name: "JavaScript", level: 70, icon: "/images/logos/js.png" },
      { name: "TypeScript", level: 50, icon: "/images/logos/ts.png" },
      { name: "Three.js", level: 50, icon: "/images/logos/three.png" },
      { name: "Tailwind CSS", level: 55, icon: "/images/logos/tailwind.png" },
      { name: "HTML5/CSS3", level: 80, icon: "/images/logos/html.png" },
    ],
  },
  {
    title: "Backend Development",
    description: "Server-side architecture & APIs",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: 70, icon: "/images/logos/node.png" },
      { name: "Python", level: 95, icon: "/images/logos/python.svg" },
      { name: "Express.js", level: 60, icon: "/images/logos/express.png" },
      { name: "FastAPI", level: 56, icon: "/images/logos/fastapi.png" },
      { name: "REST APIs", level: 65, icon: "/images/logos/api.png" },
      { name: "GraphQL", level: 40, icon: "/images/logos/graphql.png" },
    ],
  },
  {
    title: "Database & Storage",
    description: "Data management & optimization",
    icon: "🗄️",
    skills: [
      { name: "MongoDB", level: 60, icon: "/images/logos/mongodb.png" },
      { name: "PostgreSQL", level: 60, icon: "/images/logos/postgresql.png" },
      { name: "Redis", level: 50, icon: "/images/logos/redis.png" },
      { name: "Firebase", level: 60, icon: "/images/logos/firebase.png" },
      { name: "MySQL", level: 75, icon: "/images/logos/mysql.png" },
    ],
  },
  {
    title: "DevOps & Cloud",
    description: "Infrastructure & deployment",
    icon: "☁️",
    skills: [
      { name: "Docker", level: 70, icon: "/images/logos/docker.png" },
      { name: "AWS", level: 40, icon: "/images/logos/aws.png" },
      { name: "Git", level: 95, icon: "/images/logos/git.svg" },
      { name: "Linux", level: 90, icon: "/images/logos/linux.png" },
      { name: "Nginx", level: 60, icon: "/images/logos/nginx.png" },
    ],
  },
  {
    title: "Security & Monitoring",
    description: "Cybersecurity & system monitoring",
    icon: "🔒",
    skills: [
      { name: "Wazuh", level: 90, icon: "/images/logos/wazuh.png" },
      { name: "Graylog", level: 85, icon: "/images/logos/graylog.png" },
      { name: "Grafana", level: 80, icon: "/images/logos/grafana.png" },
      { name: "SIEM", level: 85, icon: "/images/logos/siem.png" },
      {
        name: "Penetration Testing",
        level: 75,
        icon: "/images/logos/pentest.png",
      },
    ],
  },
  {
    title: "Blockchain & Web3",
    description: "Decentralized applications & smart contracts",
    icon: "⛓️",
    skills: [
      { name: "Solidity", level: 80, icon: "/images/logos/solidity.png" },
      { name: "Polkadot", level: 75, icon: "/images/logos/polkadot.png" },
      { name: "Hardhat", level: 80, icon: "/images/logos/hardhat.png" },
      { name: "Web3.js", level: 75, icon: "/images/logos/web3.png" },
      {
        name: "Smart Contracts",
        level: 80,
        icon: "/images/logos/ethereum.png",
      },
    ],
  },
];

// Core Technologies - Clean and Simple
const coreSkills = [
  "Python",
  "JavaScript", 
  "React",
  "Node.js",
  "Docker",
  "Linux",
  "Git",
  "PostgreSQL",
  "MongoDB",
  "Wazuh",
  "Grafana",
  "Solidity",
  "Polkadot",
  "Three.js"
];

export {
  words,
  counterItems,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
  projects,
  skillCategories,
  coreSkills,
  articles,
};
const articles = [
  {
    id: 1,
    title: "From Coffee Cup to Code Execution: A Practical Buffer Overflow Demonstration",
    excerpt: "A hands-on exploration of buffer overflow vulnerabilities, demonstrating how a simple programming mistake can lead to complete system compromise. Learn the mechanics behind one of the most critical security flaws.",
    category: "Cybersecurity",
    readTime: "12 min read",
    date: "Published on Medium",
    image: "/images/blog/buffer-overflow.png",
    tags: ["Buffer Overflow", "Exploitation", "Security", "Vulnerability"],
    featured: true,
    url: "https://medium.com/@nourmohamedderbeli/from-coffee-cup-to-code-execution-a-practical-buffer-overflow-demonstration-3396f37bfe36"
  },
  {
    id: 2,
    title: "CyberBank IDOR Vulnerability Report",
    excerpt: "A detailed vulnerability assessment revealing Insecure Direct Object Reference (IDOR) flaws in a banking application. Complete with proof of concept and remediation strategies.",
    category: "Cybersecurity",
    readTime: "8 min read",
    date: "Published on Medium",
    image: "/images/blog/idor-vulnerability.png",
    tags: ["IDOR", "Vulnerability Assessment", "Banking Security", "Web Security"],
    url: "https://medium.com/@nourmohamedderbeli/cyberbank-idor-vulnerability-report-a4e1f6e7df46"
  },
  {
    id: 3,
    title: "Why the Principle of Least Privilege is Non-Negotiable for Modern Cybersecurity",
    excerpt: "An in-depth analysis of the Principle of Least Privilege and why it's essential for modern cybersecurity frameworks. Real-world examples and implementation strategies included.",
    category: "Cybersecurity",
    readTime: "10 min read",
    date: "Published on Medium",
    image: "/images/blog/least-privilege.png",
    tags: ["Least Privilege", "Access Control", "Security Framework", "Best Practices"],
    url: "https://medium.com/@nourmohamedderbeli/why-the-principle-of-least-privilege-is-non-negotiable-for-modern-cybersecurity-8390b613e82a"
  },
  {
    id: 4,
    title: "Defense in Depth: The Multi-Layered Shield Every Tech Company Needs",
    excerpt: "Exploring the Defense in Depth strategy and how multiple security layers create a robust cybersecurity posture. Essential reading for security architects and IT leaders.",
    category: "Cybersecurity",
    readTime: "15 min read",
    date: "Published on Medium",
    image: "/images/blog/defense-in-depth.png",
    tags: ["Defense in Depth", "Security Architecture", "Multi-Layer Security", "Enterprise Security"],
    url: "https://medium.com/@nourmohamedderbeli/defense-in-depth-the-multi-layered-shield-every-tech-company-needs-1cfa5860c479"
  }
];
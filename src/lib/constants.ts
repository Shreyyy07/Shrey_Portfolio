export const PERSONAL_INFO = {
  name: "Shrey Joshi",
  title: "Full Stack Developer",
  subtitle: "Full Stack Developer | Competitive Programmer | Open Source Contributor",
  rotatingKeywords: ["Problem Solver", "Web Application Enthusiast", "AI Integrator", "DevOps Engineer"],
  location: "Chennai, Tamil Nadu, India",
  email: "shreyjoshi1394@gmail.com",
  phone: "+91 9166791300",
  bio: "Passionate full-stack developer from Chennai with expertise in modern web technologies, AI integration, and DevOps. Building scalable applications and solving complex problems with 1.25M+ lines of code written.",
  aboutBio: [
    "I'm a passionate full-stack developer currently pursuing Computer Science at SRM Institute of Science and Technology with a CGPA of 9.30. With a strong foundation in competitive programming and modern web development, I love building scalable applications that solve real-world problems.",
    "Based in Chennai, Tamil Nadu, I've worked on diverse projects ranging from AI-powered communication platforms to automated DevOps pipelines. My experience spans full-stack development at FOZZIL and automation engineering at Apollo Tyres Global R&D, where I optimized workflows and enhanced tool performance.",
    "When I'm not coding, you'll find me contributing to open source, solving algorithmic challenges on LeetCode, or exploring the latest web technologies and AI trends."
  ],
  resume: "https://drive.google.com/file/d/1U9g1xkkmHwT_GO8kaMrreOEcVLmRXdXD/view",
  social: {
    github: "https://github.com/Shreyyy07",
    linkedin: "https://www.linkedin.com/in/shrey-joshi-1b038a249/",
    leetcode: "https://leetcode.com/u/shreyyy___07/",
    codolio: "https://codolio.com/profile/kbygUcjT",
  },
};

export const STATS = [
  { label: "CGPA", value: 9.3, suffix: "", decimals: 2 },
  { label: "Lines of Code", value: 1.25, suffix: "M+", decimals: 2 },
  { label: "GitHub Repos", value: 53, suffix: "", decimals: 0 },
  { label: "LeetCode Problems", value: 400, suffix: "+", decimals: 0 },
  { label: "Years Coding", value: 3, suffix: "+", decimals: 0 },
];

export const CURRENT_FOCUS = [
  "Advanced System Design & Architecture",
  "Performance Optimization Techniques",
  "DevOps & CI/CD Pipelines",
  "Mobile App Development (React Native)",
];

export const SKILLS = {
  "Programming Languages": ["C", "C++", "Python", "JavaScript", "TypeScript"],
  "Frontend": ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Shadcn UI", "jQuery"],
  "Backend": ["Node.js", "Express.js", "FastAPI", "Flask", "RESTful APIs"],
  "Databases": ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Supabase"],
  "DevOps & Cloud": ["Docker", "Docker Compose", "Jenkins", "GitHub Actions", "AWS EC2", "Linux"],
  "Tools & Platforms": ["Git/GitHub", "VS Code", "Postman", "NPM/Yarn", "CI/CD Pipelines"],
};

export const EXPERIENCE = [
  {
    id: 4,
    company: "Unmappr",
    position: "Backend Developer",
    type: "Part-time · Remote",
    location: "Berlin, Germany",
    duration: "Feb 2026 - May 2026",
    responsibilities: [
      "Built robust APIs and implemented secure authentication mechanisms",
      "Handled core backend infrastructure from the ground up, focusing on API design, user authorization, and database optimization",
      "Contributed to UI development to ensure smooth frontend-backend integration",
    ],
    tech: ["Backend", "API Design", "Authentication", "Database", "UI Integration"],
  },
  {
    id: 1,
    company: "Apollo Tyres Global R&D",
    position: "Automation Engineer",
    type: "On-Site",
    location: "Chennai",
    duration: "Aug 2025 - Nov 2025",
    responsibilities: [
      "Enhanced and deployed automation tool, collaborating with R&D engineers to optimize workflow efficiency",
      "Conducted on-site implementation and training for seamless process integration",
    ],
    tech: ["Python", "Automation", "R&D"],
    certificate: "/experience/srm_certificate.pdf",
  },
  {
    id: 2,
    company: "Apollo Tyres Global R&D",
    position: "Project Intern",
    type: "Remote",
    location: "Chennai",
    duration: "Feb 2025 - Jul 2025",
    responsibilities: [
      "Analyzed user workflows and gathered technical requirements to improve tool performance and usability",
      "Resulted in faster data extraction and fewer manual steps",
    ],
    tech: ["Python", "Data Analysis", "UX Research"],
    certificate: "/experience/apollo_certificate.pdf",
  },
  {
    id: 3,
    company: "FOZZIL",
    position: "Full Stack Developer",
    type: "Remote",
    location: "Remote",
    duration: "Aug 2023 - Feb 2024",
    responsibilities: [
      "Built full-stack web applications with React.js frontend and Node.js backend",
      "Collaborated in agile development cycles",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    certificate: "/experience/fozzil_certificate.pdf",
  },
];

export const PROJECTS = [
  {
    id: 2,
    title: "Career Connect AI",
    tagline: "Production-Ready AI Recruitment Platform",
    description: "A full-stack AI recruitment platform that replaces manual screening with an intelligent hiring engine. Features two portals — a Candidate Dashboard for interviews and skill growth, and an HR Command Center for pipeline management and integrity monitoring.",
    tech: ["React.js", "Node.js", "FastAPI", "OpenAI", "MongoDB", "Docker"],
    features: ["AI Interview Engine", "Candidate Dashboard", "HR Command Center", "Pipeline Management", "Integrity Monitoring"],
    github: "https://github.com/Shreyyy07/Career-Connect-AI---Major-Project",
    live: "https://career-connect-ai-snowy.vercel.app/",
    date: "Apr 2026",
    featured: true,
    preview: "/projects/career-connect.gif",
    arch: "/projects/career-connect-arch.png",
  },
  {
    id: 1,
    title: "Vocalyst",
    tagline: "AI-Driven Multimodal Practice Platform",
    description: "An AI-powered communication coaching platform that analyzes speech (Whisper), facial expressions (DeepFace), and gaze (MediaPipe) to give real-time feedback on fluency, clarity, filler words and WPM. Containerized the full stack using Docker for scalable deployments.",
    tech: ["Next.js", "TypeScript", "Flask", "OpenAI Whisper", "ElevenLabs", "MediaPipe", "Docker"],
    features: ["Speech Analysis", "Facial Recognition", "Gaze Tracking", "Real-time Feedback", "Containerized Deployment"],
    github: "https://github.com/Shreyyy07/Vocalyst-Working-Tree",
    live: "https://vocalyst-working-tree.vercel.app/",
    date: "Nov 2025",
    featured: true,
    preview: "/projects/vocalyst.gif",
    arch: "/projects/vocalyst-arch.png",
  },
  {
    id: 3,
    title: "Tayyari.ai",
    tagline: "AI-Powered Learning Platform",
    description: "An AI-powered learning platform that converts user content into quizzes, implements personalized learning paths, supports multimodal accessibility (speech-to-text), and adds gamification to increase engagement.",
    tech: ["React.js", "Next.js", "Flask", "OpenAI"],
    features: ["AI Quiz Generation", "Personalized Learning Paths", "Speech-to-Text", "Gamification"],
    github: "https://github.com/Shreyyy07/Tayyari-AI-working-model",
    live: "https://tayyari-ai-working-model-3qa1vzcfr-shrey-joshis-projects.vercel.app/",
    date: "Feb 2025",
    featured: true,
    preview: "/projects/tayyari.gif",
    arch: "/projects/tayyari-arch.png",
  },
  {
    id: 4,
    title: "Two-Tier App with CI/CD",
    tagline: "Production-Grade DevOps Implementation",
    description: "Built and containerized a two-tier web application using Flask and MySQL with Docker & Docker Compose for environment consistency. Implemented a CI/CD pipeline using GitHub Actions to automate build and deployment on AWS EC2 via SSH.",
    tech: ["Flask", "MySQL", "Docker", "GitHub Actions", "AWS EC2"],
    features: ["Two-Tier Architecture", "Containerization", "Automated CI/CD", "Cloud Hosting", "Service Orchestration"],
    github: "https://github.com/Shreyyy07/Two-Tier-Flask-App---GitHub-Actions",
    live: null,
    date: "Feb 2026",
    featured: false,
    preview: null,
    arch: "/projects/cicd-app-arch.png",
  },
];

export const ALL_CERTIFICATES = [
  { title: "Generative AI Certification", issuer: "Microsoft", file: null },
  { title: "NPTEL JAVA Certification", issuer: "NPTEL", file: "NPTEL- Programming In Java.pdf" },
  { title: "Machine Learning Foundations", issuer: "AWS Academy", file: "AWS.pdf" },
  { title: "Networking Basics", issuer: "Cisco Networking Academy", file: "Networking_Basics_Certificate.pdf" },
  { title: "Accenture Job Simulation", issuer: "Accenture", file: "Accenture_Certificate .pdf" },
  { title: "AI & Big Data in IOT", issuer: "Certification", file: "AI & Big data in IOT.pdf" },
  { title: "AI Fundamentals", issuer: "Certification", file: "AI_Fundamentals.pdf" },
  { title: "Alteryx Machine Learning", issuer: "Alteryx", file: "Alterys_Machine_Learning_Fundamentals.pdf" },
  { title: "Generative AI Productivity", issuer: "Microsoft & LinkedIn", file: "Build Your Generative AI Productivity Skills with Microsoft and LinkedIn.pdf" },
  { title: "Model Context Protocol", issuer: "Anthropic Claude", file: "Claude _MCP_Certificate.pdf" },
  { title: "Intro to Agent Skills", issuer: "Anthropic Claude", file: "Claude_Intro to agent skills.pdf" },
  { title: "Internship Completion", issuer: "CodSoft", file: "CodSoft_Internship_Completion.pdf" },
  { title: "DBMS Certification", issuer: "Scaler", file: "DBMS- scaler.pdf" },
  { title: "Deloitte Job Simulation", issuer: "Deloitte", file: "Deloitte_Certificate.pdf" },
  { title: "EA Software Engineering", issuer: "Electronic Arts", file: "EA_Certificate.pdf" },
  { title: "Excel with Copilot", issuer: "Microsoft", file: "Excel with Copilot AIDriven Data Analysis_Certificate.pdf" },
  { title: "Engineering Simulation", issuer: "Goldman Sachs", file: "Goldman Sachs_Certificate.pdf" },
  { title: "ChatGPT Course", issuer: "Infosys", file: "Infosys- ChatGPT Course.pdf" },
  { title: "IoT Certification", issuer: "Certification", file: "IOT Certificate.pdf" },
  { title: "JavaScript Certification", issuer: "HackerRank", file: "JavaScript_ Certificate.pdf" },
  { title: "Oracle Certification", issuer: "Oracle", file: "Oracle Certification.pdf" },
  { title: "Software Engineering", issuer: "Wells Fargo", file: "Wells Fargo Certificate.pdf" }
];

export const GITHUB_ACHIEVEMENTS = [
  { title: "Pull Shark", detail: "x2" },
  { title: "Quickdraw", detail: "" },
  { title: "YOLO", detail: "" },
];

export const CODING_STATS = [
  { label: "Total Repositories", value: "53" },
  { label: "Code Time", value: "58h 21m" },
  { label: "Lines of Code", value: "1.25M+" },
  { label: "Most Used", value: "C++, JS, Python" },
  { label: "Productive Day", value: "Thursday" },
  { label: "Coding Time", value: "Evening/Night" },
];

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Achievements", to: "/achievements" },
  { label: "Blog", to: "/blog" },
  { label: "Videos", to: "/videos" },
  { label: "Contact", to: "/contact" },
];

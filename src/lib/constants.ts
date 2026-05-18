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
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "Vocalyst",
    tagline: "AI-Driven Multimodal Practice Platform",
    description: "Developed an AI-powered communication coaching platform that analyzes speech (Whisper), facial expressions (DeepFace), and gaze (MediaPipe) to give real-time feedback on fluency, clarity, filler words and WPM. Containerized the full stack using Docker for scalable deployments.",
    tech: ["Next.js", "TypeScript", "Flask", "OpenAI Whisper", "ElevenLabs", "MediaPipe", "Docker"],
    features: ["Speech Analysis", "Facial Recognition", "Gaze Tracking", "Real-time Feedback", "Containerized Deployment"],
    github: "https://github.com/Shreyyy07/Vocalyst-Working-Tree",
    date: "Nov 2025",
    featured: true,
  },
  {
    id: 2,
    title: "Two-Tier Web App with CI/CD",
    tagline: "Production-Grade DevOps Implementation",
    description: "Built and containerized a two-tier web application using Flask and MySQL with Docker & Docker Compose for environment consistency. Implemented a CI/CD pipeline using GitHub Actions to automate build and deployment on AWS EC2 via SSH.",
    tech: ["Flask", "MySQL", "Docker", "GitHub Actions", "AWS EC2"],
    features: ["Two-Tier Architecture", "Containerization", "Automated CI/CD", "Cloud Hosting", "Service Orchestration"],
    github: "#",
    date: "Feb 2026",
    featured: true,
  },
  {
    id: 3,
    title: "Tayyari.ai",
    tagline: "AI-Powered Learning Platform",
    description: "Built an AI-powered learning platform that converts user content into quizzes, implements personalized learning paths, supports multimodal accessibility (speech-to-text), and adds gamification to increase engagement.",
    tech: ["React.js", "Next.js", "Flask", "OpenAI"],
    features: ["AI Quiz Generation", "Personalized Learning Paths", "Speech-to-Text", "Gamification"],
    github: "#",
    date: "Feb 2025",
    featured: false,
  },
  {
    id: 4,
    title: "BharatHealth",
    tagline: "Digital Prescription Management",
    description: "Built a digital prescription management platform with role-based access for doctors, patients, and pharmacists to eliminate paper prescription losses.",
    tech: ["React.js", "Tailwind CSS", "ShadCN", "Clerk", "OpenAI"],
    features: ["Role-Based Access Control", "Digital Prescriptions", "Secure Auth", "AI Integration"],
    github: "#",
    date: "Jan 2025",
    featured: false,
  },
];

export const CERTIFICATIONS = [
  { title: "Generative AI Certification", issuer: "Microsoft" },
  { title: "NPTEL JAVA Certification", issuer: "NPTEL" },
  { title: "AWS Academy Machine Learning Foundations", issuer: "AWS" },
  { title: "Networking Certificate", issuer: "Cisco Networking Academy" },
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
  { label: "Skills", to: "/skills" },
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Achievements", to: "/achievements" },
  { label: "Brand", to: "/brand" },
  { label: "Blog", to: "/blog" },
  { label: "Videos", to: "/videos" },
  { label: "Contact", to: "/contact" },
];

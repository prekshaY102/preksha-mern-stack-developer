export const profile = {
  name: "Preksha Yadav",
  title: "Full Stack Developer",
  location: "Anand, Gujarat, India",
  email: "YOUR_EMAIL",
  github: "https://github.com/YOUR-USERNAME",
  linkedin: "https://www.linkedin.com/in/YOUR-USERNAME",
  intro:
    "I build full-stack web applications with MongoDB, Express, React and Node.js. I completed my MCA in 2026 and worked on a MERN learning management system during my internship at Tech Elecon.",
};

export const projects = [
  {
    name: "Learning Management System",
    tagline: "A MERN learning platform with video courses, payments and certificates.",
    role: "Built the entire backend and helped with the React frontend. Team of 3.",
    features: [
      "Video upload with Multer and Cloudinary",
      "Razorpay payment gateway",
      "OAuth and JWT login with bcrypt hashing",
      "Three user roles with role-based routing",
      "Certificate download",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "Mongoose"],
    image: "", // example: "/projects/lms.png"
    repo: "",
    live: "",
  },
  {
    name: "CarXchange",
    tagline: "A PHP and MySQL marketplace for buying and selling new and used cars.",
    role: "Group college project of 3. The idea was mine and I built it.",
    features: [
      "Search, filters and vehicle detail pages",
      "Buyer to seller chat around each listing",
      "Inquiries, offers and test-drive requests",
      "Admin panel with vehicle and user management",
      "PDF receipts with Dompdf",
    ],
    stack: ["PHP", "MySQL", "JavaScript", "Bootstrap", "Dompdf"],
    image: "",
    repo: "",
    live: "",
  },
    {
    name: "Artist Portfolio",
    tagline: "A painterly website for my handmade and creative practice, written in plain JavaScript.",
    role: "Designed and built it myself, from the layout to the deployment.",
    features: [
      "Plain JavaScript with GSAP scroll animations",
      "Blush and cream palette with a script heading font",
      "Pages covering my full range of commissions",
      "Deployed on Cloudflare Pages",
      "robots.txt, sitemap and Search Console set up for SEO",
    ],
    stack: ["JavaScript", "GSAP", "HTML", "CSS", "Cloudflare Pages"],
    image: "", // example: "/projects/art-portfolio.png"
    repo: "",
    live: "https://handmade-by-preksha.pages.dev/",
  },
];

export const skills = [
  { group: "Frontend", items: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3"] },
  { group: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
  { group: "Database", items: ["MongoDB", "PostgreSQL (learning)"] },
  { group: "Tools", items: ["Git", "GitHub"] },
];

export const about = [
  "I am a full-stack developer from Anand, Gujarat. I build web applications with MongoDB, Express, React and Node.js, and I am adding PostgreSQL to my skills.",
  "I completed my MCA in 2026. During my internship at Tech Elecon I joined as a frontend developer and also worked on the backend of a MERN learning management system.",
  "Outside code I am an artist and handmade creator. Van Gogh is my biggest influence, which is why this site looks the way it does.",
];
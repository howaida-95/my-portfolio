/** Demo content aligned with the iPortfolio template structure */

import profilePhoto from "@/assets/images/profile.jpg";
import heroImg from "@/assets/images/hero-banner.webp";

export const SITE = {
  name: "Howaida Sayed",
  siteTitle: "my portfolio",
  tagline: "Senior Frontend Developer.", 
  typedRoles: ["Frontend Developer", "react js developer", "vue js developer", "react native developer"] as const,
  profileImage: profilePhoto,
  heroImage:heroImg,
  social: {
    linkedin: "https://www.linkedin.com/in/howaida-sayed-4311721b0/",
    whatsapp: "https://wa.me/201270141771?text=Hello%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%20with%20you.",
    github: "https://github.com/howaida-95",
    telegram: "https://t.me/howaida_sayed",
    facebook: "https://www.facebook.com/howyda.sayed.9",
  },
};

export const ABOUT_INTRO =`Senior Frontend Developer with 6 years of experience building scalable fintech and enterprise web
applications using React, Next.js, and TypeScript.Specialized in performance optimization, API integration,
and complex state management. Proven track record in delivering high-performance admin dashboards,
financial systems, and reusable UI architectures.`

export const ABOUT = {
  lead: `I focus on building clean, scalable frontend architectures that balance performance, maintainability, and user experience. I enjoy turning complex business requirements into intuitive, high-quality interfaces, especially in fintech and data-driven environments.`,
  closing: `I’m currently open to remote opportunities where I can contribute to impactful products, collaborate with strong teams, and continue growing as a frontend engineer. Let’s build something meaningful together.`,  factsLeft: [
    { label: "Birthday", value: "17 May 1995" },
    { label: "Phone", value: "+20 127 014 1771" },
    { label: "City", value: "Asyut, Egypt" },
  ],
  factsRight: [
    { label: "Degree", value: "Bachelor" },
    { label: "Email", value: "howaidasayed95@gmail.com" },
    { label: "Freelance", value: "Available" },
  ],
};

export const STATS = [
  {
    icon: "users" as const,
    end: 2,
    title: "Companies",
    subtitle: "Startup and software house collaborations",
  },
  {
    icon: "file" as const,
    end: 38,
    title: "Projects Delivered",
    subtitle: "Web apps, dashboards, and e-commerce solutions",
  },
  {
    icon: "smile" as const,
    end: 6,
    title: "Years Experience",
    subtitle: "Frontend development with React ecosystem",
  },
  {
    icon: "headset" as const,
    end: 2,
    title: "Mobile Applications",
    subtitle: "Built using React Native",
  },
];

export const SKILLS = [
  "React",
  "Next.js",
  "Vue.js",
  "Nuxt.js",
  "React Native",
  "JavaScript (ES6+)",
  "TypeScript",
  "HTML5",
  "CSS3",
  "SASS",
  "Redux Toolkit",
  "React Query",
  "Tailwind CSS",
  "Ant Design",
  "Bootstrap",
  "Jest",
  "React Testing Library",
  "Playwright",
  "Git",
  "GitHub",
  "Figma",
] as const;

export const RESUME = {
  summary: {
    name: "Howaida Sayed",
    bio: "Experienced Senior Frontend Developer with 6 years of experience skilled in React, Next.js, Vue, and modern UI development, specializing in building scalable, user-centric web applications including financial platforms, dashboards, and e-commerce systems.",
    lines: ["Asyut, Egypt", "+20 109 196 1711", "howaidasayed95@gmail.com"],
  },
  experience: [
    {
      title: "Senior Frontend Developer",
      years: "January 2023 – February 2026",
      company: "Neoxero, Mansoura, Egypt (Remote)",
      bullets: [
        "Developed a full-scale financial platform including a loan management system handling interest calculations, VAT/origination fees, and dynamic amortization schedules with manual override capabilities.",
        "Built a scalable admin dashboard supporting complex workflows for Investors, Borrowers, and Financial Advisors with real-time data synchronization.",
        "Designed and implemented role-based access control (RBAC), secure routing guards, and multi-level approval workflows for fund transfers.",
        "Built a real-time financial market analysis platform with advanced charting integrations (TradingView, Lightweight Charts) for stock and sector insights.",
        "Developed a KPI management system with interactive dashboards and drag-and-drop functionality for customizable KPI visualization.",
        "Contributed to a scalable e-commerce theme system (Zid Platform) by transforming UI elements into reusable React components, creating a starter kit that reduced development time by ~50%.",
      ],
    },
    {
      title: "Frontend Developer",
      years: "January 2020 – December 2022",
      company: "True Apps, Asyut, Egypt (Remote)",
      bullets: [
        "Developed a desktop web application and admin dashboard using React.js and Ant Design for the Fivestars platform, enabling efficient management of operations and user activities.",
        "Built two cross-platform mobile applications (user & restaurant apps) using React Native, supporting seamless interaction between customers and service providers.",
        "Designed and launched the official landing page using Next.js, improving brand visibility and user acquisition.",
        "Managed application state across platforms using Redux, ensuring consistency and maintainability.",
      ],
    },
  ],
};

export const PORTFOLIO_FILTERS = [
  { id: "all" as const, label: "All" },
  { id: "Web Applications" as const, label: "Web Applications" },
  { id: "E-Commerce Solutions" as const, label: "E-Commerce Solutions" },
  { id: "Mobile Applications" as const, label: "Mobile Applications" },
];

export const SERVICES = [
  {
    title: "Frontend Development",
    description: "Building scalable, performant web applications using React, Next.js, and TypeScript — from complex dashboards to customer-facing platforms.",
    icon: "briefcase" as const
  },
  {
    title: "UI Component Systems",
    description: "Designing reusable component libraries and design systems with Tailwind, Ant Design, and Storybook that keep codebases consistent and maintainable.",
    icon: "list" as const
  },
  {
    title: "Data Dashboards & Charts",
    description: "Turning complex data into clear, interactive visualizations using ECharts, Chart.js, and TradingView for financial and business intelligence platforms.",
    icon: "chart" as const
  },
  {
    title: "State & Data Management",
    description: "Managing complex async state across data-intensive apps using Redux Toolkit and React Query, ensuring consistency and minimal unnecessary re-fetching.",
    icon: "binoculars" as const
  },
  {
    title: "Performance Optimization",
    description: "Improving load times and UX through code splitting, lazy loading, infinite scrolling, PWA capabilities, and smart data fetching strategies.",
    icon: "sun" as const
  },
  {
    title: "Cross-Platform Development",
    description: "Extending web products to mobile with React Native, and supporting multilingual audiences with full i18n and RTL/LTR handling.",
    icon: "calendar" as const
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
    name: "Saul Goodman",
    role: "Ceo & Founder",
    detail:
      "Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.",
  },
  {
    quote:
      "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
    name: "Sara Wilsson",
    role: "Designer",
    detail:
      "Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.",
  },
  {
    quote:
      "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
    name: "Jena Karlis",
    role: "Store Owner",
    detail:
      "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.",
  },
  {
    quote:
      "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
    name: "Matt Brandon",
    role: "Freelancer",
    detail:
      "Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.",
  },
  {
    quote:
      "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
    name: "John Larson",
    role: "Entrepreneur",
    detail:
      "Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.",
  },
];

export const CONTACT = {
  address: "Asyut, Egypt",
  phone: "+20 127 014 1771",
  email: "howaidasayed95@gmail.com",
  mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28394.72424517535!2d31.16381848464572!3d27.177032045374613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14450be607cb7bcd%3A0xba699162bfc01112!2sAsyut%2C%20Al%20Hamraa%20Ath%20Thaneyah%2C%20El%20Fateh%2C%20Assiut%20Governorate%2C%20Egypt!5e0!3m2!1sen!2sus!4v1775775371811!5m2!1sen!2sus"
};
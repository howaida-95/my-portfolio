/** Demo content aligned with the iPortfolio template structure */

export const SITE = {
  name: "Alex Smith",
  siteTitle: "iPortfolio",
  tagline: "UI/UX Designer & Web Developer.",
  typedRoles: ["Designer", "Developer", "Freelancer", "Photographer"] as const,
  profileImage:
    "https://raw.githubusercontent.com/themewagon/iPortfolio/main/assets/img/my-profile-img.jpg",
  heroImage:
    "https://raw.githubusercontent.com/themewagon/iPortfolio/main/assets/img/hero-bg.jpg",
  social: {
    twitter: "#",
    facebook: "#",
    instagram: "#",
    skype: "#",
    linkedin: "#",
  },
};

export const ABOUT_INTRO =
  "Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.";

export const ABOUT = {
  lead:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  closing:
    "Officiis eligendi itaque labore et dolorum mollitia officiis optio vero. Quisquam sunt adipisci omnis et ut. Nulla accusantium dolor incidunt officia tempore. Et eius omnis. Cupiditate ut dicta maxime officiis quidem quia. Sed et consectetur qui quia repellendus itaque neque.",
  factsLeft: [
    { label: "Birthday", value: "1 May 1995" },
    { label: "Website", value: "www.example.com" },
    { label: "Phone", value: "+123 456 7890" },
    { label: "City", value: "New York, USA" },
  ],
  factsRight: [
    { label: "Age", value: "30" },
    { label: "Degree", value: "Master" },
    { label: "Email", value: "email@example.com" },
    { label: "Freelance", value: "Available" },
  ],
};

export const STATS = [
  { icon: "smile" as const, end: 232, title: "Happy Clients", subtitle: "consequuntur quae" },
  { icon: "file" as const, end: 521, title: "Projects", subtitle: "adipisci atque cum quia aut" },
  {
    icon: "headset" as const,
    end: 1453,
    title: "Hours Of Support",
    subtitle: "aut commodi quaerat",
  },
  { icon: "users" as const, end: 32, title: "Hard Workers", subtitle: "rerum asperiores dolor" },
];

export const SKILLS = [
  { name: "HTML", percent: 100 },
  { name: "CSS", percent: 90 },
  { name: "JavaScript", percent: 75 },
  { name: "PHP", percent: 80 },
  { name: "WordPress/CMS", percent: 90 },
  { name: "Photoshop", percent: 55 },
];

export const RESUME = {
  summary: {
    name: "Brandon Johnson",
    bio: "Innovative and deadline-driven Graphic Designer with 3+ years of experience designing and developing user-centered digital/print marketing material from initial concept to final, polished deliverable.",
    lines: ["Portland par 127,Orlando, FL", "(123) 456-7891", "alice.barkley@example.com"],
  },
  education: [
    {
      degree: "Master of Fine Arts & Graphic Design",
      years: "2015 - 2016",
      school: "Rochester Institute of Technology, Rochester, NY",
      body: "Qui deserunt veniam. Et sed aliquam labore tempore sed quisquam iusto autem sit. Ea vero voluptatum qui ut dignissimos deleniti nerada porti sand markend",
    },
    {
      degree: "Bachelor of Fine Arts & Graphic Design",
      years: "2010 - 2014",
      school: "Rochester Institute of Technology, Rochester, NY",
      body: "Quia nobis sequi est occaecati aut. Repudiandae et iusto quae reiciendis et quis Eius vel ratione eius unde vitae rerum voluptates asperiores voluptatem Earum molestiae consequatur neque etlon sader mart dila",
    },
  ],
  experience: [
    {
      title: "Senior graphic design specialist",
      years: "2019 - Present",
      company: "Experion, New York, NY",
      bullets: [
        "Lead in the design, development, and implementation of the graphic, layout, and production communication materials",
        "Delegate tasks to the 7 members of the design team and provide counsel on all aspects of the project.",
        "Supervise the assessment of all graphic materials in order to ensure quality and accuracy of the design",
        "Oversee the efficient use of production project budgets ranging from $2,000 - $25,000",
      ],
    },
    {
      title: "Graphic design specialist",
      years: "2017 - 2018",
      company: "Stepping Stone Advertising, New York, NY",
      bullets: [
        "Developed numerous marketing programs (logos, brochures,infographics, presentations, and advertisements).",
        "Managed up to 5 projects or tasks at a given time while under pressure",
        "Recommended and consulted with clients on the most appropriate graphic design",
        "Created 4+ design presentations and proposals a month for clients and account managers",
      ],
    },
  ],
};

const PORTFOLIO_BASE =
  "https://raw.githubusercontent.com/themewagon/iPortfolio/main/assets/img/portfolio";

export const PORTFOLIO_ITEMS = [
  { title: "App 1", excerpt: "Lorem ipsum, dolor sit amet consectetur", category: "app" as const, image: `${PORTFOLIO_BASE}/app-1.jpg` },
  { title: "Product 1", excerpt: "Lorem ipsum, dolor sit amet consectetur", category: "product" as const, image: `${PORTFOLIO_BASE}/product-1.jpg` },
  { title: "Branding 1", excerpt: "Lorem ipsum, dolor sit amet consectetur", category: "branding" as const, image: `${PORTFOLIO_BASE}/branding-1.jpg` },
  { title: "Books 1", excerpt: "Lorem ipsum, dolor sit amet consectetur", category: "books" as const, image: `${PORTFOLIO_BASE}/books-1.jpg` },
  { title: "App 2", excerpt: "Lorem ipsum, dolor sit amet consectetur", category: "app" as const, image: `${PORTFOLIO_BASE}/app-2.jpg` },
  { title: "Product 2", excerpt: "Lorem ipsum, dolor sit amet consectetur", category: "product" as const, image: `${PORTFOLIO_BASE}/product-2.jpg` },
  { title: "Branding 2", excerpt: "Lorem ipsum, dolor sit amet consectetur", category: "branding" as const, image: `${PORTFOLIO_BASE}/branding-2.jpg` },
  { title: "Books 2", excerpt: "Lorem ipsum, dolor sit amet consectetur", category: "books" as const, image: `${PORTFOLIO_BASE}/books-2.jpg` },
  { title: "App 3", excerpt: "Lorem ipsum, dolor sit amet consectetur", category: "app" as const, image: `${PORTFOLIO_BASE}/app-3.jpg` },
  { title: "Product 3", excerpt: "Lorem ipsum, dolor sit amet consectetur", category: "product" as const, image: `${PORTFOLIO_BASE}/product-3.jpg` },
  { title: "Branding 3", excerpt: "Lorem ipsum, dolor sit amet consectetur", category: "branding" as const, image: `${PORTFOLIO_BASE}/branding-3.jpg` },
  { title: "Books 3", excerpt: "Lorem ipsum, dolor sit amet consectetur", category: "books" as const, image: `${PORTFOLIO_BASE}/books-3.jpg` },
];

export const PORTFOLIO_FILTERS = [
  { id: "all" as const, label: "All" },
  { id: "app" as const, label: "App" },
  { id: "product" as const, label: "Product" },
  { id: "branding" as const, label: "Branding" },
  { id: "books" as const, label: "Books" },
];

export const SERVICES = [
  { title: "Lorem Ipsum", description: "Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident", icon: "briefcase" as const },
  { title: "Dolor Sitema", description: "Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata", icon: "list" as const },
  { title: "Sed ut perspiciatis", description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur", icon: "chart" as const },
  { title: "Magni Dolores", description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", icon: "binoculars" as const },
  { title: "Nemo Enim", description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque", icon: "sun" as const },
  { title: "Eiusmod Tempor", description: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi", icon: "calendar" as const },
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
  address: "A108 Adam Street, New York, NY 535022",
  phone: "+1 5589 55488 55",
  email: "info@example.com",
  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus",
};

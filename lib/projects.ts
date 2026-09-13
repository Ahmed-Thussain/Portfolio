export type ProjectStatus = "Production" | "In Development";

export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  tech: string[];
  contribution: string;
  status: ProjectStatus;
  url?: string;
};

export const projects: Project[] = [
  {
    slug: "fast-pos",
    name: "Fast POS & License Manager",
    category: "POS Application · Web / Android · Offline & Online",
    description:
      "POS and business management application supporting offline and online operations, Android and web platforms, and software license management.",
    tech: [
      "React.js",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Capacitor",
      "React Native",
      "Node.js",
    ],
    contribution:
      "Built from the ground up — POS functionality, business workflows, frontend features, mobile support, and license management.",
    status: "Production",
  },
  {
    slug: "clikly",
    name: "Clikly",
    category: "Cloud Storage SaaS Platform",
    description:
      "Cloud storage platform for file and folder management, including a desktop helper application distributed as an MSI installer.",
    tech: ["PHP", "MariaDB/MySQL", "JavaScript", "C#/.NET"],
    contribution:
      "Built from the ground up — platform, cloud storage functionality, frontend/backend, and the desktop upload workflow.",
    status: "Production",
    url: "https://clikly.com",
  },
  {
    slug: "mizan",
    name: "Mizan",
    category: "Legal Office Management SaaS",
    description:
      "Legal office management platform supporting case management, clients, documents, billing, users, branches, and business operations.",
    tech: ["React.js", "Vite", "Tailwind CSS", "Radix UI", "Node.js", "MySQL"],
    contribution:
      "Built from the ground up — software development, business workflow design, product features, and platform enhancement.",
    status: "Production",
    url: "https://mizan.lawyertech.sa",
  },
  {
    slug: "sanad",
    name: "Sanad",
    category: "Legal Services SaaS Platform (Saudi Arabia)",
    description:
      "Legal-services platform covering client intake, case/document handling, and payments, with an AI legal assistant built into the product.",
    tech: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Node.js/Express",
      "MariaDB",
      "Stripe",
      "Anthropic Claude",
    ],
    contribution:
      "Built from the ground up — full-stack development and the AI legal-assistant integration.",
    status: "Production",
    url: "https://sanad.lawyertech.sa",
  },
  {
    slug: "ibi-learning-flows",
    name: "IBI Learning Flows",
    category: "E-Learning Platform",
    description:
      "E-learning platform for course delivery and language learning, covering courses, students, and learning workflows.",
    tech: ["Laravel", "Vue.js 3", "Pinia", "Bootstrap 5", "Vite"],
    contribution:
      "Built from the ground up — platform development and feature implementation.",
    status: "Production",
    url: "https://ibi-institutes.com",
  },
  {
    slug: "rakeb",
    name: "Rakeb",
    category: "Logistics & Delivery SaaS",
    description:
      "Courier/delivery platform connecting merchants and delivery personnel, with mobile apps for both sides plus a web admin panel.",
    tech: ["Laravel", "Flutter", "Dart", "Firebase"],
    contribution:
      "Enhanced an existing platform — implemented new features and client-requested changes.",
    status: "Production",
    url: "https://rakeb.abicex.com",
  },
  {
    slug: "lawyertech",
    name: "LawyerTech",
    category: "Legal Technology Platform — Corporate Site + Portfolio",
    description:
      "Two-part web presence: the main corporate site presenting services, and a separate portfolio/landing page showcasing projects.",
    tech: ["PHP", "Next.js"],
    contribution:
      "Built from the ground up — both the PHP main site and the Next.js portfolio landing page.",
    status: "Production",
    url: "https://lawyertech.sa",
  },
  {
    slug: "abicerp",
    name: "ABICERP",
    category: "ERP / CRM Platform",
    description:
      "ERP/CRM platform, built on an open-source Perfex CRM foundation, customized with client-specific features including an Egyptian e-invoicing (ETA) module and accounting functionality.",
    tech: ["PHP", "CodeIgniter", "Laravel Mix", "Tailwind CSS", "MySQL"],
    contribution:
      "Enhanced an existing platform — implemented new modules and client-requested features.",
    status: "Production",
    url: "https://abicerp.com",
  },
  {
    slug: "xcrp",
    name: "XCRP",
    category: "Next-Generation CRM/ERP Platform",
    description:
      "Custom CRM/ERP platform under active development, architected around and integrating open-source foundations (Frappe/ERPNext, Twenty CRM) with custom modules.",
    tech: ["Frappe/ERPNext", "Python"],
    contribution:
      "Built from the ground up — platform architecture and integration work.",
    status: "In Development",
  },
];

// === FILE: lib/tracks-data.ts ===

export interface Track {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export const TRACKS: Track[] = [
  {
    id: "01",
    name: "Web Development with AI",
    description: "Build modern websites and web apps using AI-assisted coding tools and frameworks.",
    iconName: "Code2",
  },
  {
    id: "02",
    name: "Graphic Design",
    description: "Master visual communication, branding, and design tools for digital and print media.",
    iconName: "Palette",
  },
  {
    id: "03",
    name: "UI/UX Design",
    description: "Design intuitive user interfaces and experiences that delight and convert.",
    iconName: "Layout",
  },
  {
    id: "04",
    name: "Digital Marketing",
    description: "Drive growth through SEO, social media, email campaigns, and paid advertising.",
    iconName: "Megaphone",
  },
  {
    id: "05",
    name: "Data Analysis",
    description: "Turn raw data into actionable insights using spreadsheets, SQL, and visualization tools.",
    iconName: "BarChart2",
  },
  {
    id: "06",
    name: "Cybersecurity Awareness",
    description: "Understand threats, protect digital assets, and build safe online habits.",
    iconName: "ShieldCheck",
  },
  {
    id: "07",
    name: "Mobile App Development",
    description: "Create native and cross-platform mobile applications for iOS and Android.",
    iconName: "Smartphone",
  },
  {
    id: "08",
    name: "Video Editing & Content Production",
    description: "Produce, edit, and publish engaging video content for social media and beyond.",
    iconName: "Video",
  },
  {
    id: "09",
    name: "Photography & Smartphone Content",
    description: "Capture professional-quality photos and content using just your smartphone.",
    iconName: "Camera",
  },
  {
    id: "10",
    name: "Copywriting & Business Writing",
    description: "Write persuasive copy, professional emails, and content that drives action.",
    iconName: "PenTool",
  },
  {
    id: "11",
    name: "E-commerce & Online Store Management",
    description: "Launch and grow an online store, manage inventory, and optimize sales funnels.",
    iconName: "ShoppingBag",
  },
  {
    id: "12",
    name: "Product Management",
    description: "Lead product strategy, roadmaps, and cross-functional teams from idea to launch.",
    iconName: "Layers",
  },
  {
    id: "13",
    name: "Cloud Computing Basics",
    description: "Understand cloud platforms, deploy applications, and manage cloud infrastructure.",
    iconName: "Cloud",
  },
  {
    id: "14",
    name: "Prompt Engineering & AI Productivity",
    description: "Master AI tools and prompt techniques to supercharge your personal productivity.",
    iconName: "BrainCircuit",
  },
  {
    id: "15",
    name: "Financial Literacy for Digital Workers",
    description: "Manage income, taxes, savings, and investments as a digital professional.",
    iconName: "Banknote",
  },
];

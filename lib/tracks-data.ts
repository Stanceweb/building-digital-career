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
    name: "Web Development",
    description: "Build modern websites and web apps using the latest tools, frameworks, and AI-assisted coding techniques.",
    iconName: "Code2",
  },
  {
    id: "02",
    name: "UI/UX Design",
    description: "Design intuitive, beautiful user interfaces and experiences that delight users and drive results.",
    iconName: "Layout",
  },
  {
    id: "03",
    name: "Video Editing & Content Creation",
    description: "Produce, edit, and publish engaging video content for social media, YouTube, and beyond.",
    iconName: "Video",
  },
  {
    id: "04",
    name: "Copywriting & Blogging",
    description: "Write persuasive copy, compelling blog posts, and content that attracts audiences and drives action.",
    iconName: "PenTool",
  },
  {
    id: "05",
    name: "Photography",
    description: "Capture professional-quality photos using your smartphone or camera and build a content portfolio.",
    iconName: "Camera",
  },
  {
    id: "06",
    name: "Graphic Design",
    description: "Master visual communication, branding, and design tools to create stunning graphics for any medium.",
    iconName: "Palette",
  },
];

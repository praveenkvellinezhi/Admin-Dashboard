import kaja from "../../assets/Images/Kaja.jpg"
import Praveena from "../../assets/Images/Praveena.jpg"
import Abhijith from "../../assets/Images/Abi.jpg"
import Sharookh from "../../assets/Images/Sharookh.jpg"
import Pranav from "../../assets/Images/Pranav.jpg"
import profile from "../../assets/Images/profile.jpg"
import Jubair from "../../assets/Images/jubair.jpg"

import logo1 from "../../assets/Logo/logo1 4.jpeg"
import logo2 from "../../assets/Logo/logo1.jpeg"
import logo3 from "../../assets/Logo/logo2.jpeg"
import logo4 from "../../assets/Logo/Logo3.jpeg"




export const projects = [
  {
    id: 1,
    logo: logo1,
    title: "Lorem Ipsum",
    subtitle: "Static Website",
    category: "Web Development",
    client: "ABC Pvt Ltd",
    status: "Completed",
    techStack: "MERN Stack",
    startDate: "11/11/2025",
    dueDate: "11/12/2025",
    description:
      "A modern business website built to showcase services and improve digital presence.",
    features: [
      "Responsive design",
      "SEO optimized",
      "Fast performance",
      "Modern UI"
    ],
    members: [
      { name: "Kaja", image: kaja },
      { name: "Praveena", image: Praveena },
      { name: "Jubair", image: Jubair }
    ],
    extraMembers: 5
  },

  {
    id: 2,
    logo: logo2,
    title: "Appify",
    subtitle: "Mobile Application",
    category: "Mobile Development",
    client: "TechNova",
    status: "In Progress",
    techStack: "React Native",
    startDate: "05/12/2025",
    dueDate: "25/12/2025",
    description:
      "A productivity-based mobile application for real-time task management.",
    features: [
      "User authentication",
      "Push notifications",
      "Cloud sync"
    ],
    members: [
      { name: "Abhijith", image: Abhijith },
      { name: "Sharookh", image: Sharookh },
      { name: "Profile", image: profile }
    ],
    extraMembers: 3
  },

  {
    id: 3,
    logo: logo3,
    title: "Zen Studio",
    subtitle: "Portfolio Website",
    category: "Frontend Development",
    client: "Freelancer Hub",
    status: "Completed",
    techStack: "Next.js",
    startDate: "10/10/2025",
    dueDate: "20/11/2025",
    description:
      "A personal branding portfolio website for enhancing freelancer visibility.",
    features: [
      "Animated UI",
      "Dark mode",
      "Blazing fast load time"
    ],
    members: [
      { name: "Kaja", image: kaja },
      { name: "Pranav", image: Pranav },
      { name: "Abhijith", image: Abhijith }
    ],
    extraMembers: 2
  },

  {
    id: 4,
    logo: logo4,
    title: "FinTrack",
    subtitle: "Dashboard System",
    category: "Finance Application",
    client: "FinCorp",
    status: "In Progress",
    techStack: "MERN + Tailwind",
    startDate: "01/09/2025",
    dueDate: "30/11/2025",
    description:
      "A powerful finance tracking dashboard for managing income, expenses, and analytics.",
    features: [
      "Real-time graphs",
      "Role-based access",
      "Secure authentication"
    ],
    members: [
      { name: "Kaja", image: kaja },
      { name: "Pranav", image: Pranav },
      { name: "Abhijith", image: Abhijith }
    ],
    extraMembers: 4
  },

  {
    id: 5,
    logo: logo1,
    title: "EduSpark",
    subtitle: "E-Learning Platform",
    category: "Education Platform",
    client: "SkillUp Academy",
    status: "Completed",
    techStack: "React + Node.js",
    startDate: "10/08/2025",
    dueDate: "15/10/2025",
    description:
      "An online learning portal for managing courses, students, and live classes.",
    features: [
      "Live class integration",
      "Student dashboard",
      "Course tracking"
    ],
    members: [
      { name: "Praveena", image: Praveena },
      { name: "Sharookh", image: Sharookh },
      { name: "Jubair", image: Jubair }
    ],
    extraMembers: 6
  },

  {
    id: 6,
    logo: logo2,
    title: "ShopSwift",
    subtitle: "E-Commerce Platform",
    category: "E-Commerce",
    client: "RetailX",
    status: "In Progress",
    techStack: "Next.js + Stripe",
    startDate: "01/10/2025",
    dueDate: "20/12/2025",
    description:
      "A complete online shopping platform with payment integration and admin controls.",
    features: [
      "Shopping cart",
      "Online payment",
      "Admin dashboard",
      "Order tracking"
    ],
    members: [
      { name: "Abhijith", image: Abhijith },
      { name: "Pranav", image: Pranav },
      { name: "Profile", image: profile }
    ],
    extraMembers: 4
  }
];



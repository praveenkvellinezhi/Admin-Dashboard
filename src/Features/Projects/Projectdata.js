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
    techStack: "Mern stack",
    startDate: "11/11/2025",
    dueDate: "11/11/2025",
    members: [
      kaja,
      Praveena,
      Jubair
    ],
    extraMembers: 5
  },
  {
    id: 2,
    logo: logo2,
    title: "Appify",
    subtitle: "Mobile App",
    techStack: "React Native",
    startDate: "05/12/2025",
    dueDate: "25/12/2025",
    members: [
      Abhijith,
      Sharookh,
      profile
    ],
    extraMembers: 3
  },
  {
    id: 3,
    logo:logo3,
    title: "Zen Studio",
    subtitle: "Portfolio Website",
    techStack: "Next.js",
    startDate: "10/10/2025",
    dueDate: "20/11/2025",
    members: [
        kaja,Pranav,Abhijith
      
    ],
    extraMembers: 2
  },
  {
    id: 4,
    logo: logo4,
    title: "FinTrack",
    subtitle: "Dashboard System",
    techStack: "MERN + Tailwind",
    startDate: "01/09/2025",
    dueDate: "30/11/2025",
    members: [
        kaja,Pranav,Abhijith

      
    ],
    extraMembers: 4
  }
];

import React from 'react'
import { RefreshCcw } from 'lucide-react';

function OngoingProjects() {
 const projects = [
    {
      title: "Aspire Zones X",
      subtitle: "Redesign",
      status: "On-going",
      progress: 70,
      due: "December 10, 2025",
    },
    {
      title: "Client Management",
      subtitle: "UI/UX",
      status: "Completed",
      progress: 100,
      due: "January 05, 2025",
    },
    {
      title: "Project Tracker",
      subtitle: "Full Stack",
      status: "Pending",
      progress: 45,
      due: "November 28, 2025",
    },
    {
      title: "Inventory System",
      subtitle: "Backend",
      status: "On-going",
      progress: 60,
      due: "December 20, 2025",
    },
  ];
  return (
    <div className='bg-gray-200 rounded-3xl p-6'>
         {/* Section Header */}

         <div className='flex items-center'>
            <div className='bg-white rounded-4xl w-8 h-8 flex items-center justify-center'>
                 <RefreshCcw  /></div>
             
              <div>
                <h2>On Going Projects</h2>
              </div>
         </div>
            {/* Card List */} 
            <div className='flex flex-col gap-5'>
                {projects.map((item,index)=>{
                    const FirstLetter= item.title.charAt(0).toUpperCase();
                })}
            </div>
    </div>
  )
}

export default OngoingProjects

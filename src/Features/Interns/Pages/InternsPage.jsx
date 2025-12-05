import React, { useState } from 'react'
import InternsHeader from '../Components/InternsHeader'
import { interns } from '../InternsData';
import EmployeeList from '../../Employees/Components/EmployeeList';
import InternsList from '../Components/InternList';

export default function InternsPage() {

  const [search,setSearch]=useState('');
    const[role,setRole]=useState('All');

  
    // FILTER lOGIC///

const filteredInterns=interns.filter((emp)=>{
  return(
    (role === "All" || emp.role === role)&& emp.name.toLowerCase().includes(search.toLowerCase())
  )
})

  return ( 
    <div>
      <InternsHeader  search={search}
      setSearch={setSearch}
      role={role}
      setRole={setRole}/>

      <InternsList interns={filteredInterns}/>
    </div>
  )
}

import React, { useState } from 'react'
import InternsHeader from '../Components/InternsHeader'
import { interns } from '../InternsData';
import EmployeeList from '../../Employees/Components/EmployeeList';

export default function InternsPage() {

  const [search,setSearch]=useState('');
    const[role,setRole]=useState('All');

  
    // FILTER lOGIC///

    const filteredInterns=interns.filter((int=>{
      return(
        (role === "All" || int.role === role )&& int.name.toLowerCase().includes(search.toLowerCase())

      )
    }))
  return (
    <div>
      <InternsHeader  search={search}
      setSearch={setSearch}
      role={role}
      setRole={setRole}/>

      <InternsPage interns={filteredInterns}/>
    </div>
  )
}

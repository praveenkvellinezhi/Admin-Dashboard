import React from 'react'
import EmployeeHeader from '../Components/EmployeeHeader'
import { useState } from 'react'
import EmployeeList from '../Components/EmployeeList';
import { employees } from '../employee';
export default function EmployeePage() {

const [search,setSearch]=useState('');
const [role,setRole]=useState("All");



// Filter logic ////

const filteredEmployees=employees.filter((emp)=>{
  return(
    (role === "All" || emp.role === role)&& emp.name.toLowerCase().includes(search.toLowerCase())
  )
})

// const filteredEmployees=employees.filter((emp)=>{
//   return(
//     (role === "All" || emp.role === role)&&
//     emp.name.toLowerCase().includes(search.toLowerCase())
//   );
// });


  return (
    <div>
      <EmployeeHeader search={search} 
      setSearch={setSearch} 
      role={role} 
      setRole={setRole}/>


      <EmployeeList employees={filteredEmployees}/>
    </div>


  )
}

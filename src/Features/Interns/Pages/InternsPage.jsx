import React, { useState } from 'react'
import InternsHeader from '../Components/InternsHeader'

import EmployeeList from '../../Employees/Components/EmployeeList';
import InternsList from '../Components/InternList';
import { fetchInterns,getInternError,getInternStatus,selectAllInterns } from "../../../Redux/Slices/internSlice";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";

export default function InternsPage() {
    const [search,setSearch]=useState('');
    const[role,setRole]=useState('All');


   const dispatch = useDispatch();
 
  const interns = useSelector(selectAllInterns);
  const status = useSelector(getInternStatus);
  const error = useSelector(getInternError);

  useEffect(()=>{
    if(status == "idle"){
      dispatch(fetchInterns());
    }
  },[dispatch,status]);
   if (status === "loading") {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  if (status === "failed") {
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );
  }
  



  


const filteredInterns=interns.filter((int)=>{
  return(
    (role === "All" || int.role === role)&& int.name.toLowerCase().includes(search.toLowerCase())
  )
})

  return ( 
    <div>
      <InternsHeader  search={search}
      setSearch={setSearch}
      role={role}
      setRole={setRole}/>

      {filteredInterns.length === 0 ? (
        <p className='text-center mt-16 text-gray-500 text-lg'> No interns found</p>
      ):( <InternsList interns={filteredInterns}/>)}
    </div>
  )
}

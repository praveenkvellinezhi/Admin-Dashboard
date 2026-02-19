import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BasicInformation from '../../Employees/Components/BasicInformation';
import EmployeeDetailsHeader from '../../Employees/Components/DetailsHeader';
import OngoingProjects from '../../Employees/Components/OngoingProjects';
import DocumentsCard from '../../Employees/Components/DocumentsCard';
import StatusNotes from '../../Employees/Components/StatusNotes';

import {
  fetchEmployeesById,
  selectSelectedEmployee,
  getSingleEmployeeStatus,
} from '../../../Redux/Slices/employeeslice';
import DetailsLoader from '../../../Components/Shared/DetailLoader';

export default function InternPageDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const employee = useSelector(selectSelectedEmployee);
  const status = useSelector(getSingleEmployeeStatus);

  useEffect(() => {
    dispatch(fetchEmployeesById(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <DetailsLoader />;
  }

  if (status === 'failed' || !employee) {
    return <p className="text-center mt-10 text-red-500">Employee not found</p>;
  }

  return (
    <div className="min-h-screen">
      <EmployeeDetailsHeader employee={employee} />

      <div className=" mx-auto px-6 py-6 space-y-6">
        <BasicInformation employee={employee} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <OngoingProjects employee={employee} />
          <DocumentsCard employee={employee} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <StatusNotes employee={employee} />
        </div>
      </div>
    </div>
  );
}

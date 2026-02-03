import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import EmployeeBasicDetails from "../Components/BasicDetail";
import JobRoleInformation from "../Components/Jobdetails";
import SalaryEmploymentDetails from "../Components/SalaryDetails";
import DocumentsUpload from "../Components/DocumentUpload";
import StatusNotes from "../Components/StatusNotes";

import {
  fetchEmployeesById,
  editEmployee,
  selectSelectedEmployee,
  getSingleEmployeeStatus,
  getEmployeeValidationErrors
} from "../../../Redux/Slices/employeeslice";

export default function EditForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employeeData = useSelector(selectSelectedEmployee);
  const status = useSelector(getSingleEmployeeStatus);
    const backendErrors = useSelector(getEmployeeValidationErrors);
  

  const [formData, setFormData] = useState(null);

  /* =========================
     FETCH EMPLOYEE
  ========================= */
    useEffect(() => {
  if (!backendErrors) return;

  // Case 1: string error
  if (typeof backendErrors === "string") {
    toast.error(backendErrors);
    return;
  }

  // Case 2: object errors (field-wise)
  if (typeof backendErrors === "object") {
    Object.values(backendErrors).forEach((error) => {
      if (Array.isArray(error)) {
        error.forEach((msg) => toast.error(msg));
      } else if (typeof error === "string") {
        toast.error(error);
      }
    });
  }
}, [backendErrors]);
  useEffect(() => {
    dispatch(fetchEmployeesById(id));
  }, [dispatch, id]);

  /* =========================
     SET INITIAL FORM DATA
  ========================= */
  useEffect(() => {
    if (employeeData) {
      const emp = employeeData.employee ?? employeeData;

      setFormData({
        ...emp,

        // file fields (edit = optional)
        profile_image: null,
        resume: null,
        id_proof_document: null,
        offer_letter: null,

        // 🔥 IMPORTANT: keep id_proof_type
        id_proof_type: emp.id_proof_type ?? "",

        // defaults
        is_manager: emp.is_manager ?? false,
        reporting_manager: emp.reporting_manager ?? "",
        notes: emp.notes ?? "",
      });
    }
  }, [employeeData]);

  /* =========================
     INPUT CHANGE (TEXT / SELECT / CHECKBOX)
  ========================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* =========================
     FILE CHANGE
  ========================= */
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async () => {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "" && value !== undefined) {
        data.append(key, value);
      }
    });

    const result = await dispatch(
      editEmployee({
        employeeId: id,
        formData: data,
      })
    );

    if (editEmployee.fulfilled.match(result)) {
      navigate(`/employees/${id}`);
    }
  };

  if (status === "loading" || !formData) {
    return <p className="text-center mt-10">Loading...</p>;
  }



  return (
    <div className="min-h-screen bg-gray-100 px-6 py-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">
          Edit Employee
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded-md text-sm bg-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* BASIC DETAILS */}
      <EmployeeBasicDetails
        formData={formData}
        onChange={handleChange}
        onImageChange={handleFileChange}
      />

      {/* JOB DETAILS */}
      <JobRoleInformation
        formData={formData}
        onChange={handleChange}
      />

      {/* SALARY DETAILS */}
      <SalaryEmploymentDetails
        formData={formData}
        onChange={handleChange}
      />

      {/* 🔥 DOCUMENTS (IMPORTANT FIX HERE) */}
      <DocumentsUpload
        formData={formData}
        onChange={handleChange}        // ✅ for id_proof_type select
        onFileChange={handleFileChange} // ✅ for file inputs
      />

      {/* STATUS & NOTES */}
      <StatusNotes
        formData={formData}
        onChange={handleChange}
      />
    </div>
  );
}

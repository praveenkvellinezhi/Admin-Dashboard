import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import toast from "react-hot-toast";

import { fetchInterns } from "../../../Redux/Slices/internSlice";
import {
  fetchEmployees,
  addEmployee,
  getEmployeeStatus,
  getEmployeeValidationErrors
} from "../../../Redux/Slices/employeeslice";

import EmployeeBasicDetails from "../Components/BasicDetail";
import JobRoleInformation from "../Components/Jobdetails";
import SalaryEmploymentDetails from "../Components/SalaryDetails";
import DocumentsUpload from "../Components/DocumentUpload";
import StatusNotes from "../Components/StatusNotes";

export default function AddForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(getEmployeeStatus);
  const backendErrors = useSelector(getEmployeeValidationErrors);

  /* =========================
     FORM STATE
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    date_of_birth: "",
    department: "",
    role: "",
    position: "",
    joining_date: "",

    employment_type: "",
    salary_type: "",
    salary: "",
    payment_method: "",

    is_manager: false,
    reporting_manager: "",
    notes: "",
    status: "active",
    address: "",

    profile_image: null,
    resume: null,
    id_proof_document: null,
    offer_letter: null,
  });

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      profile_image: file,
      profile_image_url: URL.createObjectURL(file),
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files?.[0] || null,
    }));
  };

  /* =========================
     FORM DATA BUILDER
  ========================= */
  const buildFormData = () => {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        data.append(key, value);
      }
    });

    return data;
  };

  /* =========================
     VALIDATION
  ========================= */
  const validateBeforeSubmit = () => {
    if (!formData.department) {
  toast.error("Department is required");
  return;
}

    if (
      formData.employment_type === "staff" &&
      !formData.salary
    ) {
      toast.error("Salary is required for staff employees");
      return false;
    }
    return true;
  };

  /* =========================
     SUBMIT HANDLERS
  ========================= */
  const handleSave = async () => {
    if (!validateBeforeSubmit()) return;

    const result = await dispatch(addEmployee(buildFormData()));

    if (addEmployee.fulfilled.match(result)) {
      if (formData.employment_type === "intern") {
        toast.success("Intern added successfully");
        dispatch(fetchInterns());
        navigate("/interns");
      } else {
        toast.success("Employee added successfully");
        dispatch(fetchEmployees());
        navigate("/employees");
      }
    }
  };

  const handleSaveAndAddAnother = async () => {
    if (!validateBeforeSubmit()) return;

    const result = await dispatch(addEmployee(buildFormData()));

    if (addEmployee.fulfilled.match(result)) {
      if (formData.employment_type === "intern") {
        toast.success("Intern added successfully");
        dispatch(fetchInterns());
      } else {
        toast.success("Employee added successfully");
        dispatch(fetchEmployees());
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        date_of_birth: "",
        department: "",
        role: "",
        position: "",
        joining_date: "",
        employment_type: "",
        salary_type: "",
        salary: "",
        payment_method: "",
        is_manager: false,
        reporting_manager: "",
        notes: "",
        status: "active",
        address: "",
        profile_image: null,
        resume: null,
        id_proof_document: null,
        offer_letter: null,
      });
    }
  };


  return (<>
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      <EmployeeBasicDetails
        formData={formData}
        onChange={handleChange}
        onImageChange={handleImageChange}
        backendErrors={backendErrors}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <JobRoleInformation
          formData={formData}
          onChange={handleChange}
          backendErrors={backendErrors}
        />

        <SalaryEmploymentDetails
          formData={formData}
          onChange={handleChange}
          backendErrors={backendErrors}
        />
      </div>

      <DocumentsUpload
        formData={formData}
        onChange={handleChange}
        onFileChange={handleFileChange}
        backendErrors={backendErrors}
      />

      <StatusNotes
        formData={formData}
        onChange={handleChange}
        backendErrors={backendErrors}
      />

      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          disabled={status === "loading"}
          onClick={handleSaveAndAddAnother}
          className="px-4 py-2 border rounded bg-gray-100"
        >
          Save & Add Another
        </button>

        <button
          disabled={status === "loading"}
          onClick={handleSave}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          {status === "loading" ? "Saving..." : "Save Employee"}
        </button>
      </div>
    </div>
    </>
  );
}

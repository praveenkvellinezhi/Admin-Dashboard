import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchInterns } from "../../../Redux/Slices/internSlice";

import {
  fetchEmployees,
  
  addEmployee,
  getEmployeeStatus,
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

  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    date_of_birth: "",
    department: "",
    position: "",
    joining_date: "",

    employment_type: "", 
    salary_type: "",
    salary: "",          
    payment_method: "",
    notes: "", 

    status: "active",
    address: "",

    profile_image: null,
    resume: null,
    id_proof_document: null,
    offer_letter: null,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      [name]: files[0] || null,
    }));
  };


  const buildFormData = () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        data.append(key, value);
      }
    });
    return data;
  };

 
  const validateBeforeSubmit = () => {
    if (
      formData.employment_type === "staff" &&
      !formData.salary
    ) {
      alert("Salary is required for staff employees");
      return false;
    }
    return true;
  };

const handleSave = async () => {
  if (!validateBeforeSubmit()) return;

  const result = await dispatch(addEmployee(buildFormData()));

  if (addEmployee.fulfilled.match(result)) {
    if (formData.employment_type === "intern") {
      alert("Intern added successfully");
      dispatch(fetchInterns());
      navigate("/interns"); 
    } else {
      alert("Employee added successfully");
      dispatch(fetchEmployees());
      navigate("/employees"); 
  }
};


const handleSaveAndAddAnother = async () => {
  if (!validateBeforeSubmit()) return;

  const result = await dispatch(addEmployee(buildFormData()));

  if (addEmployee.fulfilled.match(result)) {
    if (formData.employment_type === "intern") {
      alert("Intern added successfully");
      dispatch(fetchInterns());
    } else {
      alert("Employee added successfully");
      dispatch(fetchEmployees());
    }

  
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      date_of_birth: "",
      department: "",
      position: "",
      joining_date: "",
      employment_type: "",
      salary_type: "",
      salary: "",
      payment_method: "",
      status: "active",
      address: "",
      profile_image: null,
      resume: null,
      id_proof_document: null,
      offer_letter: null,
    });
  }
};



  return (
    <div className="space-y-6">
      <EmployeeBasicDetails
        formData={formData}
        onChange={handleChange}
        onImageChange={handleImageChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <JobRoleInformation
          formData={formData}
          onChange={handleChange}
        />

        <SalaryEmploymentDetails
          formData={formData}
          onChange={handleChange}
        />
      </div>

      <DocumentsUpload
        formData={formData}
        onChange={handleFileChange}
      />

      <StatusNotes
        formData={formData}
        onChange={handleChange}
      />

            <div className="flex justify-end gap-3 pt-4">
        <button
          className="px-4 py-2 border rounded"
          onClick={() => navigate(-1)}
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
  );
}
}
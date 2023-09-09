import React, { useState } from "react";
import { Contact } from "../../features/contacts/models/Contacts";
import LoadingCustomBtn from "../../common/Loader/LoadingCustomBtn";

interface Props {
  closeModal: () => void;
  onSubmit: (value: any) => void;
  defaultValue?: Contact;
  isLoading: boolean;
  text: string;
}

export const ContactFormModal: React.FC<Props> = ({ closeModal, onSubmit, defaultValue, isLoading, text }) => {
  const [formState, setFormState] = useState<Contact>(
    defaultValue || {
      firstName: "",
      lastName: "",
      mobileNo: "",
      status: "",
    }
  );
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    const requiredFields = ["firstName", "status"];
    const missingFields = requiredFields.filter((field) => !formState[field as keyof Contact]);

    if (missingFields.length === 0) {
      setErrors([]);
      return true;
    } else {
      setErrors(missingFields);
      return false;
    }
  };

  const isValidMobileNo = (mobileNo: string) => {
    // Check if the mobileNo is 10 digits and contains only numbers
    const mobileNoPattern = /^\d{10,12}$/;
    return mobileNoPattern.test(mobileNo);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "mobileNo") {
      // Check if the value contains only numeric characters
      const numericPattern = /^[0-9]*$/;
      if (!value) {
        setErrors([]);
      } else if (!numericPattern.test(value)) {
        setErrors(["Mobile No. must contain only numbers."]);
      } else if (!isValidMobileNo(value)) {
        setErrors(["Invalid Mobile No."]);
      } else {
        setErrors([]);
      }
    }

    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-999 bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-50">
      <div className="modal sm:w-full max-w-md py-8 px-10 bg-white dark:bg-black rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Contact Form</h3>
          <button onClick={closeModal} className="text-gray-500 hover:text-red-500 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 dark:text-white">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formState.firstName || ''}
              onChange={handleChange}
              className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring focus:ring-blue-500 focus:outline-none dark:bg-black"
              placeholder="Enter First Name"
            />
            {errors.includes("firstName") && (
              <p className="text-[#CD5D5D] text-sm mt-1">First Name is required.</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 dark:text-white">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formState.lastName || ''}
              onChange={handleChange}
              className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring focus:ring-blue-500 focus:outline-none dark:bg-black"
              placeholder="Enter Last Name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mobileNo" className="block text-gray-700 dark:text-white">Mobile No.</label>
            <input
              type="text"
              name="mobileNo"
              id="mobileNo"
              value={formState.mobileNo || ''}
              onChange={handleChange}
              className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring focus:ring-blue-500 focus:outline-none dark:bg-black"
              placeholder="Enter Mobile No."
            />
            {errors.length > 0 && !errors.includes("firstName") && !errors.includes("status") && (
              <p className="text-[#CD5D5D] text-sm mt-1">{errors[0]}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white">Status</label>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formState.status === "active"}
                  onChange={handleChange}
                  className="form-radio text-blue-500 focus:ring-0"
                />
                <span className="ml-2 text-gray-700 dark:text-white">Active</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={formState.status === "inactive"}
                  onChange={handleChange}
                  className="form-radio text-red-500 focus:ring-0"
                />
                <span className="ml-2 text-gray-700 dark:text-white">Inactive</span>
              </label>
            </div>
            {errors.includes("status") && (
              <p className="text-[#CD5D5D] text-sm mt-1">Status is required.</p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="hover:bg-meta-3 bg-primary text-white px-4 py-2 rounded-lg focus:outline-none"
            >
              {
                isLoading ?
                  <LoadingCustomBtn /> : text
              }
            </button>
            <button
              type="button"
              onClick={closeModal}
              disabled={isLoading}
              className="ml-2 text-gray-500 hover:text-red-500 dark:text-white focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

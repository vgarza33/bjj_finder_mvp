import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddGym = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        country: "",
        province_state: "",
        latitude: null,
        longitude:null,
        instagram:"",
        website:"",
        drop_in_fee:"",
        description:""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        // Create a copy of the current form data
        const updatedFormData = { ...formData };
        
        // Check if the field is longitude or latitude
        if (name === "longitude" || name === "latitude") {
            // For coordinate fields, handle differently
            if (value === "") {
                // If the field is empty, set the value to null
                // (The database expects NULL for empty coordinates)
                updatedFormData[name] = null;
            } else {
                // If the field has a value, convert it to a floating-point number
                updatedFormData[name] = parseFloat(value);
            }
        } else {
            // For all other fields (name, address, etc.), keep as string
            updatedFormData[name] = value;
        }
        
        // Update the form data with our changes
        setFormData(updatedFormData);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch (`/api/gyms`, {
                method: "POST",
                headers : {
                    "Content-Type": "application/json",
                     "Authorization": `Bearer ${localStorage.getItem('token')}`
                  },
                  body: JSON.stringify(formData)
                  // The user_id is handled by the backend through the userShouldBeLoggedIn middleware
            });

            if (!response.ok) {
                throw new Error("Failed to add gym");
              }

           // Redirect back to home page after successful submission   
           navigate(`/`)
              
        } catch (err){
            setError(err.message || "Something went wrong. Please try again.");
            setIsSubmitting(false); 
        }
    }

    const handleCancel = () => {
        navigate(`/`);
      };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Gym</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Basic Information</h3>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={e => handleChange(e)}
                  required
                  className="block w-full px-4 py-3 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
              </div>
              
              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={e => handleChange(e)}
                  required
                  className="block w-full px-4 py-3 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
              </div>
            </div>
            
            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={e => handleChange(e)}
                required
                className="block w-full px-4 py-3 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
              />
            </div>
            
            {/* City & Province/State */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={e => handleChange(e)}
                  required
                  className="block w-full px-4 py-3 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
              </div>
              
              <div>
                <label htmlFor="province_state" className="block text-sm font-medium text-gray-700 mb-1">
                  Province/State
                </label>
                <input
                  type="text"
                  id="province_state"
                  name="province_state"
                  value={formData.province_state}
                  onChange={e => handleChange(e)}
                  className="block w-full px-4 py-3 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
              </div>
            </div>
          </div>
          
          {/* Location Coordinates
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Location Coordinates</h3>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  id="latitude"
                  name="latitude"
                  value={formData.latitude}
                  onChange={e => handleChange(e)}
                  step="0.00000001"
                  className="block w-full px-4 py-3 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
                <p className="mt-1 text-xs text-gray-500">Decimal format (e.g., 40.12345678)</p>
              </div>
              
              <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  id="longitude"
                  name="longitude"
                  value={formData.longitude}
                  onChange={e => handleChange(e)}
                  step="0.00000001"
                  className="block w-full px-4 py-3 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
                <p className="mt-1 text-xs text-gray-500">Decimal format (e.g., -74.12345678)</p>
              </div>
            </div>
          </div> */}
          
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Contact & Additional Information</h3>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram Handle
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-4 py-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-base">
                    @
                  </span>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={e => handleChange(e)}
                    className="flex-1 min-w-0 block w-full px-4 py-3 rounded-none rounded-r-md border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={e => handleChange(e)}
                  placeholder="https://example.com"
                  className="block w-full px-4 py-3 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="drop_in_fee" className="block text-sm font-medium text-gray-700 mb-1">
                Drop-in Fee
              </label>
              <input
                type="text"
                id="drop_in_fee"
                name="drop_in_fee"
                value={formData.drop_in_fee}
                onChange={e => handleChange(e)}
                placeholder="$20 or Free"
                className="block w-full px-4 py-3 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={e => handleChange(e)}
                rows="4"
                className="block w-full px-4 py-3 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                placeholder="Tell us about this gym..."
              ></textarea>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              className="px-6 py-3 border-2 border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 border-2 border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSubmitting ? "Adding..." : "Add Gym"}
            </button>
          </div>
        </form>
      </div>
    )
}


export default AddGym;
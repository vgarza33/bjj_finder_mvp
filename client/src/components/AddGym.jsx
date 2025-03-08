import React from "react";



function AddGym () {


    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Gym</h2>
        
        <form className="space-y-6">
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
                  className="block w-full px-4 py-3 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
              </div>
            </div>
          </div>
          
          {/* Location Coordinates */}
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
                  step="0.00000001"
                  className="block w-full px-4 py-3 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                />
                <p className="mt-1 text-xs text-gray-500">Decimal format (e.g., -74.12345678)</p>
              </div>
            </div>
          </div>
          
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
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 border-2 border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Gym
            </button>
          </div>
        </form>
      </div>
    )
}

export default AddGym;
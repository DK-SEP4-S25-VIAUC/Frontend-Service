import React, {useState} from 'react';
import {Settings} from 'lucide-react';
import ToggleLight from "./toggles/ToggleLight.jsx";
import ToggleVentilation from "./toggles/ToggleVentilation.jsx";
import ToggleWaterPlant from "./toggles/ToggleWaterPlant.jsx";
import AddDevice from "./toggles/AddDevice.jsx";
import {toast} from "react-toastify";


export default function QuickControlCard()
{
    const [showControls, setShowControls] = useState(true);
    const [inputValue, setInputValue] = useState('100');

    const toggleControls = () => {
        setShowControls(!showControls);
    };

    const handleInputChange  = (event) => {
        // Allow only numbers in the input
        const value = event.target.value.replace(/[^0-9]/g, '');
        setInputValue(value);

    };

    const handleSubmit = () => {
        setShowControls(true)

        if (!inputValue || parseInt(inputValue) <= 0) {
            toast.warning('Please enter a valid water amount');
            return;
        }

        toast.success(`Water amount set to ${inputValue}ml`);

    }

  return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full max-w-md">
          <div className="flex items-center relative mb-3">
              <Settings size={15}
                        className="text-gray-600 dark:text-gray-300 absolute left-0 cursor-pointer"
                        onClick={toggleControls}
              />
              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-200 w-full text-center">Quick Controls</h2>
          </div>

          {showControls ? (
              <div className="grid grid-cols-4 gap-2">
              <ToggleLight isDisabled={true}></ToggleLight>
              <ToggleVentilation isDisabled={true}></ToggleVentilation>
              <ToggleWaterPlant isDisabled={false} waterAmount={parseInt(inputValue)}></ToggleWaterPlant>
              <AddDevice isDisabled={true}></AddDevice>
          </div>
          ) : (
              <div className="w-full">
                  <label className={"float-left pb-1 text-xs"}>Amount of water:</label>
                  <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Enter value..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                  <button
                      onClick={handleSubmit}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 mt-2 px-4 py-2 w-full flex items-center justify-center"
                  >
                      Save
                  </button>
              </div>
          )}
      </div>
  );
}
import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AddItinerary = ({ isOpen, onClose, setItinerary, trip }) => {
  const [days, setDays] = useState([
    { day: 1, morning: "", afternoon: "", evening: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...days];
    updated[index][field] = value;
    setDays(updated);
  };

  const handleAddDay = () => {
    const nextDay = days.length + 1;
    setDays([
      ...days,
      { day: nextDay, morning: "", afternoon: "", evening: "" },
    ]);
  };

  const handleSave = () => {
    const isValid = days.every(
      (day) => day.morning || day.afternoon || day.evening
    );
    if (!isValid) {
      alert("Please fill in at least one field for each day.");
      return;
    }

    if (trip) {
      const updatedTrip = { ...trip, itinerary: days };
      const existingTrip = JSON.parse(
        localStorage.getItem("tripvault") || "[]"
      );
      const updatedTrips = existingTrip.map((t) =>
        t.id === updatedTrip.id ? updatedTrip : t
      );
      localStorage.setItem("tripvault", JSON.stringify(updatedTrips));
      setItinerary(updatedTrip.itinerary);
      return onClose();
    }
    setItinerary(days);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Itinerary"
      className="bg-white rounded-lg max-w-2xl w-full mx-auto my-12 shadow-lg outline-none relative flex flex-col max-h-[90vh]"
      overlayClassName="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-start z-50"
    >
      {/* Header */}
      <h2 className="text-2xl font-semibold p-4 border-b text-center">
        Add Itinerary
      </h2>

      {/* Scrollable content wrapper */}
      <div className="overflow-y-auto px-6 pt-4 pb-4 flex-1">
        {days.map((day, index) => (
          <div key={index} className="border rounded p-4 bg-gray-50 mb-4">
            <h3 className="font-semibold mb-2">🗓️ Day {day.day}</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Morning plan"
                value={day.morning}
                onChange={(e) => handleChange(index, "morning", e.target.value)}
                className="p-2 border rounded w-full"
              />
              <input
                type="text"
                placeholder="Afternoon plan"
                value={day.afternoon}
                onChange={(e) =>
                  handleChange(index, "afternoon", e.target.value)
                }
                className="p-2 border rounded w-full"
              />
              <input
                type="text"
                placeholder="Evening plan"
                value={day.evening}
                onChange={(e) => handleChange(index, "evening", e.target.value)}
                className="p-2 border rounded w-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Sticky footer below scroll area */}
      <div className="sticky bottom-0 left-0 w-full rounded bg-white border-t px-6 py-4 flex justify-between z-10">
        <button
          onClick={handleAddDay}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Day
        </button>
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          💾 Save Itinerary
        </button>
      </div>

      {/* Optional close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
      >
        ❌
      </button>
    </Modal>
  );
};

export default AddItinerary;

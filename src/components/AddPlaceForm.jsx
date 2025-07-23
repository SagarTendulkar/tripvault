import { useEffect, useState } from "react";
import AddItinerary from "./AddItinerary";
import { db } from "../firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

function AddPlaceForm({ editingTrip, onClose }) {
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [reason, setReason] = useState("");
  const [showItinerary, setShowItinerary] = useState(false);
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    if (editingTrip) {
      setPlace(editingTrip.place);
      setCountry(editingTrip.country);
      setYear(editingTrip.year);
      setReason(editingTrip.reason);
      setItinerary(editingTrip.itinerary || []);
    }
  }, [editingTrip]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!place || !country) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingTrip) {
      const tripRef = doc(db, "places", editingTrip.id);
      await updateDoc(tripRef, {
        place,
        country,
        year,
        reason,
        visited: editingTrip.visited,
        itinerary,
      });
      alert("Trip updated!");
      onClose();
    } else {
      const newPlace = {
        place,
        country,
        year,
        reason,
        visited: false,
        itinerary,
        createdAt: new Date(),
      };

      try {
        await addDoc(collection(db, "places"), newPlace);
        console.log("Document added to Firestore:", newPlace);
        // Clear form
        setPlace("");
        setCountry("");
        setYear("");
        setReason("");
        setItinerary([]);

        alert("Trip added to your vault! ✈️");
      } catch (error) {
        console.error("Error adding place:", error);
        alert("Failed to save place. Please try again.");
      }
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        📍 {editingTrip ? "Edit Trip" : "Add a New Place"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Place Name</label>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
            placeholder="e.g., Dwarka"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            placeholder="e.g., Gujarat"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g., 2025"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Why do you want to visit?
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder="e.g., Dream destination, culture, food..."
            className="w-full border rounded px-3 py-2"
          />
        </div>
        {itinerary.length > 0 && (
          <p className="text-green-600 text-sm">
            ✅ {itinerary.length} day(s) of itinerary added.
          </p>
        )}

        <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 mt-4">
          <button
            type="button"
            onClick={() => setShowItinerary(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded"
          >
            {editingTrip ? "Edit Itinerary" : "➕ Add Itinerary"}
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            {editingTrip ? "Update Trip" : "Save Trip"}
          </button>
        </div>
      </form>
      <AddItinerary
        isOpen={showItinerary}
        onClose={() => setShowItinerary(false)}
        setItinerary={setItinerary}
        editItinerary={editingTrip ? editingTrip.itinerary : []}
      />
    </div>
  );
  // return (
  //   <div className="max-w-4xl mx-auto p-4">
  //     <form
  //       onSubmit={handleSubmit}
  //       className="max-w-md bg-white shadow p-6 rounded space-y-4"
  //     >
  //       <h2 className="text-xl font-bold">Add a New Place</h2>

  //       <input
  //         type="text"
  //         placeholder="Place Name (e.g. Paris)"
  //         value={place}
  //         onChange={(e) => setPlace(e.target.value)}
  //         required
  //         className="w-full p-2 border border-gray-300 rounded"
  //       />

  //       <input
  //         type="text"
  //         placeholder="Country (e.g. Japan)"
  //         value={country}
  //         onChange={(e) => setCountry(e.target.value)}
  //         required
  //         className="w-full p-2 border border-gray-300 rounded"
  //       />

  //       <input
  //         type="number"
  //         placeholder="Year (e.g. 2025)"
  //         value={year}
  //         onChange={(e) => setYear(e.target.value)}
  //         required
  //         className="w-full p-2 border border-gray-300 rounded"
  //       />

  //       <textarea
  //         placeholder="Why do you want to visit?"
  //         value={reason}
  //         onChange={(e) => setReason(e.target.value)}
  //         required
  //         className="w-full p-2 border border-gray-300 rounded"
  //       />
  //       {itinerary.length > 0 && (
  //         <p className="text-green-600 text-sm">
  //           ✅ {itinerary.length} day(s) of itinerary added.
  //         </p>
  //       )}
  //       <div className="flex justify-between gap-4">
  //         <button
  //           type="button"
  //           onClick={() => setShowItinerary(true)}
  //           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
  //         >
  //           {editingTrip ? "✏️ Edit Itinerary" : "➕ Add Itinerary"}
  //         </button>

  //         <button
  //           type="submit"
  //           className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full"
  //         >
  //           💾 Save to Bucket List
  //         </button>
  //       </div>
  //     </form>
  //     <AddItinerary
  //       isOpen={showItinerary}
  //       onClose={() => setShowItinerary(false)}
  //       setItinerary={setItinerary}
  //       editItinerary={editingTrip ? editingTrip.itinerary : []}
  //     />
  //   </div>
  // );
}

export default AddPlaceForm;

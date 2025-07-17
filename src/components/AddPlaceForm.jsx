import { useState } from "react";
import AddItinerary from "./AddItinerary";

function AddPlaceForm() {
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [reason, setReason] = useState("");
  const [showItinerary, setShowItinerary] = useState(false);
  const [itinerary, setItinerary] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!place || !country || !year || !reason) {
      alert("Please fill in all fields.");
      return;
    }

    const newPlace = {
      id: Date.now(),
      place,
      country,
      year,
      reason,
      visited: false,
      itinerary,
    };

    // Get existing list or empty array
    const existing = JSON.parse(localStorage.getItem("tripvault") || "[]");

    // Save updated list to localStorage
    localStorage.setItem("tripvault", JSON.stringify([...existing, newPlace]));

    // Clear form
    setPlace("");
    setCountry("");
    setYear("");
    setReason("");
    setItinerary([]);

    alert("Trip added to your vault! ✈️");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-white shadow p-6 rounded space-y-4"
      >
        <h2 className="text-xl font-bold">Add a New Place</h2>

        <input
          type="text"
          placeholder="Place Name (e.g. Paris)"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          placeholder="Country (e.g. Japan)"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="number"
          placeholder="Year (e.g. 2025)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <textarea
          placeholder="Why do you want to visit?"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        {itinerary.length > 0 && (
          <p className="text-green-600 text-sm">
            ✅ {itinerary.length} day(s) of itinerary added.
          </p>
        )}
        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={() => setShowItinerary(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
          >
            ➕ Add Itinerary
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full"
          >
            💾 Save to Bucket List
          </button>
        </div>
      </form>
      <AddItinerary
        isOpen={showItinerary}
        onClose={() => setShowItinerary(false)}
        setItinerary={setItinerary}
      />
    </div>
  );
}

export default AddPlaceForm;

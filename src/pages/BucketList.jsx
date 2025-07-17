import { useEffect, useState } from "react";
import AddItinerary from "../components/AddItinerary";

function BucketList() {
  const [allTrips, setallTrips] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("year-asc");
  const [search, setSearch] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showItinerary, setShowItinerary] = useState(false);

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem("tripvault") || "[]");
    setallTrips(savedTrips);
  }, []);
  console.log(allTrips);

  const handleAddItinerary = (trip) => {
    setSelectedTrip(trip);
    setShowItinerary(true);
    // console.log("trip_____", trip);
  };

  const filteredTrips = allTrips
    .filter((t) => {
      const matchSearch =
        t.place.toLowerCase().includes(search.toLowerCase()) ||
        t.country.toLowerCase().includes(search.toLowerCase());

      if (filter === "visited") return t.visited && matchSearch;
      if (filter === "not-visited") return !t.visited && matchSearch;
      return matchSearch; // "all" case
    })
    .sort((a, b) => {
      if (sort === "year-desc") return b.year - a.year;
      if (sort === "year-asc") return a.year - b.year;
    });

  const handleToggleVisited = (id) => {
    const updatedTrips = allTrips.map((t) =>
      t.id === id ? { ...t, visited: !t.visited } : t
    );
    setallTrips(updatedTrips);
    localStorage.setItem("tripvault", JSON.stringify(updatedTrips));
  };

  const handleDelete = (id) => {
    const filtered = allTrips.filter((t) => t.id !== id);
    setallTrips(filtered);
    localStorage.setItem("tripvault", JSON.stringify(filtered));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Bucket List</h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by place or country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full  sm:w-64"
        />

        <div className="flex flex-col sm:flex-row gap-3 sm:w-1/2 sm:justify-end">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded w-full sm:w-32"
          >
            <option value="all">All</option>
            <option value="visited">Visited</option>
            <option value="not-visited">Not Visited</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-2 border rounded w-full sm:w-30"
          >
            <option value="year-asc">Year ↑</option>
            <option value="year-desc">Year ↓</option>
          </select>
        </div>
      </div>

      {allTrips.length === 0 ? (
        <p className="text-grey-500">No trips added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 flex flex-col hover:shadow-xl transition duration-300"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-blue-800">
                  {trip.place}
                </h3>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold">Country:</span> {trip.country}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold">Year:</span> {trip.year}
                </p>
              </div>

              <p className="text-gray-700 text-sm italic mb-3">
                "{trip.reason}"
              </p>

              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    trip.visited
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {trip.visited ? "Visited" : "Not Visited"}
                </span>
              </div>

              {trip.itinerary && trip.itinerary.length > 0 ? (
                <div className="bg-gray-50 border border-gray-200 p-3 rounded mt-2 space-y-2">
                  <h4 className="font-bold text-gray-700">🗓️ Itinerary</h4>
                  {trip.itinerary.map((dayPlan, index) => (
                    <div
                      key={index}
                      className="pl-2 border-l-2 border-blue-400"
                    >
                      <p className="font-medium text-indigo-700 mt-1">
                        📅 Day {dayPlan.day}
                      </p>
                      <ul className="text-sm ml-2 text-gray-700">
                        <li>
                          <strong>☀️ Morning:</strong> {dayPlan.morning}
                        </li>
                        <li>
                          <strong>🌇 Afternoon:</strong> {dayPlan.afternoon}
                        </li>
                        <li>
                          <strong>🌙 Evening:</strong> {dayPlan.evening}
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-2">
                  <button
                    onClick={() => handleAddItinerary(trip)}
                    className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                  >
                    ➕ Add Itinerary
                  </button>
                </div>
              )}

              <div className="flex justify-between gap-2 mt-4">
                <button
                  onClick={() => handleToggleVisited(trip.id)}
                  className="flex-1 bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700 transition"
                >
                  {trip.visited ? "Unmark" : "Mark as Visited"}
                </button>
                <button
                  onClick={() => handleDelete(trip.id)}
                  className="flex-1 bg-red-500 text-white text-sm py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showItinerary && selectedTrip && (
        <AddItinerary
          trip={selectedTrip}
          isOpen={showItinerary}
          onClose={() => {
            setSelectedTrip(null);
            setShowItinerary(false);
          }}
          setItinerary={(itinerary) => {
            const updatedTrips = allTrips.map((t) =>
              t.id === selectedTrip.id ? { ...t, itinerary } : t
            );
            setallTrips(updatedTrips);
          }}
        />
      )}
    </div>
  );
}

export default BucketList;

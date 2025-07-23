import { useEffect, useState } from "react";
import AddItinerary from "../components/AddItinerary";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Swal from "sweetalert2";
import AddPlaceForm from "../components/AddPlaceForm";
import TripSummary from "../components/TripSummary";

function BucketList() {
  const [allTrips, setallTrips] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("year-asc");
  const [search, setSearch] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [editTrip, setEditTrip] = useState(null);
  const [showItinerary, setShowItinerary] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "places"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setallTrips(data);
    } catch (e) {
      console.error("Error fetching trips:", e);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchTrips();
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

  const handleToggleVisited = async (id, currentVisited) => {
    try {
      const tripRef = doc(db, "places", id);
      await updateDoc(tripRef, { visited: !currentVisited });

      const updatedTrips = allTrips.map((t) =>
        t.id === id ? { ...t, visited: !currentVisited } : t
      );
      setallTrips(updatedTrips);
    } catch (error) {
      console.error("Error updating visited status:", error);
      alert("Failed to update visited status.");
    }
  };

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete "${name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "places", id));
        const filtered = allTrips.filter((t) => t.id !== id);
        setallTrips(filtered);
      } catch (error) {
        console.error("Error deleting trip:", error);
        alert("Failed to delete trip.");
      }
    }
  };

  const handleEditPlace = (trip) => {
    setEditTrip(trip);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Bucket List</h2>
      {allTrips.length > 0 && <TripSummary trips={allTrips} />}

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

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-blue-600">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid mb-3" />
          <p>Loading trips...</p>
        </div>
      ) : allTrips.length === 0 ? (
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
                  className={`inline-block px-2 py-1 text-xs font-bold rounded-full ${
                    trip.visited
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {trip.visited ? "Visited" : "Not Visited"}
                </span>
              </div>

              {trip.itinerary && trip.itinerary.length > 0 ? (
                <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg mt-2 space-y-3">
                  <h4 className="font-bold text-blue-800 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Itinerary
                  </h4>
                  {trip.itinerary.map((dayPlan, index) => (
                    <div
                      key={index}
                      className="pl-3 border-l-2 border-blue-300 bg-white p-2 rounded"
                    >
                      <p className="font-medium text-blue-700 flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
                          />
                        </svg>
                        Day {dayPlan.day}
                      </p>
                      <ul className="text-sm ml-1 space-y-1 mt-1">
                        <li className="flex items-start gap-1">
                          <span className="text-yellow-600">☀️</span>
                          <span>
                            <strong>Morning:</strong> {dayPlan.morning}
                          </span>
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-orange-500">🌇</span>
                          <span>
                            <strong>Afternoon:</strong> {dayPlan.afternoon}
                          </span>
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-indigo-600">🌙</span>
                          <span>
                            <strong>Evening:</strong> {dayPlan.evening}
                          </span>
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
                  onClick={() => handleToggleVisited(trip.id, trip.visited)}
                  className="flex-1 bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700 transition"
                >
                  {trip.visited ? "Unmark" : "Mark as Visited"}
                </button>
                <button
                  onClick={() => handleDelete(trip.id, trip.place)}
                  className="flex-1 bg-red-500 text-white text-sm py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditPlace(trip)}
                  className="flex-1 bg-yellow-500 text-white text-sm py-2 rounded hover:bg-yellow-600 transition"
                >
                  Edit
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
            fetchTrips();
          }}
          setItinerary={(itinerary) => {
            const updatedTrips = allTrips.map((t) =>
              t.id === selectedTrip.id ? { ...t, itinerary } : t
            );
            setallTrips(updatedTrips);
          }}
        />
      )}
      {editTrip && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={() => setEditTrip(null)}
              className="absolute top-8 right-8 text-gray-500 hover:text-black text-xl"
            >
              ❌
            </button>

            <AddPlaceForm
              editingTrip={editTrip}
              onClose={() => {
                setEditTrip(null);
                fetchTrips();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default BucketList;

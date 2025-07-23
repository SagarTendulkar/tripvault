import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import WorldMap from "../components/WorldMap";

function Home() {
  const [tripCount, setTripCount] = useState(0);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "places"));
        setTripCount(querySnapshot.size);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-blue-100 via-blue-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/bg.png')] bg-cover bg-no-repeat bg-center opacity-15 z-0 pointer-events-none" />

      <div className="relative z-10 text-center py-8 px-4">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">TripVault 🧳</h1>
        <p className="text-lg text-gray-600 mb-6">
          Organize your dream vacations, plan itineraries, and track your travel
          goals!
        </p>
        <Link to="/add">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full flex items-center gap-2 mx-auto shadow-md transition">
            <Plus size={20} /> Add New Trip
          </button>
        </Link>
      </div>

      <div className="text-center mt-8 relative z-10">
        <Link
          to="/bucketlist"
          className="inline-flex items-center gap-2 text-lg font-medium text-blue-700 hover:text-blue-900 transition"
        >
          ✈️ You have <span className="font-bold">{tripCount}</span> trip
          {tripCount !== 1 && "s"} planned
          <ArrowRight size={18} className="ml-1" />
        </Link>
      </div>
      <div className="mt-6 z-10">
        <WorldMap />
      </div>
    </div>
  );
}

export default Home;

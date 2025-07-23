import React from "react";

const TripSummary = ({ trips }) => {
  const totalTrips = trips.length;
  const visitedTrips = trips.filter((trip) => trip.visited).length;
  const currentYear = new Date().getFullYear();
  const tripsThisYear = trips.filter(
    (trip) => Number(trip.year) === currentYear
  ).length;
  const upcomingTrips = trips.filter(
    (trip) => Number(trip.year) > currentYear
  ).length;

  // Unique countries
  const countrySet = new Set(
    trips.map((trip) => trip.country?.trim().toLowerCase())
  );
  const uniqueCountries = countrySet.size;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6 text-center">
      <div className="bg-white shadow rounded p-4">
        <p className="text-sm text-gray-500">Total Trips</p>
        <h3 className="text-xl font-bold text-blue-600">{totalTrips}</h3>
      </div>
      <div className="bg-white shadow rounded p-4">
        <p className="text-sm text-gray-500">Visited</p>
        <h3 className="text-xl font-bold text-green-600">{visitedTrips}</h3>
      </div>
      <div className="bg-white shadow rounded p-4">
        <p className="text-sm text-gray-500">Unique Countries</p>
        <h3 className="text-xl font-bold text-purple-600">{uniqueCountries}</h3>
      </div>
      <div className="bg-white shadow rounded p-4">
        <p className="text-sm text-gray-500">Trips This Year</p>
        <h3 className="text-xl font-bold text-yellow-600">{tripsThisYear}</h3>
      </div>
      <div className="bg-white shadow rounded p-4">
        <p className="text-sm text-gray-500">Upcoming Trips</p>
        <h3 className="text-xl font-bold text-orange-600">{upcomingTrips}</h3>
      </div>
    </div>
  );
};

export default TripSummary;

# 🧳 TripVault – Travel Bucket List App

**TripVault** is a personal travel bucket list app built using **React**. It helps users save dream destinations, track travel status, and plan detailed day-wise itineraries. All data is stored in the browser using `localStorage`, so no backend is required.

---

## ✨ Features

### ✅ Add Trips to Bucket List

- Add a new place with:
  - Destination name
  - Estimated budget
  - Travel dates
  - Travel type (Solo/Friends/Family)
- Trips are displayed as cards.

### ✅ Manage Bucket List

- Each trip card shows:
  - Place name
  - Travel period
  - Wishlist/Completed status
- Options to:
  - Edit trip details
  - Delete a trip
  - Add/View Itinerary

### ✅ Day-wise Itinerary Planner

- Add itinerary with **Morning**, **Afternoon**, and **Evening** slots for each day.
- Save updates to the itinerary per trip.
- UI updates instantly after saving without needing a page refresh.

### ✅ Data Persistence

- All trip and itinerary data is stored in browser `localStorage`.
- Key: `"tripvault"`
- Data persists even after closing or refreshing the app.

---

## 🛠 Tech Stack

| Tech         | Purpose                      |
| ------------ | ---------------------------- |
| React        | Frontend framework           |
| Tailwind CSS | Styling and layout           |
| UUID         | Generate unique trip IDs     |
| LocalStorage | Persist user data in-browser |

---

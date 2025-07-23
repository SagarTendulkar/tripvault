# 🧳 TripVault – Travel Bucket List App

**TripVault** is a personal travel bucket list and itinerary planner built using **React** and **Firebase**. It helps users organize, plan, and track their dream trips—all from one place. Users can add destinations, build day-wise plans, and mark visited trips.

---

## ✨ Features

### ✅ Add & Edit Trips

- Create or update a trip with:
  - **Destination name**
  - **Estimated budget**
  - **Travel dates**
  - **Travel type** (Solo / Friends / Family / Other)
- Uses a **modal form** to add or edit trips.
- All trips are stored in **Firebase Firestore**.

### ✅ View & Manage Bucket List

- Each trip is shown as a **card** with:
  - Place name
  - Travel period
  - Budget
  - Status toggle (Wishlist / Visited)
- Options to:
  - Edit trip
  - Delete trip
  - Add itinerary
  - View full details

### ✅ Day-wise Itinerary Builder

- Add detailed **day-by-day** plans with slots:
  - Morning, Afternoon, Evening
- Managed via a **modal interface**
- Stored and fetched from Firebase per trip
- Supports editing and saving instantly

### ✅ Trip Details Page

- Navigate to `/tripdetails/:id`
- Displays complete trip info + itinerary
- All data dynamically fetched from Firebase

### ✅ Real-time Firebase Sync

- Trip and itinerary data is synced with **Firebase Firestore**
- Any add/edit/delete reflects instantly in the UI

---

## 🚧 Upcoming Features

- 🌍 Interactive World Map to add countries visually
- 📊 Analytics dashboard (visited vs wishlist)
- 📅 Calendar integration
- 🎒 Packing checklist
- 💸 Budget planner
- 👥 Trip sharing and collaboration

---

## 🛠 Tech Stack

| Tech         | Purpose                              |
| ------------ | ------------------------------------ |
| React        | Frontend framework                   |
| Tailwind CSS | Styling and layout                   |
| Firebase     | Backend (Firestore database)         |
| UUID         | Unique trip IDs (optional fallback)  |
| React Router | Routing (`/add`, `/tripdetails/:id`) |
| React Modal  | Popup for adding itinerary/trips     |

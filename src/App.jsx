import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AddPlace from "./pages/AddPlace";
import BucketList from "./pages/BucketList";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen overflow-hidden">
      {user && (
        <nav className="bg-blue-600 p-4 text-white flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
          <Link to="/home" className="hover:underline text-sm sm:text-base">
            Home
          </Link>
          <Link to="/add" className="hover:underline text-sm sm:text-base">
            Add Place
          </Link>
          <Link
            to="/bucketlist"
            className="hover:underline text-sm sm:text-base"
          >
            Bucket List
          </Link>
          <Link
            onClick={() => logout(navigate)}
            className="hover:underline text-sm sm:text-base"
          >
            Logout
          </Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddPlace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bucketlist"
          element={
            <ProtectedRoute>
              <BucketList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

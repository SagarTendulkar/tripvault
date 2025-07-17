import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddPlace from "./pages/AddPlace";
import BucketList from "./pages/BucketList";

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="bg-blue-600 p-4 text-white flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
          <Link to="/" className="hover:underline text-sm sm:text-base">
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
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddPlace />} />
          <Route path="/bucketlist" element={<BucketList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

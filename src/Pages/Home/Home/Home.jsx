import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Floor Management Card */}
      <Link 
        to="/floors" 
        className="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Floor Management</h2>
          <p className="text-gray-600">
            Manage building floors, including adding, editing, and removing floors.
          </p>
          <div className="mt-4">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              Go to Floors →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Home;

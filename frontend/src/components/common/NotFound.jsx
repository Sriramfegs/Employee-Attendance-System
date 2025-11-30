import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-lg">Page Not Found</p>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;

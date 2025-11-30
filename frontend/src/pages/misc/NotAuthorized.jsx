import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-red-600">403</h1>
      <p className="text-lg">You are not authorized to view this page.</p>
      <Link className="px-4 py-2 bg-blue-600 text-white rounded" to="/">
        Go Home
      </Link>
    </div>
  );
};

export default NotAuthorized;

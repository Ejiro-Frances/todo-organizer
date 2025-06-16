import { Link } from "@tanstack/react-router";

const NotFound = () => {
  return (
    <div className="relative h-screen w-full bg-gradient-to-tr from-blue-200 to-blue-300 overflow-hidden flex items-center justify-center">
      <svg
        viewBox="0 0 1440 320"
        className="absolute top-0 left-0 w-full h-64"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#f5f5f5"
          fillOpacity="1"
          d="M0,96L60,117.3C120,139,240,181,360,186.7C480,192,600,160,720,154.7C840,149,960,171,1080,170.7C1200,171,1320,149,1380,138.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
      </svg>

      <div className="relative z-10 text-center p-6 max-w-md">
        <h1 className="text-7xl font-extrabold text-blue-600 animate-pulse">
          404
        </h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800">
          Oops! Page not found
        </p>
        <p className="mt-2 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

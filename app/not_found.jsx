import Link from 'next/link';
import { Button } from "@/components/ui/button"; // Ensure you have a Button component

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-800 mb-8">
        Oops! The page you are looking for is not ready yet.
      </p>
      <Link href="/">
        <Button className="bg-blue-600 text-white text-lg font-bold hover:bg-blue-700 transition-colors duration-300">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default Custom404;

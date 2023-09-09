// NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
            <p className="text-lg mt-4">The page you are looking for does not exist.</p>
            <Link
                to="/"
                className="mt-8 px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
            >
                Go to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;

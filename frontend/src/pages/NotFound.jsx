import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-7xl font-bold text-netflix-red mb-4">404</h1>
            <h2 className="text-3xl font-bold text-white mb-4">Lost your way?</h2>
            <p className="text-gray-400 mb-8 max-w-md">
                Sorry, we can't find that page. You'll find lots to explore on the home page.
            </p>
            <Link to="/" className="bg-white text-black font-bold px-8 py-3 rounded hover:bg-gray-200 transition-colors">
                OTT Home
            </Link>
        </div>
    );
};

export default NotFound;

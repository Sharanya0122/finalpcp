import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LogOut, User as UserIcon, Settings, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-netflix-black border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <span className="text-netflix-red font-bold text-2xl tracking-tighter">FEATUREFLOW</span>
                        </Link>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                {user.role !== 'admin' && (
                                    <Link to="/submit" className="hidden sm:flex items-center text-sm font-medium text-white bg-netflix-red hover:bg-netflix-darkRed px-4 py-2 rounded transition-colors">
                                        <Plus size={16} className="mr-1" /> Request Feature
                                    </Link>
                                )}
                                <div className="relative group cursor-pointer ml-4">
                                    <div className="flex items-center gap-2">
                                        <img className="h-8 w-8 rounded object-cover border border-white/20" src={user.avatar} alt="Avatar" />
                                        <div className="hidden md:block text-sm">
                                            <p className="text-white font-medium">{user.name}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="absolute right-0 mt-2 w-48 bg-netflix-dark border border-white/10 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5">
                                            Dashboard
                                        </Link>
                                        {user.role === 'admin' && (
                                            <Link to="/admin" className="block px-4 py-2 text-sm text-netflix-red font-medium hover:bg-white/5">
                                                Admin Panel
                                            </Link>
                                        )}
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5">
                                            Profile
                                        </Link>
                                        <div className="border-t border-white/10 mt-1"></div>
                                        <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center">
                                            <LogOut size={16} className="mr-2" /> Sign out
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-white hover:text-gray-300 text-sm font-medium transition-colors">Sign In</Link>
                                <Link to="/register" className="bg-netflix-red hover:bg-netflix-darkRed text-white px-4 py-2 rounded text-sm font-medium transition-colors">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

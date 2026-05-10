import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Users, TrendingUp, ChevronRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-netflix-black text-white">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/80 to-transparent z-10" />
                    <img 
                        src="https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/7fb62e44-31fd-4e1c-bba3-1e6a0fb8cb77/US-en-20231009-popsignuptwoweeks-perspective_alpha_website_medium.jpg" 
                        alt="Background" 
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left flex flex-col items-center lg:items-start">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-3xl"
                    >
                        Shape the Future of <span className="text-netflix-red">Streaming.</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl font-light"
                    >
                        Have a brilliant idea for Netflix? Share your feature requests, vote on community favorites, and help us build a better experience.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start"
                    >
                        <Link to="/register" className="bg-netflix-red hover:bg-netflix-darkRed text-white text-lg font-medium px-8 py-4 rounded-md transition-all flex items-center justify-center">
                            Get Started <ChevronRight className="ml-2" />
                        </Link>
                        <Link to="/login" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 text-lg font-medium px-8 py-4 rounded-md transition-all flex items-center justify-center">
                            View Requests
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-netflix-dark relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="glass-panel p-8 rounded-xl text-center"
                        >
                            <div className="bg-netflix-red/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-netflix-red">
                                <Lightbulb size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Submit Ideas</h3>
                            <p className="text-gray-400">Propose new features, UI tweaks, or functionality you want to see on the platform.</p>
                        </motion.div>
                        
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="glass-panel p-8 rounded-xl text-center"
                        >
                            <div className="bg-netflix-red/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-netflix-red">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Community Voting</h3>
                            <p className="text-gray-400">Browse and upvote features suggested by other users. Help prioritize what gets built next.</p>
                        </motion.div>

                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="glass-panel p-8 rounded-xl text-center"
                        >
                            <div className="bg-netflix-red/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-netflix-red">
                                <TrendingUp size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Track Progress</h3>
                            <p className="text-gray-400">See real-time status updates as requests move from Pending to In Progress and Completed.</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

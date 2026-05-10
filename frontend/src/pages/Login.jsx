import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Loader from '../components/common/Loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const success = await login(email, password);
        setIsSubmitting(false);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative bg-netflix-black px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/7fb62e44-31fd-4e1c-bba3-1e6a0fb8cb77/US-en-20231009-popsignuptwoweeks-perspective_alpha_website_medium.jpg" 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full z-10 glass-panel rounded-lg p-8 sm:p-12 shadow-2xl"
            >
                <h2 className="text-3xl font-bold text-white mb-8">Sign In</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            required
                            className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-600 bg-gray-800/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent transition-all sm:text-sm"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            required
                            className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-600 bg-gray-800/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent transition-all sm:text-sm"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-netflix-red hover:bg-netflix-darkRed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-netflix-red transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign In'}
                        </button>
                    </div>
                </form>
                
                <div className="mt-6 text-gray-400 text-sm">
                    New to FeatureFlow?{' '}
                    <Link to="/register" className="text-white hover:underline">
                        Sign up now
                    </Link>.
                </div>
            </motion.div>
        </div>
    );
};

export default Login;

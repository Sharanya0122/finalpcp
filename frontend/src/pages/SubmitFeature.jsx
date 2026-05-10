import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const SubmitFeature = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Streaming',
        description: '',
        priority: 'Medium',
        platform: 'All Platforms'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user && user.role === 'admin') {
            toast.error("Admins cannot submit feature requests.");
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const categories = ['Streaming', 'Recommendation System', 'UI/UX', 'Accessibility', 'Download Features', 'Kids Mode', 'Profiles', 'Audio/Subtitles', 'Playback', 'Smart TV', 'Security', 'Account Management', 'Other'];
    const priorities = ['Low', 'Medium', 'High'];
    const platforms = ['All Platforms', 'Web', 'iOS', 'Android', 'Smart TV', 'Desktop App'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/requests', formData);
            toast.success('Feature request submitted successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit request');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel rounded-xl p-8 shadow-2xl border border-white/10"
            >
                <h1 className="text-3xl font-bold text-white mb-2">Submit Feature Request</h1>
                <p className="text-gray-400 mb-8">Got a great idea? Tell us about it below.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Feature Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-netflix-red transition-all"
                            placeholder="e.g., Picture-in-Picture for Desktop"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                            <select
                                name="category"
                                className="w-full px-4 py-3 bg-[#222] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-netflix-red transition-all"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                            <select
                                name="priority"
                                className="w-full px-4 py-3 bg-[#222] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-netflix-red transition-all"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                {priorities.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
                        <select
                            name="platform"
                            className="w-full px-4 py-3 bg-[#222] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-netflix-red transition-all"
                            value={formData.platform}
                            onChange={handleChange}
                        >
                            {platforms.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                            name="description"
                            required
                            rows="5"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-netflix-red transition-all"
                            placeholder="Describe your feature in detail. Why is it needed? How would it work?"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-netflix-red hover:bg-netflix-darkRed text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default SubmitFeature;

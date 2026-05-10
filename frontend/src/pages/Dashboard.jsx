import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import FeatureCard from '../components/common/FeatureCard';
import Loader from '../components/common/Loader';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    const categories = ['All', 'Streaming', 'UI/UX', 'Accessibility', 'Download Features', 'Kids Mode', 'Profiles', 'Audio/Subtitles', 'Other'];

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await api.get('/requests');
                setRequests(res.data);
            } catch (error) {
                console.error("Failed to fetch requests", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const handleVote = async (id) => {
        try {
            const res = await api.patch(`/requests/${id}/vote`);
            // Update local state
            setRequests(requests.map(req => {
                if (req._id === id) {
                    const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id;
                    let newVotes = [...req.votes];
                    if (res.data.hasVoted) {
                        newVotes.push(userId);
                    } else {
                        newVotes = newVotes.filter(v => v !== userId);
                    }
                    return { ...req, votes: newVotes };
                }
                return req;
            }));
        } catch (error) {
            console.error("Vote failed", error);
        }
    };

    const filteredRequests = requests.filter(req => {
        const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) || req.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || req.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 md:flex md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Feature Requests</h1>
                    <p className="text-gray-400">Discover and vote on features requested by the community.</p>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-md leading-5 bg-white/5 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-netflix-red focus:border-netflix-red sm:text-sm"
                            placeholder="Search requests..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="relative">
                        <select
                            className="block w-full pl-3 pr-10 py-2 border border-white/10 rounded-md leading-5 bg-[#222] text-gray-300 focus:outline-none focus:ring-1 focus:ring-netflix-red focus:border-netflix-red sm:text-sm appearance-none"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <Filter className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            {filteredRequests.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-xl font-medium text-white mb-2">No requests found</h3>
                    <p className="text-gray-400">Try adjusting your filters or search term.</p>
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredRequests.map(request => (
                        <FeatureCard key={request._id} request={request} onVote={handleVote} />
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Dashboard;

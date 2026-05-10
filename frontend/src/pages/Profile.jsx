import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import FeatureCard from '../components/common/FeatureCard';
import Loader from '../components/common/Loader';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [userRequests, setUserRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRequests = async () => {
            try {
                // Fetch all and filter client side for simplicity, ideally we have an endpoint /api/requests/user/:id
                const res = await api.get('/requests');
                const myRequests = res.data.filter(req => req.submittedBy._id === user._id);
                setUserRequests(myRequests);
            } catch (error) {
                console.error("Failed to fetch user requests", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchUserRequests();
        }
    }, [user]);

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="glass-panel rounded-xl p-8 mb-8 flex items-center gap-6 border border-white/10">
                <img src={user?.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-netflix-red/20" />
                <div>
                    <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
                    <p className="text-gray-400">{user?.email}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-white/10 rounded text-xs uppercase tracking-wider text-white">
                        Role: {user?.role}
                    </span>
                </div>
            </div>

            {user?.role !== 'admin' && (
                <>
                    <h2 className="text-2xl font-bold text-white mb-6">Your Submissions</h2>
                    
                    {userRequests.length === 0 ? (
                        <div className="text-center py-12 bg-white/5 rounded-lg border border-white/10">
                            <p className="text-gray-400">You haven't submitted any feature requests yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userRequests.map(request => (
                                <FeatureCard key={request._id} request={request} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Profile;

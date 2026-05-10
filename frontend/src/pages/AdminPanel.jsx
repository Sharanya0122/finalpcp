import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Loader from '../components/common/Loader';
import StatusBadge from '../components/common/StatusBadge';
import { toast } from 'react-hot-toast';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';

const AdminPanel = () => {
    const [stats, setStats] = useState(null);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('requests');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [status, setStatus] = useState('');

    const statusOptions = ['Pending', 'Under Review', 'In Progress', 'Completed', 'Rejected'];

    const fetchData = async () => {
        try {
            setLoading(true);
            const [statsRes, reqsRes] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/requests')
            ]);
            setStats(statsRes.data);
            setRequests(reqsRes.data);
        } catch (error) {
            toast.error("Failed to load admin data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        try {
            await api.patch(`/requests/${selectedRequest._id}/status`, {
                status,
                adminFeedback: feedback
            });
            toast.success("Request updated");
            setSelectedRequest(null);
            fetchData(); // Refresh list
        } catch (error) {
            toast.error("Failed to update request");
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="glass-panel p-6 rounded-lg border-l-4 border-l-netflix-red">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Total Users</p>
                            <h3 className="text-3xl font-bold text-white">{stats?.totalUsers || 0}</h3>
                        </div>
                        <div className="bg-white/10 p-3 rounded-full text-white">
                            <Users size={24} />
                        </div>
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-lg border-l-4 border-l-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Total Requests</p>
                            <h3 className="text-3xl font-bold text-white">{stats?.totalRequests || 0}</h3>
                        </div>
                        <div className="bg-white/10 p-3 rounded-full text-white">
                            <FileText size={24} />
                        </div>
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-lg border-l-4 border-l-yellow-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Pending</p>
                            <h3 className="text-3xl font-bold text-white">
                                {stats?.requestsByStatus.find(s => s._id === 'Pending')?.count || 0}
                            </h3>
                        </div>
                        <div className="bg-white/10 p-3 rounded-full text-white">
                            <Clock size={24} />
                        </div>
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-lg border-l-4 border-l-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Completed</p>
                            <h3 className="text-3xl font-bold text-white">
                                {stats?.requestsByStatus.find(s => s._id === 'Completed')?.count || 0}
                            </h3>
                        </div>
                        <div className="bg-white/10 p-3 rounded-full text-white">
                            <CheckCircle size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Management Section */}
            <div className="glass-panel rounded-lg overflow-hidden border border-white/10">
                <div className="flex border-b border-white/10">
                    <button 
                        className={`px-6 py-4 text-sm font-medium ${activeTab === 'requests' ? 'text-white border-b-2 border-netflix-red bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        onClick={() => setActiveTab('requests')}
                    >
                        Manage Requests
                    </button>
                    {/* Add more tabs like Users if needed */}
                </div>

                <div className="p-6">
                    {activeTab === 'requests' && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-white/10">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Votes</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {requests.map(req => (
                                        <tr key={req._id} className="hover:bg-white/5">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                                                {req.title.substring(0, 40)}{req.title.length > 40 ? '...' : ''}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{req.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={req.status} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{req.votes.length}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button 
                                                    onClick={() => {
                                                        setSelectedRequest(req);
                                                        setStatus(req.status);
                                                        setFeedback(req.adminFeedback || '');
                                                    }}
                                                    className="text-netflix-red hover:text-red-400"
                                                >
                                                    Manage
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Management Modal */}
            {selectedRequest && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setSelectedRequest(null)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-[#181818] border border-white/10 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleUpdateStatus}>
                                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg leading-6 font-bold text-white mb-4" id="modal-title">
                                        Update Request: {selectedRequest.title.substring(0, 30)}...
                                    </h3>
                                    
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                                        <select
                                            className="w-full px-3 py-2 bg-[#222] border border-white/10 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-netflix-red"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            {statusOptions.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Admin Feedback (Optional)</label>
                                        <textarea
                                            rows="4"
                                            className="w-full px-3 py-2 bg-[#222] border border-white/10 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-netflix-red"
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            placeholder="Provide context on why it's rejected, accepted, or progress updates..."
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="bg-[#111] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-white/5">
                                    <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-netflix-red text-base font-medium text-white hover:bg-netflix-darkRed sm:ml-3 sm:w-auto sm:text-sm">
                                        Save Changes
                                    </button>
                                    <button type="button" onClick={() => setSelectedRequest(null)} className="mt-3 w-full inline-flex justify-center rounded-md border border-white/10 shadow-sm px-4 py-2 bg-[#222] text-base font-medium text-white hover:bg-[#333] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;

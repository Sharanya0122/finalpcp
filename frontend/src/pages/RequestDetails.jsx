import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/common/Loader';
import StatusBadge from '../components/common/StatusBadge';
import { ThumbsUp, Calendar, Monitor, Flag, Trash2, Edit } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from 'react-hot-toast';

const RequestDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const res = await api.get(`/requests/${id}`);
                setRequest(res.data);
            } catch (error) {
                toast.error("Failed to load request details");
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetchRequest();
    }, [id, navigate]);

    const handleVote = async () => {
        try {
            const res = await api.patch(`/requests/${id}/vote`);
            let newVotes = [...request.votes];
            if (res.data.hasVoted) {
                newVotes.push(user._id);
            } else {
                newVotes = newVotes.filter(v => v !== user._id);
            }
            setRequest({ ...request, votes: newVotes });
        } catch (error) {
            toast.error("Vote failed");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this request?")) {
            try {
                await api.delete(`/requests/${id}`);
                toast.success("Request deleted");
                navigate('/dashboard');
            } catch (error) {
                toast.error("Failed to delete request");
            }
        }
    };

    if (loading) return <Loader />;
    if (!request) return null;

    const isOwner = user && request.submittedBy._id === user._id;
    const hasVoted = request.votes.includes(user._id);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/dashboard" className="text-gray-400 hover:text-white mb-6 inline-block text-sm">&larr; Back to Dashboard</Link>
            
            <div className="glass-panel rounded-xl p-8 border border-white/10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-gray-300 rounded uppercase tracking-wider">
                                {request.category}
                            </span>
                            <StatusBadge status={request.status} />
                        </div>
                        
                        <h1 className="text-3xl font-bold text-white mb-4">{request.title}</h1>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 border-b border-white/10 pb-6">
                            <div className="flex items-center gap-2">
                                <img src={request.submittedBy.avatar} alt="Avatar" className="w-6 h-6 rounded-full" />
                                <span>{request.submittedBy.name}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                <span>{format(new Date(request.createdAt), 'MMM d, yyyy')}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                                <Monitor size={14} />
                                <span>{request.platform}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Flag size={14} />
                                <span>{request.priority} Priority</span>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none text-gray-300 mb-8 whitespace-pre-wrap">
                            {request.description}
                        </div>

                        {request.adminFeedback && (
                            <div className="bg-white/5 border-l-4 border-netflix-red p-4 rounded-r-md mb-8">
                                <h3 className="text-sm font-bold text-white mb-2 flex items-center">
                                    <span className="bg-netflix-red text-white text-[10px] px-1.5 py-0.5 rounded uppercase mr-2 tracking-wider">Admin</span>
                                    Feedback
                                </h3>
                                <p className="text-gray-300 text-sm">{request.adminFeedback}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 min-w-[200px]">
                        <button 
                            onClick={handleVote}
                            className={`flex flex-col items-center justify-center p-6 rounded-xl border transition-all ${
                                hasVoted 
                                ? 'bg-netflix-red/10 border-netflix-red text-netflix-red' 
                                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                            }`}
                        >
                            <ThumbsUp size={32} className={`mb-2 ${hasVoted ? 'fill-netflix-red' : ''}`} />
                            <span className="text-3xl font-bold">{request.votes.length}</span>
                            <span className="text-xs uppercase tracking-wider mt-1 opacity-80">Votes</span>
                        </button>

                        {(isOwner || user.role === 'admin') && (
                            <div className="flex gap-2 mt-4">
                                <button 
                                    onClick={handleDelete}
                                    className="flex-1 flex justify-center items-center gap-2 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestDetails;

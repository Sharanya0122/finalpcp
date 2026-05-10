import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThumbsUp, MessageSquare, Clock } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatDistanceToNow } from 'date-fns';

const FeatureCard = ({ request, onVote }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-panel rounded-lg p-5 flex flex-col h-full hover:border-white/20 transition-all duration-300 group"
        >
            <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold px-2 py-1 bg-white/10 text-gray-300 rounded uppercase tracking-wider">
                    {request.category}
                </span>
                <StatusBadge status={request.status} />
            </div>
            
            <Link to={`/request/${request._id}`} className="flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-netflix-red transition-colors">
                    {request.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {request.description}
                </p>
            </Link>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={(e) => { e.preventDefault(); onVote && onVote(request._id); }}
                        className="flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                        <ThumbsUp size={16} className="mr-1.5" />
                        <span className="text-sm font-medium">{request.votes?.length || 0}</span>
                    </button>
                </div>
                
                <div className="flex items-center text-xs text-gray-500">
                    <Clock size={12} className="mr-1" />
                    <span>{formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default FeatureCard;

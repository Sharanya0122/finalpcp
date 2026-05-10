import React from 'react';

const StatusBadge = ({ status }) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'Under Review':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'In Progress':
                return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            case 'Completed':
                return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'Rejected':
                return 'bg-red-500/10 text-red-500 border-red-500/20';
            default:
                return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
        }
    };

    return (
        <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusStyles()}`}>
            {status}
        </span>
    );
};

export default StatusBadge;

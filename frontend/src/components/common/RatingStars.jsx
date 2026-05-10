import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating, setRating, readOnly = false }) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={readOnly}
                    onClick={() => !readOnly && setRating(star)}
                    className={`focus:outline-none ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
                >
                    <Star
                        size={20}
                        className={`${
                            star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'
                        } transition-colors duration-200`}
                    />
                </button>
            ))}
        </div>
    );
};

export default RatingStars;

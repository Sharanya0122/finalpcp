import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-[60vh]">
            <motion.div
                className="w-12 h-12 border-4 border-netflix-red/30 border-t-netflix-red rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

export default Loader;

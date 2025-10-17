'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
    delay?: number;
}

const SectionDivider = ({ delay = 0.4 }: SectionDividerProps) => {
    return (
        <motion.div
            className="flex items-center justify-center gap-2 mb-8"
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "auto" }}
            transition={{ duration: 0.8, delay }}
            viewport={{ once: true }}
        >
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-teal-500 rounded-full"></div>
            <div className="h-1 w-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-transparent rounded-full"></div>
        </motion.div>
    );
};

export default SectionDivider;
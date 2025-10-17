'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BookMeetingBtnProps {
    text?: string;
    className?: string;
    whileHover?: any;
    whileTap?: any;
    initial?: any;
    animate?: any;
    transition?: any;
    showIcon?: boolean;
    iconType?: 'calendar' | 'arrow';
}

const BookMeetingBtn: React.FC<BookMeetingBtnProps> = ({
    text = "Book Free Meeting",
    className = "",
    whileHover = { scale: 1.05 },
    whileTap = { scale: 0.95 },
    initial,
    animate,
    transition,
    showIcon = true,
    iconType = 'arrow'
}) => {
    const whatsappNumber = "+971529794631";
    const message = `Hello! I'm interested in ${text.toLowerCase()}. Could you please provide me with more information?`;
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

    const handleClick = () => {
        window.open(whatsappUrl, '_blank');
    };

    const renderIcon = () => {
        if (!showIcon) return null;

        if (iconType === 'calendar') {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            );
        }

        return (
            <svg className="w-4 h-4 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        );
    };

    return (
        <motion.button
            className={`group  ${className}`}
            onClick={handleClick}
            whileHover={whileHover}
            whileTap={whileTap}
            initial={initial}
            animate={animate}
            transition={transition}
            style={{ cursor: 'pointer' }}
        >
            <div className="absolute cursor-pointer inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative flex items-center justify-center gap-2 sm:gap-3">
                {iconType === 'calendar' && renderIcon()}
                {text}
                {iconType === 'arrow' && renderIcon()}
            </span>
        </motion.button>
    );
};

export default BookMeetingBtn;
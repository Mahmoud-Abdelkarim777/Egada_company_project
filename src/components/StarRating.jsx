    import React, { useState } from 'react';
    import './style.css'; // Ensure you have this CSS file

    const StarRating = ({ rating, onChange }) => {
    const [hovered, setHovered] = useState(null);

    const handleMouseEnter = (value) => setHovered(value);
    const handleMouseLeave = () => setHovered(null);
    const handleClick = (value) => onChange(value);

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => {
        const value = index + 1;
        return (
            <span
            key={value}
            className={`star ${value <= (hovered || rating) ? 'filled' : ''}`}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(value)}
            >
            ★
            </span>
        );
        });
    };

    return <div className="star-rating">{renderStars()}</div>;
    };

    export default StarRating;

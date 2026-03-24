import React, { useState } from "react";

export default function Sticker() {
    const [position, setPosition] = useState({ x: 20, y: 20 });
    const [jump, setJump] = useState(false);

    const handleClick = () => {
        setJump(true);
        setTimeout(() => setJump(false), 300);
    };

    const handleMouseMove = (e) => {
        setPosition({
            x: window.innerWidth - e.clientX - 80,
            y: window.innerHeight - e.clientY - 80,
        });
    };

    return (
        <img
            src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
            alt="sticker"
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            style={{
                position: "fixed",
                bottom: position.y,
                right: position.x,
                width: "100px",
                cursor: "pointer",
                zIndex: 9999,
                transition: "all 0.2s ease",
                transform: jump ? "scale(1.3) translateY(-20px)" : "scale(1)",
            }}
        />
    );
}
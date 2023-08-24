import React, { useEffect, useRef } from 'react';
import nipplejs from 'nipplejs';

function Joystick({ onMove }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const manager = nipplejs.create({
            zone: containerRef.current,
            mode: 'static',
            position: { left: '50%', top: '50%' },
            size: 100,
            color: 'blue',
        });

        manager.on('move', (event, data) => {
            if (onMove) {
                onMove(data);
            }
        });

        return () => {
            manager.destroy();
        };
    }, [onMove]);

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}

export default Joystick;

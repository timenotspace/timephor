// RedOrb.jsx
import { useState, useEffect } from 'react';
import { useSphere } from '@react-three/cannon';

export function RedOrb(props) {
    const [orbs, setOrbs] = useState([]);
    const [pointerDownTime, setPointerDownTime] = useState(null);

    const handleClick = () => {
        // Manually set the force direction to make the orb drift upwards and away
        const direction = [0, 1, 0]; // Adjust these values as needed

        // Add a new orb to the array every time you click
        setOrbs(prevOrbs => [...prevOrbs, {
            position: [0, 0, 0],
            force: direction
        }]);
    };

    const handlePointerDown = () => {
        setPointerDownTime(Date.now());
    };

    const handlePointerUp = () => {
        const duration = Date.now() - pointerDownTime;
        if (duration < 200) {
            handleClick();
        }
    };

    return (
        <>
            {orbs.map((orb, index) => (
                <OrbInstance key={index} position={orb.position} force={orb.force} />
            ))}
            <mesh onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
                {/* This mesh is invisible and only serves as a clickable area */}
                <boxGeometry args={[10, 10, 10]} />
                <meshBasicMaterial visible={false} />
            </mesh>
        </>
    );
}

function OrbInstance({ position }) {
    const [ref, api] = useSphere(() => ({
        mass: 1,
        position: position,
    }));

    useEffect(() => {
        // Apply a static force to the orb when it's created
        api.applyForce([0, 50, 0], [0, 0, 0]);
    }, [api]);

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="red" />
        </mesh>
    );
}

export default RedOrb;

import { useState } from 'react';

type Position = {
  x: number;
  y: number;
}

export function useDraggable(initialCords: Position = { x: 0, y: 0 }) {
  const [position, setPosition] = useState<Position>(initialCords);
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState<Position>(initialCords);
  const [initialPosition, setInitialPosition] = useState<Position>(initialCords);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true);
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
    setInitialPosition({ x: position.x, y: position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) {
      const deltaMove = {
        x: e.clientX - initialMousePosition.x,
        y: e.clientY - initialMousePosition.y,
      };
      setPosition({
        x: initialPosition.x + deltaMove.x,
        y: initialPosition.y + deltaMove.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return {
    position,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

import { useState, useEffect, RefObject } from "react";

export function useDrag(ref: RefObject<HTMLElement>) {

    const [isClicked, setIsClicked] = useState(false);

    const [startPosition, setStartPosition] = useState({ shiftX: 0, shiftY: 0 });

    const [position, setPosition] = useState({ left: 0, top: 0 });

    function onMouseDown(e: MouseEvent) {
        if (e.target === ref.current) {
            setIsClicked(true);
            if (ref.current) {
                setStartPosition(
                    {
                        shiftX: e.clientX - ref.current.getBoundingClientRect().left,
                        shiftY: e.clientY - ref.current.getBoundingClientRect().top
                    });
            }
        }
    }

    function onMouseMove(e: MouseEvent) {
        e.preventDefault();
        if (isClicked) {
            setPosition(
                {
                    left: e.pageX - startPosition.shiftX,
                    top: e.pageY - startPosition.shiftY
                });
        }
    }

    function onMouseUp() {
        setIsClicked(false);
    }

    useEffect(() => {
        if (!ref.current)
            return;
        const node = ref.current;
        document.addEventListener('mouseup', onMouseUp)
        node.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mousemove', onMouseMove);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp)
            node.removeEventListener('mousedown', onMouseDown)
        }
    });

    return position;
}
'use client';

import { useState } from "react";

const useHabitForm = () => {
	const [completion, setCompletion] = useState(1);
	const [icon, setIcon] = useState(0);
	const [color, setColor] = useState(0);

    return {
        completion,
        setCompletion,
        icon,
        setIcon,
        color,
        setColor
    }
}
export default useHabitForm;
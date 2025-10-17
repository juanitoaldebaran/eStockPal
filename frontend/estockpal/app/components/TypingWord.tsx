"use client";

import { useEffect, useState } from "react";

interface TypingWordProps {
    word: string;
}

export default function TypingWord({word}: TypingWordProps) {
    const [newWord, setNewWord] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timeInterval = 100;
        const timeOut = setTimeout(() => {
            if (currentIndex < word.length) {
                setNewWord((prev) => (prev + word.charAt(currentIndex)));
                setCurrentIndex(currentIndex + 1);
            }  
        }, timeInterval);

        return () => clearTimeout(timeOut);
    }, [newWord, word, currentIndex]);

    return (
        <div>
            {newWord}
        </div>
    )
}
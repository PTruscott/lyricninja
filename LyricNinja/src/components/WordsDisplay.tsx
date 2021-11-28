import React, { useState, useEffect, useRef } from 'react';

interface WordsDisplayProps {
    word: string;
    visible: boolean;
    forward: boolean;
    rhymes: string[];
}

const WordsDisplay: React.FC<WordsDisplayProps> = ({word, visible, forward, rhymes}) => {

    const [visibility, setVisibility] = useState(visible ? 1 : 0);
    const duration = 0.3;
    const animationFrameHandle = useRef(0);
    const prevTime = useRef(performance.now());
    const outputValueRange = 1;

    function easeIn(x: number): number {
        return 1 - Math.cos((x * Math.PI) / 2);
    }

    function easeOut(x: number): number {
        return Math.sin((x * Math.PI) / 2);;
    }

    useEffect(() => {
        prevTime.current = performance.now();

        function render(timestamp: DOMHighResTimeStamp) {
            animationFrameHandle.current = requestAnimationFrame(render);
            let visibilityTarget = visible ? 1 : 0;
            let secondsElapsed = (timestamp - prevTime.current) / 1000;
            // console.log("Time:" + timestamp);
            // console.log("PRev:" + prevTime.current);
            // // const secondsElapsed = 1/180;
            if (secondsElapsed < 0) secondsElapsed = 1/30;

            
            const progress = outputValueRange * secondsElapsed / duration;
            
            if (visible && visibility < visibilityTarget) {
                setVisibility(visibility => Math.max(0, Math.min(visibility + progress, 1))) //increase
            }   
            else if (!visible && visibility > visibilityTarget) {
                setVisibility(visibility => Math.max(0, Math.min(visibility - progress, 1))) //decrease
            }
            
            if (visibilityTarget === visibility) {
                cancelAnimationFrame(animationFrameHandle.current);
            }

            prevTime.current = timestamp;
        }
        
        render(performance.now());
        return () => cancelAnimationFrame(animationFrameHandle.current);
    }, [visible, visibility]);

    let op;
    let pos;

    if (visible) {

        op = easeOut(visibility);
        if (forward) {
            pos = 100-100*easeOut(visibility)
        }
        else {
            pos = -100+100*easeOut(visibility);
        }
    }
    else {
        op = easeIn(visibility);

        if (forward) {
            pos = -100*(1-easeIn(visibility));
        }
        else {
            pos = 100*(1-easeIn(visibility));
        }
    }
    return (
        <div>
            <div className="rhymes" style={{ top: `13%`, opacity: op*.3, transform: `translateX(${pos}%)` }}>
                {rhymes[6]}
            </div>
            <div className="rhymes" style={{ top: `21%`,opacity: op*.43, transform: `translateX(${pos}%)` }}>
                {rhymes[4]}
            </div>
            <div className="rhymes" style={{ top: `29%`,opacity: op*.57, transform: `translateX(${pos}%)` }}>
                {rhymes[2]}
            </div>
            <div className="rhymes" style={{ top: `37%`,opacity: op*.7, transform: `translateX(${pos}%)` }}>
                {rhymes[0]}
            </div>
            <div className="main-word" style={{ opacity: op, transform: `translateX(${ pos }%)`}}>
                {word}
            </div>
            <div className="rhymes" style={{ top: `58%`, opacity: op*.7, transform: `translateX(${pos}%)` }}>
                {rhymes[1]}
            </div>
            <div className="rhymes" style={{ top: `66%`,opacity: op*.57, transform: `translateX(${pos}%)` }}>
                {rhymes[3]}
            </div>
            <div className="rhymes" style={{ top: `74%`,opacity: op*.43, transform: `translateX(${pos}%)` }}>
                {rhymes[5]}
            </div>
            <div className="rhymes" style={{ top: `82%`,opacity: op*.3, transform: `translateX(${pos}%)` }}>
                {rhymes[7]}
            </div>
            
        </div>
    );
  };

export default WordsDisplay;
  
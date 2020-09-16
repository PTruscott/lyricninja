import React, { useState } from 'react';

import ProgressBar from './ProgressBar'
import WordsDisplay from './WordsDisplay'
import Chevrons from './Chevrons'
import { getRhymes, getNewWord } from './WordGen'


const Words: React.FC = () => {
    const [showFirst, setShowFirst] = useState(true);
    const [firstIndex, setFirstIndex] = useState(0);
    const [secondIndex, setSecondIndex] = useState(-1);
    const [forward, setForward] = useState(true);
    const maxWordHistory = 6;

    const [words, setWords] = useState([getNewWord('AA'), getNewWord('AH')]);
    const [rhymes, setRhymes] = useState([getRhymes(words[0]), getRhymes(words[1])]);

    function forwardWord() {
        let nextFirstIndex = firstIndex;
        let nextSecondIndex = secondIndex;
        if (Math.max(secondIndex, firstIndex)+1 >= words.length) {
            const newWords = [...words];
            const newWord = getNewWord(words[words.length-1]['l_stressed']);
            const newRhymes = [...rhymes];
            newRhymes.push(getRhymes(newWord));
            newWords.push(newWord);
            if (newWords.length > maxWordHistory) {
                newWords.shift();
                newRhymes.shift();
                nextFirstIndex -= 1;
                nextSecondIndex -= 1;
            } 
            setRhymes(newRhymes);
            setWords(newWords);
        }     

        if (showFirst && firstIndex > secondIndex) nextSecondIndex += 2;
        if (!showFirst && secondIndex > firstIndex) nextFirstIndex += 2;

        setFirstIndex(nextFirstIndex);
        setSecondIndex(nextSecondIndex);
        setShowFirst(!showFirst);
        setForward(true);
    }

    function canGoBack() {
        const minValue = forward ? 0 : 1
        if (Math.min(firstIndex, secondIndex) < minValue) return false;
        return true;
    }

    function previousWord() {
        if (!canGoBack()) return;
        setForward(false);
        setShowFirst(!showFirst);

        if (showFirst && firstIndex > secondIndex) return;
        if (!showFirst && secondIndex > firstIndex) return;
        if (showFirst) setSecondIndex(secondIndex-2);
        else setFirstIndex(firstIndex-2);       
    }

    return (
        <div className="words">
            <WordsDisplay word={words[firstIndex]['w']} visible={showFirst} forward={forward} rhymes={rhymes[firstIndex]}></WordsDisplay>
            <WordsDisplay word={words[(secondIndex < 0) ? 0 : secondIndex]['w']} visible={!showFirst} forward={forward} rhymes={rhymes[(secondIndex < 0) ? 0 : secondIndex]}></WordsDisplay>
            <ProgressBar onComplete={() => forwardWord()}></ProgressBar>
            <div className="chevron-button" onClick={() => previousWord()}>
                <Chevrons enabled={ canGoBack() } left={ true } ></Chevrons> 
            </div>
            <div className="chevron-button right" onClick={() => forwardWord()}>
                <Chevrons enabled={ true } left={ false } ></Chevrons> 
            </div>
        </div>
    );
};

export default Words;
  
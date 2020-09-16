import React, { useState, useRef } from 'react';

import ProgressBar from './ProgressBar'
import WordsDisplay from './WordsDisplay'
import Chevrons from './Chevrons'
import { AA } from '../assets/data/AA';
import { AE } from '../assets/data/AE';
import { AH } from '../assets/data/AH';
import { AO } from '../assets/data/AO';
import { AW } from '../assets/data/AW';
import { AY } from '../assets/data/AY';
import { EH } from '../assets/data/EH';
import { ER } from '../assets/data/ER';
import { EY } from '../assets/data/EY';
import { IH } from '../assets/data/IH';
import { IY } from '../assets/data/IY';
import { OW } from '../assets/data/OW';
import { OY } from '../assets/data/OY';
import { UH } from '../assets/data/UH';
import { UW } from '../assets/data/UW';



interface WordsProps {
}


const Words: React.FC<WordsProps> = () => {
    const [showFirst, setShowFirst] = useState(true);
    const [firstIndex, setFirstIndex] = useState(0);
    const [secondIndex, setSecondIndex] = useState(-1);
    const [forward, setForward] = useState(true);
    const maxWordHistory = 6;

    const vowel = useRef(0);
    const vowels = [AA, AE, AH, AH, AO, AW, AY, EH, ER, EY, IH, IY, OW, OY, UH, UW];

    const [words, setWords] = useState([getNewWord(), getNewWord()]);
    const [rhymes, setRhymes] = useState([getRhymes(words[0]), getRhymes(words[1])]);

    
    

    function getRhymes(word: object) {
        let text = word['w'];
        let vowelSelected
        vowels.forEach(element => {
            // console.log(element)
            let firstWord = element[Object.keys(element)[0]];
            if (firstWord['l_stress'] == word['l_stress']) {
                // console.log(firstWord['w']+" "+firstWord['l_stress']+ " "+word['w']+" "+word['l_stress']);
                vowelSelected = element
            }
        }); 
        const keys = Object.keys(vowelSelected)
        let rhymeList = []
        for (var i = 0; i < 8; i++) {
            const wordIndex = (Math.floor(Math.random() * keys.length));
            const randKey = keys[wordIndex];
            rhymeList.push(vowelSelected[randKey]['w']);
        }

        
        // const word1 = vowelSelected[randKey]['w'];
        // console.log("RHyme: "+word['w']+" "+word1)
        // console.log(vowels[0]);
        //maximum length is 10 at size 1.5em max size 2em
        // return [text+"1", text+"2", text+"3", text+"4", text+"5", text+"6", text+"7", text+"8"];
        return rhymeList;
    }
    
    function getNewWord() {
        vowel.current = (Math.floor(Math.random() * vowels.length));
        const keys = Object.keys(vowels[vowel.current])
        const wordIndex = (Math.floor(Math.random() * keys.length));
        const randKey = keys[wordIndex];
        const word = vowels[vowel.current][randKey];

        // Select a key from the array of keys using the random index

        // Use the key to get the corresponding name from the "names" object        

        //maximum length is 7 at size 2em
        //max size 3em

        return word
        // return "Universit"
    }

    function forwardWord() {
        let nextFirstIndex = firstIndex;
        let nextSecondIndex = secondIndex;
        if (Math.max(secondIndex, firstIndex)+1 >= words.length) {
            const newWords = [...words];
            const newWord = getNewWord();
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
  
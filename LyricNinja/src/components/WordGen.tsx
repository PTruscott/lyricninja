import { wordDict } from '../assets/data/words';


export function getRhymes(word: object) {
    // @ts-ignore
    let vowelSelected = wordDict[word['l_stress']];

    // @ts-ignore
    const words = Object.keys(vowelSelected)
    let potentialRhymes = [];
    words.forEach(element => {
        // logic for selcting a valid word
        // don't want the same word
        if (vowelSelected[element]['w'] === word['w']) return;
        // can't have the last stress too far back in the word to be valid
        if (vowelSelected[element]['l_stress_pos'] > word['l_stress_pos']) return;
        potentialRhymes.push(element)
    });

    let rhymeList = []
    for (var i = 0; i < 8; i++) {
        const wordIndex = (Math.floor(Math.random() * potentialRhymes.length));
        // @ts-ignore
        if (potentialRhymes[wordIndex]) {
            rhymeList.push(potentialRhymes[wordIndex]);
            // console.log(potentialRhymes[wordIndex]);
            potentialRhymes.splice(wordIndex, 1);
        }
    }

    return rhymeList;
}

export function getNewWord(currentSound: string) {
    // get list of vowels
    const vowels = Object.keys(wordDict);
    // get new vowel
    let vowel = (Math.floor(Math.random() * vowels.length));
    while (vowels[vowel] === currentSound) {
        vowel = (Math.floor(Math.random() * vowels.length));
    }

    // get list of words 
    // @ts-ignore
    const words = Object.keys(wordDict[vowels[vowel]]);

    const wordIndex = (Math.floor(Math.random() * words.length));
    const randKey = words[wordIndex];
    // @ts-ignore
    const word = wordDict[vowels[vowel]][randKey];

    return word
}
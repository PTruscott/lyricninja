import json

cmudict = open("C:/Users/Peran/LyricNinja/cmudict.txt", "r")
words = {}
words["AA"] = {}
words["AE"] = {}
words["AH"] = {}
words["AO"] = {}
words["AW"] = {}
words["AY"] = {}
words["EH"] = {}
words["ER"] = {}
words["EY"] = {}
words["IH"] = {}
words["IY"] = {}
words["OW"] = {}
words["OY"] = {}
words["UW"] = {}
words["UH"] = {}

for line in cmudict:
    segments = line.split()
    if len(segments) < 1: 
        continue
    if segments[0] == ';;;':
        continue
    num_syllables = 0
    vowel_sounds = []
    primary_stress = ""
    last_stress = ""
    sounds_rev = segments[1:]
    sounds_rev.reverse()
    last_stress_pos = 0
    for sound in sounds_rev:
        if len(sound) == 3:
            num_syllables += 1
            vowel_sounds.append(sound[:2])
            if last_stress == "" and sound[-1] != "0":
                last_stress = sound[:2]
                last_stress_pos = num_syllables-1
            if sound[-1] == "1" and primary_stress == "":
                primary_stress = sound[:2]

    if last_stress == "":
        last_stress = vowel_sounds[0]
    if primary_stress == "":
        primary_stress = last_stress
                
    word = {
        "word": segments[0],
        "num_sounds": len(segments)-1,
        "sounds_rev": sounds_rev,
        "num_syllables": num_syllables,
        "vowel_sounds_rev": vowel_sounds, 
        "primary_stress": primary_stress,
        "last_stress": last_stress,
        "last_stress_pos": last_stress_pos,
    }
    # print(word)
    words[word["last_stress"]][word["word"]] = word

# print("printing")
# f = open("C:/Users/Peran/LyricNinja/rhyme_dict.json",'w')

# f.write(json.dumps(words))
# f.close()

for key,value in words.items():
    print("Printing: "+key)
    f = open("C:/Users/Peran/LyricNinja/Lyric_Ninja/src/pages/"+key+".js",'w')
    f.write("const "+key+" = "+json.dumps(value)+";")
    f.close

cmudict = open("C:/Users/Peran/LyricNinja/shotdict.txt", "r")
for line in cmudict:
    segments = line.split()
    if len(segments) < 1: 
        pass
    num_syllables = 0
    vowel_sounds = []
    primary_stress = ""
    last_stress = ""
    for sound in segments[1:].reverse():
        if len(sound) == 3:
            num_syllables += 1
            vowel_sounds.append(sound[:1])
            if last_stress == "" and sound[-1] != "0":
                last_stress == sound[:1]
            if sound[-1] == "1":
                primary_stress == sound[:1]
                
    word = {
        "word": segments[0],
        "num_sounds": len(segments)-1,
        "sounds_rev": segments[1:].reverse(),
        "num_syllables": num_syllables,
        "vowel_sounds_rev": vowel_sounds, 
        "primary_stress": primary_stress,
        "last_stress": last_stress
    }
    print(word)
class Chord{
    constructor(name, audioElement){
        this.name = name;
        this.audio = audioElement;
    }
}

/////////////majors////////////////////
const Cmaj = new Chord("Cmaj", document.getElementById('Cmaj'));
const Csmaj = new Chord("C#/Dbmaj", document.getElementById('Csmaj'));
const Dmaj = new Chord("Dmaj", document.getElementById('Dmaj'));
const Dsmaj = new Chord("D#/Ebmaj", document.getElementById('Dsmaj'));
const Emaj = new Chord("Emaj", document.getElementById('Emaj'));
const Fmaj = new Chord("Fmaj", document.getElementById('Fmaj'));
const Fsmaj = new Chord("F#/Gbmaj", document.getElementById('Fsmaj'));
const Gmaj = new Chord("Gmaj", document.getElementById('Gmaj'));
const Gsmaj = new Chord("G#/Abmaj", document.getElementById('Gsmaj'));
const Amaj = new Chord("Amaj", document.getElementById('Amaj'));
const Asmaj = new Chord("A#/Bbmaj", document.getElementById('Asmaj'));
const Bmaj = new Chord("Bmaj", document.getElementById('Bmaj'));



const majors = [Cmaj, Csmaj, Dmaj, Dsmaj, Emaj, Fmaj, Fsmaj, Gmaj, Gsmaj, Amaj, Asmaj, Bmaj];


//////////////minors///////////////////
const Cmin = new Chord("Cmin", document.getElementById('Cmin'));
const Csmin = new Chord("C#/Dbmin", document.getElementById('Csmin'));
const Dmin = new Chord("Dmin", document.getElementById('Dmin'));
const Dsmin = new Chord("D#/Ebmin", document.getElementById('Dsmin'));
const Emin = new Chord("Emin", document.getElementById('Emin'));
const Fmin = new Chord("Fmin", document.getElementById('Fmin'));
const Fsmin = new Chord("F#/Gbmin", document.getElementById('Fsmin'));
const Gmin = new Chord("Gmin", document.getElementById('Gmin'));
const Gsmin = new Chord("G#/Abmin", document.getElementById('Gsmin'));
const Amin = new Chord("Amin", document.getElementById('Amin'));
const Asmin = new Chord("A#/Bbmin", document.getElementById('Asmin'));
const Bmin = new Chord("Bmin", document.getElementById('Bmin'));

const minors = [Cmin, Csmin, Dmin, Dsmin, Emin, Fmin, Fsmin, Gmin, Gsmin, Amin, Asmin, Bmin];


/////////////major sevenths////////////////////
const Cmaj7 = new Chord("Cmaj7", document.getElementById('Cmaj7'));
const Csmaj7 = new Chord("C#/Dbmaj7", document.getElementById('Csmaj7'));
const Dmaj7 = new Chord("Dmaj7", document.getElementById('Dmaj7'));
const Dsmaj7 = new Chord("D#/Ebmaj7", document.getElementById('Dsmaj7'));
const Emaj7 = new Chord("Emaj7", document.getElementById('Emaj7'));
const Fmaj7 = new Chord("Fmaj7", document.getElementById('Fmaj7'));
const Fsmaj7 = new Chord("F#/Gbmaj7", document.getElementById('Fsmaj7'));
const Gmaj7 = new Chord("Gmaj7", document.getElementById('Gmaj7'));
const Gsmaj7 = new Chord("G#/Abmaj7", document.getElementById('Gsmaj7'));
const Amaj7 = new Chord("Amaj7", document.getElementById('Amaj7'));
const Asmaj7 = new Chord("A#/Bbmaj7", document.getElementById('Asmaj7'));
const Bmaj7 = new Chord("Bmaj7", document.getElementById('Bmaj7'));


const majorSevenths = [Cmaj7, Csmaj7, Dmaj7, Dsmaj7, Emaj7, Fmaj7, Fsmaj7, Gmaj7, Gsmaj7, Amaj7, Asmaj7, Bmaj7];



////////////////////vars/////////////////////////////
const winCountSpan = document.getElementById("correct-guesses");
const loseCountSpan = document.getElementById("incorrect-guesses");
const replayButton = document.getElementById("replay-button");
const refreshButton = document.getElementById("refresh-button");
const majorButton = document.getElementById("major-button");
const minorButton = document.getElementById("minor-button");
const majorSeventhButton = document.getElementById("major-seventh-button");
const randomChordButton = document.getElementById("random-chord-button");
let userInput = document.getElementById("search-input");
let output = document.getElementById("output");
let resultList = document.getElementById("result-list");
let correct = '';
let winCount = 0;
let loseCount = 0;
const chords=[majors, minors, majorSevenths];
let allchords = [];
for(i = 0; i < chords.length; i++){
    allchords = allchords.concat(chords[i]);
}

////////////////////the function///////////////////////


function playNote(audioFile) { //for individual notes, so they can repeat before audio ends
    const note = new Audio(audioFile);
    note.currentTime = 0;
    note.play();
}

function playRandomMajor(){
    let randomMajor = majors[Math.floor(Math.random() * 11)];
    randomMajor.audio.play();
    return randomMajor;
}

function playRandomMinor(){
    let randomMinor = minors[Math.floor(Math.random() * 11)];
    randomMinor.audio.play();
    return randomMinor;
}

function playRandomMajorSeventh(){
    let randomMajorSeventh = majorSevenths[Math.floor(Math.random() * 11)];
    randomMajorSeventh.audio.play();
    return randomMajorSeventh;
}

function playRandomChord(){
    let randomChord = chords[Math.floor(Math.random()* chords.length)][Math.floor(Math.random() * 11)]
    randomChord.audio.play();
    return randomChord;
}

function refresh(){
    userInput.value = '';
    resultList.innerHTML = '';
    correct = '';
    disableReplayRefresh();
    disableChords();
}

function playRandom(chord){
    if(chord == 'major'){
        let randomMajor = playRandomMajor();
        correct = randomMajor;
        console.log(randomMajor.name);
    }
    else if(chord == 'minor'){
        let randomMinor = playRandomMinor();
        correct = randomMinor;
        console.log(randomMinor.name);
    }
    else if(chord == 'major-seventh'){
        let randomMajorSeventh = playRandomMajorSeventh();
        correct = randomMajorSeventh;
        console.log(randomMajorSeventh.name);
    }
    else if(chord == 'random'){
        let randomChord = playRandomChord();
        correct = randomChord;
        console.log(randomChord.name);
    }
    disableReplayRefresh();
    disableChords();
}

function updateScore(result){ 
    if(result == "win"){
        winCount += 1;
        winCountSpan.textContent = winCount;
    }
    else{
        loseCount += 1;
        loseCountSpan.textContent = loseCount;
    }
    refresh();
}

function disableReplayRefresh(){
    if(correct == ''){
        replayButton.classList.add("disabled");
        replayButton.disabled = true;
        refreshButton.classList.add("disabled");
        refreshButton.disabled = true;
        console.log("disabled");
    }
    else{
        replayButton.classList.remove("disabled");
        replayButton.disabled = false;
        refreshButton.classList.remove("disabled");
        refreshButton.disabled = false;
        correct.audio.play();
        console.log("enabled");
    }
}

function disableChords(){
    if(correct == ''){
        majorButton.classList.remove("disabled");
        minorButton.classList.remove("disabled");
        majorSeventhButton.classList.remove("disabled");
        randomChordButton.classList.remove("disabled");
    }
    else{
        majorButton.classList.add("disabled");
        minorButton.classList.add("disabled");
        majorSeventhButton.classList.add("disabled");
        randomChordButton.classList.add("disabled");
    }
}




////////////search logic/////////////
userInput.addEventListener("input", () => {

    output.textContent = '';
    resultList.innerHTML = '';

    for(i = 0; i < allchords.length; i++){
        lowerAllChords = allchords[i].name.toLowerCase(); //set to lowercase
        lowerInput = userInput.value.toLowerCase();
        if(lowerAllChords.includes(lowerInput)){
            let result = document.createElement("li");
            result.textContent = allchords[i].name;
            result.classList.add("result")
            result.addEventListener("click", () => {

                if(correct != ''){
                    if(result.textContent == correct.name){
                        output.textContent = "You are correct! What A# lad!"; //you A # lad 
                        updateScore("win");
                    }
                    else{
                        output.textContent = "Try again next time!";
                        updateScore("loss");
                    }
                }
                else{
                    output.textContent = "Try to play a chord first!";
                    refresh();
                }
            })
            resultList.appendChild(result);
        }
    }

    if(userInput.value == ''){
        output.textContent = '';
        resultList.innerHTML = '';
    }
})
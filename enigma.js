
let num = 0;
let string = "";
let fromLetter = "";
let toLetter = "";
function main(key) {
    let rotors = ["EKMFLGDQVZNTOWYHXUSPAIBRCJ", "AJDKSIRUXBLHWTMCQGZNPYFVOE", "BDFHJLCPRTXVZNYEIWGAKMUSQO"];
    let reflectors = ["YRUHQSLDPXNGOKMIEBFZCWVJAT", "FVPJIAOYEDRZXWGCTKUQSBNMHL"];
    let rrotors = [];
    
    for (let i = 0; i < rotors.length; i++) {
        rrotors.push(initrevrotors(rotors[i]));
    }

    let r1 = 2;
    let r2 = 1;
    let r3 = 0;
    let ukw = 0;

    eins = num % 26;
    zwei = Math.floor(num/26) % 26;
    drei = Math.floor(num/676) % 26;

    let charInput = key;
    charInput = subPlug(key, fromLetter, toLetter);
    charInput = enigma(charInput, rotors[r3], 1, eins, 0, num);
    charInput = enigma(charInput, rotors[r2], 2, zwei, eins, num);
    charInput = enigma(charInput, rotors[r1], 3, drei, zwei, num);
    charInput = reflect(charInput, reflectors[ukw]);
    charInput = back(charInput, rrotors[r1], 3, num);
    charInput = back(charInput, rrotors[r2], 2, num);
    charInput = back(charInput, rrotors[r3], 1, num);
    charInput = subPlug(charInput, fromLetter, toLetter);
    
    return charInput;
}

function enigma(charInput, rotor, stage, cur, prev, i) {
    console.log("   CharInput: ", charInput);
    let rotorArray = Array.from(rotor);
    let mod = cur - prev;
    let num = (charInput.charCodeAt(0) + 65 + mod) % 26;

    let inputChar = rotorArray[num % 26];
    console.log("   Out: ", inputChar);
    return inputChar;
}
function reflect(charInput, reflector) {
    let reflectorArray = Array.from(reflector);
    let num = (charInput.charCodeAt(0) - 13) % 26;
    let inputChar = reflectorArray[num];
    return inputChar;
}

function back(charInput, rotor, stage, i) {
    console.log("   CharInput: ", charInput);
    console.log("   rotor: ", rotor);
    if (stage === 1) {
        mod = i % 26;
    } else if (stage === 2) {
        mod = Math.floor(i/26) % 26;
    } else if (stage === 3) {
        mod = Math.floor(i/676) % 26;
    }
    let num = (charInput.charCodeAt(0) - 13) % 26;
    let char = rotor.charAt([(num + mod) % 26]);
    console.log(char);
    char = String.fromCharCode((char.charCodeAt(0) - mod + 13) % 26 + 65);
    console.log((char.charCodeAt(0) - mod));
    console.log("   CharOutput: ", char);
    return char;
}

function initPlugboard(fromLetter, toLetter) {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let alphabetArray = Array.from(alphabet);
    let fromArray = Array.from(fromLetter);
    let toArray = Array.from(toLetter);
    let string = "";

    for (let i = 0; i < fromArray.length; i++) {
        let fromIndex = alphabetArray.indexOf(fromArray[i]);
        let toIndex = alphabetArray.indexOf(toArray[i]);
        alphabetArray[fromIndex] = toArray[i];
        alphabetArray[toIndex] = fromArray[i];
    }
    
    for (let i = 0; i < alphabetArray.length; i++) {
        let char = alphabetArray[i];
        string += char;
    }
    
    console.log("   Plugboard: ", string);
    return string;
}

function subPlug(charInput, fromLetter, toLetter) {
    let plugboard = initPlugboard(fromLetter, toLetter);
    let plugboardArray = Array.from(plugboard);

    let num = (charInput.charCodeAt(0) - 13) % 26;
    let inputChar = plugboardArray[num];

    return inputChar;
}

function initrevrotors(rotor) {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let alphabetArray = Array.from(alphabet);
    let rotorArray = Array.from(rotor);
    let returningRotor = new Array(26);
    let string;

    for (let i = 0; i < alphabetArray.length; i++) {
        let char = rotorArray[i];
        let charVal = char.charCodeAt(0) - 13;
        returningRotor[charVal % 26] = alphabetArray[i];
    }

    return returningRotor.join("");
}

function batteryChange() {
    let btn = document.getElementById('switch');
            if (btn.innerText === 'Dunkel') {
                btn.innerText = 'Hell';
            } else if (btn.innerText === 'Hell') {
                btn.innerText = 'Aus';
            } else if (btn.innerText === 'Aus') {
                btn.innerText = 'Dunkel';
            }
}

function caesar(char) {
    const ascii = char.charCodeAt(0);
    let shiftedAscii;

    if (ascii >= 65 && ascii <= 90) { // A-Z
        shiftedAscii = ((ascii - 65 + 3) % 26) + 65;
    } else {
        return char; // Return the original character if it's not a letter
    }

    return String.fromCharCode(shiftedAscii);
}

window.addEventListener('keydown', function(e) {

    let licht = document.getElementById('switch').innerText;
    let helligkeit;
    if (licht === "Hell") {
        helligkeit = 'bg-yellow-500';
    } else if (licht === "Dunkel") {
        helligkeit = 'bg-yellow-100';
    } else if (licht === "Aus") {
        helligkeit = 'bg-blue-500';
    }

    let f = e.key.toUpperCase();
    f = f.replace(/[^a-zA-Z]/g,'')
    console.log(f);
    if (f != '' && f.length == 1) {
    var caesarElement = main(e.key.toUpperCase());
    //var caesarElement = e.key.toUpperCase();
    var keyElement = document.getElementById('key-' + caesarElement.toUpperCase());
        if (keyElement) {
            keyElement.classList.remove('bg-blue-500');
            keyElement.classList.add(helligkeit);
        }
    } else {

    }
});

window.addEventListener('keyup', function(e) {

    let licht = document.getElementById('switch').innerText;
    let helligkeit;
    if (licht === "Hell") {
        helligkeit = 'bg-yellow-500';
    } else if (licht === "Dunkel") {
        helligkeit = 'bg-yellow-100';
    } else if (licht === "Aus") {
        helligkeit = 'bg-blue-500';
    }

    let f = e.key.toUpperCase();
    f = f.replace(/[^a-zA-Z]/g,'')
    console.log(f);
    if (f != '' && f.length == 1) {
    var caesarElement = main(e.key.toUpperCase());
    //var caesarElement = e.key.toUpperCase();
    var keyElement = document.getElementById('key-' + caesarElement.toUpperCase());
    if (keyElement) {
    keyElement.classList.remove(helligkeit);
    keyElement.classList.add('bg-blue-500');    
    }   
    num++;
    console.log(helligkeit);
    string += caesarElement;
    console.log(string);
    } else {

    }
});

function sub(rotor) {
    let selRotor = document.getElementById(rotor);
    let val = parseInt(selRotor.innerText);
    if (val == 1) {
        document.getElementById(rotor).innerText = 26;
    } else {
        document.getElementById(rotor).innerText -= 1;
    }
}

function add(rotor) {
    let selRotor = document.getElementById(rotor);
    let val = parseInt(selRotor.innerText);
    if (val == 26) {
        document.getElementById(rotor).innerText = 1;
    } else {
        document.getElementById(rotor).innerText = val + 1;
    }
}
fromLetter = "";
toLetter = "";
function plug(letter) {
    letter = letter.toUpperCase();
    let field = document.getElementById("plugfield");
    if (field.innerText.length < 29) {
        if ((field.innerText.length - 1) % 3 != 0) {
            field.innerText += letter.toUpperCase();
            fromLetter += letter;
            document.getElementById("fromLetter").innerText = fromLetter;
        } else {
            field.innerText += letter.toUpperCase();
            if (field.innerText.length != 29) {
                field.innerHTML += "-";
            }
            toLetter += letter;
            document.getElementById("toLetter").innerText = toLetter;
        }
    }
}

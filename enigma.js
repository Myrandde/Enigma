
let num = 0;
let string = "";

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

    let fromLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let toLetter = "ZYXWVUTSRQPONMLKJIHGFEDCBA";

    eins = num % 26;
    zwei = Math.floor(num/26) % 26;
    drei = Math.floor(num/676) % 26;

    let charInput = key;
    //charInput = subPlug(key, fromLetter, toLetter);
    charInput = enigma(charInput, rotors[r3], 1, eins, 0, num);
    charInput = enigma(charInput, rotors[r2], 2, zwei, eins, num);
    charInput = enigma(charInput, rotors[r1], 3, drei, zwei, num);
    charInput = reflect(charInput, reflectors[ukw]);
    charInput = back(charInput, rrotors[r1], 3, num);
    charInput = back(charInput, rrotors[r2], 2, num);
    charInput = back(charInput, rrotors[r3], 1, num);
    //charInput = subPlug(charInput, fromLetter, toLetter);
    
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

    var caesarElement = main(e.key.toUpperCase());
    //var caesarElement = e.key.toUpperCase();
    var keyElement = document.getElementById('key-' + caesarElement.toUpperCase());
    if (keyElement) {
    keyElement.classList.remove('bg-blue-500');
    keyElement.classList.add('bg-yellow-500');
    }
});

window.addEventListener('keyup', function(e) {
    var caesarElement = main(e.key.toUpperCase());
    //var caesarElement = e.key.toUpperCase();
    var keyElement = document.getElementById('key-' + caesarElement.toUpperCase());
    if (keyElement) {
    keyElement.classList.remove('bg-yellow-500');
    keyElement.classList.add('bg-blue-500');    
    }   
    num++;
    console.log(num);
    string += caesarElement;
    console.log(string);
});

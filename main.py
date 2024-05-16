import math
import re

def enigma(charInput, rotor, stage, cur, prev, i):
    print ("charInput: ", charInput)
    rotorArray = list(rotor)
    mod = cur - prev
    num = (ord(charInput) - 65 + mod) % 26
    inputChar = rotorArray[(num) % 26]
    print("   Out: ", inputChar)
    return inputChar

def reflect(charInput, reflector):
    reflectorArray = list(reflector)
    num = (ord(charInput) - 13) % 26
    inputChar = reflectorArray[num]
    return inputChar

def back(charInput, rotor, stage, i):
    rrotorArray = list(rotor)
    if stage == 1:
        mod = i % 26

    elif stage == 2:
        mod = math.floor(i/26) % 26

    elif stage == 3:
        mod = math.floor(i/676) % 26

    print("mod: ", mod)
    num = (ord(charInput) - 13) % 26
    char = rrotorArray[(num + mod) % 26]
    char = chr(ord(char) - mod)
    return char

def initPlugboard(fromLetter, toLetter):
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    alphabetArray = list(alphabet)
    fromArray = list(fromLetter)
    toArray = list(toLetter)
    string = ""

    for i in range(len(fromArray)):
        alphabetArray[ord(fromArray[i]) - 65] = toArray[i]
        alphabetArray[ord(toArray[i]) - 65] = fromArray[i]
    
    return string.join(alphabetArray)

def subPlug(charInput, fromLetter, toLetter):
    plugboard = initPlugboard(fromLetter, toLetter)
    plugboardArray = list(plugboard)

    num = (ord(charInput) - 13) % 26
    inputChar = plugboardArray[num]

    return inputChar

def initrevrotors(rotor):

    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    alphabetArray = list(alphabet)
    rotorArray = list(rotor)
    returningArray = [None] * 26
    string = ""

    for i in range(len(alphabetArray)):
        charVal = ord(rotorArray[i]) - 13
        returningArray[charVal % 26] = alphabetArray[i]

    return string.join(returningArray)

def etw(charInput, stage, i):
    if stage == 1:
        mod = i % 26

    elif stage == 2:
        mod = math.floor(i/26) % 26

    elif stage == 3:
        mod = math.floor(i/676) % 26

    num = (ord(charInput) - 13) % 26
    char = chr(num + 65)
    char = chr(ord(char) - mod)
    return char

def enigma():
    rotors = ["EKMFLGDQVZNTOWYHXUSPAIBRCJ","AJDKSIRUXBLHWTMCQGZNPYFVOE","BDFHJLCPRTXVZNYEIWGAKMUSQO","ESOVPZJAYQUIRHXLNFTGKDCMWB","VZBRGITYUPSDNHLXAWMJQOFECK"]
    reflectors = ["YRUHQSLDPXNGOKMIEBFZCWVJAT","FVPJIAOYEDRZXWGCTKUQSBNMHL"]
    rrotors = []

    for i in range(len(rotors)):
        rrotors.append(initrevrotors(rotors[i]))

    r1 = input("Select first rotor: ")    
    r2 = input("Select second rotor: ") 
    r3 = input("Select third rotor: ")
    ukw = input("Select reflector: ")
    inputMsg = input("Enter a message: ")

    r1 = 3
    r2 = 2
    r3 = 1
    ukw = 1
    #inputMsg = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nisl nec nisl."
    #inputMsg = "PDSTASNASTMDQQQRZRYEFWJZUMJEGCLWXRHMYWEZJPDOQCILLHUGIWRKSCGHQSLCDUK"
    r1 = int(r1) - 1
    r2 = int(r2) - 1
    r3 = int(r3) - 1
    ukw = int(ukw) - 1
    inputMsg = inputMsg.upper()
    inputMsg = inputMsg.replace(" ", "")
    inputMsg = re.sub(r'\W', "" ,inputMsg)
    print("Selected rotors: ", r1, r2, r3)
    print("Input message: ", inputMsg)
    final = ""

    plugboard = input("Do you want to use a plugboard? (Y/N): ")
    plugboard = plugboard.upper()
    if plugboard == "Y":
        fromLetter = input("Type in all the letters you want to switch from")
        toLetter = input("Type the letters you want to convert to")
        fromLetter = fromLetter.upper()
        toLetter = toLetter.upper()
    else:
        fromLetter = ""
        toLetter = ""
    
    for i in range(len(inputMsg)):

        eins = i % 26
        zwei = math.floor(i/26) % 26
        drei = math.floor(i/676) % 26

        charInput = inputMsg[i]
        charInput = subPlug(charInput, fromLetter, toLetter)
        charInput = enigma(charInput, rotors[r3], 1, eins, 0, i)
        print(charInput)
        charInput = enigma(charInput, rotors[r2], 2, zwei, eins, i)
        print(charInput)
        charInput = enigma(charInput, rotors[r1], 3, drei, zwei, i)
        print(charInput)
        charInput = reflect(charInput, reflectors[ukw])
        print(charInput)
        charInput = back(charInput, rrotors[r1], 3, i)
        print(charInput)
        charInput = back(charInput, rrotors[r2], 2, i)
        print(charInput)
        charInput = back(charInput, rrotors[r3], 1, i)
        print(charInput)
        charInput = subPlug(charInput, fromLetter, toLetter)
        print()
        final += charInput

    print("Final message: ", final)


enigma()

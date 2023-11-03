import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        //initialize stuff
        Scanner scan = new Scanner(System.in);
        String InputText, ClearInput, EncryptInput;
        Character un,deux,trois,quatre,cinq,six,sept,huit,neuf;
        String[] rotors = {"EKMFLGDQVZNTOWYHXUSPAIBRCJ","AJDKSIRUXBLHWTMCQGZNPYFVOE","BDFHJLCPRTXVZNYEIWGAKMUSQO","ESOVPZJAYQUIRHXLNFTGKDCMWB","VZBRGITYUPSDNHLXAWMJQOFECK"};
        //init rotors for the stage 6-8 of enigma conversion
        String[] returnRotors = new String[(rotors.length)];

        for (int i = 0; i < rotors.length; i++) {
            String returnRotor = initializeReturnRotors(rotors[i]);
            returnRotors[i] = returnRotor;
        }

       /*for (String x : returnRotors) {
            System.out.println(x);
        }*/

        //the reflectors
        String[] reflectors = {"YRUHQSLDPXNGOKMIEBFZCWVJAT","FVPJIAOYEDRZXWGCTKUQSBNMHL"};

        System.out.println("Welcome, Kommandant.");
        System.out.println("Would you like to en/decrypt a message today?");
        System.out.println("Please input the rotors you will use today?");
        System.out.println("Rotor 1:");
        int firstRotor = Integer.parseInt(scan.nextLine())-1;
        System.out.println("Rotor 2:");
        int secondRotor = Integer.parseInt(scan.nextLine())-1;
        System.out.println("Rotor 3:");
        int thirdRotor = Integer.parseInt(scan.nextLine())-1;
        System.out.println("Which reflector will you use today:");
        int selectedUKW = Integer.parseInt(scan.nextLine())-1;

        /*int firstRotor = 1;
        int secondRotor = 2;
        int thirdRotor = 3;
        int selectedUKW = 1;*/

        System.out.println("Input your message:");
        InputText = scan.nextLine();

        //clears all non alphabet characters and whitespaces and capitalizes the text
        ClearInput = (InputText.replaceAll("\s","")).toUpperCase();
        ClearInput = ClearInput.replaceAll("[^a-zA-Z]", "");

        //plugboard initialization, user has choice to skip
        System.out.println("Would you like to use the plugboard?");
        String fromLetter = "";
        String toLetter = "";
        String yesno = scan.nextLine();

        if (yesno.equalsIgnoreCase("No")) {
            System.out.println("Oh okay");
        }

        else {

            System.out.println("Type in all the letters you want to switch from");
            fromLetter = scan.nextLine();
            System.out.println("Type the letters you want the to convert to:");
            toLetter = scan.nextLine();

            fromLetter = fromLetter.toUpperCase();
            toLetter = toLetter.toUpperCase();

        }

        StringBuilder encryptBuilder = new StringBuilder(ClearInput);

        //System.out.println(firstRotor+","+secondRotor+","+thirdRotor+":"+"C-P-3-2-1-R-1-2-3-P");

        for (int i = 0; i < ClearInput.length(); i++) {

            int eins = i % 26;
            int zwo = (i/26) % 26;
            int drei = (i/676) % 26;

            char charInput = ClearInput.charAt(i);
            un = substitutePlugboard(charInput, fromLetter, toLetter);
            deux = enigma(un, rotors[thirdRotor], 1,i);
            trois = enigma(deux, rotors[secondRotor], 2,i);
            quatre = enigma(trois, rotors[firstRotor], 3,i);
            cinq = reflect(quatre, reflectors[selectedUKW]);
            six = zuruck(cinq, returnRotors[firstRotor], 3,i);
            sept = zuruck(six, returnRotors[secondRotor], 2,i);
            huit = zuruck(sept, returnRotors[thirdRotor], 1,i);
            neuf = substitutePlugboard(huit, fromLetter, toLetter);

            //System.out.println(drei+","+zwo+","+eins+":"+charInput+"-"+
            //        un+"-"+deux+"-"+trois+"-"+quatre+"-"+cinq+"-"+six+"-"+sept+"-"+huit+"-"+neuf);
            encryptBuilder.setCharAt(i,neuf);

        }

        EncryptInput = encryptBuilder.toString();

        StringBuilder sb = new StringBuilder();

        for (int i = 1; i <= EncryptInput.length(); i++){
            sb.append(EncryptInput.charAt(i-1));

            if (i % 5 == 0) {
                sb.append(" ");
            }
        }

        EncryptInput = sb.toString();
        System.out.println("Your converted message, Kommandant:");
        System.out.println(paragraphBreaker(EncryptInput));
    }

    private static Character reflect(Character input, String reflector) {
        char[] reflectorArray = reflector.toCharArray();
        char newChar;

            int inputChar = (input - 13) % 26;
            newChar = reflectorArray[inputChar];

        return newChar;
    }

    private static Character zuruck(Character input, String returnRotor, int stage,int i) {
        char[] rrotorArray = returnRotor.toCharArray();
        char newChar = 0;

        switch (stage) {
            case 1 -> {
                    int mod = (i%26);
                    int inputChar = (input - 13) % 26;
                    newChar = rrotorArray[(inputChar+mod)%26];
                    newChar = (char) (newChar - mod);
            }

            case 2 -> {
                    int mod = ((i/26)%26);
                    int inputChar = (input - 13) % 26;
                    newChar = rrotorArray[(inputChar+mod)%26];
                    newChar = (char) (newChar - mod);
            }
            case 3 -> {
                    int mod = ((i/(26*26))%26);
                    int inputChar = (input - 13) % 26;
                    newChar = rrotorArray[(inputChar+mod)%26];
                    newChar = (char) (newChar - mod);
            }
        }
        return newChar;
    }

    private static String initializeReturnRotors(String rotor) {
        String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder str = new StringBuilder();

        char[] rotorChar = (rotor).toCharArray();
        char[] alphaArray = alphabet.toCharArray();
        char[] returningChar = new char[26];

        for (int i = 0 ; i < alphaArray.length ; i++) {
            int charVal = rotorChar[i]-13;
            returningChar[charVal%26] = alphaArray[i];
        }

        for (char x:returningChar) {
            str.append(x);
        }

        return str.toString();
    }

    private static Character substitutePlugboard(Character input, String fromLetter, String toLetter) {
        String plugboard = initializePlugboard(fromLetter, toLetter);
        char[] plugboardArray = plugboard.toCharArray();
        char newChar;

            int inputChar = (input - 13) % 26;
            newChar = plugboardArray[inputChar];

        return newChar;
    }

    private static String initializePlugboard(String fromLetter, String toLetter) {
        String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder str = new StringBuilder(alphabet);

        char[] fromArray = fromLetter.toCharArray();
        char[] toArray = toLetter.toCharArray();

        for (int i = 0; i < fromArray.length; i++) {
            str.setCharAt((fromArray[i]-13)%26,toArray[i]);
            str.setCharAt((toArray[i]-13)%26,fromArray[i]);
        }

        return str.toString();
    }

    private static Character enigma(Character input, String rotor,int stage, int i) {
        char[] rotorArray = rotor.toCharArray();
        char newChar = 0;

        switch (stage) {
            case 1 -> {
                    int mod = (i%26);
                    int inputChar = (input - 13) % 26;
                    newChar = rotorArray[(inputChar+mod)%26];
                    newChar = (char) (newChar - mod);
            }

            case 2 -> {
                    int mod = ((i/26)%26);
                    int inputChar = (input - 13) % 26;
                    newChar = rotorArray[(inputChar+mod)%26];
                    newChar = (char) (newChar - mod);
            }
            case 3 -> {
                    int mod = ((i/(26*26))%26);
                    int inputChar = (input - 13) % 26;
                    newChar = rotorArray[(inputChar+mod)%26];
                    newChar = (char) (newChar - mod);
            }
        }
        return newChar;

    }

    private static String atbashtest(String clearInput, String atbash) {
        StringBuilder atBuilder = new StringBuilder();
        char[] atbashArray = atbash.toCharArray();
        char[] inputArray = clearInput.toCharArray();

        for (int i = 0; i < inputArray.length; i++) {
            char ch = inputArray[i];
            int mod = ((i+1) % 26);
            char newChar = atbashArray[(ch-12-mod)%26];

            atBuilder.append(newChar);

        }
        return atBuilder.toString();
    }

    private static String caesarTest(String text,int offset) {
        StringBuilder cBuilder = new StringBuilder();

        for (char ch : text.toCharArray()) {
            int ogAlphaLieu = ch - 64;
            int newAlphaLieu = (ogAlphaLieu + offset) % 26;

            char newChar = (char) (64 + newAlphaLieu);

            cBuilder.append(newChar);
        }

        return cBuilder.toString();
    }


    private static String paragraphBreaker(String str) {
        StringBuilder sb = new StringBuilder();

        for (int i = 1; i <= str.length(); i++){
            sb.append(str.charAt(i-1));

            if (i % 30 == 0) {
                sb.append("\n");
            }

        }
        return sb.toString();
    }
}

function toggle_view(){

    var dictionary = HangmanMain.getDictionary();
    console.log(dictionary.length);
    if(dictionary.length <= 3){
        alert("Choose a file to upload: .txt file");
    }else{
      //toggle diplay
      var x = document.getElementById("ehgame_start");
      var y = document.getElementById("ehgame_play");
      if (x.style.display == "none") {
        x.style.display = "block";
        document.getElementById("length").value="";
        document.getElementById("tries").value="";
        document.getElementById("difficulty").value="";
        y.style.display = "none";
        document.getElementById("ehgame_end").style.display = "none";
      } else {
        x.style.display = "none";
        document.getElementById("guess_input").value="";
        document.getElementById("update_result").innerHTML = "The guess:";
        document.getElementById("update_final_result").innerHTML = "Result";
        y.style.display = "block";


        // var dictionary = HangmanMain.getDictionary();
        // console.log(dictionary.length);
        hangman = new HangmanManager(dictionary, HangmanMain.DEBUG);
        if (HangmanMain.DEBUG)
            HangmanMain.showWordCounts(hangman);
        
        HangmanMain.setGameParameters(hangman);
        document.getElementById("update_guess_left").innerHTML = ("Guesses left: " + hangman.getGuessesLeft());
        document.getElementById("update_guess_so_far").innerHTML = ("Guessed so far : " + hangman.getGuessesMade());
        document.getElementById("update_current_word").innerHTML = ("Current word : " + hangman.getPattern());
        console.log("set game parameters done");
      }
    }
}

function go(){
    HangmanMain.main();
}


/* Generated from Java with JSweet 2.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * Class HangmanMain is the driver program for the Hangman program.  It reads a
 * dictionary of words to be used during the game and then plays a game with
 * the user.
 *
 * <br><br>This is a cheating version of hangman that delays picking a word
 * to keep its options open.  You can change the setting for DEBUG to see
 * how many options are still left on each turn and what patterns are
 * being generated from the guess
 *
 * Based on a program by Stuart Reges, modified my Mike Scott
 * @class
 */
var HangmanMain = (function () {
    function HangmanMain() {
    }
    HangmanMain.main = function () {
        // var dictionary = HangmanMain.getDictionary();
        // console.log(dictionary);
        // var hangman = new HangmanManager(dictionary, HangmanMain.DEBUG);
        // if (HangmanMain.DEBUG)
        //     HangmanMain.showWordCounts(hangman);
        
        // HangmanMain.setGameParameters(hangman);
        if((hangman.getGuessesLeft() > 0 && (hangman.getPattern().indexOf("-") != -1)))
            HangmanMain.playGame(HangmanMain.keyboard, hangman);
        
        if(!(hangman.getGuessesLeft() > 0 && (hangman.getPattern().indexOf("-") != -1))){
            HangmanMain.showResults(hangman);
            document.getElementById("ehgame_end").style.display = "block";
        }


    };




    // /**
    //  * Check to see if the user wants to play another game.
    //  * @param {string} keyboard We assume the Scanner is connected to standard input
    //  * @return {boolean} true if the user wants to play another game, false otherwise.
    //  * @private
    //  */
    // /*private*/ HangmanMain.playAgain = function (keyboard) {
    //     console.info();
    //     console.info("Another game? Enter y for another game, anything else to quit: ");
    //     keyboard = "n";
    //     var answer = keyboard;
    //     return answer.length > 0 && (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(answer.toLowerCase().charAt(0)) == 'y'.charCodeAt(0);
    // };




    /*private*/ HangmanMain.setGameParameters = function (hangman) {
        var wordLength = 0;
        HangmanMain.keyboard = document.getElementById("length").value;
        wordLength = parseInt(HangmanMain.keyboard);
        
        while ((!HangmanMain.atLeastOneWord(hangman, wordLength))){
            wordLength = prompt("Entetr another length:");
            wordLength = parseInt(wordLength);
        }
        console.log("wordLength: " + wordLength);
        var numGuesses = 0;
        HangmanMain.keyboard = document.getElementById("tries").value;
        numGuesses = parseInt(HangmanMain.keyboard);
        console.log("numGuesses: " + numGuesses);
        while ((!HangmanMain.validChoice(numGuesses, 1, HangmanMain.MAX_GUESSES, "number of wrong guesses"))){
            numGuesses = prompt("Entetr valid tries:");
            numGuesses = parseInt(numGuesses);
        }
        var difficulty = HangmanMain.getDifficulty(HangmanMain.keyboard);
        hangman.prepForRound(wordLength, numGuesses, difficulty);
    };




    /*private*/ HangmanMain.getDifficulty = function (keyboard) {
        var diffChoiceAsInt = HangmanDifficulty[HangmanDifficulty[HangmanDifficulty.EASY]];
        HangmanMain.keyboard = document.getElementById("difficulty").value;
        diffChoiceAsInt = parseInt(HangmanMain.keyboard);
        console.log("difficulty: " + diffChoiceAsInt);
        while ((!HangmanMain.validChoice(diffChoiceAsInt, HangmanDifficulty_$WRAPPER.minPossible(), HangmanDifficulty_$WRAPPER.maxPossible(), "difficulty"))){
            diffChoiceAsInt = prompt("Entetr valid difficulty level:");
            diffChoiceAsInt = parseInt(diffChoiceAsInt);
        }
        return function () { var result = []; for (var val in HangmanDifficulty) {
            if (!isNaN(val)) {
                result.push(parseInt(val, 10));
            }
        } return result; }()[diffChoiceAsInt - 1];
    };




    /*private*/ HangmanMain.validChoice = function (choice, min, max, parameter) {
        var valid = min <= choice && choice <= max;
        if (!valid) {
            alert(choice + " is not a valid number for " + parameter);
            alert("Pick a number between " + min + " and " + max + ".");
        }
        return valid;
    };



    /*private*/ HangmanMain.atLeastOneWord = function (hangman, wordLength) {
        var numWords = hangman.numWords(wordLength);
        if (numWords === 0) {
            console.info();
            alert("I don\'t know any words with " + wordLength + " letters. Enter another number.");
        }
        return numWords !== 0;
    };



        // HangmanMain.readFile = function (evt) {
        //    var files = evt.target.files;
        //    var file = files[0];           
        //    var reader = new FileReader();
        //    reader.onload = function(event) {
        //     document.getElementById('dict').innerHTML = event.target.result; 
        //     console.log(document.getElementById('dict').innerHTML);          
        //    }
        //    reader.readAsText(file);
        //    return;
        // }




    /*private*/ HangmanMain.getDictionary = function () {
        var dictionary = ([]);
        try {            
           
           HangmanMain.dict = document.getElementById('dict').innerHTML.split("\n");
           console.log(HangmanMain.dict);
            /* add */ (function (s, e) { if (s.indexOf(e) == -1) {
                s.push(e);
                return true;
            }
            else {
                return false;
            } })(dictionary, HangmanMain.dict);
        }
        catch (e) {
            console.info("File not found: " + e);
            console.info("Exiting");
        }
        ;

        return HangmanMain.dict;
    };





    /*private*/ HangmanMain.playGame = function (keyboard, hangman) {
        // while ((hangman.getGuessesLeft() > 0 && (hangman.getPattern().indexOf("-") != -1))) 
        {
            {
                
                if (HangmanMain.DEBUG) {
                    console.info("DEBUGGING: words left : " + hangman.numWordsCurrent());
                }
                
                var guess = HangmanMain.getLetter(keyboard, hangman);
                var results = hangman.makeGuess(guess);
                if (HangmanMain.DEBUG) {
                    HangmanMain.showPatterns(results);
                }
                var count = HangmanMain.getCount(hangman.getPattern(), guess);
                if (count === 0) {
                    document.getElementById("update_result").innerHTML = ("Sorry, there are no " + guess + "\'s");
                }
                else if (count === 1) {
                    document.getElementById("update_result").innerHTML = ("Yes, there is one " + guess);
                }
                else {
                    document.getElementById("update_result").innerHTML = ("Yes, there are " + count + " " + guess + "\'s");
                }
                document.getElementById("update_guess_left").innerHTML = ("Guesses left: " + hangman.getGuessesLeft());
                document.getElementById("update_guess_so_far").innerHTML = ("Guessed so far : " + hangman.getGuessesMade());
                document.getElementById("update_current_word").innerHTML = ("Current word : " + hangman.getPattern());
                document.getElementById("guess_input").value="";
            }
        }
        ;
    };




    /*private*/ HangmanMain.getLetter = function (keyboard, manager) {
        if (keyboard == null || manager == null)
            throw Object.defineProperty(new Error("Parameters to method may not be null."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        var alreadyGuessed = true;
        var again = false;
        var guess = ' ';
        while (alreadyGuessed) {
            
            if(again){
                HangmanMain.keyboard = prompt("Enter another guess");
                again = false;
            }
            else
                HangmanMain.keyboard = document.getElementById("guess_input").value;

            var result = HangmanMain.keyboard.toLowerCase();
            
            while ((result == null || result.length === 0 || !HangmanMain.isEnglishLetter(result.charAt(0)))) {
                alert("That is not an English letter.");
                HangmanMain.keyboard = prompt("Enter a valid english letter as your guess: ");
                result = HangmanMain.keyboard.toLowerCase();
            }

            guess = result.charAt(0);
            alreadyGuessed = manager.alreadyGuessed(guess);
            
            if (alreadyGuessed){
                alert("You already guessed that! Pick a new letter please.");
                again = true;
            }
        }  
       
        document.getElementById("update_result").innerHTML = ("Your guess: " + guess + ".");
       
        if (!(HangmanMain.isEnglishLetter(guess) && !manager.alreadyGuessed(guess)))
            throw new Error("Assertion error line 152: assert isEnglishLetter(guess) && !manager.alreadyGuessed(guess) : 'something wrong with my logic in getting guess. ' + guess;");
        
        return guess;
    };



    /*private*/ HangmanMain.isEnglishLetter = function (ch) {
        return ('A'.charCodeAt(0) <= (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(ch) && (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(ch) <= 'Z'.charCodeAt(0)) || ('a'.charCodeAt(0) <= (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(ch) && (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(ch) <= 'z'.charCodeAt(0));
    };



    /*private*/ HangmanMain.showPatterns = function (results) {
        if (results == null)
            throw Object.defineProperty(new Error("The map may not be null."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        console.info();
        console.info("DEBUGGING: Based on guess here are resulting patterns and number");
        console.info("of words in each pattern: ");
        {
            var array3650 = Object.keys(results);
            for (var index3649 = 0; index3649 < array3650.length; index3649++) {
                var key = array3650[index3649];
                {
                    console.info("pattern: " + key + ", number of words: " + (function (m, k) { return m[k] === undefined ? null : m[k]; })(results, key));
                }
            }
        }
        console.info("END DEBUGGING");
        console.info();
    };



    /*private*/ HangmanMain.getCount = function (pattern, guess) {
        if (pattern == null)
            throw Object.defineProperty(new Error("Violation of precondition in getCount."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        var result = 0;
        for (var i = 0; i < pattern.length; i++) {
            if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(pattern.charAt(i)) == (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(guess))
                result++;
            ;
        }
        return result;
    };




    /*private*/ HangmanMain.showResults = function (hangman) {
        var answer = hangman.getSecretWord();
        document.getElementById("update_result").innerHTML = ("Answer = " + answer);
        if (hangman.getGuessesLeft() > 0) {
            document.getElementById("update_final_result").innerHTML = ("You beat me");
        }
        else {
            document.getElementById("update_final_result").innerHTML = ("Sorry, you lose");
        }
    };





    /*private*/ HangmanMain.showWordCounts = function (hangman) {
        var MAX_LETTERS_PER_WORD = 25;
        for (var i = 2; i < MAX_LETTERS_PER_WORD; i++) {
            console.info(i + " " + hangman.numWords(i));
        }
    };
    return HangmanMain;
}());
HangmanMain.dict = null;
HangmanMain.keyboard = null;
HangmanMain.DICTIONARY_FILE = "dictionary.txt";
HangmanMain.DEBUG = false;
HangmanMain.MAX_GUESSES = 25;
HangmanMain["__class"] = "HangmanMain";



//document.getElementById('files').addEventListener('change', HangmanMain.readFile, false);




/**
 * Create a new HangmanManager from the provided set of words and phrases.
 * pre: words != null, words.size() > 0
 * @param {string[]} words A set with the words for this instance of Hangman.
 * @param {boolean} debugOn true if we should print out debugging to System.out.
 * @class
 */
var HangmanManager = (function () {
    function HangmanManager(words, debugOn) {
        var _this = this;
        if (((words != null && (words instanceof Array)) || words === null) && ((typeof debugOn === 'boolean') || debugOn === null)) {
            var __args = arguments;
            if (this.dictionary === undefined)
                this.dictionary = null;
            if (this.temp === undefined)
                this.temp = null;
            if (this.wordLen === undefined)
                this.wordLen = 0;
            if (this.numGuess === undefined)
                this.numGuess = 0;
            if (this.diff === undefined)
                this.diff = null;
            if (this.rightGuess === undefined)
                this.rightGuess = null;
            if (this.wrongGuess === undefined)
                this.wrongGuess = 0;
            if (this.currentPattern === undefined)
                this.currentPattern = null;
            if (this.counter === undefined)
                this.counter = 0;
            if (this.dictionary === undefined)
                this.dictionary = null;
            if (this.temp === undefined)
                this.temp = null;
            if (this.wordLen === undefined)
                this.wordLen = 0;
            if (this.numGuess === undefined)
                this.numGuess = 0;
            if (this.diff === undefined)
                this.diff = null;
            if (this.rightGuess === undefined)
                this.rightGuess = null;
            if (this.wrongGuess === undefined)
                this.wrongGuess = 0;
            if (this.currentPattern === undefined)
                this.currentPattern = null;
            if (this.counter === undefined)
                this.counter = 0;
            (function () {
                if (words == null || words.length <= 0)
                    throw Object.defineProperty(new Error("Violation in precondition: HangmanManager Constructor with debugOn."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
                _this.dictionary = ([]);
                var it = (function (a) { var i = 0; return { next: function () { return i < a.length ? a[i++] : null; }, hasNext: function () { return i < a.length; } }; })(words);
                while ((it.hasNext())) {
                    {
                        /* add */ (_this.dictionary.push(it.next()) > 0);
                    }
                }
                ;
                _this.temp = ([]);
                _this.diff = HangmanDifficulty.HARD;
                _this.rightGuess = ([]);
            })();
        }
        else if (((words != null && (words instanceof Array)) || words === null) && debugOn === undefined) {
            var __args = arguments;
            if (this.dictionary === undefined)
                this.dictionary = null;
            if (this.temp === undefined)
                this.temp = null;
            if (this.wordLen === undefined)
                this.wordLen = 0;
            if (this.numGuess === undefined)
                this.numGuess = 0;
            if (this.diff === undefined)
                this.diff = null;
            if (this.rightGuess === undefined)
                this.rightGuess = null;
            if (this.wrongGuess === undefined)
                this.wrongGuess = 0;
            if (this.currentPattern === undefined)
                this.currentPattern = null;
            if (this.counter === undefined)
                this.counter = 0;
            if (this.dictionary === undefined)
                this.dictionary = null;
            if (this.temp === undefined)
                this.temp = null;
            if (this.wordLen === undefined)
                this.wordLen = 0;
            if (this.numGuess === undefined)
                this.numGuess = 0;
            if (this.diff === undefined)
                this.diff = null;
            if (this.rightGuess === undefined)
                this.rightGuess = null;
            if (this.wrongGuess === undefined)
                this.wrongGuess = 0;
            if (this.currentPattern === undefined)
                this.currentPattern = null;
            if (this.counter === undefined)
                this.counter = 0;
            (function () {
                if (words == null || words.length <= 0)
                    throw Object.defineProperty(new Error("Violation in precondition: HangmanManager Constructor with debugOn."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
                _this.dictionary = ([]);
                var it = (function (a) { var i = 0; return { next: function () { return i < a.length ? a[i++] : null; }, hasNext: function () { return i < a.length; } }; })(words);
                while ((it.hasNext())) {
                    {
                        /* add */ (_this.dictionary.push(it.next()) > 0);
                    }
                }
                ;
                _this.temp = ([]);
                _this.diff = HangmanDifficulty.HARD;
                _this.rightGuess = ([]);
            })();
        }
        else
            throw new Error('invalid overload');
    }




    /**
     * Get the number of words in this HangmanManager of the given length.
     * pre: none
     * @param {number} length The given length to check.
     * @return {number} the number of words in the original Dictionary with the given length
     */
    HangmanManager.prototype.numWords = function (length) {
        this.temp = ([]);
        for (var index = 0; index < this.dictionary.length; index++) {
            {
                if (this.dictionary[index].length === length) {
                    /* add */ (this.temp.push(/* get */ this.dictionary[index]) > 0);
                }
            }
            ;
        }
        return this.temp.length;
    };




    /**
     * Get for a new round of Hangman. Think of a round as a complete game of Hangman.
     * @param {number} wordLen the length of the word to pick this time. numWords(wordLen) > 0
     * @param {number} numGuesses the number of wrong guesses before the player loses the round. numGuesses >= 1
     * @param {HangmanDifficulty} diff The difficulty for this round.
     */
    HangmanManager.prototype.prepForRound = function (wordLen, numGuesses, diff) {
        if (this.numWords(wordLen) <= 0 || numGuesses < 1)
            throw Object.defineProperty(new Error("Violation in precondition: prepForRound method"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        this.wordLen = wordLen;
        this.numGuess = numGuesses;
        this.diff = diff;
        this.rightGuess = ([]);
        this.wrongGuess = 0;
        this.diff = diff;
        this.counter = 1;
        var sb = { str: "", toString: function () { return this.str; } };
        for (var index = 0; index < wordLen; index++) {
            {
                /* append */ (function (sb) { sb.str = sb.str.concat('-'); return sb; })(sb);
            }
            ;
        }
        this.currentPattern = sb.str;
    };




    /**
     * The number of words still possible (live) based on the guesses so far. Guesses will eliminate possible words.
     * @return {number} the number of words that are still possibilities based on the original dictionary and the guesses so far.
     */
    HangmanManager.prototype.numWordsCurrent = function () {
        return this.temp.length;
    };




    /**
     * Get the number of wrong guesses the user has left in this round (game) of Hangman.
     * @return {number} the number of wrong guesses the user has left in this round (game) of Hangman.
     */
    HangmanManager.prototype.getGuessesLeft = function () {
        return this.numGuess - this.wrongGuess;
    };




    /**
     * Return a String that contains the letters the user has guessed so far during this round.
     * The String is in alphabetical order. The String is in the form [let1, let2, let3, ... letN].
     * For example [a, c, e, s, t, z]
     * @return {string} a String that contains the letters the user has guessed so far during this round.
     */
    HangmanManager.prototype.getGuessesMade = function () {
        /* sort */ this.rightGuess.sort();
        return ('[' + this.rightGuess.join(', ') + ']');
    };



    /**
     * Check the status of a character.
     * @param {string} guess The characater to check.
     * @return {boolean} true if guess has been used or guessed this round of Hangman, false otherwise.
     */
    HangmanManager.prototype.alreadyGuessed = function (guess) {
        return (this.rightGuess.indexOf((guess)) >= 0);
    };
    HangmanManager.prototype.getPattern$ = function () {
        return this.currentPattern;
    };




    /**
     * Update the game status (pattern, wrong guesses, word list), based on the give
     * guess.
     * @param {string} guess pre: !alreadyGuessed(ch), the current guessed character
     * @return {*} return a tree map with the resulting patterns and the number of
     * words in each of the new patterns.
     * The return value is for testing and debugging purposes.
     */
    HangmanManager.prototype.makeGuess = function (guess) {
        if (this.alreadyGuessed(guess))
            throw Object.defineProperty(new Error("Violation in precondition: TreeMap method."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        var patterns = this.getPattern$char(guess);
        var map = ({});
        var actualMap = ({});
        for (var patternIndex = 0; patternIndex < patterns.length; patternIndex++) {
            {
                var pattern = patterns[patternIndex];
                var possibleWords = ([]);
                possibleWords = this.getPossibleWords(pattern, guess);
                var numWords = this.getPossibleWordsNum(possibleWords);
                /* put */ (map[pattern] = numWords);
                /* put */ (actualMap[pattern] = possibleWords);
            }
            ;
        }
        var tempPattern = this.currentPattern;
        this.dealDiff(map, patterns, actualMap);
        if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(tempPattern, this.currentPattern))
            this.wrongGuess++;
        if (!(this.rightGuess.indexOf((guess)) >= 0))
            (this.rightGuess.push(guess) > 0);
        this.counter++;
        return map;
    };




    /*private*/ HangmanManager.prototype.dealDiff = function (map, patterns, actualMap) {
        var _this = this;
        var tempMap = ({});
        var tempPatterns = ([]);
        for (var index = 0; index < Object.keys(map).length; index++) {
            {
                var pattern = patterns[index];
                var value = (function (m, k) { return m[k] === undefined ? null : m[k]; })(map, pattern);
                /* put */ (tempMap[pattern] = value);
                /* add */ (tempPatterns.push(pattern) > 0);
            }
            ;
        }
        if (this.diff === HangmanDifficulty.MEDIUM) {
            if (this.counter % 4 === 0 && Object.keys(tempMap).length > 1) {
                this.tieBreaker(tempMap, tempPatterns, actualMap);
                /* remove */ (function (map) { var deleted = tempMap[_this.currentPattern]; delete tempMap[_this.currentPattern]; return deleted; })(tempMap);
                /* remove */ (function (a) { var index = a.indexOf(_this.currentPattern); if (index >= 0) {
                    a.splice(index, 1);
                    return true;
                }
                else {
                    return false;
                } })(tempPatterns);
            }
        }
        else if (this.diff === HangmanDifficulty.EASY) {
            if (this.counter % 2 === 0 && Object.keys(tempMap).length > 1) {
                this.tieBreaker(tempMap, patterns, actualMap);
                /* remove */ (function (map) { var deleted = tempMap[_this.currentPattern]; delete tempMap[_this.currentPattern]; return deleted; })(tempMap);
                /* remove */ (function (a) { var index = a.indexOf(_this.currentPattern); if (index >= 0) {
                    a.splice(index, 1);
                    return true;
                }
                else {
                    return false;
                } })(tempPatterns);
            }
        }
        this.tieBreaker(tempMap, tempPatterns, actualMap);
    };




    /*private*/ HangmanManager.prototype.tieBreaker = function (map, patterns, actualMap) {
        var max = -1;
        var tempIndex = -1;
        for (var index = 0; index < Object.keys(map).length; index++) {
            {
                var pattern = patterns[index];
                var tempNumWords = (function (m, k) { return m[k] === undefined ? null : m[k]; })(map, pattern);
                if (max < tempNumWords) {
                    max = tempNumWords;
                    tempIndex = index;
                    this.set(actualMap, pattern);
                }
                else if (max === tempNumWords) {
                    var previousPattern = patterns[tempIndex];
                    var reveal1 = this.revealChar(pattern);
                    var reveal2 = this.revealChar(previousPattern);
                    if (reveal1 < reveal2) {
                        this.set(actualMap, pattern);
                        tempIndex = index;
                    }
                    else if (reveal1 > reveal2) {
                        this.set(actualMap, previousPattern);
                    }
                    else if (pattern.localeCompare(previousPattern) < 0) {
                        this.set(actualMap, pattern);
                        tempIndex = index;
                    }
                    else {
                        this.set(actualMap, previousPattern);
                    }
                }
            }
            ;
        }
    };




    /*private*/ HangmanManager.prototype.set = function (actualMap, pattern) {
        this.temp = (function (m, k) { return m[k] === undefined ? null : m[k]; })(actualMap, pattern);
        this.currentPattern = pattern;
    };




    /*private*/ HangmanManager.prototype.revealChar = function (pattern) {
        var count = 0;
        for (var index = 0; index < pattern.length; index++) {
            {
                if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(pattern.charAt(index)) != '-'.charCodeAt(0))
                    count++;
            }
            ;
        }
        return count;
    };




    HangmanManager.prototype.getPattern$char = function (guess) {
        var patterns = ([]);
        for (var word = 0; word < this.temp.length; word++) {
            {
                var pattern = this.pattern(word, guess);
                if (!(patterns.indexOf((pattern)) >= 0))
                    (patterns.push(pattern) > 0);
            }
            ;
        }
        return patterns;
    };




    HangmanManager.prototype.getPattern = function (guess) {
        if (((typeof guess === 'string') || guess === null)) {
            return this.getPattern$char(guess);
        }
        else if (guess === undefined) {
            return this.getPattern$();
        }
        else
            throw new Error('invalid overload');
    };




    /*private*/ HangmanManager.prototype.pattern = function (word, guess) {
        var _this = this;
        var sb = { str: "", toString: function () { return this.str; } };
        var _loop_1 = function (index) {
            {
                if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(/* get */ this_1.temp[word].charAt(index)) == (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(guess) && (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this_1.currentPattern.charAt(index)) == '-'.charCodeAt(0))
                    (function (sb) { sb.str = sb.str.concat(guess); return sb; })(sb);
                else if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(this_1.currentPattern.charAt(index)) != '-'.charCodeAt(0))
                    (function (sb) { sb.str = sb.str.concat(_this.currentPattern.charAt(index)); return sb; })(sb);
                else
                    (function (sb) { sb.str = sb.str.concat('-'); return sb; })(sb);
            }
            ;
        };
        var this_1 = this;
        for (var index = 0; index < this.wordLen; index++) {
            _loop_1(index);
        }
        return sb.str;
    };




    /*private*/ HangmanManager.prototype.getPossibleWords = function (pattern, guess) {
        var possibleWords = ([]);
        for (var word = 0; word < this.temp.length; word++) {
            {
                var tempPattern = this.pattern(word, guess);
                if ((function (o1, o2) { if (o1 && o1.equals) {
                    return o1.equals(o2);
                }
                else {
                    return o1 === o2;
                } })(tempPattern, pattern)) {
                    if (!(possibleWords.indexOf((this.temp[word])) >= 0)) {
                        /* add */ (possibleWords.push(/* get */ this.temp[word]) > 0);
                    }
                }
            }
            ;
        }
        return possibleWords;
    };




    /*private*/ HangmanManager.prototype.getPossibleWordsNum = function (possibleWords) {
        return possibleWords.length;
    };




    /**
     * Return the secret word this HangmanManager finally ended up picking for this round.
     * If there are multiple possible words left one is selected at random.
     * <br> pre: numWordsCurrent() > 0
     * @return {string} return the secret word the manager picked.
     */
    HangmanManager.prototype.getSecretWord = function () {
        if (this.temp.length === 0)
            throw Object.defineProperty(new Error("Violation in precondition: Secret Word mmethod."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        if (this.temp.length === 1) {
            return this.temp[0];
        }
        else {
            var random = ((Math.random() * this.temp.length) | 0);
            return this.temp[random];
        }
    };
    return HangmanManager;
}());
HangmanManager["__class"] = "HangmanManager";












/**
 * This enumerated type represents the difficulty levels for
 * Evil Hangman.
 * <br>
 * <br>EASY alternates between the hardest word and the second hardest word.
 * <br>MEDIUM picks the hardest word for three rounds, then the second hardest word,
 * then the hardest word for three rounds, then the second hardest word, and so forth.
 * HARD always picks the hardest word.
 * @author scottm
 * @enum
 * @property {HangmanDifficulty} EASY
 * @property {HangmanDifficulty} MEDIUM
 * @property {HangmanDifficulty} HARD
 * @class
 */
var HangmanDifficulty;
(function (HangmanDifficulty) {
    HangmanDifficulty[HangmanDifficulty["EASY"] = 0] = "EASY";
    HangmanDifficulty[HangmanDifficulty["MEDIUM"] = 1] = "MEDIUM";
    HangmanDifficulty[HangmanDifficulty["HARD"] = 2] = "HARD";
})(HangmanDifficulty || (HangmanDifficulty = {}));
/** @ignore */




var HangmanDifficulty_$WRAPPER = (function () {
    function HangmanDifficulty_$WRAPPER(_$ordinal, _$name) {
        this._$ordinal = _$ordinal;
        this._$name = _$name;
    }
    /**
     * Get the lowest possible int (ordinal value) for this Enum using 1 (not zero) based
     * indexing.
     * @return {number} the lowest possible ordinal for this Enum using 1 based indexing.
     */
    HangmanDifficulty_$WRAPPER.minPossible = function () {
        return HangmanDifficulty[HangmanDifficulty[HangmanDifficulty.EASY]] + 1;
    };
    /**
     * Get the highest possible int (ordinal value) for this Enum using 1 (not zero) based
     * indexing.
     * @return {number} the highest possible ordinal for this Enum using 1 based indexing.
     */
    HangmanDifficulty_$WRAPPER.maxPossible = function () {
        return HangmanDifficulty[HangmanDifficulty[HangmanDifficulty.HARD]] + 1;
    };
    HangmanDifficulty_$WRAPPER.prototype.name = function () { return this._$name; };
    HangmanDifficulty_$WRAPPER.prototype.ordinal = function () { return this._$ordinal; };
    return HangmanDifficulty_$WRAPPER;
}());
HangmanDifficulty["__class"] = "HangmanDifficulty";
HangmanDifficulty["__interfaces"] = ["java.lang.Comparable", "java.io.Serializable"];
HangmanDifficulty["_$wrappers"] = [new HangmanDifficulty_$WRAPPER(0, "EASY"), new HangmanDifficulty_$WRAPPER(1, "MEDIUM"), new HangmanDifficulty_$WRAPPER(2, "HARD")];
// HangmanMain.main(null);

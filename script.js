var pwdLength = 0;
var charsArr = [];
var pwdCopied = "";

// prompts a user to type a password length.
// if the user input is invalid, it will run again.
// if the user hits cancel, it will terminate.
function findLength() {
    if (document.getElementById("generatedPassword") != null) {
        document.getElementById("generatedPassword").remove();
    }
    this.pwdLength = prompt("How long would your passwords to be? (8 - 128)");
    if (pwdLength === null) return;
    if (isNaN(pwdLength) || pwdLength < 8 || pwdLength > 128) {
        alert("Input not valid. Choose a number between 8 to 128.");
        findLength();
    }
    else {
        chooseChars();
    }
}

// asks a user to choose password combination.
// if the user input is invalid, it will run again.
// stores the character type(s) chosen.
function chooseChars() {
    charsArr = [];
    charsArr.push(confirm("Would you like to include special characters?"));
    charsArr.push(confirm("Would you like to include numbers?"));
    charsArr.push(confirm("Would you like to include lowercase characters?"));
    charsArr.push(confirm("Would you like to include uppercase characters?"));
    if (!this.charsArr.includes(true)) {
        alert("You need to choose at least one character type.");
        chooseChars();
    }
    else {
        pwdGenerator();
    }
}

// generates a random password based on user preferences using while-loop, array.sort() method.
// creates an element and properly displays in HTML.
function pwdGenerator() {
    let pwdArr = [];
    let specialLetters = "!\"#$%&'()*+<>,-./:;=?@[\\]^_`{|}~";
    let numberLetters = "1234567890";
    let lcLetters = "abcdefghijklmnopqrstuvwxyz";
    let ucLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    while (result.length < pwdLength) {
        if (this.charsArr[0] === true) {
            result += specialLetters.charAt(Math.floor(Math.random() * specialLetters.length));
            if (result.length == pwdLength) break;
        }
        if (this.charsArr[1] === true) {
            result += numberLetters.charAt(Math.floor(Math.random() * numberLetters.length));
            if (result.length == pwdLength) break;
        }
        if (this.charsArr[2] === true) {
            result += lcLetters.charAt(Math.floor(Math.random() * lcLetters.length));
            if (result.length == pwdLength) break;
        }
        if (this.charsArr[3] === true) {
            result += ucLetters.charAt(Math.floor(Math.random() * ucLetters.length));
            if (result.length == pwdLength) break;
        }
    }

    pwdArr.push(result);
    pwdArr = pwdArr.join("");
    this.pwdCopied = pwdArr.toString().split("").sort(function () { return 0.5 - Math.random() }).join("");

    let childEl = document.createElement("div");
    childEl.setAttribute("id", "generatedPassword");
    childEl.setAttribute("style", "overflow-wrap: break-word");
    childEl.appendChild(document.createTextNode(pwdCopied));
    document.getElementById("parent").appendChild(childEl);
}

// creates an invisible element with the password generated and copies the value in HTML.
function copyPassword() {
    let tempInput = document.createElement("input");
    tempInput.style.opacity = "0";
    tempInput.style["pointer-events"] = "none";
    document.body.appendChild(tempInput);
    tempInput.setAttribute('value', pwdCopied);
    tempInput.focus();
    tempInput.select();
    document.execCommand('copy');
    alert('Copied!')
    tempInput.remove();
}
let alphabet;
let a;
let da;
let b;
let n;
let k = 27;
let plainText;
let cipherText;
let encryptButton;
let decryptButton;
function setup() {
  createCanvas(800, 600);
  alphabet = split("ABCDEFGHIJKLMNOPQRSTUVWXYZ", '');
  textAlign('CENTER');
  a = 3;
  b = 2;
  n = 1;
  //defineConstants();
  select('#aCoeff').html(a);
  select('#bCoeff').html(b);
  select('#nCoeff').html(n);
  select('#equation').html("y=" + str(a) + "X" + "<sup>" + str(n) + "</sup>" + "+" + str(b));
  plainText = select('#plain-text');
  cipherText = select('#cipher-text');
  encryptButton = select('#encrypt-button');
  encryptButton.mousePressed(() => {
    let cipheredText = "";
    let text = plainText.value().toUpperCase();
    text = text.split(" ").join("");
    for (let i = 0; i < text.length; i++) {
      let oldIndex = unchar(text[i]) - 65;
      let newIndex = encrypt(oldIndex);
      cipheredText += alphabet[newIndex];
    }
    cipherText.value(cipheredText);

  });
  decryptButton = select('#decrypt-button');
  decryptButton.mousePressed(() => {
    let decryptText = "";
    let encryptText = plainText.value().toUpperCase();
    encryptText = encryptText.split(" ").join("");
    for (let i = 0; i < encryptText.length; i++) {
      let oldIndex = unchar(encryptText[i]) - 65;
      let newIndex = decrypt(oldIndex);
      decryptText += alphabet[newIndex];
      console.log(oldIndex, newIndex);
      console.log(da);
    }
    cipherText.value(decryptText);
  });
  //Up functions
  select('#aUp').mousePressed(() => {
    a++;
    select('#aCoeff').html(a);
    select('#equation').html("y=" + str(a) + "X" + "<sup>" + str(n) + "</sup>" + "+" + str(b));
    //defineConstants();
  });
  select('#bUp').mousePressed(() => {
    b++;
    select('#bCoeff').html(b);
    select('#equation').html("y=" + str(a) + "X" + "<sup>" + str(n) + "</sup>" + "+" + str(b));
    //defineConstants();
  });
  select('#nUp').mousePressed(() => {
    n++;
    select('#nCoeff').html(n);
    select('#equation').html("y=" + str(a) + "X" + "<sup>" + str(n) + "</sup>" + "+" + str(b));
    //defineConstants();
  });
  //down function
  select('#aDown').mousePressed(() => {
    a--;
    select('#aCoeff').html(a);
    select('#equation').html("y=" + str(a) + "X" + "<sup>" + str(n) + "</sup>" + "+" + str(b));
    //defineConstants();
  });
  select('#bDown').mousePressed(() => {
    b--;
    select('#bCoeff').html(b);
    select('#equation').html("y=" + str(a) + "X" + "<sup>" + str(n) + "</sup>" + "+" + str(b));
    //defineConstants();
  });
  select('#nDown').mousePressed(() => {
    n--;
    select('#nCoeff').html(n);
    select('#equation').html("y=" + str(a) + "X" + "<sup>" + str(n) + "</sup>" + "+" + str(b));
    //defineConstants();
  });
}

function draw() {
  background(220);

  drawAlphabet();
  for (let i = 0; i < alphabet.length; i++) {
    oldIndex = unchar(alphabet[i]) - 65;
    newIndex = encrypt(oldIndex);
    line(110, oldIndex * 23 + 20, 690, newIndex * 23 + 20);
  }
}

function drawAlphabet() {
  for (let i = 0; i < alphabet.length; i++) {
    text(alphabet[i], 100, i * 23 + 20);
    text(alphabet[i], 700, i * 23 + 20);
  }
}
function decrypt(x) {
  if (da) {
    let val = da * (x - b);
    return mod(val,26);
  }
  return undefined;

}
function defineConstants() {
  da = 2;
  let found = false;
  while (!found) {
    if (k % da === 0) {
      found = true;
    } else {
      k += 26;
      da++;
    }
  }
}

function encrypt(x) {
  return (a * pow(x, n) + b) % 26;
}


function mod(n, m) {
  return ((n % m) + m) % m;
}
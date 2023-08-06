var i = 0;
var j = 0;
var txt = "IT'S NEW-BOKINO_"; /* The text */
var typingSpeed = 50; /* The speed/duration of the effect in milliseconds */
var blinkingSpeed = 500; /* The speed/duration of the effect in milliseconds */

async function typeWriter() {
  if (i < txt.length) {
    
    document.getElementsByTagName("h1")[0].innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, typingSpeed);  } else{
    setInterval(blink, blinkingSpeed);
  }
}

function blink() {
    let h1 = document.getElementsByTagName("h1")[0]

    if(h1.innerHTML.length % 2 == 0){
        h1.innerHTML = h1.innerHTML.substring(0, h1.innerHTML.length - 1);
    } else{
        h1.innerHTML += "_";
    }
    
}

typeWriter();

let qiwi_url = "https://oplata.qiwi.com/create?publicKey=48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iP5Np5PoBuYLf9tkRJkAvwZA7FkGHfV8eaqQPiNcXgKpPJyKRLuF9EQBAYrXJ3Zx46jq13jEC69yVpkCddFSEjj6YFp6V8gXVg3BuYvz8Li&amount=";

function openQiwi() {
    let amount = document.getElementById('amount_input').value;
    if(amount.length != 0){
        let link = qiwi_url + amount;
        open(link);
    } else {
        open("https://oplata.qiwi.com/create?publicKey=48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iP5Np5PoBuYLf9tkRJkAvwZA7FkGHfV8eaqQPiNcXgKpPJyKRLuF9EQBAYrXJ3Zx46jq13jEC69yVpkCddFSEjj6YFp6V8gXVg3BuYvz8Li");
    }
}
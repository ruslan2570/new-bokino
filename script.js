var i = 0;
var j = 0;
var txt = "IT'S NEW-BOKINO_"; /* The text */
var typingSpeed = 75; /* The speed/duration of the effect in milliseconds */
var blinkingSpeed = 500; /* The speed/duration of the effect in milliseconds */

async function typeWriter() {
    if (i < txt.length) {

        document.getElementsByTagName("h1")[0].innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        setInterval(blink, blinkingSpeed);
    }
}

function blink() {
    let h1 = document.getElementsByTagName("h1")[0]

    if (h1.innerHTML.length % 2 == 0) {
        h1.innerHTML = h1.innerHTML.substring(0, h1.innerHTML.length - 1);
    } else {
        h1.innerHTML += "_";
    }

}

typeWriter();

let qiwi_url = "https://oplata.qiwi.com/create?publicKey=48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iP5Np5PoBuYLf9tkRJkAvwZA7FkGHfV8eaqQPiNcXgKpPJyKRLuF9EQBAYrXJ3Zx46jq13jEC69yVpkCddFSEjj6YFp6V8gXVg3BuYvz8Li&amount=";

function openQiwi() {
    let amount = document.getElementById('amount_input').value;
    if (amount.length != 0) {
        let link = qiwi_url + amount;
        open(link);
    } else {
        open("https://oplata.qiwi.com/create?publicKey=48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iP5Np5PoBuYLf9tkRJkAvwZA7FkGHfV8eaqQPiNcXgKpPJyKRLuF9EQBAYrXJ3Zx46jq13jEC69yVpkCddFSEjj6YFp6V8gXVg3BuYvz8Li");
    }
}

let error_count = 0;

info = function () {
    var name = document.getElementById("song_name");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://vlc-controller.new-bokino.ru/info", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            var json = JSON.parse(result);

            if (json['artist'] == null || json['title'] == null) {
                name.innerText = json['filename'];
            } else {
                name.innerText = json['artist'] + " - " + json['title'];
            }
        })
        .catch(error => {
            console.log('error', error)
            if (error_count++ >= 10) {
                clearInterval(infoInterval);
                console.log("stopped");
            }

        }
        );
}

let infoInterval = setInterval(info, 1000)


prev = function () {
    clearInterval(infoInterval);
    error_count = 0;
    infoInterval = setInterval(info, 1000)

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://vlc-controller.new-bokino.ru/prev", requestOptions).then(info());

}

var radioAudio;

play = function () {

    if(radioAudio == null){
        radioAudio = document.createElement("audio");
    }

    if (radioAudio.canPlayType("audio/mpeg")) {
        radioAudio.setAttribute("src", "https://vlc.new-bokino.ru/music" + '?noCache=' + Math.floor(Math.random() * 1000000));
    } else if (radioAudio.canPlayType("audio/ogg")) {
        radioAudio.setAttribute("src", "https://vlc.new-bokino.ru/music" + '?noCache=' + Math.floor(Math.random() * 1000000));
    }

    if(radioAudio.paused){
        radioAudio.play();
    } else{
        radioAudio.stop();
    }
}

next = function () {
    clearInterval(infoInterval);
    error_count = 0;
    infoInterval = setInterval(info, 1000)

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://vlc-controller.new-bokino.ru/next", requestOptions).then(info());
}

restart = function () {
    clearInterval(infoInterval);
    error_count = 0;
    infoInterval = setInterval(info, 1000)

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://vlc-controller.new-bokino.ru/restart", requestOptions)

    setTimeout(info, 1000);
}

function qiwiHandler(e){
    if (e.key === 'Enter') {
        openQiwi();
    }
}
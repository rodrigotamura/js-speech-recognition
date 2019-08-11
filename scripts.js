// SpeechRecognition (Firefox) / webkitSpeechRecognition (Chrome) is implemented natively within window scope
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'pt-BR';

let p = document.createElement('p');

const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e =>{
    const transcript = Array.from(e.results) // converting into array, becasuse it`s a node
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    p.textContent = transcript;
    if(e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }

    if(transcript.includes('get the weather')){
        console.log('Getting the weather: ⛅ it`s partially clouded - 22o')
    }
});

// when the user starts to speack it will trigger results event
// but if user stops to speak we need to tell the script to start
// the capturing again
recognition.addEventListener('end', recognition.start);

recognition.start();
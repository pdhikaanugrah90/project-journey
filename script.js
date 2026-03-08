const audio = new Audio('riskItAll.mp3');
audio.loop = true;

const overlay = document.getElementById('overlay');
const terminalScreen = document.getElementById('terminal-screen');
const terminalText = document.getElementById('terminal-text');
const contentBox = document.getElementById('content-box');
const mainText = document.getElementById('main-text');
const subText = document.getElementById('sub-text');
const rebootModal = document.getElementById('reboot-modal');
const finalHeart = document.getElementById('final-heart');

//  1. initation journey
overlay.addEventListener('click', () => {
    overlay.classList.add('hidden');
    terminalScreen.classList.remove('hidden');
    if (navigator.vibrate) navigator.vibrate(30);
    runTerminal();
});

function runTerminal() {
    const lines = [
        "> Initializing heartbeat protocol...",
        "> Searching for user 'She'...",
        "> Connection request sent.",
        "> ........................",
        "> No response. Retrying...",
        "> Connection established (Unstable).",
        "> Scroll down to start the journey ❤️"
    ];
    let i = 0;
    const interval = setInterval(() => {
        terminalText.innerHTML += lines[i] + "<br>";
        i++;
        if (i >= lines.length) {
            clearInterval(interval);
            setTimeout(() => {
                terminalScreen.style.opacity = '0';
                setTimeout(() => {
                    terminalScreen.classList.add('hidden');
                    contentBox.classList.remove('hidden');
                    audio.play().catch(() => console.log("Audio play failed"));
                }, 800);
            }, 1500);
        }
    }, 500);
}

// 2. Feeling phase
const phases = [
    { limit: 15, main: "Everything started so light, didn't it?", sub: "A promise blooming in every notification.", color: "#fff5f8", text: "#d4a5b2", sig: "Stable" },
    { limit: 45, main: "But the data doesn't match the devotion.", sub: "Connection timed out...", color: "#f0f0f0", text: "#888", sig: "Weak" },
    { limit: 75, main: "Am I a priority or just a 'low-latency' option?", sub: "Checking heartbeat... ERROR.", color: "#222", text: "#ccc", sig: "Unstable" },
    { limit: 98, main: "I AM THE GARBAGE COLLECTOR FOR YOUR LONELY HOURS.", sub: "SYSTEM OVERLOAD: SELF-RESPECT LOADING...", color: "#000", text: "#0f0", sig: "CRITICAL" }
];

const painWords = ["why?", "it hurts", "invisible", "lied", "standard reply", "time out"];

window.addEventListener('scroll', () => {
    const scrollPct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const current = phases.find(p => scrollPct <= p.limit) || phases[phases.length - 1];

    document.body.style.backgroundColor = current.color;
    mainText.style.color = current.text;
    subText.style.color = current.text;
    document.getElementById('signal-strength').innerText = current.sig;
    document.getElementById('checklist').innerText = scrollPct > 45 ? "✗" : "✓";
    
    //Audio Logic
    if (scrollPct > 35) {
        audio.playbackRate = Math.max(0.45, 1 - (scrollPct / 140));
        audio.volume = Math.max(0.15, 1 - (scrollPct / 180));
    } else {
        audio.playbackRate = 1.0;
        audio.volume = 1.0;
    }

    // Critical Phases (vibration & Floating pain)
    if (scrollPct > 45) {
        mainText.classList.add('glitch-active');
        subText.classList.add('glitch-active');
        scrambleText(mainText, current.main); 
    } else {
        mainText.classList.remove('glitch-active');
        subText.classList.remove('glitch-active');
        mainText.innerText = current.main;
    }

    // --- BAGIAN 2: FLOATING WORDS & VIBRATE (Hanya di 75 ke atas) ---
    if (scrollPct > 75) { 
        // Getaran HP
        if (navigator.vibrate && Math.random() > 0.8) {
            navigator.vibrate(50);
        }
        // Munculin kata-kata melayang
        if (Math.random() > 0.75) {
            createFloatingWord();
        }
    }
    subText.innerText = current.sub;

    // Trigger modal
    if (scrollPct > 99.5) {
        rebootModal.classList.remove('hidden');
        audio.volume = 0.1;
    }
});

function createFloatingWord() {
    const word = document.createElement('div');
    word.className = 'floating-word';
    const originalText = painWords[Math.floor(Math.random() * painWords.length)];
    word.innerText = originalText;

    //logic for chaos
    word.style.left = Math.random() * 90 + "vw";
    word.style.top = Math.random() * 85 + "vh";
    const randomSize = Math.random() * (1.8 - 0.8) + 0.8;
    word.style.fontSize = randomSize + "rem";

    //mini glitch for floating text
    const glitchInt = setInterval(() => {
        if (Math.random() > 0.25) {
            const old = word.innerText;
            word.innerText = "█#$@";
            setTimeout(() => word.innerText = originalText, 60);
        }
    }, 200);


    document.getElementById('floating-container').appendChild(word);

    setTimeout(() => {
        clearInterval(glitchInt);
        word.remove();
    }, 3500);
}

function scrambleText(element, text) {
    const chars = "X█Y01#$";
    element.innerText = text.split('').map(c => Math.random() > 0.75 ? chars[Math.floor(Math.random()*chars.length)] : c).join('');
}

// button logic
document.getElementById('btn-no').addEventListener('click', () => {
    // loop of pain
    window.scrollTo({ top: 0, behavior: 'smooth' });
    rebootModal.classList.add('hidden');
    audio.play();
});

document.getElementById('btn-yes').addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

    rebootModal.style.background = "black"; 
    
    rebootModal.innerHTML = `
        <div class="modal-content" style="border: 1px solid #0f0; text-align: left; padding: 25px;">
            <div style="color: #0f0; font-family: 'Courier New', monospace; line-height: 1.8;">
                <p>> [SYSTEM RECOVERED]</p>
                <p>> User 'She' moved to Archive.</p>
                <p>> Connection: Private & Secured.</p>
                <p style="margin-top: 30px; font-size: 0.85rem; color: #fff; opacity: 0.8;">
                    Everything is under control now ❤️
                </p>
            </div>
        </div>
    `;

    document.body.style.backgroundColor = "black";
    
    finalHeart.innerText = "❤️"; 
    finalHeart.classList.remove('hidden');

    setTimeout(() => { finalHeart.style.opacity = "0.3"; }, 100);
    

    contentBox.classList.add('hidden');
    document.getElementById('floating-container').innerHTML = '';


    setTimeout(() => { window.location.reload(); }, 7000);
});
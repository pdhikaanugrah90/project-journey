const audio = new Audio('riskItAll.mp3');
audio.loop = true;

const body = document.body;
const mainText = document.getElementById('main-text');
const subText = document.getElementById('sub-text');
const terminalText = document.getElementById('terminal-text');
const rebootModal = document.getElementById('reboot-modal');
const modalInner = document.querySelector('.modal-content');

const painWords = ["Invisible", "why?", "it hurts", "Empty", "Forgotten", "Garbage", "Low-Latency"];
let isModalOpen = false;
let isFinished = false;

// 1. SETUP
if (history.scrollRestoration) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

document.getElementById('overlay').addEventListener('click', () => {
    window.scrollTo(0, 0); 
    document.getElementById('overlay').classList.add('hidden');
    document.getElementById('terminal-screen').classList.remove('hidden');
    runTerminal();
});

function runTerminal() {
    const lines = [
        "> Initializing heartbeat protocol...",
        "> Loading emotional_database.db...",
        "> Searching for user 'She'...",
        "> ........................",
        "> ERROR: Connection timed out.",
        "> Retrying connection (Attempt 2/3)...",
        "> Connection established (Unstable Signal).",
        "> Ready. Scroll down slowly..."
    ];
    let i = 0;
    const interval = setInterval(() => {
        terminalText.innerHTML += lines[i] + "<br>"; 
        terminalText.scrollTop = terminalText.scrollHeight;
        i++;
        if (i >= lines.length) {
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('terminal-screen').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('terminal-screen').classList.add('hidden');
                    document.getElementById('content-box').classList.remove('hidden');
                    audio.play();
                }, 1000);
            }, 1500);
        }
    }, 1000); 
}

// 2. LOGIC SCROLL (THE FULL JOURNEY)
window.addEventListener('scroll', () => {
    if (isFinished) return;

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPoint = window.scrollY / scrollHeight;

    mainText.classList.remove('text-slicing', 'glitch-priority', 'garbage-shake');
    mainText.style.color = "";

    if (scrollPoint < 0.12) {
        updateContent("Everything started so light...", "It was all pink and perfect.", "#fff5f8", "#d4a5b2");
    } else if (scrollPoint < 0.25) {
        updateContent("We were building something beautiful...", "Weren't we?", "#ffe0e9", "#c08090");
    } else if (scrollPoint < 0.35) {
        updateContent("The logic was clear...", "But the data doesn't match.", "#e0d5d8", "#888");
    } else if (scrollPoint < 0.45) {
        updateContent("Trying to find 'us' in a database...", "that already deleted me.", "#999", "#eee");
    } else if (scrollPoint < 0.6) {
        mainText.classList.add('text-slicing'); 
        const target = "Invisible even when I'm right here.";
        mainText.setAttribute('data-text', target);
        scrambleText(mainText, target);
        updateContent(mainText.innerText, "Just a shadow in your crowd.", "#444", "#ccc");
        if (navigator.vibrate) navigator.vibrate(20);
    } else if (scrollPoint < 0.75) {
        handleOverthinking();
        updateContent("Rewriting every thought... 'Overthinking'", subText.innerText, "#222", "#888");
    } else if (scrollPoint < 0.9) {
        body.style.backgroundColor = "#1a0000"; 
        mainText.classList.add('glitch-priority');
        scrambleText(mainText, "Am I a priority or just a 'low-latency' option?");
        updateContent(mainText.innerText, "Checking heart's availability...", "#1a0000", "white");
        if (navigator.vibrate) navigator.vibrate(50);
    } else if (scrollPoint < 0.99) {
        body.style.backgroundColor = "black";
        mainText.style.color = "#0f0";
        mainText.classList.add('garbage-shake');
        scrambleText(mainText, "I AM THE GARBAGE COLLECTOR FOR YOUR LONELY HOURS.");
        subText.innerText = "CRITICAL_FAILURE_DETECTION";
        if (Math.random() > 0.7) createFloatingWord();
        if (navigator.vibrate) navigator.vibrate([80, 40, 80]); 
    } else {
        if (!isModalOpen) {
            isFinished = true; 
            body.style.overflow = "hidden";
            showFinalError();
        }
    }
});

function updateContent(main, sub, bg, txt) {
    mainText.innerText = main;
    subText.innerText = sub;
    body.style.backgroundColor = bg;
    body.style.color = txt;
}

function handleOverthinking() {
    const ot = ["Rewriting...", "Deleting...", "Is she mad?", "Nevermind.", "Should I stay?", "I'm sorry."];
    subText.innerText = ot[Math.floor(Date.now() / 800) % ot.length];
}

// 3. MODAL, ARCHIVE & TELEGRAM 
function showFinalError() {
    isModalOpen = true;
    rebootModal.classList.remove('hidden');
    body.style.overflow = "hidden"; 
    modalInner.style.border = "2px solid #ff0000";
    modalInner.innerHTML = `
        <h3 style="color:red; margin-bottom:15px">CRITICAL ERROR</h3>
        <p>Persistent memory leak in 'Feelings'.<br>Archive and Reboot?</p>
        <div style="margin-top:20px; display:flex; gap:10px">
            <button id="btn-yes" style="flex:1; padding:10px; background:red; color:white; border:none; cursor:pointer">YES</button>
            <button id="btn-no" style="flex:1; padding:10px; background:transparent; color:red; border:1px solid red; cursor:pointer">NO</button>
        </div>
    `;

    document.getElementById('btn-no').onclick = () => {
        isModalOpen = false;
        window.scrollTo(0, 0);
        rebootModal.classList.add('hidden');
        body.style.overflow = "auto";
    };

    document.getElementById('btn-yes').onclick = showArchiveForm;
}

function showArchiveForm() {
    modalInner.style.border = "1px solid #0f0";
    modalInner.innerHTML = `
        <div style="text-align: left; font-family: 'Courier New', monospace;">
            <p style="color:#0f0">> [IDENTITY_REQUIRED]</p>
            <input type="text" id="nameInput" placeholder="..." style="width:100%; background:transparent; border:1px solid #0f0; color:#0f0; padding:8px; margin:10px 0; outline:none">
            <p style="color:#0f0">> [FINAL_MESSAGE]</p>
            <textarea id="msgInput" rows="3" style="width:100%; background:transparent; border:1px solid #0f0; color:#0f0; padding:8px; margin:10px 0; outline:none"></textarea>
            <button id="btn-send" style="width:100%; padding:10px; background:#0f0; color:#000; border:none; cursor:pointer; font-weight:bold">CONFIRM & HEAL</button>
        </div>
    `;

    document.getElementById('btn-send').onclick = () => {
        const name = document.getElementById('nameInput').value || "Anonymous";
        const msg = document.getElementById('msgInput').value || "No message.";
        sendToTelegram(name, msg);
    };
}

function sendToTelegram(name, msg) {
    const token = "8387042278:AAHS8OcVCviyL0EiuaVhrADZQiKDUuxsI4Y"; 
    const chatId = "5166648819";   
    const text = `📩 ARCHIVE DETECTED!\n👤 Name: ${name}\n💬 Message: ${msg}`;
    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
    .finally(() => applyHealedState());
}

function applyHealedState() {
    isModalOpen = false;
    rebootModal.classList.add('hidden');
    body.classList.add('healed');
    mainText.classList.remove('garbage-shake', 'text-slicing');
    mainText.style.color = "white";
    mainText.innerHTML = `
        <div class="heart-wrapper"><span class="beating-heart">❤️</span></div>
        [ANALYSIS COMPLETE]<br><br>
        <span style="font-size:1rem; font-weight:normal">"Turns out, this system didn't need new code to heal. It just needed to know you were still here."</span>`;
    subText.innerHTML = `<br>[ALL ERRORS RESOLVED] ❤️`;
    window.scrollTo(0, 0);
}

// UTILS
function scrambleText(element, text) {
    const chars = "X█Y01#$!@";
    if (Math.random() > 0.7) {
        element.innerText = text.split('').map(c => Math.random() > 0.8 ? chars[Math.floor(Math.random()*chars.length)] : c).join('');
    }
}

function createFloatingWord() {
    const word = document.createElement('div');
    word.className = 'floating-word';
    const originalText = painWords[Math.floor(Math.random() * painWords.length)];
    word.innerText = originalText;
    word.setAttribute('data-text', originalText);
    const intv = setInterval(() => {
        const chars = "█X#01";
        word.innerText = originalText.split('').map(c => Math.random() > 0.8 ? chars[Math.floor(Math.random()*chars.length)] : c).join('');
    }, 150);
    word.style.left = Math.random() * 80 + "vw";
    word.style.top = Math.random() * 80 + "vh";
    document.getElementById('floating-container').appendChild(word);
    setTimeout(() => { clearInterval(intv); word.remove(); }, 3000);
}
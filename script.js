// Array of fun friendship quotes
const quotes = [
    "You are my sunshine on a rainy day! ☀️",
    "Life is better with true friends like you. 🌻",
    "Here's to the nights that turned into mornings with the friends that turned into family. 🥂",
    "I would rather walk with a friend in the dark, than alone in the light. 🌟",
    "Thanks for being my unpaid therapist! 😂",
    "We'll be friends forever because you already know too much. 🤫",
    "A good friend knows all your stories. A best friend helped you write them. 📖",
    "You are the 'she' to my 'nanigans'. 🎉"
];

// Function to trigger confetti
function fireConfetti() {
    var duration = 2000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#FFD166', '#EF476F', '#118AB2']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#FFD166', '#EF476F', '#118AB2']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Fire confetti when the page first loads
window.onload = function() {
    setTimeout(fireConfetti, 500);
};

// Sound Effects using Tone.js
async function playPopSound() {
    await Tone.start();
    const synth = new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 }
    }).toDestination();
    synth.triggerAttackRelease("E5", "16n");
}

async function playTadaSound() {
    await Tone.start();
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    synth.set({
        envelope: { attack: 0.05, decay: 0.1, sustain: 0.3, release: 1 }
    });
    const now = Tone.now();
    synth.triggerAttackRelease(["C4", "E4", "G4", "C5"], "4n", now);
}

async function playTickSound() {
    await Tone.start();
    const synth = new Tone.MembraneSynth().toDestination();
    synth.triggerAttackRelease("C2", "32n");
}

// Friendship Tester Logic
function calculateFriendship() {
    const nameInput = document.getElementById('friend-name').value.trim();
    const meterFill = document.getElementById('meter-fill');
    const resultText = document.getElementById('meter-result');

    if (nameInput === "") {
        resultText.textContent = "Please enter a name first! 🥺";
        meterFill.style.width = "0%";
        return;
    }

    // Reset
    meterFill.style.width = "0%";
    resultText.textContent = "Calculating...";
    
    // Ticking sound effect while "calculating"
    let ticks = 0;
    const tickInterval = setInterval(() => {
        playTickSound();
        ticks++;
        if(ticks > 8) clearInterval(tickInterval);
    }, 200);

    // Animate bar and show result
    setTimeout(() => {
        // Randomly generate a score over 100% for comedic effect, or 99%
        const score = Math.floor(Math.random() * 50) + 99; 
        meterFill.style.width = "100%";
        
        playTadaSound();
        fireConfetti();

        if (score > 100) {
            resultText.innerHTML = `Bond Score: <strong>${score}%</strong>! <br> ERROR: Overflow! You guys are inseparable! 💖`;
        } else {
            resultText.innerHTML = `Bond Score: <strong>${score}%</strong>! <br> Best friends forever! 🎉`;
        }
    }, 2000);
}

// Function to generate a new quote and fire confetti
function generateQuote() {
    const quoteDisplay = document.getElementById('dynamic-quote');
    
    playPopSound();
    fireConfetti();

    // Fade out effect
    quoteDisplay.style.opacity = 0;
    
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteDisplay.textContent = quotes[randomIndex];
        
        // Fade in effect
        quoteDisplay.style.transition = "opacity 0.5s ease-in-out";
        quoteDisplay.style.opacity = 1;
    }, 300);
}

// Magic Cursor Trail Effect
document.addEventListener('mousemove', function(e) {
    // Only create particles occasionally to avoid lagging
    if (Math.random() > 0.15) return; 

    const magic = document.createElement('div');
    const emojis = ['💖', '✨', '🌸', '🎉', '💛'];
    magic.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    magic.className = 'cursor-magic';
    
    // Use clientX/Y and fixed positioning so it doesn't cause page scrolling
    magic.style.left = (e.clientX - 10) + 'px';
    magic.style.top = (e.clientY - 10) + 'px';
    
    document.body.appendChild(magic);
    
    // Remove the element after animation completes
    setTimeout(() => {
        magic.remove();
    }, 1000);
});
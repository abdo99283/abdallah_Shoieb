/* 
  Portfolio Logic & Interactions
  Abdullah Ahmed Abdullah Shoaib
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Background Animation
    initBackground();

    // 2. Typing Animation
    initTypingEffect();

    // 3. Scroll Reveal
    initScrollReveal();

    // 4. Navigation Active Link
    initNavLinkActive();

    // 5. Contact Form
    initContactForm();

    // 6. Chatbot
    initChatbot();
});

// --- Background Animation ---
function initBackground() {
    const container = document.body;
    const colors = ['#a855f7', '#ec4899', '#c084fc'];
    
    for (let i = 0; i < 5; i++) {
        const sphere = document.createElement('div');
        sphere.className = 'glow-sphere';
        
        const size = Math.random() * 300 + 200;
        sphere.style.width = `${size}px`;
        sphere.style.height = `${size}px`;
        sphere.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        sphere.style.top = `${Math.random() * 100}%`;
        sphere.style.left = `${Math.random() * 100}%`;
        
        sphere.style.animationDuration = `${Math.random() * 10 + 15}s`;
        sphere.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(sphere);
    }
}

// --- Typing Effect ---
function initTypingEffect() {
    const textElement = document.getElementById('typing-text');
    const phrases = [
        "Cyber Security Engineer",
        "AI Engineering Student",
        "Ethical Hacking Enthusiast"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// --- Scroll Reveal ---
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// --- Navigation Active Link ---
function initNavLinkActive() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// --- Contact Form ---
function initContactForm() {
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('success-msg');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple animation for success
            form.style.opacity = '0.5';
            form.style.pointerEvents = 'none';
            
            setTimeout(() => {
                form.reset();
                form.style.opacity = '1';
                form.style.pointerEvents = 'auto';
                successMsg.style.display = 'block';
                
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }
}

// --- Chatbot ---
function initChatbot() {
    const toggle = document.getElementById('chatbot-toggle');
    const windowChat = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-chat');
    const input = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');

    const botResponses = {
        "hello": "Hello! I'm Abdullah's virtual assistant. How can I help you today?",
        "hi": "Hi there! Feel free to ask me anything about Abdullah's portfolio.",
        "skills": "Abdullah is skilled in Python, C++, PHP, MySQL, Arduino, and Cyber Security tools like Kali Linux and Packet Tracer.",
        "projects": "Abdullah has worked on several projects in Cyber Security and AI. You can check them out in the Projects section!",
        "contact": "You can reach Abdullah through the contact form or via his social links: LinkedIn, GitHub, or WhatsApp.",
        "about": "Abdullah is a Cyber Security and AI Engineering student passionate about technology and ethical hacking.",
        "certifications": "He holds certifications in Arduino (Levels 1 & 2) and is continuously learning in the field of Cyber Security.",
        "default": "That's interesting! I'm still learning, but you can ask me about Abdullah's skills, projects, or how to contact him."
    };

    toggle.addEventListener('click', () => {
        windowChat.style.display = windowChat.style.display === 'flex' ? 'none' : 'flex';
    });

    closeBtn.addEventListener('click', () => {
        windowChat.style.display = 'none';
    });

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-msg`;
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        if (sender === 'bot') {
            speak(text);
        }
    }

    function speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
        }
    }

    function handleUserMessage() {
        const text = input.value.trim().toLowerCase();
        if (text === "") return;

        addMessage(input.value.trim(), 'user');
        input.value = "";

        setTimeout(() => {
            let response = botResponses.default;
            for (let key in botResponses) {
                if (text.includes(key)) {
                    response = botResponses[key];
                    break;
                }
            }
            addMessage(response, 'bot');
        }, 500);
    }

    sendBtn.addEventListener('click', handleUserMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });

    // Initial greeting
    setTimeout(() => {
        addMessage("Welcome! I'm Abdullah's AI assistant. Ask me anything!", 'bot');
    }, 1000);
}

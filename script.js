// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('href');
        if (id === '#') return;
        const el = document.querySelector(id);
        if (el) {
            const offset = 70;
            const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Navbar style on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.borderBottomColor = window.scrollY > 30
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(255, 255, 255, 0.08)';
});

// ── Interactive Terminal ──────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('terminal-output');
    const input = document.getElementById('terminal-input');
    if (!output || !input) return;

    // Boot sequence
    const bootLines = [
        { text: '$ ./deploy.sh --target=SmartBusSkopje', cls: '' },
        { text: 'Compiling Kotlin sources... done', cls: 'output' },
        { text: 'Bundling APK.............. done', cls: 'output' },
        { text: 'Deploying to device....... \u2713 success', cls: 'output green-text' },
        { text: '', cls: '' },
        { text: '$ systemctl status postgresql', cls: '' },
        { text: '\u25cf postgresql.service \u2014 PostgreSQL', cls: 'output green-text' },
        { text: '   Active: active (running)', cls: 'output green-text' },
    ];

    let i = 0;
    function printBoot() {
        if (i >= bootLines.length) {
            input.disabled = false;
            input.focus();
            return;
        }
        const line = bootLines[i];
        const div = document.createElement('div');
        div.textContent = line.text;
        if (line.cls) div.className = line.cls;
        output.appendChild(div);
        i++;
        setTimeout(printBoot, i <= 1 ? 500 : 200);
    }

    input.disabled = true;
    setTimeout(printBoot, 600);

    // Error responses when user types commands
    const errorMessages = [
        "bash: permission denied. nice try though",
        "error: you don't have root access on this portfolio",
        "bash: command not found. this is a portfolio, not a server",
        "segfault (core dumped) — just kidding. but no.",
        "error: operation not permitted. maybe send me an email instead?",
        "403 forbidden. only David can run commands here",
        "error: sudo password required. hint: you'll never guess it",
        "bash: cannot execute: this terminal is for display purposes only... mostly",
        "fatal: not a git repository. but the real code is on my GitHub",
        "error: EACCES. try 'hire david' instead",
    ];

    // Some easter egg commands with special responses
    const specialCommands = {
        'help': 'available commands: none. this is a fake terminal. go look at the projects instead :)',
        'whoami': 'visitor — welcome to David Zaev\'s portfolio',
        'ls': 'smartbus-skopje/  dreamscape/  secret-projects/  .env (nice try)',
        'pwd': '/home/david/portfolio',
        'cd': 'you\'re not going anywhere',
        'clear': '__CLEAR__',
        'hello': 'hey! scroll down to contact me, or just type stuff here',
        'hi': 'hey! scroll down to contact me, or just type stuff here',
        'sudo': 'error: David is the only sudoer on this system',
        'rm -rf /': 'absolutely not.',
        'rm': 'absolutely not.',
        'cat': 'meow. (no files to read here)',
        'exit': 'there is no escape from this portfolio',
        'date': new Date().toLocaleString(),
        'echo hello': 'hello',
        'neofetch': '  OS: PortfolioOS 1.0\n  Host: david-zaev.github.io\n  Uptime: since 2026\n  Shell: fake-bash 4.2\n  Theme: dark mode only',
        'hire david': '\u2713 great choice! email: zaev.david.at@gmail.com',
    };

    input.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const cmd = input.value.trim().toLowerCase();
        if (!cmd) return;

        // Show the typed command
        const cmdLine = document.createElement('div');
        cmdLine.textContent = '$ ' + input.value.trim();
        output.appendChild(cmdLine);

        // Get response
        let response;
        if (specialCommands[cmd] !== undefined) {
            response = specialCommands[cmd];
        } else {
            response = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        }

        // Handle clear
        if (response === '__CLEAR__') {
            output.innerHTML = '';
        } else {
            const lines = response.split('\n');
            lines.forEach(line => {
                const responseDiv = document.createElement('div');
                responseDiv.className = cmd in specialCommands ? 'output' : 'terminal-error';
                responseDiv.textContent = line;
                output.appendChild(responseDiv);
            });
        }

        input.value = '';

        // Auto-scroll terminal
        const terminal = document.getElementById('terminal');
        terminal.scrollTop = terminal.scrollHeight;
    });

    // Click anywhere in terminal to focus input
    document.getElementById('terminal').addEventListener('click', () => {
        input.focus();
    });
});

// Contact button — copy email
const contactBtn = document.getElementById('contact-btn');
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        const email = 'zaev.david.at@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            const span = document.getElementById('contact-text');
            const original = span.innerText;
            span.innerText = 'Copied!';
            setTimeout(() => span.innerText = original, 2000);
        }).catch(err => console.error('Copy failed:', err));
    });
}

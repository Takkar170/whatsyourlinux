const quizQuestions = [
    {
        id: 1,
        question: "What's your experience level with Linux?",
        answers: [
            { text: "Complete beginner", value: "beginner" },
            { text: "Some experience", value: "intermediate" }
        ]
    },
    {
        id: 2,
        question: "What will you primarily use Linux for?",
        answers: [
            { text: "Daily Computing (web, office, media)", value: "daily" },
            { text: "Gaming and Daily Computing", value: "gaming" },
            { text: "Server Hosting", value: "server" }
        ]
    },
    {
        id: 3,
        question: "What operating system do you currently use most?",
        answers: [
            { text: "Windows", value: "windows" },
            { text: "macOS", value: "macos" }
        ]
    },
    {
        id: 4,
        question: "How old is your hardware?",
        answers: [
            { text: "Newer (0-7 years old)", value: "newer" },
            { text: "Older (7-15 years old)", value: "older" },
            { text: "Ancient (15+ Years)", value: "ancient" }
        ]
    },
    {
        id: 5,
        question: "How much RAM does your system have?",
        answers: [
            { text: "Less than 4GB", value: "low-ram" },
            { text: "4GB", value: "medium-ram" },
            { text: "More than 4GB", value: "high-ram" }
        ]
    },
    {
        id: 6,
        question: "How much do you want to customize your system?",
        answers: [
            { text: "Minimal tweaking - works out of the box", value: "minimal-custom" },
            { text: "I want to customize and theme", value: "extensive-custom" }
        ]
    },
    {
        id: 7,
        question: "What's your preference for system updates?",
        answers: [
            { text: "Stable/Infrequent (rock solid)", value: "stable" },
            { text: "Regular updates (balanced)", value: "regular" },
            { text: "Cutting-edge (latest features)", value: "bleeding-edge" }
        ]
    }
];

let currentQuestion = 0;
let userAnswers = {};

class ConfettiParticle {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 6 - 3;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        if (this.y > this.canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * this.canvas.width;
        }
        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
    }
    
    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotation * Math.PI / 180);
        this.ctx.fillStyle = this.color;
        this.ctx.globalAlpha = this.opacity;
        this.ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        this.ctx.restore();
    }
}

let confettiCanvas, confettiCtx, confettiParticles = [], confettiAnimationId;

function createConfetti() {
    const existingCanvas = document.getElementById('confetti-canvas');
    if (existingCanvas) {
        existingCanvas.remove();
    }
    
    confettiCanvas = document.createElement('canvas');
    confettiCanvas.id = 'confetti-canvas';
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.top = '0';
    confettiCanvas.style.left = '0';
    confettiCanvas.style.width = '100%';
    confettiCanvas.style.height = '100%';
    confettiCanvas.style.pointerEvents = 'none';
    confettiCanvas.style.zIndex = '9999';
    document.body.appendChild(confettiCanvas);
    
    confettiCtx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    
    confettiParticles = [];
    for (let i = 0; i < 100; i++) {
        confettiParticles.push(new ConfettiParticle(confettiCanvas, confettiCtx));
    }
    
    animateConfetti();
    
    window.addEventListener('resize', () => {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    });
}

function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettiParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    confettiAnimationId = requestAnimationFrame(animateConfetti);
}

function stopConfetti() {
    if (confettiAnimationId) {
        cancelAnimationFrame(confettiAnimationId);
    }
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
        canvas.remove();
    }
}

function celebrateConfetti() {
    createConfetti();
    setTimeout(stopConfetti, 4000);
}

function getDownloadLink(distroName) {
    const downloadLinks = {
        "Linux Mint": "https://linuxmint.com/download.php",
        "Fedora": "https://fedoraproject.org/workstation/download/",
        "Manjaro": "https://manjaro.org/download/",
        "Pop!_OS": "https://pop.system76.com/",
        "Nobara": "https://nobaraproject.org/download/",
        "Debian": "https://www.debian.org/distrib/",
        "Ubuntu Server": "https://ubuntu.com/download/server",
        "OpenMediaVault": "https://www.openmediavault.org/download.html",
        "Bazzite": "https://bazzite.gg/",
        "Garuda Linux": "https://garudalinux.org/editions",
        "Arch Linux": "https://archlinux.org/download/",
        "Rocky Linux": "https://rockylinux.org/download",
        "AlmaLinux": "https://almalinux.org/get-almalinux/",
        "Fedora Server": "https://fedoraproject.org/server/download/",
        "Ubuntu": "https://ubuntu.com/download/desktop",
        "Puppy Linux": "https://puppylinux-woof-ce.github.io/",
        "Tiny Core Linux": "http://tinycorelinux.net/downloads.html"
    };
    
    return downloadLinks[distroName] || "https://distrowatch.com/";
}

function getInstallGuideLink(distroName) {
    const installGuides = {
        "Linux Mint": "https://linuxmint-installation-guide.readthedocs.io/",
        "Fedora": "https://docs.fedoraproject.org/en-US/fedora/latest/install-guide/",
        "Manjaro": "https://wiki.manjaro.org/index.php/Installation_Guides",
        "Pop!_OS": "https://support.system76.com/articles/install-pop/",
        "Nobara": "https://wiki.nobaraproject.org/",
        "Debian": "https://www.debian.org/releases/stable/installmanual",
        "Ubuntu Server": "https://ubuntu.com/tutorials/install-ubuntu-server",
        "OpenMediaVault": "https://docs.openmediavault.org/en/stable/installation/",
        "Bazzite": "https://universal-blue.discourse.group/docs?category=5",
        "Garuda Linux": "https://garudalinux.org/installation",
        "Arch Linux": "https://wiki.archlinux.org/title/Installation_guide",
        "Rocky Linux": "https://docs.rockylinux.org/guides/installation/",
        "AlmaLinux": "https://wiki.almalinux.org/documentation/installation-guide.html",
        "Fedora Server": "https://docs.fedoraproject.org/en-US/fedora-server/installation/",
        "Ubuntu": "https://ubuntu.com/tutorials/install-ubuntu-desktop",
        "Puppy Linux": "https://puppylinux-woof-ce.github.io/woof-ce/woof-ce/WikiPages/HOWTO%20Install%20Puppy%20to%20Hard%20Drive.html",
        "Tiny Core Linux": "http://wiki.tinycorelinux.net/wiki:installation"
    };
    
    return installGuides[distroName] || "https://www.linux.org/pages/download/";
}

function startQuiz() {
    document.querySelector('.progress-container').style.display = 'block';
    currentQuestion = 0;
    showQuestion(0);
}

function showQuestion(questionIndex) {
    const question = quizQuestions[questionIndex];
    
    let buttonsHtml = '';
    question.answers.forEach(answer => {
        const isSelected = userAnswers[question.id] === answer.value;
        const selectedClass = isSelected ? ' btn-secondary' : ' btn-primary';
        buttonsHtml += `<button class="btn${selectedClass}" onclick="selectAnswer('${question.id}', '${answer.value}')">${answer.text}${isSelected ? ' ✓' : ''}</button>`;
    });
    
    document.querySelector('.question-card').innerHTML = `
        <h2 class="question">${question.question}</h2>
        <div class="answer-buttons">
            ${buttonsHtml}
        </div>
        <div class="navigation-buttons">
            <button class="btn btn-back" onclick="goBack()" ${questionIndex === 0 ? 'disabled' : ''}>
                ← Back
            </button>
            <div class="question-navigation">
                <span class="progress-text">Question ${questionIndex + 1} of ${quizQuestions.length}</span>
            </div>
        </div>
    `;
    
    const progress = ((questionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Question ${questionIndex + 1} of ${quizQuestions.length}`;
}

function selectAnswer(questionId, answer) {
    userAnswers[questionId] = answer;
    
    setTimeout(() => {
        currentQuestion++;
        
        if (currentQuestion < quizQuestions.length) {
            showQuestion(currentQuestion);
        } else {
            showResults();
        }
    }, 30);
}

function goBack() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function showResults() {
    const recommendation = calculateRecommendation();
    
    celebrateConfetti();
    
    const downloadLink = getDownloadLink(recommendation.name);
    
    document.querySelector('.question-card').innerHTML = `
        <h2>🎉 Your Perfect Linux Distribution! 🎉</h2>
        <div class="result-card">
            <h3>${recommendation.name}</h3>
            <div style="margin: 15px 0;">
                <strong>Distro Type:</strong> <span style="color: #667eea;">${recommendation.distroType}</span><br>
                <strong>Desktop Environment:</strong> <span style="color: #667eea;">${recommendation.desktopEnvironment}</span>
            </div>
            <p><strong>Why it's perfect for you:</strong></p>
            <ul>
                ${recommendation.reasons.map(reason => `<li>${reason}</li>`).join('')}
            </ul>
            <p><strong>Description:</strong> ${recommendation.description}</p>
            ${recommendation.alternatives ? `
                <p><strong>Also consider:</strong> ${recommendation.alternatives.join(', ')}</p>
            ` : ''}
            
            <div style="margin-top: 25px; padding: 20px; background: #e8f4fd; border-radius: 8px; border-left: 4px solid #667eea;">
                <h4 style="margin: 0 0 15px 0; color: #667eea;">🚀 Ready to Get Started?</h4>
                <p style="margin: 0 0 15px 0;">Download ${recommendation.name} and begin your Linux journey!</p>
                <a href="${downloadLink}" target="_blank" rel="noopener noreferrer" class="btn btn-download" style="display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-right: 10px;">
                    📥 Download ${recommendation.name}
                </a>
                <a href="${getInstallGuideLink(recommendation.name)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="display: inline-block; background: #6c757d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                    📖 Installation Guide
                </a>
            </div>
        </div>
        <div class="navigation-buttons">
            <button class="btn btn-back" onclick="goBackToLastQuestion()">← Edit Answers</button>
            <button class="btn btn-restart" onclick="restartQuiz()">Start Over</button>
        </div>
    `;
    
    document.querySelector('.progress-container').style.display = 'none';
}

function goBackToLastQuestion() {
    stopConfetti();
    currentQuestion = quizQuestions.length - 1;
    document.querySelector('.progress-container').style.display = 'block';
    showQuestion(currentQuestion);
}

function calculateRecommendation() {
    const answers = userAnswers;
    
    const experience = answers[1];
    const useCase = answers[2];
    const osUsed = answers[3];
    const hardwareAge = answers[4];
    const ram = answers[5];
    const customization = answers[6];
    const updates = answers[7];
    
    if (hardwareAge === 'ancient') {
        if (experience === 'beginner') {
            return {
                name: "Puppy Linux",
                distroType: "Ultra-Lightweight",
                desktopEnvironment: "JWM/Openbox",
                reasons: [
                    "Designed specifically for very old hardware",
                    "Runs entirely from RAM for maximum speed",
                    "Only needs 256MB RAM and works on Pentium III",
                    "Extremely user-friendly for beginners"
                ],
                description: "Puppy Linux is perfect for ancient hardware, running entirely from RAM and providing a complete desktop experience on machines from the early 2000s.",
                alternatives: ["antiX Linux", "Q4OS Trinity"]
            };
        } else if (experience === 'intermediate') {
            return {
                name: "Tiny Core Linux",
                distroType: "Micro Distribution",
                desktopEnvironment: "FLWM/FLTK",
                reasons: [
                    "Incredibly tiny at just 16MB",
                    "Blazing fast boot times on old hardware",
                    "Modular design - add only what you need",
                    "Perfect for users who want maximum control"
                ],
                description: "Tiny Core Linux offers ultimate performance on ancient hardware with its minimalist approach and modular design system.",
                alternatives: ["Puppy Linux", "antiX Linux"]
            };
        }
    }
    
    function getGeneralDesktopEnvironment() {
        const ramLow = ram === 'low-ram';
        const ramMediumOrHigher = ram === 'medium-ram' || ram === 'high-ram';
        const hardwareOld = hardwareAge === 'older';
        const hardwareNew = hardwareAge === 'newer';
        const minimalCustom = customization === 'minimal-custom';
        const extensiveCustom = customization === 'extensive-custom';
        
        if (osUsed === 'windows' && (hardwareOld || ramLow) && minimalCustom) {
            return 'Cinnamon';
        }
        if (osUsed === 'macos' && (hardwareOld || ramLow) && minimalCustom) {
            return 'Cinnamon';
        }
        if (osUsed === 'macos' && (hardwareOld || ramLow) && extensiveCustom) {
            return 'Xfce';
        }
        if (osUsed === 'windows' && (hardwareOld || ramLow) && extensiveCustom) {
            return 'Xfce';
        }
        if (osUsed === 'windows' && hardwareNew && ramMediumOrHigher && extensiveCustom) {
            return 'KDE';
        }
        if (osUsed === 'windows' && hardwareNew && ramMediumOrHigher && minimalCustom) {
            return 'KDE';
        }
        if (osUsed === 'macos' && hardwareNew && ramMediumOrHigher && extensiveCustom) {
            return 'GNOME';
        }
        if (osUsed === 'macos' && hardwareNew && ramMediumOrHigher && minimalCustom) {
            return 'GNOME';
        }
        
        return 'GNOME';
    }
    
    function getDistroSpecificDesktopEnvironment(distroName) {
        const ramLow = ram === 'low-ram';
        const ramMediumOrHigher = ram === 'medium-ram' || ram === 'high-ram';
        const hardwareOld = hardwareAge === 'older';
        const hardwareNew = hardwareAge === 'newer';
        const minimalCustom = customization === 'minimal-custom';
        const extensiveCustom = customization === 'extensive-custom';
        
        if (distroName === 'Bazzite') {
            if (osUsed === 'windows' && (hardwareOld || ramLow) && minimalCustom) {
                return 'KDE';
            }
            if (osUsed === 'macos' && (hardwareOld || ramLow) && minimalCustom) {
                return 'GNOME';
            }
            if (osUsed === 'macos' && (hardwareOld || ramLow) && extensiveCustom) {
                return 'GNOME';
            }
            if (osUsed === 'windows' && (hardwareOld || ramLow) && extensiveCustom) {
                return 'KDE';
            }
            return 'KDE';
        }
        
        if (distroName === 'Nobara') {
            if (osUsed === 'windows' && (hardwareOld || ramLow) && minimalCustom) {
                return 'KDE';
            }
            if (osUsed === 'macos' && (hardwareOld || ramLow) && minimalCustom) {
                return 'GNOME';
            }
            if (osUsed === 'macos' && (hardwareOld || ramLow) && extensiveCustom) {
                return 'GNOME';
            }
            if (osUsed === 'windows' && (hardwareOld || ramLow) && extensiveCustom) {
                return 'KDE';
            }
            return 'KDE';
        }
        
        if (distroName === 'Pop!_OS') {
            return 'COSMIC DE';
        }
        
        if (distroName === 'Linux Mint') {
            if (osUsed === 'windows' && hardwareNew && ramMediumOrHigher && minimalCustom) {
                return 'Cinnamon';
            }
            if (osUsed === 'macos' && hardwareNew && ramMediumOrHigher && minimalCustom) {
                return 'Cinnamon';
            }
            if (osUsed === 'macos' && hardwareNew && ramMediumOrHigher && extensiveCustom) {
                return 'Xfce';
            }
            if (osUsed === 'windows' && hardwareNew && ramMediumOrHigher && extensiveCustom) {
                return 'Xfce';
            }
            return getGeneralDesktopEnvironment();
        }
        
        return getGeneralDesktopEnvironment();
    }
    
    if (experience === 'beginner') {
        if (useCase === 'daily') {
            if (updates === 'stable') {
                const recommendedDE = getDistroSpecificDesktopEnvironment('Linux Mint');
                return {
                    name: "Linux Mint",
                    distroType: "LTS (Ubuntu-based)",
                    desktopEnvironment: recommendedDE,
                    reasons: [
                        "Perfect for Linux beginners",
                        `${recommendedDE} desktop matches your OS experience`,
                        "Rock-solid stability",
                        "Excellent hardware compatibility"
                    ],
                    description: `Linux Mint with ${recommendedDE} is ideal for beginners who want a stable, familiar desktop experience.`,
                    alternatives: ["Ubuntu", "elementary OS"]
                };
            } else if (updates === 'regular') {
                const recommendedDE = getGeneralDesktopEnvironment();
                return {
                    name: "Fedora",
                    distroType: "Regular Release",
                    desktopEnvironment: recommendedDE,
                    reasons: [
                        "Good balance of stability and new features",
                        `${recommendedDE} provides familiar workflow`,
                        "Regular updates with tested packages",
                        "Strong community support"
                    ],
                    description: `Fedora with ${recommendedDE} provides a good balance of stability and modern features for beginner users.`,
                    alternatives: ["Ubuntu", "openSUSE Leap"]
                };
            } else {
                const recommendedDE = getGeneralDesktopEnvironment();
                return {
                    name: "Manjaro",
                    distroType: "Rolling Release",
                    desktopEnvironment: recommendedDE,
                    reasons: [
                        "Beginner-friendly Arch-based system",
                        `${recommendedDE} offers familiar interface`,
                        "Latest software and drivers",
                        "Rolling release with stability focus"
                    ],
                    description: `Manjaro with ${recommendedDE} offers cutting-edge software in a beginner-friendly package.`,
                    alternatives: ["EndeavourOS", "Garuda Linux"]
                };
            }
        } else if (useCase === 'gaming') {
            if (updates === 'stable') {
                const recommendedDE = getDistroSpecificDesktopEnvironment('Pop!_OS');
                return {
                    name: "Pop!_OS",
                    distroType: "LTS (Ubuntu-based)",
                    desktopEnvironment: recommendedDE,
                    reasons: [
                        "Excellent gaming performance out of the box",
                        `${recommendedDE} optimized for your hardware`,
                        "NVIDIA drivers pre-installed",
                        "Stable base for reliable gaming"
                    ],
                    description: `Pop!_OS with ${recommendedDE} is optimized for gaming while maintaining stability for beginners.`,
                    alternatives: ["Linux Mint", "Ubuntu"]
                };
            } else if (updates === 'regular') {
                const recommendedDE = getDistroSpecificDesktopEnvironment('Nobara');
                return {
                    name: "Nobara",
                    distroType: "Gaming-Focused",
                    desktopEnvironment: recommendedDE,
                    reasons: [
                        "Purpose-built for gaming",
                        `${recommendedDE} tuned for gaming performance`,
                        "Pre-configured gaming optimizations",
                        "Fedora-based with gaming tweaks"
                    ],
                    description: `Nobara with ${recommendedDE} is specifically designed for Linux gaming with all optimizations included.`,
                    alternatives: ["Pop!_OS", "Garuda Gaming"]
                };
            } else {
                const recommendedDE = getDistroSpecificDesktopEnvironment('Garuda Linux');
                return {
                    name: "Garuda Linux",
                    distroType: "Rolling Release",
                    desktopEnvironment: recommendedDE,
                    reasons: [
                        "Cutting-edge gaming performance",
                        "Beautiful customized interface with gaming aesthetics",
                        "Latest drivers and gaming technologies",
                        "Rolling release for newest features and updates"
                    ],
                    description: `Garuda Linux with ${recommendedDE} offers the absolute latest in gaming technology with a stunning, customized interface perfect for gaming enthusiasts.`,
                    alternatives: ["Manjaro Gaming", "EndeavourOS"]
                };
            }
        } else {
            if (updates === 'stable') {
                return {
                    name: "Debian",
                    distroType: "Stable",
                    desktopEnvironment: "Command Line",
                    reasons: [
                        "Rock-solid server stability",
                        "Long-term support",
                        "Minimal security footprint",
                        "Industry standard for servers"
                    ],
                    description: "Debian provides the most stable foundation for server deployments.",
                    alternatives: ["Ubuntu Server", "Rocky Linux"]
                };
            } else if (updates === 'regular') {
                return {
                    name: "Ubuntu Server",
                    distroType: "LTS",
                    desktopEnvironment: "Command Line",
                    reasons: [
                        "Excellent beginner server documentation",
                        "Regular security updates",
                        "Large community support",
                        "5-year LTS support"
                    ],
                    description: "Ubuntu Server offers the best learning environment for new server administrators.",
                    alternatives: ["Debian", "Rocky Linux"]
                };
            } else {
                return {
                    name: "OpenMediaVault",
                    distroType: "Specialized Server",
                    desktopEnvironment: "Web-based Management",
                    reasons: [
                        "Modern web-based server management",
                        "Latest server technologies",
                        "Perfect for home/media servers",
                        "Easy-to-use web interface"
                    ],
                    description: "OpenMediaVault provides cutting-edge server features with beginner-friendly management.",
                    alternatives: ["TrueNAS", "Proxmox"]
                };
            }
        }
    }
    
    else if (experience === 'intermediate') {
        if (useCase === 'daily') {
            if (updates === 'stable') {
                const recommendedDE = getDistroSpecificDesktopEnvironment('Linux Mint');
                return {
                    name: "Linux Mint",
                    distroType: "LTS (Ubuntu-based)",
                    desktopEnvironment: recommendedDE,
                    reasons: [
                        "Reliable and stable for daily use",
                        `${recommendedDE} matches your workflow preferences`,
                        "Excellent software compatibility",
                        "Easy system maintenance"
                    ],
                    description: `Linux Mint with ${recommendedDE} remains an excellent choice for experienced users who value stability.`,
                    alternatives: ["Ubuntu LTS", "Debian"]
                };
            } else if (updates === 'regular') {
                const recommendedDE = getGeneralDesktopEnvironment();
                return {
                    name: "Fedora",
                    distroType: "Regular Release",
                    desktopEnvironment: recommendedDE,
                    reasons: [
                        "Latest features without bleeding-edge risks",
                        `${recommendedDE} provides optimal user experience`,
                        "Strong development focus",
                        "Regular, well-tested updates"
                    ],
                    description: `Fedora with ${recommendedDE} provides modern Linux technologies for users comfortable with regular updates.`,
                    alternatives: ["openSUSE Leap", "Ubuntu"]
                };
            } else {
                const recommendedDE = getGeneralDesktopEnvironment();
                return {
                    name: "Arch Linux",
                    distroType: "Rolling Release",
                    desktopEnvironment: `${recommendedDE} (Your Choice)`,
                    reasons: [
                        "Cutting-edge packages and kernel",
                        `Install ${recommendedDE} or any desktop you prefer`,
                        "Complete customization control",
                        "Excellent documentation (Arch Wiki)"
                    ],
                    description: `Arch Linux offers ultimate control and the latest software. ${recommendedDE} would be ideal based on your preferences.`,
                    alternatives: ["Manjaro", "EndeavourOS"]
                };
            }
        } else if (useCase === 'gaming') {
            if (updates === 'stable') {
                const recommendedDE = getDistroSpecificDesktopEnvironment('Bazzite');
                return {
                    name: "Bazzite",
                    distroType: "Gaming-Focused",
                    desktopEnvironment: recommendedDE,
                    reasons: [
                        "Steam Deck experience on desktop",
                        `${recommendedDE} optimized for gaming`,
                        "Immutable system for reliability",
                        "Perfect for experienced gamers"
                    ],
                    description: `Bazzite with ${recommendedDE} brings the Steam Deck experience to desktop with rock-solid stability.`,
                    alternatives: ["Pop!_OS", "Nobara"]
                };
            } else if (updates === 'regular') {
                const recommendedDE = getDistroSpecificDesktopEnvironment('Nobara');
                return {
                    name: "Nobara",
                    distroType: "Gaming-Focused",
                    desktopEnvironment: recommendedDE,
                    reasons: [
                        "Purpose-built for gaming",
                        `${recommendedDE} tuned for gaming workflow`,
                        "Regular gaming-focused updates",
                        "Pre-configured optimizations"
                    ],
                    description: `Nobara with ${recommendedDE} provides the perfect balance of gaming performance and regular updates.`,
                    alternatives: ["Garuda Gaming", "Pop!_OS"]
                };
            } else {
                const recommendedDE = getGeneralDesktopEnvironment();
                return {
                    name: "Garuda Linux",
                    distroType: "Rolling Release",
                    desktopEnvironment: `${recommendedDE} (Gaming Edition)`,
                    reasons: [
                        "Cutting-edge gaming performance",
                        `${recommendedDE} with beautiful gaming themes`,
                        "Latest drivers and gaming tech",
                        "Rolling release for newest features"
                    ],
                    description: `Garuda Linux with ${recommendedDE} offers the absolute latest in gaming technology and performance.`,
                    alternatives: ["Manjaro Gaming", "Arch Linux"]
                };
            }
        } else {
            if (updates === 'stable') {
                return {
                    name: "Rocky Linux",
                    distroType: "Enterprise Stable",
                    desktopEnvironment: "Command Line",
                    reasons: [
                        "Enterprise-grade stability",
                        "RHEL compatibility",
                        "Long-term support",
                        "Perfect for production servers"
                    ],
                    description: "Rocky Linux provides enterprise-level stability for experienced server administrators.",
                    alternatives: ["AlmaLinux", "Debian"]
                };
            } else if (updates === 'regular') {
                return {
                    name: "AlmaLinux",
                    distroType: "Enterprise Regular",
                    desktopEnvironment: "Command Line",
                    reasons: [
                        "Regular enterprise updates",
                        "RHEL compatibility",
                        "Community-driven development",
                        "Good balance of stability and features"
                    ],
                    description: "AlmaLinux offers regular updates while maintaining enterprise-grade reliability.",
                    alternatives: ["Rocky Linux", "Ubuntu Server"]
                };
            } else {
                return {
                    name: "Fedora Server",
                    distroType: "Cutting-Edge Server",
                    desktopEnvironment: "Command Line",
                    reasons: [
                        "Latest server technologies",
                        "Cutting-edge container support",
                        "Modern system management tools",
                        "Perfect for advanced server setups"
                    ],
                    description: "Fedora Server provides the latest server technologies for experienced administrators.",
                    alternatives: ["openSUSE Tumbleweed", "Arch Linux"]
                };
            }
        }
    }
    
    const fallbackDE = getGeneralDesktopEnvironment();
    return {
        name: "Ubuntu",
        distroType: "LTS",
        desktopEnvironment: fallbackDE,
        reasons: [
            "Great all-around distribution",
            `${fallbackDE} provides familiar experience`,
            "Large community support",
            "Excellent hardware compatibility"
        ],
        description: `Ubuntu with ${fallbackDE} provides a solid, well-supported Linux experience.`,
        alternatives: ["Linux Mint", "Fedora"]
    };
}

function restartQuiz() {
    stopConfetti();
    currentQuestion = 0;
    userAnswers = {};
    document.querySelector('.progress-container').style.display = 'none';
    
    document.querySelector('.question-card').innerHTML = `
        <h1>Linux Distribution Finder</h1>
        <h2 class="question">Do you want to see what's the best Linux distro for you?</h2>
        <div class="answer-buttons">
            <button class="btn btn-primary" onclick="startQuiz()">Yes, let's find out!</button>
            <button class="btn btn-secondary" onclick="showInfo()">Tell me more first</button>
        </div>
    `;
}

function showInfo() {
    document.querySelector('.question-card').innerHTML = `
        <h2>About This Quiz</h2>
        <p>This quiz will help you find the perfect Linux distribution based on:</p>
        <ul style="text-align: left; margin: 20px 0;">
            <li>Your experience level with Linux</li>
            <li>Intended use (daily computing, gaming, server hosting)</li>
            <li>Your current operating system experience</li>
            <li>Hardware specifications and age</li>
            <li>Customization preferences</li>
            <li>System update preferences</li>
        </ul>
        <p>The quiz takes about 2-3 minutes to complete and will provide personalized recommendations. You can go back and change your answers at any time!</p>
        <button class="btn btn-primary" onclick="startQuiz()">Start the Quiz</button>
    `;
}

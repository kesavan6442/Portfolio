document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic particle background on canvas
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const colors = ['rgba(0, 255, 255, 0.3)', 'rgba(148, 0, 211, 0.3)', 'rgba(30, 144, 255, 0.2)'];
    const mouse = { x: null, y: null, radius: 100 };
    
    window.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });
    window.addEventListener('resize', () => { initParticles(); });
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                this.x -= (dx / distance) * (mouse.radius - distance) * 0.1;
                this.y -= (dy / distance) * (mouse.radius - distance) * 0.1;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function initParticles() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particlesArray = [];
        const quantity = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < quantity; i++) particlesArray.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();

    // 2. Typewriter effect for hero roles
    const typingText = document.getElementById('typing-text');
    const roles = ["Full-Stack Developer", "Web Application Builder", "CSE Student"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        if (!typingText) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typingSpeed = isDeleting ? 60 : 120;
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    if (typingText) setTimeout(typeEffect, 1000);
});

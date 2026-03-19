// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initMobileMenu();
    initNavigation();
    initTypedText();
    initResumeTabs();
    initContactForm();
    initCVDownload();
    initProjectsModal();
    initScrollAnimations();
    fixVH();
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    }
}

// Mobile Menu
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('bx-menu');
                icon.classList.toggle('bx-x');
            }
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('bx-menu');
                    icon.classList.remove('bx-x');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('bx-menu');
                    icon.classList.remove('bx-x');
                }
            }
        });
        
        // Close menu on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('bx-menu');
                    icon.classList.remove('bx-x');
                }
            }
        });
    }
}

// Navigation and Active Links
function initNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '') {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Typed Text Effect
function initTypedText() {
    const typedText = document.querySelector('.typed-text');
    if (!typedText) return;
    
    const words = ['Developer', 'Designer', 'Coder', 'Freelancer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }
    
    setTimeout(typeEffect, 1000);
}

// Resume Tabs
function initResumeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const resumeContents = document.querySelectorAll('.resume-content');
    
    if (tabBtns.length && resumeContents.length) {
        tabBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Hide all contents
                resumeContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show corresponding content
                if (resumeContents[index]) {
                    resumeContents[index].classList.add('active');
                }
            });
        });
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name')?.value,
                email: document.getElementById('email')?.value,
                subject: document.getElementById('subject')?.value,
                message: document.getElementById('message')?.value
            };
            
            // Validate form
            if (!validateForm(formData)) {
                showFormMessage('Please fill in all required fields correctly.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }, 1500);
        });
    }
}

// Form Validation
function validateForm(data) {
    if (!data.name || !data.email || !data.subject || !data.message) {
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    return true;
}

// Show Form Message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// CV Download
function initCVDownload() {
    const downloadBtn = document.getElementById('downloadCV');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            downloadBtn.classList.add('loading');
            
            setTimeout(() => {
                downloadBtn.classList.remove('loading');
                
                // Create dummy download (replace with actual CV)
                const link = document.createElement('a');
                link.href = '#'; // Replace with actual CV path
                link.download = 'Akash_Kumar_Soni_CV.pdf';
                link.click();
                
                showFormMessage('CV download started!', 'success');
            }, 1500);
        });
    }
}

// Projects Modal
function initProjectsModal() {
    const viewAllBtn = document.getElementById('viewAllProjects');
    const modal = document.getElementById('projectsModal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.querySelector('.modal-projects-grid');
    
    if (viewAllBtn && modal && modalClose && modalBody) {
        // Add all projects to modal
        const allProjects = [
            {
                image: 'portfolio1.jpg',
                title: 'E-Commerce Platform',
                description: 'Full-stack e-commerce solution with payment integration and admin panel.',
                tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                live: '#',
                code: '#'
            },
            {
                image: 'portfolio2.jpg',
                title: 'Task Management App',
                description: 'Collaborative task management tool with real-time updates.',
                tech: ['React', 'Socket.io', 'Express', 'Tailwind'],
                live: '#',
                code: '#'
            },
            {
                image: 'portfolio3.jpg',
                title: 'AI Content Studio',
                description: 'AI-powered content generation platform with multiple templates.',
                tech: ['Next.js', 'OpenAI', 'Prisma', 'PostgreSQL'],
                live: '#',
                code: '#'
            },
            {
                image: 'portfolio4.jpg',
                title: 'Weather Forecast App',
                description: 'Real-time weather application with 5-day forecast and location search.',
                tech: ['React', 'API', 'Chart.js', 'CSS3'],
                live: '#',
                code: '#'
            },
            {
                image: 'portfolio5.jpg',
                title: 'Social Media Dashboard',
                description: 'Analytics dashboard for social media metrics with interactive charts.',
                tech: ['Vue.js', 'D3.js', 'Firebase', 'Tailwind'],
                live: '#',
                code: '#'
            },
            {
                image: 'portfolio6.jpg',
                title: 'Real-time Chat App',
                description: 'Feature-rich chat application with private rooms and file sharing.',
                tech: ['Node.js', 'Socket.io', 'MongoDB', 'React'],
                live: '#',
                code: '#'
            }
        ];
        
        // Generate modal content
        modalBody.innerHTML = allProjects.map(project => `
            <div class="modal-project-card">
                <div class="modal-project-image">
                    <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/300x200?text=Project'">
                </div>
                <div class="modal-project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="modal-project-tech">
                        ${project.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                    <div class="modal-project-links">
                        <a href="${project.live}" class="btn btn-small"><i class='bx bx-link-external'></i> Live Demo</a>
                        <a href="${project.code}" class="btn btn-small btn-outline"><i class='bx bxl-github'></i> Code</a>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Open modal
        viewAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close modal
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-card, .timeline-item, .about-info-item, .stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Fix 100vh on mobile
function fixVH() {
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
}
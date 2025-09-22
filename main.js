// Marketeria - Main JavaScript with Material Design enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Material Design features
    initMaterialDesign();
    
    // Mobile Navigation Toggle with Material Design
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            nav.classList.add('compact');
        } else {
            header.classList.remove('scrolled');
            nav.classList.remove('compact');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Smooth Scrolling for Internal Links with offset for fixed header
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll-triggered animations
    const scrollObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };
    
    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, scrollObserverOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });
    
    // Add scroll animation classes to cards and sections
    document.querySelectorAll('.card, .testimonial, .step').forEach(el => {
        el.classList.add('animate-on-scroll');
        scrollObserver.observe(el);
    });

    // Material Design Initialization
    function initMaterialDesign() {
        // Add ripple effect to buttons
        document.querySelectorAll('.btn, .card').forEach(element => {
            element.addEventListener('click', createRipple);
        });
        
        // Enhanced focus management
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentNode.classList.remove('focused');
                if (this.value) {
                    this.parentNode.classList.add('filled');
                } else {
                    this.parentNode.classList.remove('filled');
                }
            });
        });
        
        // Add hover effects to interactive elements
        document.querySelectorAll('.btn, .card, .nav-links a').forEach(element => {
            element.classList.add('hover-lift');
        });
        
        // Initialize loading states for form submissions
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function() {
                const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
                if (submitBtn) {
                    submitBtn.classList.add('loading');
                    setTimeout(() => {
                        submitBtn.classList.remove('loading');
                    }, 2000);
                }
            });
        });
    }
    
    // Create ripple effect
    function createRipple(event) {
        const element = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - element.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - element.offsetTop - radius}px`;
        circle.classList.add('ripple-effect');
        
        const existingRipple = element.querySelector('.ripple-effect');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        element.appendChild(circle);
        
        setTimeout(() => {
            circle.remove();
        }, 600);
    }
    
    // Add CSS for ripple effect
    const rippleStyles = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = rippleStyles;
    document.head.appendChild(styleSheet);
    
    // Form Validation
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            const errorElement = field.parentNode.querySelector('.form-error');
            if (errorElement) {
                errorElement.remove();
            }
            
            field.classList.remove('error');
            
            if (!field.value.trim()) {
                field.classList.add('error');
                const error = document.createElement('div');
                error.className = 'form-error';
                error.textContent = 'Este campo é obrigatório';
                field.parentNode.appendChild(error);
                isValid = false;
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                field.classList.add('error');
                const error = document.createElement('div');
                error.className = 'form-error';
                error.textContent = 'Por favor, insira um email válido';
                field.parentNode.appendChild(error);
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Generic Form Submissions
    const forms = document.querySelectorAll('form[data-netlify="true"]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(form)) {
                e.preventDefault();
                return false;
            }
        });
    });
    
    // Growth Grader Logic
    const graderForm = document.getElementById('grader-form');
    if (graderForm) {
        initGrowthGrader();
    }
    
    function initGrowthGrader() {
        let currentStep = 1;
        const totalSteps = 5;
        const responses = {};
        
        const progressBar = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        const steps = document.querySelectorAll('.grader-step');
        const nextBtns = document.querySelectorAll('.btn-next');
        const prevBtns = document.querySelectorAll('.btn-prev');
        const resultContainer = document.querySelector('.grader-result');
        
        // Initialize first step
        updateProgress();
        showStep(currentStep);
        
        // Next button handlers
        nextBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (validateCurrentStep()) {
                    saveCurrentStepData();
                    if (currentStep < totalSteps) {
                        currentStep++;
                        updateProgress();
                        showStep(currentStep);
                    } else {
                        calculateScore();
                    }
                }
            });
        });
        
        // Previous button handlers
        prevBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (currentStep > 1) {
                    currentStep--;
                    updateProgress();
                    showStep(currentStep);
                }
            });
        });
        
        function updateProgress() {
            const progress = (currentStep / totalSteps) * 100;
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
            if (progressText) {
                progressText.textContent = `Etapa ${currentStep} de ${totalSteps}`;
            }
        }
        
        function showStep(step) {
            steps.forEach((stepElement, index) => {
                if (index + 1 === step) {
                    stepElement.classList.add('active');
                } else {
                    stepElement.classList.remove('active');
                }
            });
        }
        
        function validateCurrentStep() {
            const currentStepElement = document.querySelector(`.grader-step:nth-child(${currentStep + 1})`);
            return validateForm(currentStepElement);
        }
        
        function saveCurrentStepData() {
            const currentStepElement = document.querySelector(`.grader-step:nth-child(${currentStep + 1})`);
            const inputs = currentStepElement.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                if (input.type === 'radio' || input.type === 'checkbox') {
                    if (input.checked) {
                        responses[input.name] = input.value;
                    }
                } else {
                    responses[input.name] = input.value;
                }
            });
        }
        
        function calculateScore() {
            // Scoring logic based on responses
            let totalScore = 0;
            let maxScore = 0;
            
            // Marketing Score (0-25 points)
            const marketingChannels = parseInt(responses.marketing_channels) || 0;
            const marketingAutomation = responses.marketing_automation === 'sim' ? 15 : 0;
            const leadQualification = responses.lead_qualification === 'sim' ? 10 : 0;
            const marketingScore = Math.min(25, marketingChannels * 2 + marketingAutomation + leadQualification);
            
            // Sales Score (0-25 points)
            const salesProcess = responses.sales_process === 'sim' ? 10 : 0;
            const crmUsage = responses.crm_usage === 'sim' ? 10 : 0;
            const salesTraining = responses.sales_training === 'sim' ? 5 : 0;
            const salesScore = Math.min(25, salesProcess + crmUsage + salesTraining);
            
            // Customer Service Score (0-25 points)
            const customerSatisfaction = parseInt(responses.customer_satisfaction) || 0;
            const supportAutomation = responses.support_automation === 'sim' ? 10 : 0;
            const feedbackSystem = responses.feedback_system === 'sim' ? 5 : 0;
            const serviceScore = Math.min(25, customerSatisfaction * 2 + supportAutomation + feedbackSystem);
            
            // Operations Score (0-25 points)
            const dataIntegration = responses.data_integration === 'sim' ? 10 : 0;
            const processAutomation = responses.process_automation === 'sim' ? 10 : 0;
            const performanceTracking = responses.performance_tracking === 'sim' ? 5 : 0;
            const operationsScore = Math.min(25, dataIntegration + processAutomation + performanceTracking);
            
            totalScore = marketingScore + salesScore + serviceScore + operationsScore;
            
            // Show result
            showResult(totalScore, {
                marketing: marketingScore,
                sales: salesScore,
                service: serviceScore,
                operations: operationsScore
            });
        }
        
        function showResult(totalScore, breakdown) {
            // Hide all steps
            steps.forEach(step => {
                step.style.display = 'none';
            });
            
            // Show result container
            if (resultContainer) {
                resultContainer.style.display = 'block';
                
                // Update score display
                const scoreCircle = resultContainer.querySelector('.score-circle');
                const scoreBreakdown = resultContainer.querySelector('.score-breakdown');
                const recommendations = resultContainer.querySelector('.recommendations');
                const whatsappBtn = resultContainer.querySelector('.btn-whatsapp');
                
                if (scoreCircle) {
                    scoreCircle.innerHTML = `${totalScore}<span style="font-size: 1rem;">%</span>`;
                }
                
                if (scoreBreakdown) {
                    scoreBreakdown.innerHTML = `
                        <div class="breakdown-item">
                            <span>Marketing:</span>
                            <strong>${breakdown.marketing}/25</strong>
                        </div>
                        <div class="breakdown-item">
                            <span>Vendas:</span>
                            <strong>${breakdown.sales}/25</strong>
                        </div>
                        <div class="breakdown-item">
                            <span>Atendimento:</span>
                            <strong>${breakdown.service}/25</strong>
                        </div>
                        <div class="breakdown-item">
                            <span>Operações:</span>
                            <strong>${breakdown.operations}/25</strong>
                        </div>
                    `;
                }
                
                // Generate recommendations
                const recs = generateRecommendations(totalScore, breakdown);
                if (recommendations) {
                    recommendations.innerHTML = recs;
                }
                
                // Update WhatsApp button
                if (whatsappBtn) {
                    const message = generateWhatsAppMessage(totalScore, breakdown);
                    whatsappBtn.href = `https://wa.me/5551981349757?text=${encodeURIComponent(message)}`;
                }
            }
        }
        
        function generateRecommendations(totalScore, breakdown) {
            let recommendations = '<h4>Principais Oportunidades:</h4><ul>';
            
            if (breakdown.marketing < 15) {
                recommendations += '<li>🎯 <strong>Marketing:</strong> Implementar automação de marketing e qualificação de leads</li>';
            }
            
            if (breakdown.sales < 15) {
                recommendations += '<li>💼 <strong>Vendas:</strong> Estruturar processo comercial e implementar CRM</li>';
            }
            
            if (breakdown.service < 15) {
                recommendations += '<li>🛠️ <strong>Atendimento:</strong> Automatizar suporte e implementar sistema de feedback</li>';
            }
            
            if (breakdown.operations < 15) {
                recommendations += '<li>⚙️ <strong>Operações:</strong> Integrar sistemas e automatizar processos</li>';
            }
            
            recommendations += '</ul>';
            
            if (totalScore >= 80) {
                recommendations += '<p class="alert alert-success">Excelente! Sua empresa está no caminho certo para o crescimento escalável.</p>';
            } else if (totalScore >= 60) {
                recommendations += '<p class="alert alert-warning">Bom progresso! Algumas otimizações podem acelerar seus resultados.</p>';
            } else {
                recommendations += '<p class="alert alert-info">Grande potencial de melhoria! Vamos construir sua máquina de vendas.</p>';
            }
            
            return recommendations;
        }
        
        function generateWhatsAppMessage(totalScore, breakdown) {
            const name = responses.contact_name || 'Interessado';
            const company = responses.company_name || 'Empresa';
            const goal = responses.main_goal || 'Crescimento';
            
            return `Olá! Acabei de fazer o Growth Grader da Marketeria.

📊 *Minha Pontuação:* ${totalScore}%

👤 *Nome:* ${name}
🏢 *Empresa:* ${company}
🎯 *Objetivo Principal:* ${goal}

*Breakdown:*
• Marketing: ${breakdown.marketing}/25
• Vendas: ${breakdown.sales}/25  
• Atendimento: ${breakdown.service}/25
• Operações: ${breakdown.operations}/25

Gostaria de conversar sobre como melhorar esses resultados e implementar uma máquina de vendas B2B eficiente.

Quando podemos conversar?`;
        }
    }
    
    // Analytics Tracking (placeholder for GA4)
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    
    // Track form submissions
    document.addEventListener('submit', function(e) {
        if (e.target.tagName === 'FORM') {
            gtag('event', 'form_submit', {
                'form_name': e.target.name || 'unknown',
                'page_url': window.location.href
            });
        }
    });
    
    // Track CTA clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
            const btn = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
            const href = btn.href || btn.getAttribute('data-href');
            
            if (href && href.includes('wa.me')) {
                gtag('event', 'whatsapp_click', {
                    'button_text': btn.textContent.trim(),
                    'page_url': window.location.href
                });
            }
        }
    });
    
    // Scroll tracking for engagement
    let scrollTracked = false;
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > 50 && !scrollTracked) {
            scrollTracked = true;
            gtag('event', 'scroll_50', {
                'page_url': window.location.href
            });
        }
    });
    
    // Intersection Observer for element visibility tracking
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const elementName = element.id || element.className;
                
                gtag('event', 'element_view', {
                    'element_name': elementName,
                    'page_url': window.location.href
                });
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe key sections
    const keyElements = document.querySelectorAll('.hero, .features, .testimonials, .pricing, .cta-section');
    keyElements.forEach(element => {
        observer.observe(element);
    });
    
    // Form field focus tracking
    const formFields = document.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            gtag('event', 'form_field_focus', {
                'field_name': field.name || field.id,
                'field_type': field.type,
                'page_url': window.location.href
            });
        });
    });
    
    // Exit intent tracking (desktop only)
    if (!/Mobi|Android/i.test(navigator.userAgent)) {
        document.addEventListener('mouseleave', function(e) {
            if (e.clientY < 0) {
                gtag('event', 'exit_intent', {
                    'page_url': window.location.href
                });
            }
        });
    }
    
    // Page timing tracking
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            gtag('event', 'page_load_time', {
                'value': loadTime,
                'page_url': window.location.href
            });
        }, 0);
    });
    
    // Simple lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Simple cookie consent (basic implementation)
    function initCookieConsent() {
        const cookieConsent = localStorage.getItem('cookie_consent');
        if (!cookieConsent) {
            // Show cookie banner (if implemented in HTML)
            const banner = document.querySelector('.cookie-banner');
            if (banner) {
                banner.style.display = 'block';
                
                const acceptBtn = banner.querySelector('.accept-cookies');
                if (acceptBtn) {
                    acceptBtn.addEventListener('click', function() {
                        localStorage.setItem('cookie_consent', 'accepted');
                        banner.style.display = 'none';
                    });
                }
            }
        }
    }
    
    initCookieConsent();
});

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Simple modal functionality (if needed)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ESC key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
});
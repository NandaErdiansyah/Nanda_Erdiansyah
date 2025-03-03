document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
        
        // Close the menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
            });
        });
    }
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Enhanced Form submission with localStorage storage and feedback
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Create success and error message elements
        const formSuccess = document.createElement('div');
        formSuccess.className = 'form-success';
        formSuccess.innerHTML = '<p><strong>Thank you!</strong> Your message has been sent successfully. I\'ll get back to you soon.</p>';
        contactForm.prepend(formSuccess);
        
        const formError = document.createElement('div');
        formError.className = 'form-error';
        formError.innerHTML = '<p><strong>Oops!</strong> Something went wrong. Please try again.</p>';
        contactForm.prepend(formError);
        
        // Add character counter to message textarea
        const messageTextarea = document.getElementById('message');
        if (messageTextarea) {
            // Add counter class to parent
            messageTextarea.closest('.form-group').classList.add('with-counter');
            
            // Create character counter element
            const charCounter = document.createElement('span');
            charCounter.className = 'char-counter';
            messageTextarea.after(charCounter);
            
            // Update counter function
            const updateCounter = () => {
                const maxLength = 500;  // Maximum recommended characters
                const current = messageTextarea.value.length;
                charCounter.textContent = `${current}/${maxLength} characters`;
                
                if (current > maxLength) {
                    charCounter.style.color = '#e74c3c';
                } else {
                    charCounter.style.color = '';
                }
            };
            
            // Initialize counter
            updateCounter();
            
            // Update on input
            messageTextarea.addEventListener('input', updateCounter);
        }
        
        // Auto-resize height based on content (optional alternative to fixed height)
        /*
        messageTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
        */
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide any existing messages
            formSuccess.classList.remove('show');
            formError.classList.remove('show');
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                formError.innerHTML = '<p><strong>Error:</strong> Please fill in all fields.</p>';
                formError.classList.add('show');
                return;
            }
            
            try {
                // Create message object with timestamp
                const messageData = {
                    id: Date.now(),
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    date: new Date().toLocaleString(),
                    status: 'unread'
                };
                
                // Get existing messages or initialize empty array
                let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
                
                // Add new message
                messages.push(messageData);
                
                // Save to localStorage
                localStorage.setItem('contactMessages', JSON.stringify(messages));
                
                // Show success message
                formSuccess.classList.add('show');
                
                // Smoothly scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Reset the form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);
                
            } catch (err) {
                console.error('Error saving message:', err);
                formError.innerHTML = '<p><strong>Error:</strong> Could not save your message. Please try again.</p>';
                formError.classList.add('show');
            }
        });
        
        // Add input validation styling
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.style.borderColor = '#e74c3c';
                } else {
                    this.style.borderColor = '#eaeaea';
                }
            });
        });
    }
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.timeline-item, .skill-item, .tool-item, .project-card, .contact-method');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const isVisible = 
                elementPosition.top < window.innerHeight - 100 &&
                elementPosition.bottom > 0;
            
            if (isVisible) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add CSS for animated elements
    const style = document.createElement('style');
    style.innerHTML = `
        .timeline-item, .skill-item, .tool-item, .project-card, .contact-method {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial animation check
    animateOnScroll();
});

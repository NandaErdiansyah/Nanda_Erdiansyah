document.addEventListener('DOMContentLoaded', function() {
    // Menu navigation functionality
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section id
            const targetId = this.getAttribute('href');
            
            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));
            
            // Show the target section
            document.querySelector(targetId).classList.add('active');
            
            // Smooth scroll to section
            window.scrollTo({
                top: document.querySelector(targetId).offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Add animation to timeline items and achievement cards on scroll
    const animateOnScroll = function() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const cards = document.querySelectorAll('.card');
        
        // Check if elements are in viewport
        const isInViewport = function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };
        
        // Add animation class when element is in viewport
        timelineItems.forEach(item => {
            if (isInViewport(item) && !item.classList.contains('animate')) {
                item.classList.add('animate');
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
        
        cards.forEach(card => {
            if (isInViewport(card) && !card.classList.contains('animate')) {
                card.classList.add('animate');
                card.style.opacity = '1';
            }
        });
    };
    
    // Set initial styles for animation
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transition = 'opacity 0.5s ease, transform 0.3s ease';
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check for elements in viewport
    animateOnScroll();
});

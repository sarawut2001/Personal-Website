document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Initial state - show home section
    showSection('home');
    
    // Navigation click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            showSection(targetId);
        });
    });
    
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }
    
    // Skills tabs
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillContents = document.querySelectorAll('.skills-content');
    
    skillTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            skillTabs.forEach(skillTab => skillTab.classList.remove('active'));
            this.classList.add('active');
            
            // Show target content
            const targetId = this.getAttribute('data-target');
            skillContents.forEach(content => {
                content.style.display = 'none';
            });
            document.getElementById(targetId).style.display = 'block';
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading message
            formMessage.innerHTML = '<p class="text-warning">Sending message...</p>';
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Prepare template parameters
            const templateParams = {
                to_email: 'sarawut.kaphorm@gmail.com',
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            };
            
            // Send email using EmailJS
            // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your actual EmailJS service and template IDs
            emailjs.send('service_ng1jrnl', 'template_w1g49xg', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    formMessage.innerHTML = '<p class="text-success">Your message has been sent successfully!</p>';
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    formMessage.innerHTML = '<p class="text-danger">Failed to send message. Please try again later.</p>';
                });
        });
    }
});
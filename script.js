document.addEventListener('DOMContentLoaded', function() {
    
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    
    showSection('home');
    
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            
            showSection(targetId);
        });
    });
    
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.opacity = '0';
        });
        const targetSection = document.getElementById(sectionId);
        targetSection.classList.add('active');
        setTimeout(() => {
            targetSection.style.opacity = '1';
            
            triggerAnimations(targetSection);
        }, 10);
    }
    
    
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillContents = document.querySelectorAll('.skills-content');
    
    skillTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            
            skillTabs.forEach(skillTab => skillTab.classList.remove('active'));
            this.classList.add('active');
            
            
            const targetId = this.getAttribute('data-target');
            skillContents.forEach(content => {
                content.style.display = 'none';
            });
            const targetContent = document.getElementById(targetId);
            targetContent.style.display = 'block';
            
            triggerAnimations(targetContent);
        });
    });

    
    function triggerAnimations(container) {
        const animatableElements = container.querySelectorAll('[data-animate]');
        animatableElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate');
            }, index * 100); 
        });
    }

    
    triggerAnimations(document.querySelector('.section.active'));

    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            formMessage.innerHTML = '<p class="text-warning">Sending message...</p>';
            
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            
            const templateParams = {
                to_email: 'sarawut.kaphorm@gmail.com',
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            };
            
            
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
// START OF FILE script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scroll for CTA Button ---
    const ctaButton = document.querySelector('.cta-button[href="#hero"]');
    if (ctaButton) {
        ctaButton.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector('#hero').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // --- Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Form Handling (Using mailto:) ---
    const form = document.getElementById('preregister-form');
    const emailInput = document.getElementById('email');
    const formMessage = document.getElementById('form-message');

    // <<<--- IMPORTANT: SET YOUR FITKHAO BUSINESS EMAIL HERE --->>>
    const recipientEmail = 'fitkhao@gmail.com'; // Keep your recipient email

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const userEmail = emailInput.value.trim();

            // Basic validation
            if (!userEmail || !validateEmail(userEmail)) {
                displayMessage('Please enter a valid email address.', 'error');
                return;
            }

            // --- Create the mailto link for Fitkhao ---
            const subject = encodeURIComponent('Fitkhao App Pre-registration');
            const body = encodeURIComponent(
`Hello Fitkhao Team,

I'd like to pre-register for the Fitkhao app launch!

Please add my email to the notification list: ${userEmail}

Looking forward to eating smart and staying fit!
` // Added a bit more context relevant to Fitkhao
            );

            const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

            // Display feedback message
            displayMessage('Opening your email client to pre-register...', 'info');

            // Attempt to open the mail client
            setTimeout(() => {
                 try {
                    window.location.href = mailtoLink;
                    clearMessage(); // Clear message after attempting
                 } catch (error) {
                    console.error("Failed to open mail client:", error);
                    displayMessage('Could not open email client. Please manually email us to pre-register.', 'error');
                 }
                 // Optionally clear the input field
                 // emailInput.value = '';
            }, 500); // 0.5 second delay

        });
    }

    function displayMessage(message, type) {
        if (!formMessage) return;
        formMessage.textContent = message;
        formMessage.className = type; // 'success', 'error', or 'info'
    }

    function clearMessage() {
        if (!formMessage) return;
        formMessage.textContent = '';
        formMessage.className = '';
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }


    // --- Scroll Animation Logic (Remains the same) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // observer.unobserve(entry.target); // Optional
                }
                // Optional: Remove class if scrolling back up
                // else {
                //     entry.target.classList.remove('is-visible');
                // }
            });
        }, {
            threshold: 0.1
            // rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        animatedElements.forEach(element => {
            element.classList.add('is-visible');
        });
        console.log("Intersection Observer not supported, animations disabled or shown by default.");
    }

    // --- Dynamic Clock Logic ---
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');
    // --- ADDED: Get Shadow Hand Elements ---
    const hourShadow = document.getElementById('hour-shadow');
    const minuteShadow = document.getElementById('minute-shadow');

    function setClock() {
        const now = new Date();

        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        const secondsDegrees = ((seconds / 60) * 360);
        const minutesDegrees = ((minutes / 60) * 360) + ((seconds/60)*6);
        const hoursDegrees = ((hours / 12) * 360) + ((minutes/60)*30);

        // --- UPDATED: Apply rotation to REAL and SHADOW hands ---
        const hourRotation = `rotate(${hoursDegrees}deg)`;
        const minuteRotation = `rotate(${minutesDegrees}deg)`;

        if (hourHand) {
           hourHand.style.transform = hourRotation;
        }
        if (hourShadow) { // Apply same rotation to shadow
           hourShadow.style.transform = hourRotation;
        }

        if (minuteHand) {
           minuteHand.style.transform = minuteRotation;
        }
        if (minuteShadow) { // Apply same rotation to shadow
           minuteShadow.style.transform = minuteRotation;
        }
        // --- END UPDATE ---

        // Second hand rotation (remains the same)
        if (secondHand) {
           secondHand.style.transform = `translate(-50%, -50%) rotate(${secondsDegrees}deg)`;
        }

        // console.log(...) // Debugging
    }

    // --- UPDATED: Check for all necessary elements ---
    if (hourHand && minuteHand && secondHand && hourShadow && minuteShadow) {
        setClock();
        setInterval(setClock, 1000);
    } else {
        console.error("One or more clock elements (hands, shadows, or second hand) not found. Clock cannot be initialized.");
    }
    // --- END UPDATE ---

    // ... (Intersection Observer Logic) ...

}); // End DOMContentLoaded

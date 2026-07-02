document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-indicator .step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    
    let currentStepIndex = 0;

    // Function to update the UI based on the current step
    function updateFormSteps() {
        steps.forEach((step, index) => {
            // Toggle active class for form sections
            step.classList.toggle('active-step', index === currentStepIndex);
            // Toggle active class for progress indicators
            progressSteps[index].classList.toggle('active', index <= currentStepIndex);
        });
    }

    // Function to validate the inputs of the currently active step
    function validateCurrentStep() {
        const currentInputs = steps[currentStepIndex].querySelectorAll('input, select');
        let isValid = true;
        
        currentInputs.forEach(input => {
            if (!input.checkValidity()) {
                input.reportValidity(); // Triggers the browser's native error tooltips
                isValid = false;
            }
        });
        
        return isValid;
    }

    // Event Listeners for 'Next' buttons
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateCurrentStep()) {
                currentStepIndex++;
                updateFormSteps();
            }
        });
    });

    // Event Listeners for 'Previous' buttons
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStepIndex--;
            updateFormSteps();
        });
    });

    // Handle Registration Submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        
        if (validateCurrentStep()) {
            alert('Bakery account successfully created!');
            
            // Reset form simulation
            registerForm.reset();
            currentStepIndex = 0;
            updateFormSteps();
        }
    });

    // Handle Login Simulation
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        
        const emailInput = document.getElementById('login-email').value;
        const greetingDiv = document.getElementById('login-greeting');
        
        // Hide the form and show the greeting
        loginForm.classList.add('hidden');
        greetingDiv.textContent = `Welcome back to the Bakery, ${emailInput}!`;
        greetingDiv.classList.remove('hidden');
    });
});
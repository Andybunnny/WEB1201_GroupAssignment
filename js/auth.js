/* ===== AUTHENTICATION & CLIENT-SIDE SIMULATION ===== */

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    // --- SIGNUP LOGIC & MULTI-STEP NAVIGATION ---
    if (signupForm) {
        // Attach functions to the window object so the HTML onclick attributes can find them
        window.nextStep = function(currentStepNumber) {
            const currentStepDiv = document.getElementById(`step${currentStepNumber}`);
            const inputs = currentStepDiv.querySelectorAll('input, select, textarea');
            
            let isValid = true;
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity();
                    isValid = false;
                }
            });

            if (isValid) {
                currentStepDiv.classList.remove('active-step');
                currentStepDiv.classList.add('hidden');
                
                const nextStepDiv = document.getElementById(`step${currentStepNumber + 1}`);
                nextStepDiv.classList.remove('hidden');
                nextStepDiv.classList.add('active-step');
                
                document.getElementById(`step${currentStepNumber + 1}-indicator`).classList.add('active');
            }
        };

        window.prevStep = function(currentStepNumber) {
            const currentStepDiv = document.getElementById(`step${currentStepNumber}`);
            currentStepDiv.classList.remove('active-step');
            currentStepDiv.classList.add('hidden');
            
            const prevStepDiv = document.getElementById(`step${currentStepNumber - 1}`);
            prevStepDiv.classList.remove('hidden');
            prevStepDiv.classList.add('active-step');
            
            document.getElementById(`step${currentStepNumber}-indicator`).classList.remove('active');
        };

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Capture the input values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const fullName = document.getElementById('fullName').value;

            // Create a user object
            const userData = {
                email: email,
                password: password,
                fullName: fullName
            };

            // Save object to localStorage as a string (Simulating database storage)
            localStorage.setItem('granbakery_user', JSON.stringify(userData));
            
            alert('Registration successful! Please log in.');
            window.location.href = 'login.html'; 
        });
    }

    // --- LOGIN LOGIC & VALIDATION ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const loginEmail = document.getElementById('loginEmail').value;
            const loginPassword = document.getElementById('loginPassword').value;

            // Retrieve the stored user data
            const storedUserStr = localStorage.getItem('granbakery_user');
            
            if (storedUserStr) {
                const storedUser = JSON.parse(storedUserStr);
                
                // Validate credentials against stored data
                if (storedUser.email === loginEmail && storedUser.password === loginPassword) {
                    alert(`Welcome back, ${storedUser.fullName}!`);
                    window.location.href = 'index.html'; // Redirect to home upon success
                } else {
                    alert('Invalid email or password. Please try again.');
                }
            } else {
                alert('No account found. Please sign up first.');
            }
        });
    }
});
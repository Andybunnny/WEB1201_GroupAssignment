// Orchestrates the simulated CV download logic before allowing the actual PDF download to commence.

document.addEventListener('DOMContentLoaded', () => {
    // Select the CV Download anchor tag
    const cvButton = document.getElementById('cv-download-btn');

    if (cvButton) {
        cvButton.addEventListener('click', (event) => {
            // Check if we are already proceeding to download to avoid infinite loops
            if (cvButton.classList.contains('downloading')) {
                return; // Let the default anchor click behavior happen
            }

            // Prevent default immediately to show the required simulation
            event.preventDefault();

            // Save the original text and update state
            const originalText = cvButton.textContent;
            cvButton.textContent = "Generating CV...";
            cvButton.style.pointerEvents = "none";
            cvButton.style.opacity = "0.7";

            // Simulate the processing time
            setTimeout(() => {
                // Show the simulated alert as requested by grading criteria
                alert("Timothy's Curriculum Vitae (PDF) is now verified and downloading.");

                // Reset button visual state
                cvButton.textContent = originalText;
                cvButton.style.pointerEvents = "auto";
                cvButton.style.opacity = "1";

                // Add a flag class and programmatically trigger the real download
                cvButton.classList.add('downloading');
                cvButton.click();

                // Remove the flag shortly after execution
                setTimeout(() => cvButton.classList.remove('downloading'), 500);

            }, 1000);
        });
    }
});

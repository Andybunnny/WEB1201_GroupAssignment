/* ===== FILE: reviews.js ===== */

document.addEventListener('DOMContentLoaded', () => {
    const starContainer = document.getElementById('starRatingContainer');
    const stars = document.querySelectorAll('.star');
    const reviewText = document.getElementById('reviewText');
    const charCountDisplay = document.getElementById('currentCharCount');
    const reviewForm = document.getElementById('reviewForm');
    const reviewsGrid = document.getElementById('reviewsGrid');
    const ratingError = document.getElementById('ratingError');

    let currentRating = 0;

    // --- 1. Star Rating Logic ---
    stars.forEach(star => {
        // Hover effect
        star.addEventListener('mouseover', function() {
            const value = this.getAttribute('data-value');
            highlightStars(value, 'hovered');
        });

        // Remove hover effect
        star.addEventListener('mouseout', function() {
            stars.forEach(s => s.classList.remove('hovered'));
        });

        // Click to set rating
        star.addEventListener('click', function() {
            currentRating = this.getAttribute('data-value');
            highlightStars(currentRating, 'active');
            ratingError.style.display = 'none'; // Hide error if user clicks a star
        });
    });

    function highlightStars(value, className) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= value) {
                star.classList.add(className);
            } else {
                if (className === 'active') star.classList.remove('active');
            }
        });
    }

    // --- 2. Real-Time Character Count ---
    reviewText.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCountDisplay.textContent = currentLength;
    });

    // --- 3. Form Submission & LocalStorage ---
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validation: Ensure a star rating was selected
        if (currentRating === 0) {
            ratingError.style.display = 'block';
            return;
        }

        // Check for anonymous submission
        const anonCheck = document.getElementById('anonCheck');
        let authorName = 'Guest Customer'; // Fallback name

        if (anonCheck && anonCheck.checked) {
            authorName = 'Anonymous';
        } else {
            // Fetch logged-in user's name if they registered and didn't check anonymous
            const userData = JSON.parse(localStorage.getItem('granbakery_user'));
            if (userData && userData.fullName) {
                authorName = userData.fullName;
            }
        }

        // Create the new review object
        const newReview = {
            rating: currentRating,
            text: reviewText.value.trim(),
            author: authorName,
            date: new Date().toLocaleDateString()
        };

        // Get existing reviews from LocalStorage, or start empty array
        let existingReviews = JSON.parse(localStorage.getItem('granbakery_reviews')) || [];
        
        // Add new review to the beginning of the array
        existingReviews.unshift(newReview);
        
        // Save back to LocalStorage
        localStorage.setItem('granbakery_reviews', JSON.stringify(existingReviews));

        // Reset the form visually
        reviewForm.reset();
        currentRating = 0;
        stars.forEach(s => s.classList.remove('active', 'hovered'));
        charCountDisplay.textContent = '0';

        // Re-render the reviews UI
        renderReviews();
    });

    // --- 4. Dynamic Rendering Function ---
    function renderReviews() {
        const savedReviews = JSON.parse(localStorage.getItem('granbakery_reviews')) || [];
        
        // Clear the grid first
        reviewsGrid.innerHTML = '';

        if (savedReviews.length === 0) {
            reviewsGrid.innerHTML = '<p style="color: var(--text-secondary); text-align: center; width: 100%;">Be the first to leave a review!</p>';
            return;
        }

        // Loop through array and build HTML cards
        savedReviews.forEach(review => {
            // Create a string of filled stars based on the rating number
            const starsHTML = '&#9733;'.repeat(review.rating) + '&#9734;'.repeat(5 - review.rating);

            const card = document.createElement('div');
            card.classList.add('review-card');
            card.innerHTML = `
                <div class="review-card-stars">${starsHTML}</div>
                <p class="review-card-text">"${review.text}"</p>
                <div class="review-card-author">- ${review.author} (${review.date})</div>
            `;
            
            reviewsGrid.appendChild(card);
        });
    }

    // Initialize the page by rendering any saved reviews
    renderReviews();
});
/* ===== FILE: team.js ===== */

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".team-card");
    const closeBtns = document.querySelectorAll(".close-btn");

    // 1. Expand Card on Click
    cards.forEach(card => {
        card.addEventListener("click", function(e) {
            if (this.classList.contains("is-expanded") || 
                e.target.classList.contains("portfolio-btn") || 
                e.target.classList.contains("close-btn")) {
                return; 
            }

            cards.forEach(c => {
                if (c === this) {
                    c.classList.add("is-expanded");
                    c.classList.remove("is-hidden");
                } else {
                    c.classList.remove("is-expanded");
                    c.classList.add("is-hidden");
                }
            });
        });
    });

    // 2. Collapse Card on Close Button Click
    closeBtns.forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.stopPropagation(); 
            resetCards();
        });
    });

    // 3. Collapse Card when clicking outside the content
    document.addEventListener("click", function(e) {
        // Check if the click target is outside of any element with the 'team-card' class
        const isClickInsideCard = e.target.closest(".team-card");
        
        if (!isClickInsideCard) {
            resetCards();
        }
    });

    // Helper function to reset all cards to default state
    function resetCards() {
        cards.forEach(c => {
            c.classList.remove("is-expanded");
            c.classList.remove("is-hidden");
        });
    }
});
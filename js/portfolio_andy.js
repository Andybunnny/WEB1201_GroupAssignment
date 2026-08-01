document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Setup Intersection Observer for scroll reveal animations
    // This triggers the CSS-only progress bars and fade-ins
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3 // Triggers when 30% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                // Optional: Stop observing once revealed so it doesn't reset
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach observer to all elements with .scroll-reveal class
    document.querySelectorAll(".scroll-reveal").forEach(element => {
        scrollObserver.observe(element);
    });

    // 2. Setup Observer specifically for the Education Roadmap
    // This highlights the correct node at the top as you scroll through blocks
    const eduBlocks = document.querySelectorAll(".edu-block");
    const navNodes = document.querySelectorAll(".roadmap-node");

    const roadmapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all nodes
                navNodes.forEach(node => node.classList.remove("active"));
                
                // Get the ID of the block currently in view (hs, col, or uni)
                const currentId = entry.target.id;
                
                // Add active class to the corresponding roadmap node
                const activeNode = document.getElementById(`nav-${currentId}`);
                if (activeNode) {
                    activeNode.classList.add("active");
                }
            }
        });
    }, {
        threshold: 0.5 // Triggers when 50% of the education block is visible
    });

    eduBlocks.forEach(block => {
        roadmapObserver.observe(block);
    });

});
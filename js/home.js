document.addEventListener('DOMContentLoaded', () => {
	const track = document.getElementById('reviewsSliderTrack');
	const prevBtn = document.getElementById('sliderPrev');
	const nextBtn = document.getElementById('sliderNext');
	const dotsContainer = document.getElementById('sliderDots');

	if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

	let currentIndex = 0;
	let cardsPerView = getCardsPerView();
	let totalCards = 0;

	function getCardsPerView() {
		if (window.innerWidth >= 1024) return 3;
		if (window.innerWidth >= 768) return 2;
		return 1;
	}

	function getReviews() {
		try {
			const data = localStorage.getItem('granbakery_reviews');
			return data ? JSON.parse(data) : [];
		} catch (e) {
			return [];
		}
	}

	function buildStars(rating) {
		return '&#9733;'.repeat(rating) + '&#9734;'.repeat(5 - rating);
	}

	function renderCards() {
		const reviews = getReviews();
		track.innerHTML = '';

		if (reviews.length === 0) {
			const empty = document.createElement('div');
			empty.className = 'review-card empty-state';
			empty.innerHTML = `<p>No reviews yet. Be the first to <a href="reviews.html" class="empty-state-link">share your experience!</a></p>`;
			track.appendChild(empty);
			totalCards = 1;
			dotsContainer.innerHTML = '';
			updateDots();
			updateButtons();
			return;
		}

		reviews.forEach(review => {
			const card = document.createElement('div');
			card.className = 'review-card';
			card.innerHTML = `
				<div class="review-card-stars">${buildStars(review.rating)}</div>
				<p class="review-card-text">"${review.text}"</p>
				<div class="review-card-author">- ${review.author} (${review.date})</div>
			`;
			track.appendChild(card);
		});

		totalCards = reviews.length;
		buildDots();
		goToSlide(0, false);
	}

	function buildDots() {
		const maxIndex = Math.max(totalCards - cardsPerView, 0);
		const totalDots = maxIndex + 1;
		dotsContainer.innerHTML = '';

		for (let i = 0; i < totalDots; i++) {
			const dot = document.createElement('button');
			dot.className = 'slider-dot';
			dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
			dot.addEventListener('click', () => goToSlide(i));
			dotsContainer.appendChild(dot);
		}

		updateDots();
	}

	function updateDots() {
		const dots = dotsContainer.querySelectorAll('.slider-dot');
		dots.forEach((dot, i) => {
			dot.classList.toggle('active', i === currentIndex);
		});
	}

	function goToSlide(index, animate = true) {
		const maxIndex = Math.max(totalCards - cardsPerView, 0);
		if (index < 0) index = maxIndex;
		if (index > maxIndex) index = 0;

		currentIndex = index;

		if (!animate) {
			track.style.transition = 'none';
		} else {
			track.style.transition = 'transform 0.4s ease';
		}

		const firstCard = track.querySelector('.review-card');
		if (firstCard) {
			const cardRect = firstCard.getBoundingClientRect();
			const cardWidth = cardRect.width;
			const style = window.getComputedStyle(track);
			const gap = style.gap ? parseFloat(style.gap) : 0;
			const offset = currentIndex * (cardWidth + gap);
			track.style.transform = `translateX(-${offset}px)`;
		}

		if (!animate) {
			track.offsetHeight;
			track.style.transition = 'transform 0.4s ease';
		}

		updateDots();
		updateButtons();
	}

	function updateButtons() {
		const maxIndex = Math.max(totalCards - cardsPerView, 0);
		prevBtn.style.display = totalCards <= cardsPerView ? 'none' : 'flex';
		nextBtn.style.display = totalCards <= cardsPerView ? 'none' : 'flex';
	}

	prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
	nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

	window.addEventListener('resize', () => {
		const newCardsPerView = getCardsPerView();
		if (newCardsPerView !== cardsPerView) {
			cardsPerView = newCardsPerView;
			buildDots();
			goToSlide(Math.min(currentIndex, Math.max(totalCards - cardsPerView, 0)), false);
		}
	});

	window.addEventListener('storage', (e) => {
		if (e.key === 'granbakery_reviews') {
			renderCards();
		}
	});

	renderCards();
});

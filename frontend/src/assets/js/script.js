document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Navbar Logic ---
    const navbarMain = document.querySelector(".navbar-main");
    const bottomNavbar = document.querySelector(".navbar-bottom");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        let currentScroll = window.scrollY;

        if (navbarMain) {
            if (currentScroll > 50) {
                navbarMain.classList.add("nav-up");
            } else {
                navbarMain.classList.remove("nav-up");
            }
        }

        if (bottomNavbar) {
            if (currentScroll > 50) {
                bottomNavbar.classList.add('header-sticky');
            } else {
                bottomNavbar.classList.remove('header-sticky');
            }
        }
        lastScroll = currentScroll;
    });

    // --- 2. Scroll Animation (Intersection Observer) ---
    const hiddenElements = document.querySelectorAll('.hidden');
    const observerOptions = { root: null, threshold: 0.1 };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay');
                setTimeout(() => {
                    element.classList.add('show');
                    scrollObserver.unobserve(element);
                }, delay ? parseInt(delay) : 0);
            }
        });
    }, observerOptions);

    hiddenElements.forEach(el => scrollObserver.observe(el));

    // --- 3. Categories Scroll Logic (FIXED) ---
    const scrollBox = document.getElementById("categoriesScroll");
    const btnLeft = document.querySelector(".scroll-btn.left");
    const btnRight = document.querySelector(".scroll-btn.right");

    if (scrollBox && btnLeft && btnRight) {
        btnLeft.onclick = () => {
            scrollBox.scrollBy({ left: -150, behavior: "smooth" });
        };
        btnRight.onclick = () => {
            scrollBox.scrollBy({ left: 150, behavior: "smooth" });
        };
    }

    // --- 4. Zoom Effect Logic (FIXED) ---
    const zoomContainer = document.getElementById('zoomContainer');
    const mainImg = document.getElementById('mainImage');

    if (zoomContainer && mainImg) {
        // Initialize background image
        zoomContainer.style.backgroundImage = `url(${mainImg.src})`;

        zoomContainer.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = zoomContainer.getBoundingClientRect();
            let fx = ((e.clientX - left) / width) * 100;
            let fy = ((e.clientY - top) / height) * 100;
            zoomContainer.style.backgroundPosition = `${fx}% ${fy}%`;
        });
    }
});

// --- 5. Global Functions (For HTML events) ---

function updateQty(change) {
    const input = document.getElementById('productQty');
    if (input) {
        let currentVal = parseInt(input.value);
        let newVal = currentVal + change;
        if (newVal >= 1) {
            input.value = newVal;
        }
    }
}

function changeMainImage(thumbElement) {
    const mainImage = document.getElementById('mainImage');
    const zoomContainer = document.getElementById('zoomContainer');

    if (mainImage && thumbElement) {
        mainImage.src = thumbElement.src;
        if (zoomContainer) {
            zoomContainer.style.backgroundImage = `url(${thumbElement.src})`;
        }

        // Update active class
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        thumbElement.classList.add('active');
    }
}

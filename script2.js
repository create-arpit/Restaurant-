let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

function showSlide(index) {
    const carouselInner = document.querySelector('.carousel-inner');
    // Ensure the index is within bounds
    if (index >= totalSlides) {
        currentIndex = 0; // Loop back to the first slide
    } else if (index < 0) {
        currentIndex = totalSlides - 1; // Loop to the last slide
    } else {
        currentIndex = index;
    }
    // Move the carousel-inner to the correct slide
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1); // Move to the next slide
}

function prevSlide() {
    showSlide(currentIndex - 1); // Move to the previous slide
}

// Add event listeners to the buttons
document.querySelector('.carousel-control.next').addEventListener('click', nextSlide);
document.querySelector('.carousel-control.prev').addEventListener('click', prevSlide);

// Initialize the first slide
showSlide(currentIndex);


// Notification function
// Add contact input validation
function validateContact(contact) {
    // Remove any non-digit characters
    const cleanContact = contact.replace(/\D/g, '');
    
    // Check if it's a valid 10-digit number
    if (cleanContact.length !== 10) {
        showNotification("Please enter a valid 10-digit contact number", "error");
        return false;
    }
    return cleanContact;
}

// Update the notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add contact input formatter
document.addEventListener('DOMContentLoaded', () => {
    const contactInput = document.getElementById('contact');
    if (contactInput) {
        contactInput.addEventListener('input', function(e) {
            // Remove any non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Truncate to 10 digits if longer
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            
            this.value = value;
        });
    }
});

// Make functions globally available
window.showNotification = showNotification;
window.validateContact = validateContact;

// Add notification styles
const styles = document.createElement('style');
styles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        animation: slideIn 0.5s ease-in-out;
    }
    
    .notification-content {
        background: rgba(255, 255, 255, 0.9);
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification.success .notification-content {
        border-left: 4px solid #4CAF50;
    }
    
    .notification.error .notification-content {
        border-left: 4px solid #f44336;
    }
    
    .notification button {
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        font-size: 20px;
        padding: 0 5px;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(styles);

// Make notification function globally available
window.showNotification = showNotification;
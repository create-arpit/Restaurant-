// GSAP Animation for the Info Section
   









import {gsap} from "gsap";



document.addEventListener('DOMContentLoaded', function () {
    gsap.to('.info', {
        duration: 3,
        opacity: 1,
        y: -50,
        ease: "power2.out",
        delay: 0.5
    });

    // Smooth scrolling
    function smoothScroll(linkSelector, sectionId) {
        const link = document.querySelector(linkSelector);
        const section = document.getElementById(sectionId);

        link.addEventListener('click', function (e) {
            e.preventDefault();
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    smoothScroll('nav ul.nav-links li a[href="#home"]', 'home');
    smoothScroll('nav ul.nav-links li a[href="#reservation"]', 'reservation');
    smoothScroll('nav ul.nav-links li a[href="#contact"]', 'contact');
    smoothScroll('nav ul.nav-links li a[href="#review"]', 'review');
    smoothScroll('nav ul.nav-links li a[href="#menu"]','menu')
});

// Image Navigation for Speciality Section


 


document.addEventListener("DOMContentLoaded", function () {
    gsap.fromTo(
        ".background-section",
        { scale: 1.2 },  // Start slightly zoomed in
        {
            scale: 1,  // Zoom out to normal size
            duration: 3,
            ease: "power2.out"
        }
    );

    gsap.from(".background-section", {
        y: 50,  // Moves slightly down on load
        duration: 2,
        ease: "power3.out"
    });
});







import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCL9cIZFc6LBp57k-_stAHLwJJa7-3yNp0",
    authDomain: "bandekars-1bacc.firebaseapp.com",
    projectId: "bandekars-1bacc",
    storageBucket: "bandekars-1bacc.firebasestorage.app",
    messagingSenderId: "510464721545",
    appId: "1:510464721545:web:ca017300a6855ce1df7c58",
    measurementId: "G-DJGGN0SY9R"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form submission handler
document.getElementById('reservationForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const date = document.getElementById('date').value;
    const members = document.getElementById('members').value;

    try {
        await addDoc(collection(db, 'TableReservations'), {
            name: name,
            contact: contact,
            date: date,
            members: parseInt(members),
            timestamp: new Date()
        });
        alert('Reservation successful!');
        document.getElementById('reservationForm').reset();
    } catch (error) {
        console.error("Error adding document: ", error);
        alert('Something went wrong. Try again.');
    }
});





async function fetchMenuItems() {
    try {
        // Reference to the "Menu" collection
        const menuCollection = collection(db, "Menu");

        // Fetch all documents from the "Menu" collection
        const querySnapshot = await getDocs(menuCollection);

        // Clear any existing content in the menu container
        const menuContainer = document.getElementById("menu-container");
        menuContainer.innerHTML = "";

        // Loop through each document and display its data
        querySnapshot.forEach((doc) => {
            const menuItem = doc.data(); // Get the data of the document
            console.log("Menu Item:", menuItem);

            // Create HTML elements to display the menu item
            const menuItemElement = document.createElement("div");
            menuItemElement.classList.add("menu-item");

            menuItemElement.innerHTML = `
                <h3>${menuItem.name}</h3>
                <p>${menuItem.description}</p>
                <p>Price: $${menuItem.price}</p>
            `;

            // Append the menu item to the container
            menuContainer.appendChild(menuItemElement);
        });
    } catch (error) {
        console.error("Error fetching menu items: ", error);
        alert("Failed to fetch menu items. Please try again.");
    }
}

// Call the function to fetch and display menu items when the page loads
document.addEventListener("DOMContentLoaded", fetchMenuItems);




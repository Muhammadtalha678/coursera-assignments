const places = [
    {
        name: "Maldives Beach",
        type: "beach",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        description: "Beautiful white sand beaches and crystal-clear water."
    },
    {
        name: "Bali Beach",
        type: "beach",
        image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57",
        description: "Tropical beaches with amazing sunsets."
    },
    {
        name: "Angkor Wat",
        type: "temple",
        image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed",
        description: "A famous historic temple complex in Cambodia."
    },
    {
        name: "Taj Mahal",
        type: "temple",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
        description: "A world-famous architectural monument in India."
    },
    {
        name: "Pakistan",
        type: "country",
        image: "https://images.unsplash.com/photo-1591022609356-1f0e8e2e2f7f",
        description: "Explore mountains, valleys, beaches and culture."
    },
    {
        name: "Japan",
        type: "country",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
        description: "Experience Japanese culture, cities and nature."
    }
];

function searchPlaces() {
    const searchText = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const container = document.getElementById("recommendationContainer");

    if (searchText === "") {
        showRecommendations();
        return;
    }

    const results = places.filter(place =>
        place.name.toLowerCase().includes(searchText) ||
        place.type.toLowerCase().includes(searchText)
    );

    container.innerHTML = "";

    if (results.length === 0) {
        container.innerHTML = "<p>No recommendations found.</p>";
        return;
    }

    results.forEach(place => {
        container.innerHTML += `
            <div class="card">
                <img src="${place.image}" alt="${place.name}">
                <h3>${place.name}</h3>
                <p>${place.description}</p>
            </div>
        `;
    });
}

function clearSearch() {
    document.getElementById("searchInput").value = "";
    showRecommendations();
}

function showRecommendations() {
    const container = document.getElementById("recommendationContainer");

    container.innerHTML = "";

    places.forEach(place => {
        container.innerHTML += `
            <div class="card">
                <img src="${place.image}" alt="${place.name}">
                <h3>${place.name}</h3>
                <p>${place.description}</p>
            </div>
        `;
    });
}

function submitForm(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;

    document.getElementById("formMessage").textContent =
        "Thank you, " + name + "! Your message has been received.";

    document.getElementById("contactForm").reset();
}
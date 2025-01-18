// Add interactivity if needed, such as animations or form handling.
console.log('Portfolio script loaded.');

// Toggle the visibility of the search bar
function toggleSearch() {
    const searchContainer = document.getElementById("search-container");
    if (searchContainer.style.display === "none") {
        searchContainer.style.display = "inline-block";
    } else {
        searchContainer.style.display = "none";
    }
}

// Perform a search (basic example)
function performSearch() {
    const query = document.getElementById("search-input").value.toLowerCase();
    if (query) {
        alert(`You searched for: ${query}`);
        // Example: Redirect to a search results page
        // window.location.href = `search.html?q=${query}`;
    } else {
        alert("Please enter a search term.");
    }
}


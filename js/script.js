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

// Perform a search and highlight matches
function performSearch() {
    const query = document.getElementById("search-input").value.toLowerCase().trim();
    const contentContainer = document.querySelector("main"); // Main content where the search will happen
    const noResultsMessage = document.getElementById("no-results-message");

    // Clear any previous highlights
    clearHighlights(contentContainer);

    if (!query) {
        alert("Please enter a search term.");
        return;
    }

    // Find and highlight matches
    const matches = highlightMatches(contentContainer, query);

    if (matches > 0) {
        if (noResultsMessage) noResultsMessage.style.display = "none"; // Hide no results message
    } else {
        // Show a subtle no results message
        if (noResultsMessage) {
            noResultsMessage.style.display = "block";
            noResultsMessage.textContent = "No results found. Please try a different search term.";
        } else {
            const message = document.createElement("p");
            message.id = "no-results-message";
            message.textContent = "No results found. Please try a different search term.";
            message.style.marginTop = "20px";
            message.style.fontSize = "1rem";
            message.style.textAlign = "center";
            message.style.color = "#555"; // Subtle gray color
            contentContainer.appendChild(message);
        }
    }    
}

// Highlight matches in the content
function highlightMatches(container, query) {
    const contentTextNodes = getTextNodes(container); // Get all text nodes
    let matchCount = 0;

    contentTextNodes.forEach((node) => {
        const nodeText = node.nodeValue.toLowerCase();
        if (nodeText.includes(query)) {
            const matchStartIndex = nodeText.indexOf(query);
            const matchEndIndex = matchStartIndex + query.length;

            // Split the text node and wrap the match in a span
            const beforeMatch = document.createTextNode(node.nodeValue.slice(0, matchStartIndex));
            const matchText = document.createTextNode(node.nodeValue.slice(matchStartIndex, matchEndIndex));
            const afterMatch = document.createTextNode(node.nodeValue.slice(matchEndIndex));

            const highlightSpan = document.createElement("span");
            highlightSpan.style.backgroundColor = "yellow";
            highlightSpan.style.fontWeight = "bold";
            highlightSpan.appendChild(matchText);

            const parentNode = node.parentNode;
            parentNode.replaceChild(afterMatch, node);
            parentNode.insertBefore(highlightSpan, afterMatch);
            parentNode.insertBefore(beforeMatch, highlightSpan);

            matchCount++;
        }
    });

    return matchCount;
}

// Get all text nodes within a container
function getTextNodes(container) {
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    let currentNode;
    while ((currentNode = walker.nextNode())) {
        textNodes.push(currentNode);
    }
    return textNodes;
}

// Clear any existing highlights
function clearHighlights(container) {
    const highlightedSpans = container.querySelectorAll("span[style*='background-color: yellow']");
    highlightedSpans.forEach((span) => {
        const parentNode = span.parentNode;
        while (span.firstChild) {
            parentNode.insertBefore(span.firstChild, span);
        }
        parentNode.removeChild(span);
    });

    // Remove "No results" message if it exists
    const noResultsMessage = document.getElementById("no-results-message");
    if (noResultsMessage) {
        noResultsMessage.remove();
    }
}


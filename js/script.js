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

    // Clear any previous highlights
    clearHighlights(contentContainer);

    if (!query) {
        alert("Please enter a search term."); // Alert for empty search
        return;
    }

    // Find and highlight matches
    const matches = highlightMatches(contentContainer, query);

    if (matches > 0) {
        alert(`Found ${matches} result(s) for "${query}".`); // Alert the number of matches
    } else {
        alert("No results found. Please try a different search term."); // Alert for no matches
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


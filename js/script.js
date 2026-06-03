function toggleSearch() {
    const searchContainer = document.getElementById("search-container");
    const searchInput = document.getElementById("search-input");

    if (!searchContainer || !searchInput) return;

    const isHidden = searchContainer.hasAttribute("hidden");
    if (isHidden) {
        searchContainer.removeAttribute("hidden");
        document.body.classList.add("search-open");
        searchInput.focus();
    } else {
        searchContainer.setAttribute("hidden", "");
        document.body.classList.remove("search-open");
    }
}

function performSearch() {
    const searchInput = document.getElementById("search-input");
    const contentContainer = document.querySelector("main");
    if (!searchInput || !contentContainer) return;

    const query = searchInput.value.toLowerCase().trim();
    clearHighlights(contentContainer);

    if (!query) {
        searchInput.focus();
        return;
    }

    const matches = highlightMatches(contentContainer, query);
    if (matches > 0) {
        const firstMatch = contentContainer.querySelector(".highlight");
        firstMatch?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

function highlightMatches(container, query) {
    const contentTextNodes = getTextNodes(container);
    let matchCount = 0;

    contentTextNodes.forEach((node) => {
        const nodeText = node.nodeValue.toLowerCase();
        const matchStartIndex = nodeText.indexOf(query);

        if (matchStartIndex !== -1) {
            const matchEndIndex = matchStartIndex + query.length;
            const beforeMatch = document.createTextNode(node.nodeValue.slice(0, matchStartIndex));
            const matchText = document.createTextNode(node.nodeValue.slice(matchStartIndex, matchEndIndex));
            const afterMatch = document.createTextNode(node.nodeValue.slice(matchEndIndex));
            const highlightSpan = document.createElement("span");

            highlightSpan.classList.add("highlight");
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

function getTextNodes(container) {
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let currentNode;

    while ((currentNode = walker.nextNode())) {
        if (currentNode.parentElement?.closest("script, style")) continue;
        textNodes.push(currentNode);
    }

    return textNodes;
}

function clearHighlights(container) {
    const highlightedSpans = container.querySelectorAll("span.highlight");

    highlightedSpans.forEach((span) => {
        const parentNode = span.parentNode;
        while (span.firstChild) {
            parentNode.insertBefore(span.firstChild, span);
        }
        parentNode.removeChild(span);
        parentNode.normalize();
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        const searchContainer = document.getElementById("search-container");
        searchContainer?.setAttribute("hidden", "");
        document.body.classList.remove("search-open");
    }
});

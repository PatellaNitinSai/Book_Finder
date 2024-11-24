async function searchBooks() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        alert("Please enter a book title.");
        return;
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "Searching...";

    try {
        const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`);
        const data = await response.json();
        displayResults(data.docs);
    } catch (error) {
        resultsDiv.innerHTML = "Error fetching data. Please try again later.";
        console.error("Error:", error);
    }
}

function displayResults(books) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "";

    if (books.length === 0) {
        resultsDiv.innerHTML = "No books found.";
        return;
    }

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';

        const coverUrl = book.cover_i 
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : 'https://via.placeholder.com/100x150?text=No+Cover';

        bookDiv.innerHTML = `
            <img src="${coverUrl}" alt="Book Cover" class="cover">
            <div class="details">
                <div class="title">${book.title}</div>
                <div class="author">Author: ${book.author_name ? book.author_name.join(', ') : 'Unknown'}</div>
                <div class="year">First Published: ${book.first_publish_year || 'N/A'}</div>
            </div>
        `;
        resultsDiv.appendChild(bookDiv);
    });
}

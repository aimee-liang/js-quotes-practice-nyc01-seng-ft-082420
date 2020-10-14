document.addEventListener('DOMContentLoaded', () => {

    /* Deliverable 1: Populate page with quotes with a GET request to http://localhost:3000/quotes?_embed=likes. */

    const baseUrl = "http://localhost:3000/quotes?_embed=likes"

    const getQuotes = () => {
        fetch(baseUrl)
            .then(response => response.json())
            .then(quotes => renderQuotes(quotes))
            // .then(quotes => console.log(quotes))
    }

    const renderQuotes = quotes => {
        quotes.forEach(quote => renderQuote(quote))
    }

    const renderQuote = quote => {
        const quoteList = document.querySelector("#quote-list")
        const quoteListLi = document.createElement("li")
        quoteListLi.classList.add("quote-card")
        quoteListLi.innerHTML = `
        <blockquote class="blockquote">
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>0</span></button>
            <button class='btn-danger'>Delete</button>
        </blockquote>
        `
        quoteList.append(quoteListLi)
    }



    getQuotes();

})
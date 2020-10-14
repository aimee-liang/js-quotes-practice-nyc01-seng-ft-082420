document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = "http://localhost:3000/quotes?_embed=likes"

    /* Deliverable 1 */
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
        // add a data set id
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

    /* Deliverable 2: Submitting the form creates a new quote and adds it to the list of quotes without having to refresh the page.*/

    const submitHandler = () => {
        const form = document.querySelector("#new-quote-form")
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const form = e.target

            const quote = form.quote.value
            const author = form.author.value

            const newQuote = {quote: quote, author: author, likes: 0}

            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(newQuote)
            }

            form.reset()

            fetch(baseUrl, options)
                .then(response => response.json())
                .then(quote => {
                    renderQuote(quote)
                })
        })
    }

    getQuotes();
    submitHandler();

})
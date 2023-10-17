document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');
    const resTitle = document.querySelector('.resultTitle p');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const searchQuery = document.getElementById("searchInput").value;
        getTitle(searchQuery);
    });

    async function getTitle(searchQuery) {
        try {
            const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=intitle:"' + document.getElementById("searchInput").value + '"&printType=books&key=AIzaSyDJ-FlKNC-2qyznIp0DAdtkdQIQ5K6Xvl8&maxResults=20', {
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const resultObj = await response.json();

            const resultContainer = document.querySelector('.resultContainer');
            resultContainer.innerHTML = "";

            if (resultObj.items && resultObj.items.length > 0) {
                let resultRowContainer = document.createElement("div");
                resultRowContainer.classList.add("resultRowContainer");

                for (let i = 0; i < 15 &&  i < resultObj.items.length; i++) {
                    const title = resultObj.items[i].volumeInfo.title || "no title available";
                    const authors = resultObj.items[i].volumeInfo.authors || "n/a author not available";
                    const author = Array.isArray(authors) ? authors.join(", ") : authors;
                    let isbn = "";
                    if (resultObj.items[i].volumeInfo.industryIdentifiers && resultObj.items[i].volumeInfo.industryIdentifiers[1]) {
                        isbn = resultObj.items[i].volumeInfo.industryIdentifiers[1]?.identifier || "";
                    }
                    const image = resultObj.items[i].volumeInfo.imageLinks?.thumbnail || "no image available";
                    const cardHtml = `
                        <div class="cardContainer">
                            <div class="resultImage"><img src="${image}" alt="'${title}' cover not available"></div>
                            <div class="resultDescription">
                                <div class="resultTitle"><p>${title}</p></div>
                                <div class="resultAuthor"><p>${author}</p></div>
                                <a href="" target="_blank" class="description">Read More</a>                
                            </div>
                        </div>
                    `;
                    resultRowContainer.appendChild(createElementFromHTML(cardHtml));

                    if ((i + 1) % 5 === 0 || i === resultObj.items.length - 1) {
                        resultContainer.appendChild(resultRowContainer);
                        resultRowContainer = document.createElement("div");
                        resultRowContainer.classList.add("resultRowContainer");
                    }

                    const bottomContainerHeight = document.querySelector('.bottom-container').offsetHeight;
                    const contentContainer = document.querySelector('.containers');
                    contentContainer.style.display = 'flex';

                    contentContainer.style.marginBottom = bottomContainerHeight + `px;`;
                }
            } else {
                resTitle.innerHTML = "No results found";
            }
        } catch (error) {
            console.error('Fetch error', error);
        }
    }

    function createElementFromHTML(htmlString) {
        const div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }
});
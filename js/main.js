// Categories
function getCategoriesData() {


    const categoriesUrl = 'https://openapi.programming-hero.com/api/news/categories'

    fetch(categoriesUrl)
        .then(res => res.json())
        .then(data => {

            displayCetegories(data.data.news_category)
            if (!data.status){
                const errorMeassage = `You have an error, Error status: ${res.status}`
                throw new Error(errorMeassage)
            }

            return data
        })
        .catch(err => console.log(err))


}


function displayCetegories(cetegoriesData){
    // console.log(cetegoriesData)

    document.getElementById('menuBar').innerHTML = `
            ${cetegoriesData.map(categorie => {
                return `
                <li class="nav-item">
                    <a class="nav-link" href="#">${categorie.category_name}</a>
                </li>
                `
            }).join('')}
        `

    

}


getCategoriesData()



// Newses
function getNewsesData(){




    let newsUrl = 'https://openapi.programming-hero.com/api/news/category/01'

    fetch(newsUrl)
        .then(res => res.json())
        .then(data => {

            displayNewses(data.data)
            if (!data.status){
                const errorMeassage = `You have an error, Error status: ${res.status}`
                throw new Error(errorMeassage)
            }

            return data
        })
        .catch(err => console.log(err))
}

function displayNewses(newsesData){
   document.getElementById('allNews').innerHTML = `
    ${newsesData.map(news => {
        console.log(news)

        return `
        <!-- News -->
        <div class="d-flex newses">
            <div class="newsImg">
                <img src=${news.thumbnail_url} alt="img">
            </div>
            

            <article class="ps-5 d-flex flex-column justify-content-between">

                <h2>${news.title}</h2>
                <p class='news-details'>${news.details}</p>


                    <div class="d-flex justify-content-between align-items-center">
                           <!-- Author -->
                    <div class="d-flex justify-content-between align-items-center">

                        <div class='d-flex align-items-center'>
                            <img class='author-img me-3' src=${news.author.img} />
                            <div>
                                <p class='fw-semibold'>${news.author.name}</p>
                                <p>${news.author.published_date}</p>
                            </div>
                        </div>


                    </div>


                    <!-- View -->
                    <div class="d-flex justify-content-between align-items-center">
                        <i class="bi bi-eye me-2"></i>

                        <p class='fw-semibold'>${news.total_view}</p>
                    </div>


                    <div>
                       


                <!-- Button trigger modal -->

                    <button id='showNews-btn'>Show Full News</button>
                
                    </div>
                    </div>
                 
            </article>

        </div>

        `

    }).join('')}
   `
}


getNewsesData()
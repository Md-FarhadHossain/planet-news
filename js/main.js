// Categories
function getCategoriesData() {


    const categoriesUrl = 'https://openapi.programming-hero.com/api/news/categories'

    fetch(categoriesUrl)
        .then(res => res.json())
        .then(data => {

            displayCetegories(data.data.news_category)
            getCategoriesNum(data)
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









    let newsUrl = 'https://openapi.programming-hero.com/api/news/category/08'

    fetch(newsUrl)
        .then(res => res.json())
        .then(data => {

            displayNewses(data.data)
            newsBtns(data.data)

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
        // console.log(news)

       

        return `
        <!-- News -->
        <div class="d-flex newses">
            <div class="newsImg">
                <img src=${news.thumbnail_url} alt="img">
            </div>
            

            <article class="ps-5 d-flex flex-column justify-content-between">

                <h2>${news.title ? news.title : 'No data found'}</h2>
                <p class='news-details'>${news.details ? news.details : 'No data found'}</p>


                    <div class="d-flex justify-content-between align-items-center">
                           <!-- Author -->
                    <div class="d-flex justify-content-between align-items-center">

                        <div class='d-flex align-items-center'>
                            <img class='author-img me-3' src=${news.author.img} />
                            <div>
                                <p class='fw-semibold'>${news.author.name ? news.author.name : 'No name found'}</p>
                                <p>${news.author.published_date ? news.author.published_date : 'No date found!'}</p>
                            </div>
                        </div>


                    </div>


                    <!-- View -->
                    <div class="d-flex justify-content-between align-items-center">
                        <i class="bi bi-eye me-2"></i>

                        <p class='fw-semibold'>${news.total_view ? news.total_view : 'No View found!'}</p>
                    </div>


                    <div>
                       



                <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${news._id}">
                    Launch demo modal
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal${news._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">

                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">${news.title ? news.title : 'No data found'}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body">
                            ${news.details ? news.details : 'No data found'}
                        </div>
                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                    </div>

                   
                       
                    </div>
                    </div>
                 
            </article>

        </div>

        `

    }).join('')}
   `

 
}

getNewsesData()
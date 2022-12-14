// Categories
const getCategoriesData = () => {


    const categoriesUrl = 'https://openapi.programming-hero.com/api/news/categories'

    fetch(categoriesUrl)
        .then(res => res.json())
        .then(data => {

            displayCetegories(data.data.news_category)
            if (!data.status) {
                const errorMeassage = `You have an error, Error status: ${res.status}`
                throw new Error(errorMeassage)
            }

            return data
        })
        .catch(err => console.log(err))


}

setTimeout(() => {
    document.getElementById('firstSpinner').classList.add('d-none')
    document.getElementById('getNewsMessage').classList.remove('d-none')
    document.getElementById('getNewsMessage').classList.add('d-block')
}, 700)

const displayCetegories = (cetegoriesData) => {

    document.getElementById('menuBar').innerHTML = `
            ${cetegoriesData.map(categorie => {
        return `
                <li class="nav-item nav-newsItem">
                    <a class="nav-link nav-newsLink" href="#">${categorie.category_name}</a>
                </li>
                `
    }).join('')}
        `

    const cetegoriesMenu = document.querySelectorAll('.cetegoriesMenu li a')
    cetegoriesMenu.forEach(menu => {

        document.getElementById('categorieName').innerText = 'Click on category to get news!'
        menu.addEventListener('click', () => {

            document.getElementById('getNewsMessage').classList.add('d-none')

            document.getElementById('allNews').innerHTML = `
            <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>


          
            `


            document.getElementById('categorieName').innerText = `${menu.innerText ? menu.innerText : 'Click you News'}`
            console.log(menu.innerText)
            cetegoriesData.forEach(cate => {
                if (cate.category_name === menu.innerText) {
                    getNewsesData(cate.category_id)
                } else {
                    return false
                }
            })




        })


    })


}


getCategoriesData()



// Newses
const getNewsesData = (category_id) => {


    let newsUrl = `https://openapi.programming-hero.com/api/news/category/${category_id ? category_id : '01'}`




    fetch(newsUrl)
        .then(res => res.json())
        .then(data => {

            displayNewses(data.data)

            if (!data.status) {
                const errorMeassage = `You have an error, Error status: ${res.status}`
                throw new Error(errorMeassage)
            }

            return data
        })
        .catch(err => console.log(err))


}

const displayNewses = (newsesData) => {

    console.log(newsesData)

    newsesData.sort((a, b) => {
        return a.total_view - b.total_view
    })
    console.log(newsesData.reverse())




    document.getElementById('newsQuantity').innerText = `${newsesData.length}`
    if (newsesData.length == 0) {
        document.getElementById('allNews').innerHTML = `
            <h1 class='text-center'>No Data Found!<h1>
        `
    } else {
        document.getElementById('allNews').innerHTML = `
        ${newsesData.map(news => {
            



            return `
            <!-- News -->
            <div class="d-flex newses">
                <div class="newsImg">
                    <img src=${news.thumbnail_url} alt="img">
                </div>
                
    
                <article class="newsDetails ps-5 d-flex flex-column justify-content-between">
    
                    <h2>${news.title ? news.title : 'No data found'}</h2>
                    <p class='news-details'>${news.details ? news.details : 'No data found'}</p>
    
    
                        <div class="d-flex justify-content-between align-items-center authorAndView">
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
                        <div class='modalBtn'>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${news._id}">
                            See Full Details
                            </button>
                        </div>
    
                        <!-- Modal -->
                        <div class="modal fade" id="exampleModal${news._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">${news.title ? news.title : 'No data found'}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
    
                            <div class="modal-body">

                                <div class="newsImg text-center">
                                    <img src=${news.thumbnail_url} alt="img">
                                </div>

                                <div class='py-4'>
                                    ${news.details ? news.details : 'No data found'}
                                </div>


                                
    
                        <div class="d-flex justify-content-between align-items-center py-4">
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
    
    
                        </div>
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

}


// Dark mode
const darkModeSwitch = document.getElementById('dark-mode-switch')
darkModeSwitch.addEventListener('click', () => {
    const blogBody = document.getElementById('blogBody')
    blogBody.classList.toggle('bodyDesign')


    document.querySelectorAll('.question').forEach(question => {
        question.classList.toggle('questionTitle')
    })

    document.querySelectorAll('.questionSection').forEach(questionSec => {
        questionSec.classList.toggle('questionDesign')
    })
    const blogNav = document.getElementById('blogNav')
    blogNav.classList.toggle('blogNav')
    document.querySelectorAll('nav#blogNav *').forEach(blogLink => {
        blogLink.classList.toggle('blogNavLink')
    })
})


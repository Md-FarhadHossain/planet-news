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
    console.log(cetegoriesData)

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




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

    cetegoriesData.map(categorie => {
        console.log(categorie)
    })

}


getCategoriesData()

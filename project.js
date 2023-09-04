const form = document.getElementById("film-form")
const titleElement = document.querySelector("#title")
const directorElement = document.querySelector("#director")
const urlElement = document.querySelector("#url")
const cardBodyScn = document.querySelectorAll(".card-body")[1]
const clear = document.getElementById("clear-films")




eventListeners()

function eventListeners(){
    form.addEventListener("submit",addMovie)

    
    document.addEventListener("DOMContentLoaded",function(){
        let movies = Storage.getMoviesFromStorage()
        UI.loadAllMovies(movies)
    })

    
    cardBodyScn.addEventListener("click",deleteMovieBtn)

    
    clear.addEventListener("click",clearAllMovies)
}


function addMovie(e){
    const title = titleElement.value
    const director = directorElement.value
    const url = urlElement.value

    if(title === "" || director === "" || url === ""){
        UI.dispalyMessages("Fill in all fields....","danger")
    }
    else {
        
        const newMovie = new Movie(title,director,url)
        
        
        UI.addMovieToUI(newMovie)

        
        Storage.addMovieToStorage(newMovie)

        UI.dispalyMessages("Movie added successfully....","success")
    }

    UI.clearInputs(titleElement,urlElement,directorElement)

    e.preventDefault()
}


function deleteMovieBtn(e){
    if(e.target.id === "delete-movie"){
        UI.deleteMovieFromUI(e.target)

        
        Storage.deleteMovieFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
        
        UI.dispalyMessages("Movie delete succssfully....","success")
    }
}


function clearAllMovies(){
    if(confirm("Are you sure?")){
        UI.clearAllMoviesFromUI()
        Storage.clearAllMoviesFromStorage()
    }
   
}
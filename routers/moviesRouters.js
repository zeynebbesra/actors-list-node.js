const router = require('express').Router()
const Film = require("../data/data-model.js")

router.get('/', (req, res, next)=> {
    Film.findMovies()
    .then((movies)=> {
        res.status(200).json(movies)
    }).catch((error) => {
        next({
            statusCode: 500,
            errorMesage:"An error occurred while retrieving movies",
            error, // hatanın kendisi
        })
    })

})

router.post('/', (req, res, next)=> {
    const yeniFilm = req.body
    if (!yeniFilm.isim){
        next({
            statusCode: 400,
            errorMesage: "You must enter a name to add movie" 
        })
    } else {
        Film.addMovies(yeniFilm)
        .then((added) => {
            res.status(201).json(added)
        })
        .catch((error) => {
            console.log(error)
            next({
                statusCode: 500,
                errorMesage: "An error occurred while adding a movie",
                error
            })
        })
    }

})

router.patch('/:id', (req, res, next)=> {
    const { id } = req.params;
    const updatedMovie = req.body;

    if (!updatedMovie.isim){
        next({
            statusCode: 400,
            errorMesage: "Movie name cannot be empty."
        })
    } else {
        Film.updateMovie(updatedMovie, id)
        .then((updated) => {
            res.status(200).json(updated)
        })
        .catch((error) => {
            next({
                statusCode: 500,
                errorMesage:"An error occurred while editing the movie.",
                error,
            })

        })
    
    }

})

router.delete('/:id', (req, res, next)=>{
    const {id} = req.params;

    Film.findMovieByID(id)
    .then((deletedMovie)=> {
        if (!deletedMovie) {
            next({
                statusCode: 400,
                errorMesage: "The movie you are trying to delete does not exist in the system."
            });
        } else {
            Film.deleteMovie(id)
            .then((deleted)=>{
                if(deleted){
                    res.status(204).json();
                }
            })
            .catch((error) => {
                next({
                    statusCode: 500,
                    errorMesage: "An error occurred while deleting the movie.",
                    error,
                });
            });
        }
    })
    .catch((error) => {
        next({
            statusCode: 500,
            errorMesage: "An error occurred while searching the movie.",
            error,
        });
    });
});


module.exports = router
const router = require('express').Router()
// let data = require("../data.js")
const Aktor = require("../data/data-model.js")


router.get('/', (req, res, next) => {
    Aktor.findAktor()
    .then((aktorler) => {
        res.status(200).json(aktorler)
    }).catch((error) => {
        next({
            statusCode: 500,
            errorMesage:"An error occurred while retrieving actors",
            error, // hatanın kendisi
        })
    })
    
})


// burada "next" metoduna ihtiyacımız var çünkü error handlig kullanacağız yani bir problem olduğunda buradaki kullanıcıyı errorhandling middleware'ine gönderecek olan next fonksiyonu.
router.post('/',(req, res, next) => {
    const yeniAktor = req.body

    if (!yeniAktor.isim){
        next({
            statusCode: 400,
            errorMesage: "You must enter name to add actor" 
        })
    } else {
        Aktor.addAktor(yeniAktor)
        .then((added) => {
            res.status(201).json(added)
        })
        .catch((error) => {
            // console.log(error)
            next({
                statusCode: 500,
                errorMesage: "An error occurred while adding an actor",
                error
            })
        })
    }
})


router.patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const updatedAktor = req.body;

    if (!updatedAktor.isim){
        next({
            statusCode: 400,
            errorMesage: "Actor name cannot be empty."
        })
    } else{
        Aktor.updateAktor(updatedAktor, id)
        .then((updated) => {
            res.status(200).json(updated)
        })
        .catch((error) => {
            next({
                statusCode : 500,
                errorMesage:"An error occurred while editing the actor.",
                error,
            })

        })
    }
  })

    
router.delete("/:id", (req,res,next) => {
    const {id} = req.params

    Aktor.findAktorByID(id).then((deletedAktor) => {
        Aktor.deleteAktor(id)
        .then((deleted) => {
            if(deleted){
                res.status(204).end()
            }
            next({
                statusCode: 400,
                errorMesage:"The actor you are trying to delete does not exist in the system."
            })
        }).catch((error) => {
            next({
                statusCode: 500,
                errorMesage:"An error occurred while deleting the actor.",
                error,
            })
        }).catch((error) => {
            next({
                statusCode:500,
                errorMesage:"An error occurred while searching the actor.",
                error,
            })
        })

    })

})

//'req.params' nesnesi, istemciden gelen isteğin URL'indeki parametreleri içerir. 
//Bu durumda, '/aktorler/:id' yolunda belirtilen 'id' parametresine erişmek için kullanılır.
router.get('/:id', (req, res, next) => {
   const {id} = req.params

   Aktor.findAktorByID(id)
   .then((aktor) => {
    if(aktor){
        res.status(200).json(aktor)
    } else {
        next({
            statusCode: 400,
            errorMesage: "Actor not found"
        })
    }
   })
   .catch((error) => {
    next({
        statusCode: 500,
        errorMesage:"An error occurred while searching the actor.",
        error,
    })
   })
  
})

module.exports = router
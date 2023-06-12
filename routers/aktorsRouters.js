const router = require('express').Router()
let data = require("../data.js")


router.get('/', (req, res) => {
    res.status(200).json(data)
})

// burada "next" metoduna ihtiyacımız var çünkü error handlig kullanacağız yani bir problem olduğunda buradaki kullanıcıyı errorhandling middleware'ine gönderecek olan next fonksiyonu.

let next_id = 4;
router.post('/',(req, res, next) => {
    let yeni_aktor = req.body
    if (!yeni_aktor.isim){
        next({
            statusCode: 400,
            errorMesage: "Aktor ekleyebilmek için isim girmelisiniz."
        })
    }else if (yeni_aktor.isim && !yeni_aktor.filmler){
        next({
            statusCode: 400,
            errorMesage: "Aktorun filmlerini girmelisiniz."
        })
    }else {
        yeni_aktor.id = next_id
        next_id++
        data.push(yeni_aktor)
        res.status(201).json(yeni_aktor)
    }
   
})
    

router.delete("/:id", (req,res) => {
    const silinecek_aktor_id = req.params.id
    const silinecek_aktor=data.find(
        (aktor) => aktor.id === Number(silinecek_aktor_id)
    )

    if (silinecek_aktor){
        data = data.filter((aktor) => aktor.id !== Number(silinecek_aktor_id))
        res.status(204).end()
    }else{
        res
        .status(404)
        .json({errorMesage: "Silmeye calistiginiz aktor sistemde yok"})
    }
})

//'req.params' nesnesi, istemciden gelen isteğin URL'indeki parametreleri içerir. 
//Bu durumda, '/aktorler/:id' yolunda belirtilen 'id' parametresine erişmek için kullanılır.
router.get('/:id', (req, res) => {
    console.log("req.body:", req.body)
    const { id } = req.params   
    const aktor = data.find((aktor) => aktor.id === parseInt(id))
    if(aktor){
        res.status(200).json(aktor)
    }else {
        res.status(404).send('Aradiginiz aktor bulunamadi...')
    }
})

router.patch('/:id/update', (req, res) => {
    const { id } = req.params;
    const newInfo = req.body;
    const aktorIndex = data.findIndex((aktor) => aktor.id === parseInt(id));
  
    if (aktorIndex) {
        console.log("aktorIndex:", aktorIndex)
        
        data[aktorIndex] = { ...data[aktorIndex], ...newInfo };
        console.log("data", data)
        res.status(200).json(data[aktorIndex]);
        console.log("aktorIndex",data[aktorIndex])
    } else {
        res.status(404).send('Aradiginiz aktor bulunamadi...');
    }
  });


module.exports = router
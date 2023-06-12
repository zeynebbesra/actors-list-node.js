// require("dotenv").config()
const express = require("express")
const aktorlerRouter = require('./routers/aktorsRouters')
const logger = require('./middlewares/logger')
const errorHandling = require('./middlewares/errorHandling')

const server = express()
server.use(express.json())  // Bütün gelen isteklerde bu komutun kullanılmasını söylüyoruz. Gelen JSON veriyi parse ediyor.
server.use(logger)

server.use("/aktorler",aktorlerRouter) // aktorler adresinden gelen tüm isteklere 'aktorlerRouter' buradan cevap ver.


server.get('/', (req, res) =>{
    res.send("Express'ten merhaba")
})

server.use(errorHandling)

server.listen(5000, () => {
    console.log("http://localhost:5000 adresine gelen istekler dinleniyor...")
}) 
// logger ne yapar: consolu yazdırıp bizi daha sonraki middlewareye gönderiyor.
module.exports = (req,res,next) => {
    console.log(`${new Date().toUTCString()} - ${req.method} - ${req.hostname}`)
    next()
}
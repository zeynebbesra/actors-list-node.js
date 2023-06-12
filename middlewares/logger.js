// logger ne yapar: consolu yazdırıp bizi daha sonraki middlewareye gönderiyordu.
module.exports = (req,res,next) => {
    console.log(`${new Date().toUTCString()} - ${req.method} - ${req.hostname}`)
    next()
}
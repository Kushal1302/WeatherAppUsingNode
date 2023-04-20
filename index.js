const fs = require('fs')
const requests = require('requests')
const http = require('http')
const indexPage = fs.readFileSync('./index.html' , 'utf-8')
const replaceVal = (tempVal , orgVal) => {
    let temperature = tempVal.replace("{%tempval%}" , orgVal.main.temp)
    temperature = temperature.replace("{%country%}" , orgVal.sys.country)
    return temperature
}
const server = http.createServer((req , res) => {
    if(req.url == '/'){
        requests("https://api.openweathermap.org/data/2.5/weather?q=pune&appid=3ebedc18270a5a055880cb64d33311aa&units=metric")
        .on('data' , (chunk) => {
            console.log(chunk)
            const objData = JSON.parse(chunk)
            const arrData = [objData]
            console.log(arrData[0])
            const realTimeData = arrData.map((val) => replaceVal(indexPage , val)).join("")
            // console.log(realTimeData)
            res.write(realTimeData)
        })
        .on('end' , (err) => {
            
            res.end()
        })
    }
})
server.listen(8000 , "127.0.0.1" , () => {
    console.log("Listeing!")
})
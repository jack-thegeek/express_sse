const express = require('express')
const app = express() // 创建app对象
const port = process.env.PORT || 3666 // 设置端口

app.all('*', function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header('Access-Control-Allow-Origin', '*')
    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'content-type')
    //跨域允许的请求方式
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
    if (req.method == 'OPTIONS')
        res.sendStatus(200) //让options尝试请求快速结束
    else
        next()
})

app.get('/', (req, res) => {
    res.json({test: 'success'})
})


app.get('/sse', (req, res) => {
    res.header({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })
    const interval = setInterval(() => {
        res.write('data: ' + (new Date()) + '\n\n')
    }, 1000)
    setTimeout(() => {
        clearInterval(interval)
        res.write('event: close\n')
        res.write('data: test close->' + (new Date()) + '\n\n')
    }, 15000)
})


// handle error
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({error: err.message})
})

app.listen(port, () => {
    console.log('server running on http://127.0.0.1:' + port)
})

module.exports = app

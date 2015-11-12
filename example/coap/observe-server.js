const coap    = require('coap')
    , server  = coap.createServer()

server.on('request', function(req, res) {
    
    //�ж��Ƿ���Observe����
    if (req.headers['Observe'] !== 0)
        return res.end(new Date().toISOString() + '\n')

    //��ʱ������д��ObserveWriteStream
    var count = 0
    var interval = setInterval(function() {
        count++
        res.write(new Date().toISOString() + '\n')
        
        if (count === 3) {
            clearInterval(interval)
            //�����۲�ģʽ
            res.end()
        }
    }, 1000)

    //�����۲�ģʽ�󴥷�finish�¼�
    res.on('finish', function(err) {
        console.log('finsh')
    })

})

server.listen(function() {
    console.log('server started')
})
/**
 * Created by Administrator on 2015/10/16.
 */

//  http://blog.csdn.net/leftfist/article/details/39995411

var redis = require("redis"),//�ٻ�redis
/*
 ����redis���ݿ⣬createClient(port,host,options);
 ���REDIS�ڱ������˿�����Ĭ�ϣ�ֱ��дcreateClient()����
 redis.createClient() = redis.createClient(6379, '127.0.0.1', {})
 */
    client = redis.createClient(6379,'127.0.0.1',{});
//�����Ҫ��֤����Ҫ������֤
//client.auth(password, callback);

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

//���������
client.on("error", function (err) {
    console.log("Error " + err);
});

client.set("string key", "string val", redis.print);//set "string key" "string val"
/*
 redis.print���ص���������redis�ķ���ֵ��ʾ��������һ��ִ�н���������ء�OK��
 */
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
//������ϣ��"hash key"
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.hget("hash key","hashtest 1",redis.print);

    /*���ֶ����Զϵ���redis�����ӣ�
     end()�ֱܴ�������3721��һ�����˳����ˣ������Ǿ��ȡ��ϣ��"hash key"��ĳ��Ԫ��ֵ�ı��ʽ��û�н������
     ��quit()�����Ƚ���䴦������ٸɾ����˳���˹�ĵú�
     */
//client.end();
    client.quit();
});
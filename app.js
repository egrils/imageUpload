var express = require('express');
var bodyParser = require('body-parser');
var app = new express();
var fs = require('fs');

fs.stat('./image', function (err, stat) {
    if ((stat && stat.isDirectory())) {
        console.log("已存在");
    }
    else {
        console.log('创建image文件夹');
        fs.mkdir('./image/', function (err) {
            if (err) console.log('创建失败！');
            else console.log('创建成功！');
        });
    }
});

app.use(express.static(__dirname));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/', function (req, res) {
    res.sendFile("index.html", {root: __dirname});
});

app.post('/submitImage', function (req, res) {

    var imgName = req.body.imgName;
    var imgExt = req.body.imgExt;
    var imgData = req.body.imgData;
    var path = './image/';
    var buffer = new Buffer(imgData, 'base64');

    if (fs.exists(path)) {

        fs.unlink(path + imgName + '.' + imgExt, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("文件删除成功！");
        });
    }
    console.time('writeFile');
    fs.open(path + imgName + '.' + imgExt, 'w', function (err, fd) {
        if (err) {
            console.error(err);
            return;
        } else {
            fs.writeFile(path + imgName + '.' + imgExt, buffer);
            fs.close(fd, function (err) {
                if (err) {
                    console.log(err);
                }
                console.log("文件关闭成功！");
            });
        }
    });
    console.timeEnd('writeFile');

});

app.listen("3000");



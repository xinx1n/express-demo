var express = require('express');
var path = require('path');
var multer=require('multer');
var app = express();

app.set('port', process.env.PORT || 10025);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(app.router);

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res) {
  res.sendfile('./index.html');
});
var storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, path.join(__dirname, 'upload'))
     }, 
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        var ext = fileFormat.pop();
        cb(null, fileFormat.toString() + '-' + Date.now() + "." + ext);
    }
});
var upload = multer({
// dest: path.join(__dirname, path.join(__dirname, 'upload')),
  storage: storage
});

app.post('/upload', upload.single('file'), function(req, res) {
	 var result;
	if (req.file) {
		console.dir(req.file);
		console.log(req.file.filename+"---xxx");
		result = '{"success":true,"filename":"'+req.file.filename+'"}';
		res.end(result)
		return;
	}else{
		result = '{"success":false}';
	}
	res.end(result)
});
app.get('/download/:file', function(req, res) {
	var file = req.param('file')
	res.download(path.join(__dirname, 'upload')+"/"+file);
  // res.download(path.join(__dirname, 'upload')+"/"+"OmegaOptions-1489315296611.bak");
});
console.log('已监听：'+ app.get('port'))
app.listen(app.get('port'));
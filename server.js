const express = require('express');

const bodyParser = require('body-parser');

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const {mergePdfs} = require('./merger');

const path = require('path')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public',)));


app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/merge', upload.array('pdfs', 2), async(req, res, next) => {
    
  let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
    
    res.redirect(`/${d}.pdf`)
})

app.listen(3000);
const cors = require('cors');
const express = require("express");
const app = express();
const indexRoute = require('./routes/index');
const transporterRoute = require('./routes/transportadora');

//configurar puerto
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//routes
app.use(indexRoute);
app.use('/api',transporterRoute);

//static files

//app.use(express.static(path.join(__dirname,'dist')));


app.listen(app.get('port'), () =>{
    console.log("lisen 3000",app.get('port'));
});
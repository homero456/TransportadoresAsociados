const router = require('express').Router();
const mongojs = require('mongojs');
//const db = mongojs('mean-db',['transporter']);
var db = mongojs('mean-db')
var transporter = db.collection('transporter')
var cars = db.collection('cars')


//#region Conductores

router.get('/transporter', (req, res, next) => {

    //Validate from server...
    //Controlar error 400 o 500


    db.transporter.find((err, transporter) => {
        if (err) return next(err);
        res.json(transporter);
    });
});

router.get('/transporter/:id', (req, res, next) => {

    //Validate from server...
    //Controlar error 400 o 500


    db.transporter.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, trans) => {
        if (err) return next(err);
        res.json(trans);
    });
});

router.post('/transporter', (req, res, next) => {
    const trans = req.body;

    //Validate from server...
    //Controlar error 400 o 500

    if (trans.name === '') {
        res.status(400).json({
            error: 'bad data'
        });
    } else {
        db.transporter.save(trans, (err, trans) => {
            if (err) return next(err);
            res.json(trans);
        });
    }
});


router.delete('/transporter/:id', (req, res, next) => {

    //Validate from server...
    //Controlar error 400 o 500


    db.transporter.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) return next(err);
        res.json(result);
    });
});


router.put('/transporter/:id', (req, res, next) => {
    const trans = req.body;
    const updateUser = {};
    //updateUser._id=  trans._id;
    updateUser.name = trans.name;
    updateUser.lastName = trans.lastName;
    updateUser.typeDocument = trans.typeDocument;
    updateUser.documentNumber = trans.documentNumber;
    //Validate from server...
    //Controlar error 400 o 500

    db.transporter.update({ _id: mongojs.ObjectId(req.params.id) }, updateUser, (err, result) => {
        if (err) return next(err);
        res.json(result);
    });
});

//#endregion



//#Conductores

router.get('/cars', (req, res, next) => {

    //Validate from server...
    //Controlar error 400 o 500


    db.cars.find((err, car) => {
        if (err) return next(err);
        res.json(car);
    });
});

router.get('/cars/:id', (req, res, next) => {

    //Validate from server...
    //Controlar error 400 o 500


    db.cars.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, car) => {
        if (err) return next(err);
        res.json(car);
    });
});

router.post('/cars', (req, res, next) => {
    const car = req.body;

    //Validate from server...
    //Controlar error 400 o 500

    if (car.typecar === '') {
        res.status(400).json({
            error: 'bad data'
        });
    } else {
        db.cars.save(car, (err, result) => {
            if (err) return next(err);
            res.json(result);
        });
    }
});


router.delete('/cars/:id', (req, res, next) => {

    //Validate from server...
    //Controlar error 400 o 500


    db.cars.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) return next(err);
        res.json(result);
    });
});


router.put('/cars/:id', (req, res, next) => {
    const car = req.body;
    const updateCar = {};
    updateCar.typecar = car.typecar;
    updateCar.lastName = car.placa;
    updateCar.descripcion = car.descripcion;
    
    //Validate from server...
    //Controlar error 400 o 500

    db.cars.update({ _id: mongojs.ObjectId(req.params.id) }, updateCar, (err, result) => {
        if (err) return next(err);
        res.json(result);
    });
});

//#endregion
module.exports = router; 
let Whisky = require('../models/whiskyModel');
let connection = require('../db');
let whiskyList = [];

// List of whiskys
exports.whiskyList = function (request, response) {    
    connection.query("Select * from whiskies", function (error, resultSQL) {
        if (error)  {
            response.status(400).json({'message': error});        
        }
        else {
            response.status(200);
            whiskyList =  resultSQL;
            console.log( whiskyList);
            response.json({whiskies:whiskyList});
        }
    });
}

// Add  whisky in the list
exports.whiskyNew =  function(request, response) {
    console.log(request)
    let dist=request.body.dist; 
    let bout=request.body.bout;
    let prix=request.body.prix;
    let avis=request.body.avis;

    let whisky = new Whisky(dist, bout, prix, avis);
    console.log(whisky);
    connection.query("INSERT INTO whiskies set ?", whisky, function (error, resultSQL) {
        if(error) {
            console.log(error.sqlMessage)
            response.status(400).json({'message': error.sqlMessage});   
        }
        else{
            response.status(201).json({'message': 'success'}); 
        }
    });
}

//Show one whisky 
exports.whiskyShow = (req, res) => {
    let idwhisky = req.params.idwhisky;
    connection.query("SELECT * FROM whiskies where idwhisky= ?;", idwhisky , function(err, result){
        if (err) {
            console.log(err);
        }
        res.json(result);
        });
};

//Update one whisky in the list 

exports.whiskyUpdate = (req, res) => {
    console.log("je plante")
    let i=req.params.idwhisky ; 
    let whisky={"dist":req.body.dist,"bout":req.body.bout,"prix":req.body.prix,"avis":req.body.avis}
    connection.query("UPDATE whiskies SET ? where idwhisky = ?", [whisky, i], function (err, result){
        if (err){
            console.log(err);
        }
        res.status(200).json({'message':'success'});
    })
}

exports.whiskyDelete = (req, res) => {
    let i = req.params.idwhisky;
    connection.query("DELETE FROM whiskies WHERE idwhisky = ?", i, function(err, result){
        if (err) {
            console.log(err);
        }
        res.status(200).json({'message':'success'});
    });
}

// Je vais chercher le modèle "WhiskyModel" crée plus tôt
let Whisky = require('../models/whiskyModel');
let connection = require('../db');
let whiskyList = [];       // Je crée une liste vide 

// List of whiskies
exports.whiskyList = function (request, res) {    
    connection.query("Select * from whiskies", function (err, result) {
        if (err)  {
            console.log(err);
            res.status(400).json({'error': err});
                }
        res.status(200).json(result);
        
    });
};
// ***Ca ne sert à rien dans une API 
// exports.whiskyFormAdd = function(req, res) { 
//     res.render('whiskyAdd.ejs', {idwhisky:-1, dist: "", bout:"",prix :"",  avis:""});
// }

// Add or update one whisky in the list
exports.whiskyNew =  (req, res) => {
    let whisky = {"dist":req.body.dist,"bout":req.body.bout,"prix":req.body.prix,"avis":req.body.avis};
    console.log('new');
    connection.query("INSERT INTO whiskies set ?", whisky, function (error, result) {
        if(error) {
            console.log(error);
            res.status(400).json({'message':err});
        }
            res.status(200).json({'message': 'success'}); 
    });
}

//Montrer un whisky quand on clique sur "voir"
exports.whiskyShow = function(req, res) {
    let idwhisky = req.params.idwhisky; 
    res.send("Hello"+ whiskyList[idwhisky]["dist"]);
}

//Supprimer un whisky
exports.whiskyRemove = function (request, response) {
    let sql = "DELETE FROM `whiskies` WHERE `whiskies`.`idwhisky` = ?";
    connection.query( sql , [request.params.idwhisky], (error, resultSQL) => {
        if(error) {
            response.status(400).send(error);
        }
        else{
            response.redirect('/whisky');
        }
    }); 
}
 
//Modifier un whisky
exports.whiskyUpdate = function (req, res) {
    let idwhisky=req.params.idwhisky;
    res.render('whiskyAdd.ejs', {idwhisky:idwhisky , dist:whiskyList[idwhisky]["dist"] , bout:whiskyList[idwhisky]["bout"],prix:whiskyList[idwhisky]["prix"], avis:whiskyList[idwhisky]["avis"]});
}



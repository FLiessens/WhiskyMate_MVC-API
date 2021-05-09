// Je vais chercher le modèle "WhiskyModel" crée plus tôt
let Whisky = require('../models/whiskyModel');
let connection = require('../db');
let whiskyList = [];       // Je crée une liste vide 

// List of whiskies
exports.whiskyList = function (request, response) {    
    connection.query("Select * from whiskies", function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);        
        }
        else {
            response.status(200);
            whiskyList =  resultSQL;
            console.log(whiskyList);
            response.render('whiskyList.ejs', {whiskies:whiskyList});
        }
    });
}

exports.whiskyFormAdd = function(req, res) { 
    res.render('whiskyAdd.ejs', {idwhisky:-1, dist: "", bout:"",prix :"",  avis:""});
}

// Add or update one whisky in the list
exports.whiskyNew =  function(request, response) {
    let idwhisky = request.body.idwhisky
    let dist =  request.body.dist;
    let bout = request.body.bout;
    let prix = request.body.prix; 
    let avis = request.body.avis;
    if ( idwhisky == -1)
    {
        let whisky = new Whisky(dist, bout, prix, avis);
        console.log(whisky);
        connection.query("INSERT INTO whiskies set ?", whisky, function (error, resultSQL) {
            if(error) {
                response.status(400).send(error);
            }
            else{
                response.status(201).redirect('/whisky');
            }
        });
    }
    else if( idwhisky >=0 )
    {
        let whisky = new Whisky(dist, bout, prix, avis)
        console.log(whisky);
        connection.query("UPDATE whiskies set ? WHERE idwhisky = ?", [whisky, request.body.idwhisky], function (error, resultSQL) {
            if(error) {
            response.status(400).send(error);
            }
            else{
                response.status(202).redirect('/whisky');
            }
        });
    }
    console.log(whiskyList);
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



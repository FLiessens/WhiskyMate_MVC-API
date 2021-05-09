// Get an instance of the express Router and set routes
let express = require('express');
let router = express.Router();  

//J'importe le whiskyController 
let whiskyController = require('./controllers/whiskyController'); 
let whiskyControllerAPI = require('./controllers/whiskyControllerAPI'); 


// *******//Liste des routes vers les différents contrôleurs (NODEJS)
router.get('/whisky', whiskyController.whiskyList);
router.get('/whisky/add', whiskyController.whiskyFormAdd) ;       //J'utilise la méthode GET car je vais afficher une vue
router.post('/whisky/new', whiskyController.whiskyNew);           //Ajout d'un whisky dans le model 
router.post('/whisky', whiskyController.whiskyList);             // Pour faire fonctionner "Retour à mon bar" sur le formulaire d'ajout
router.get('/whisky/show/:idwhisky', whiskyController.whiskyShow)
router.get('/whisky/remove/:idwhisky', whiskyController.whiskyRemove);
router.get('/whisky/update/:idwhisky', whiskyController.whiskyUpdate);
module.exports = router; 

//*******//API
router.get('/api/whisky', whiskyControllerAPI.whiskyList);
router.post('/api/whisky', whiskyControllerAPI.whiskyNew);
router.get('/api/whisky/:idwhisky', whiskyControllerAPI.whiskyShow);        
router.put('/api/whisky/:idwhisky', whiskyControllerAPI.whiskyUpdate)   
router.delete('/api/whisky/:idwhisky', whiskyControllerAPI.whiskyDelete)         
// router.get('/api/whisky/show/:idwhisky', whiskyControllerAPI.whiskyShow)
// router.get('/api/whisky/remove/:idwhisky', whiskyControllerAPI.whiskyRemove);
// router.get('/api/whisky/update/:idwhisky', whiskyControllerAPI.whiskyUpdate);

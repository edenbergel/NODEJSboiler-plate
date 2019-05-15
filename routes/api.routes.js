    
/*
Configurer le module de route
*/
const express = require('express');
const router = express.Router();
//

/* 
Configurer MYSQL
*/
const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    port: 8889,
    database : 'node-boiler-plate'
});
//

/*
Définition du crud
*/
// CRUD: Create
router.post('/article', (req, res) => {

    /* 
    Vérifier la présence du title et du content dans la requête client
    */
   if( req.body && req.body.title.length > 0 && req.body.content.length > 0 ){
       
        // Connexion de la BDD
        connection.connect();
    
        // Inscrirer des données SQL
        connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
            if (error) {
                res.json({ msg: 'Error create', err: error })
            }
            else{
                res.json({ msg: 'Create', data: req.body })
            }
        });
    
    
        
   }
   else{
        res.json({ msg: 'Create', error: 'No data' })
   }
});

// CRUD: Read
router.get('/article', (req, res) => {
    res.json({ msg: 'Read ALL', error: null })
});

// CRUD: Read
router.get('/article/:id', (req, res) => {
    res.json({ msg: 'Read one by ID', error: null })
});

// CRUD: Update
router.put('/article/:id', (req, res) => {
    res.json({ msg: 'Update one by ID', error: null })
});

// CRUD: Delete
router.delete('/article/:id', (req, res) => {
    res.json({ msg: 'Delete one by ID', error: null })
});
//


/*
Exporter le module de route
*/
module.exports = router;
//
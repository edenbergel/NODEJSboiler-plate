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

// Connexion de la BDD
connection.connect();
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

        // Définition de l'item
        const item  = { title: req.body.title, content: req.body.content };
    
        // Inscrirer des données SQL
        connection.query('INSERT INTO post SET ?', item, (error, results, fields) => {
            if (error) {
                res.json({ msg: 'Error create', err: error })
            }
            else{
                res.json({ msg: 'Create', data: results })
            }
        });
   }

   else{
        res.json({ msg: 'Create', error: 'No data' })
   }
});

// CRUD: Read
router.get('/article', (req, res) => {

    // Récupérer des données SQL
    connection.query('SELECT * FROM post', (error, results, fields) => {
        if (error) {
            res.json({ msg: 'Error get all', err: error })
        }
        else{
            res.json({ msg: 'Get ALL', data: results })
        }
    });

});

// CRUD: Read
router.get('/article/:id', (req, res) => {

    // Récupérer le paramêtre d'une route
    const routeParam = req.params.id;

    // Récupérer des données SQL
    connection.query(`SELECT * FROM post WHERE _id = ${routeParam}`, (error, results, fields) => {
        if (error) {
            res.json({ msg: 'Error get one', err: error })
        }
        else{
            res.json({ msg: 'Get One', data: results })
        }
    });
});

// CRUD: Update
router.put('/article/:id', (req, res) => {

    // Récupérer le paramêtre d'une route
    const routeParam = req.params.id;


    /* 
    Vérifier la présence du title et du content dans la requête client
    */
   if( req.body && req.body.title.length > 0 && req.body.content.length > 0 ){
       
        // Définition de l'item
        const editedItem  = { title: req.body.title, content: req.body.content };
    
        // Modifier des données SQL
        connection.query(`UPDATE post  SET title = ?, content = ?  WHERE _id = ${routeParam}`, [req.body.title, req.body.content] , (error, results, fields) => {
            if (error) {
                res.json({ msg: 'Error update', err: error })
            }
            else{
                res.json({ msg: 'Update', data: results })
            }
        });
   }

   else{
        res.json({ msg: 'Create', error: 'No data' })
   }
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

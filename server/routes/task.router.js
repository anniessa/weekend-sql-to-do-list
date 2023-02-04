const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//POST
router.post('/', (req,res) => {
    const newTask = req.body;
    const queryText = `
    INSERT INTO "tasks" ("title", "notes", "date", "completed")
    VALUES ($1, $2, $3, $4);`;
    const queryParams = [
        newTask.title,
        newTask.notes,
        newTask.date,
        newTask.completed
    ]
    pool.query(queryText, queryParams)
    .then((result) => {
        console.log("new task results", result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error making query ${queryText}`, error);
        res.sendStatus(500);
    });
});

//GET
router.get('/', (req,res) => {
    let queryText = `SELECT * FROM "tasks";`;
    pool.query(queryText)
    .then((result)=> {
        res.send((result.rows))
    })
    .catch((error) => {
        console.log(`Error making queryText: ${queryText}`, error);
        res.sendStatus(500);
    });
});


//PUT

//DELETE


module.exports = router;
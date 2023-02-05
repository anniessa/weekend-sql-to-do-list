const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.post('/', (req,res) => {
    const newTask = req.body;
    const queryText = `
    INSERT INTO "tasks" ("task", "date", "completed")
    VALUES ($1, $2, $3);`;
    const queryParams = [
        newTask.task,
        newTask.date,
        newTask.completed
    ]
    pool.query(queryText, queryParams)
    .then((result) => {
        console.log("new task results:", result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error making query ${queryText}`, error);
        res.sendStatus(500);
    });
});


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


router.delete('/:id', (req,res) => {
    let queryText = `
    DELETE FROM "tasks"
    WHERE "id"=$1;`;
    let queryParams = [req.params.id];
    pool.query(queryText, queryParams)
    .then((dbRes) => {
        res.sendStatus(204);
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;
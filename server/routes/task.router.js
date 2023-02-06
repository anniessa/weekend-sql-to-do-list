const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.post('/', (req,res) => {
    const newTask = req.body;
    const queryText = `
    INSERT INTO "tasks" ("task", "date", "time", "completed")
    VALUES ($1, $2, $3, $4);`;
    const queryParams = [
        newTask.task,
        newTask.date,
        newTask.time,
        newTask.completed
    ]
    pool.query(queryText, queryParams)
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error making query ${queryText}`, error);
        res.sendStatus(500);
    });
});


router.get('/', (req,res) => {
    let queryText = `SELECT * FROM "tasks" ORDER BY "completed" ASC;`;
    pool.query(queryText)
    .then((result)=> {
        res.send((result.rows))
    })
    .catch((error) => {
        console.log(`Error making queryText: ${queryText}`, error);
        res.sendStatus(500);
    });
});

router.put('/:id', (req,res) => {
    let queryText = `
    UPDATE "tasks"
    SET "completed" = $1
    WHERE "id"=$2;`;
    let queryParams = [req.body.completed, req.params.id];
    pool.query(queryText, queryParams)
    .then((dbRes) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('PUT /tasks/:id failed', error);
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
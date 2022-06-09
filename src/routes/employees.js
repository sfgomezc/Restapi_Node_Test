const { Router } = require('express');
const router = Router();
const http = require('http');
const apiEmp = 'http://dummy.restapiexample.com/api/v1/employees';
const apiEmpId = 'http://dummy.restapiexample.com/api/v1/employee/';


router.get('/test', (req, res) => {
    // res.send('Hello World');
    const data = {
        "Name": "Steven Gomez",
        "Age": 36,
        "email": "steven.gomez.c@gmail.com"
    };
    res.json(data);
});

router.get('/', (req, res) => {

    http.get(apiEmp, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            if (resp.statusCode == 429)
                res.status(429).json({error: 'Too many requests. try in a few seconds'});
            else
                res.json(JSON.parse(data));
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

router.get('/:id', (req, res) => {
    
    const { id } = req.params;
    http.get(apiEmpId+id, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            if (resp.statusCode == 429)
            res.status(429).json({error: 'Too many requests. try in a few seconds'});
            else
                res.json(JSON.parse(data));
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

module.exports = router;

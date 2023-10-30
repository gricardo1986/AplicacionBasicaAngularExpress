var express = require("express");
var cors = require("cors");
var app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => console.log("Server running on port 3000"));

app.get("/url",
    (req, res, next) => {
        res.json(["Paris", "Francia", "México", "Argentina", "Santiago de Chile"])
    });

var ciudades = ["Paris", "Francia", "México", "Argentina", "Santiago de Chile", "México", "España", "Brazil", "Argentina", "Venezuela", "Colombia", "Ecuador", "Peru", "Japon", "China"];
app.get("/ciudades",
    (req, res, next) => {
        res.json(ciudades.filter(
            (c) =>
            // Donde "req.query.q" la "q" es la variable que se pasa por parametro
            c.toLocaleLowerCase().indexOf(req.query.q.toString().toLocaleLowerCase()) > -1
        ));
    });

var misDestinos = [];

app.get("/my", (req, res, next) => res.json(misDestinos));

app.post("/my", (req, res, next) => {
    console.log(req.body);
    // misDestinos = req.body;
    misDestinos.push(req.body);
    res.json(misDestinos);
});

app.get("/api/translation", (req, res, next) => res.json([
    { lang: req.query.lang, key: 'Hola', value: 'Hello' + req.query.lang }
]));
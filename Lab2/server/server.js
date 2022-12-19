const express = require('express');
const bodyParser = require('body-parser')
const db = require('./queries')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "bazepodataka",
    database: "Popularni_filmovi"
});

client.connect();
client.query(" (SELECT array_to_json(array_agg(row_to_json(t))) FROM (SELECT film.ime_film, film.datum_izdavanja, film.ocjena, film.trajanje_min,(select array_to_json(array_agg(row_to_json(d))) from (select ime_zarn from je_zarn natural join zarn where id_film=film.id_film) d) as zarn,(select array_to_json(array_agg(row_to_json(d))) from (select ime_drzava from sniman_u natural join drzava where id_film=film.id_film) d) as drzava,(select array_to_json(array_agg(row_to_json(d))) from (select ime_redatelj, prezime_redatelj from redatelji natural join je_redatelj where id_film=film.id_film) d) as redatelj,(select array_to_json(array_agg(row_to_json(d))) from (select ime_glumac, prezime_glumac from glumi_u natural join glumci where id_film=film.id_film) d) as glumci,(select array_to_json(array_agg(row_to_json(d))) from (select ime_nagrada, datum_osvajanja from je_osvojio natural join nagrada where id_film=film.id_film) d) as nagrade,film.box_office,film.budzet FROM film) t )", (err, { rows })=>{

    if ( err ){
        console.log({ err });
    } else {
        
        console.log(rows[0]);
    }


    
    app.get('/json_table', (req,res) => {
         res.json(rows);
    });

    client.end();
    
});


app.get('/download_json', (req, res) => res.download('./popularni-filmovi.json'));
app.get('/download_csv', (req, res) => res.download('./popularni-filmovi.csv'));

app.get('/movies/all_movies', db.getAllMovies)
app.get('/movies/:id', db.getMovieById)

app.get('/actors', db.getActors)
app.get('/directors', db.getDirectors)
app.get('/awards', db.getAwards)

app.post('/movies', db.createMovie)
app.put('/movies/:id', db.updateMovie)
app.delete('/movies/:id', db.deleteMovie)


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });

 
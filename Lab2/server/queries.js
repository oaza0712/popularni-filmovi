const { stringify } = require("querystring");

const Pool = require("pg").Pool;
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "bazepodataka",
    database: "Popularni_filmovi"
});

const getAllMovies = (request, response) => {
  pool.query(
    " (SELECT array_to_json(array_agg(row_to_json(t))) FROM (SELECT film.ime_film, film.datum_izdavanja, film.ocjena, film.trajanje_min,(select array_to_json(array_agg(row_to_json(d))) from (select ime_zarn from je_zarn natural join zarn where id_film=film.id_film) d) as zarn,(select array_to_json(array_agg(row_to_json(d))) from (select ime_drzava from sniman_u natural join drzava where id_film=film.id_film) d) as drzava,(select array_to_json(array_agg(row_to_json(d))) from (select ime_redatelj, prezime_redatelj from redatelji natural join je_redatelj where id_film=film.id_film) d) as redatelj,(select array_to_json(array_agg(row_to_json(d))) from (select ime_glumac, prezime_glumac from glumi_u natural join glumci where id_film=film.id_film) d) as glumci,(select array_to_json(array_agg(row_to_json(d))) from (select ime_nagrada, datum_osvajanja from je_osvojio natural join nagrada where id_film=film.id_film) d) as nagrade,film.box_office,film.budzet FROM film) t ) ",

    (error, results) => {
      if (error) {
       
        throw error;
      }
      let proba = JSON.stringify(results.rows[0]["array_to_json"].flat());
      response.status(200).send(`{
        "status": "OK",
        "message": "Fetched all movies",
        "@context": {
          "@vocab": "http://schema.org/",
          "glumci": "actor",
          "ime_film": "name",
          "response":"movie"
          },
        "response": 
          ${proba}
        
       }`);
    }
  );
};
const getMovieById = (request, response) => {
    const id = parseInt(request.params.id)

  pool.query(
    "(SELECT array_to_json(array_agg(row_to_json(t))) FROM (SELECT film.ime_film, film.datum_izdavanja, film.ocjena, film.trajanje_min,(select array_to_json(array_agg(row_to_json(d))) from (select ime_zarn from je_zarn natural join zarn where id_film=film.id_film) d) as zarn,(select array_to_json(array_agg(row_to_json(d))) from (select ime_drzava from sniman_u natural join drzava where id_film=film.id_film) d) as drzava,(select array_to_json(array_agg(row_to_json(d))) from (select ime_redatelj, prezime_redatelj from redatelji natural join je_redatelj where id_film=film.id_film) d) as redatelj,(select array_to_json(array_agg(row_to_json(d))) from (select ime_glumac, prezime_glumac from glumi_u natural join glumci where id_film=film.id_film) d) as glumci,(select array_to_json(array_agg(row_to_json(d))) from (select ime_nagrada, datum_osvajanja from je_osvojio natural join nagrada where id_film=film.id_film) d) as nagrade,film.box_office,film.budzet FROM film WHERE id_film = $1) t ) ",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      let proba = JSON.stringify(results.rows[0]["array_to_json"][0]);
      let status = "OK";
      let message = "Fetched movie by id" ;
      let returnStatus = 200;
      console.log('REsults rows ', results.rows[0]["array_to_json"]);
      
        if(results.rows[0]["array_to_json"]==null){
          returnStatus = 404;
          status = '404 not found,';
          message = 'Movie with that id doesnt exist,'
          proba = 'null'
        }


        
      response.status(returnStatus).send((`{
        "status": "${status}",
        "message": "${message}",
        "@context": {
          "@vocab": "http://schema.org/",
          "glumci": "actor",
          "ime_film": "name",
          "response":"movie"
          },
        "response": 
          ${proba}
       }`));
    }
  );
};

const getActors = (request, response) => {
  String.prototype.removeCharAt = function (i) {
    console.log("pozvan")
    var tmp = this.split(''); // convert to an array
    tmp.splice(i - 1 , 1); // remove 1 element from the array (adjusting for non-zero-indexed counts)
    return tmp.join(''); // reconstruct the string
}
  pool.query(
    "(SELECT array_to_json(array_agg(row_to_json(t))) FROM (SELECT glumci.ime_glumac, glumci.prezime_glumac FROM glumci) t ) ",

    (error, results) => {
      if (error) {
        throw error;
      }
      let proba = JSON.stringify(results.rows[0]["array_to_json"].flat());
      /*let resp;
      for(let i = 0; i < proba.length; i++){
          resp[i] = resp[i+1];
      }*/
      /*
      proba.splice(0, 1);
          proba = proba.splice(proba.length-1, 1);

      */
    /* for(let i = 0; i < proba.length;i++){
      console.log("REMOVE_loop["+i+"]",proba[i] )

     }*/

     /*
      console.log("REMOVE: ",proba[0] )
      console.log("REMOVE: ",proba[proba.length-1] )

      proba =  proba.removeCharAt(0);
      proba = proba.removeCharAt(proba.length-1);
      proba = proba.replace("[", "");
      console.log("REMOVE: ",proba[0] );
      console.log("REMOVE: ",proba[proba.length-1] );
*/
      /*for(let i = 0; i < proba.length; i++){
        console.log("REMOVE_loop["+i+"]",proba[i] )
  
       }
      */
      response.status(200).send(`{
        "status": "OK",
        "message": "Fetched all actors",
        "@context": {
          "@vocab": "http://schema.org/",
          "ime_glumac": "name",
          "prezime_glumac": "familiy_name",
          "response":"actor"
          },
        "response": ${proba}
       }`);
    }
  );}

  const getDirectors = (request, response) => {
    pool.query(
      "(SELECT array_to_json(array_agg(row_to_json(t))) FROM (SELECT ime_redatelj, prezime_redatelj FROM redatelji) t ) ",
  
      (error, results) => {
        if (error) {
          throw error;
        }
        let proba = JSON.stringify(results.rows[0]["array_to_json"].flat());
        response.status(200).send(`{
          "status": "OK",
          "message": "Fetched all directors",
          "@context": {
            "@vocab": "http://schema.org/",
            "ime_redatelj": "name",
            "prezime_redatelj": "familiy_name",
            "response":"director"
            },
          "reponse": ${proba}
          
         }`);
      }
    );}


    const getCountry = (request, response) => {
      pool.query(
        "(SELECT array_to_json(array_agg(row_to_json(t))) FROM (SELECT ime_drzava FROM drzava) t ) ",

        (error, results) => {
          if (error) {
            throw error;
          }
          let proba = JSON.stringify(results.rows[0]["array_to_json"].flat());

          response.status(200).send(`{
            "status": "OK",
            "message": "Fetched all countries",
            "@context": {
              "@vocab": "http://schema.org/",
              "ime_drzava": "name",
              "response":"Country"
              },
            "reponse": 
              ${proba}
            
           }`);
        }
      );}


const createMovie = (request, response) => {
  var {ime_drzava} = request.body
  
  pool.query('INSERT INTO public.drzava (ime_drzava) VALUES ($1) RETURNING id_drzava;' + '', [ ime_drzava ], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`{
      "status": "OK",
      "message": "Created country object",
      "@context": {
        "@vocab": "http://schema.org/",
        "id_drzava": "identifier"
        },
      "reponse": {
      "id_drzava":  ${results.rows[0].id_drzava}
      }
     }`)
  })
}

const updateMovie = (request, response) => {
  const id_drzava = parseInt(request.params.id)
  var {ime_drzava} = request.body
  let proba = id_drzava;
  let status = "OK";
  let message = "Updated country by id" ;
  let returnStatus = 200;
  let flag = false;
    pool.query("Select id_drzava from drzava ",  (error, results) => {
        
       for(let i = 0; i < results.rowCount; i++){
        if (id_drzava == results.rows[i].id_drzava ){
          flag = true;
        }
       }
       if(!flag){
        console.log('nema tog id');
        returnStatus = 404;
          status = '404 not found,';
          message = 'Country with that id doesnt exist,'
          proba = 'null'
       }
        
      })
 

  pool.query(
    'UPDATE public.drzava SET ime_drzava = $1 WHERE id_drzava = $2 RETURNING id_drzava',
    [ime_drzava,  id_drzava],
    (error, results) => {
        
      response.status(returnStatus).send((`{
        "status": "${status}",
        "message": "${message}",
        "@context": {
          "@vocab": "http://schema.org/",
          "id_drzava": "identifier"
          },
        "reponse": 
          ${proba}
        
       }`));
    }
  )
}

const deleteMovie = (request, response) => {
  const id_drzava = parseInt(request.params.id)
  let proba = id_drzava;
  let status = "OK";
  let message = "Deleted country by id" ;
  let returnStatus = 200;
  let flag = false;
    pool.query("Select id_drzava from drzava ",  (error, results) => {
        
       for(let i = 0; i < results.rowCount; i++){
        if (id_drzava == results.rows[i].id_drzava ){
          flag = true;
        }
       }
       if(!flag){
        console.log('nema tog id');
        returnStatus = 404;
          status = '404 not found,';
          message = 'Country with that id doesnt exist,'
          proba = 'null'
       }
        
      })
  pool.query('DELETE FROM drzava WHERE id_drzava = $1', [id_drzava], (error, results) => {
      
    response.status(returnStatus).send((`{
      "status": "${status}",
      "message": "${message}",
      "@context": {
        "@vocab": "http://schema.org/",
        "id_drzava": "identifier"
        },
      "reponse": 
        ${proba}
     }`));
  })
}

module.exports = {
getAllMovies,
getMovieById,
createMovie,
updateMovie,
deleteMovie,
getActors,
getDirectors,
getCountry
};

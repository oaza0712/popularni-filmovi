import React from "react";
import "./home.css";
import { OidcSecure } from "@axa-fr/react-oidc";
import { useOidcUser } from "@axa-fr/react-oidc";
import { Route, Redirect, redirect } from "react-router";
import Datatable from "./datatable";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Link, Routes } from "react-router-dom";
import { useOidc, useOidcIdToken } from "@axa-fr/react-oidc";
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import { ExportToCsv } from 'export-to-csv';


export default function Header() {
  const { login, logout, isAuthenticated } = useOidc();
  const { idToken, idTokenPayload } = useOidcIdToken();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:8000/json_table")
      .then((response) => {
        console.log("HEADER",response);
        return response.json();
      })
      .then((result) => setMovies(toString(result)))
      .catch((error) => console.log(error));
  }, []);

  function toString(result) {
    var movies = [];

    let list = result[0]["array_to_json"];
    for (let i = 0; i < list.length; i++) {
      let movie = {};

      movie["ime_film"] = result[0]["array_to_json"][i]["ime_film"];
      movie["trajanje_min"] = result[0]["array_to_json"][i]["trajanje_min"];
      movie["budzet"] = result[0]["array_to_json"][i]["budzet"];
      movie["box_office"] = result[0]["array_to_json"][i]["box_office"];
      movie["ocjena"] = result[0]["array_to_json"][i]["ocjena"];
      movie["datum_izdavanja"] =
        result[0]["array_to_json"][i]["datum_izdavanja"];

      var zarn = "";
      for (let j = 0; j < result[0]["array_to_json"][i]["zarn"].length; j++) {
        zarn += result[0]["array_to_json"][i]["zarn"][j]["ime_zarn"];
        zarn += " ";
        movie["zarn"] = zarn;
      }

      var drzava = "";
      for (let j = 0; j < result[0]["array_to_json"][i]["drzava"].length; j++) {
        drzava +=
          result[0]["array_to_json"][i]["drzava"][j]["ime_drzava"] + " ";
        movie["drzava"] = drzava;
      }

      var redatelj = "";
      for (
        let j = 0;
        j < result[0]["array_to_json"][i]["redatelj"].length;
        j++
      ) {
        redatelj +=
          result[0]["array_to_json"][i]["redatelj"][j]["ime_redatelj"] + " ";
        redatelj +=
          result[0]["array_to_json"][i]["redatelj"][j]["prezime_redatelj"] +
          " ";
        movie["redatelj"] = redatelj;
      }

      var glumci = "";
      for (let j = 0; j < result[0]["array_to_json"][i]["glumci"].length; j++) {
        glumci +=
          result[0]["array_to_json"][i]["glumci"][j]["ime_glumac"] + " ";
        glumci +=
          result[0]["array_to_json"][i]["glumci"][j]["prezime_glumac"] + " ";
        movie["glumci"] = glumci;
      }

      var nagrade = "";
      for (
        let j = 0;
        j < result[0]["array_to_json"][i]["nagrade"].length;
        j++
      ) {
        nagrade +=
          result[0]["array_to_json"][i]["nagrade"][j]["ime_nagrada"] + " ";
        nagrade +=
          result[0]["array_to_json"][i]["nagrade"][j]["datum_osvajanja"] + " ";
        movie["nagrade"] = nagrade;
      }

      movies.push(movie);
    }
    console.log("MOVIES FROM TO STRING",movies);
    return movies;
  }
  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType })
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

  const options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'popularni_filmovi',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
 
const csvExporter = new ExportToCsv(options);
 
  const refresh = e => {

    csvExporter.generateCsv(movies);

    e.preventDefault()
    downloadFile({
      data: JSON.stringify(movies),
      fileName: 'popularni_filmovi.json',
      fileType: 'text/json',
    })
  }

  return (
    <div class="header">
      <div class="text">
        <Link to="/"> HOME </Link>
      </div>
      
      <div class="text">
        {isAuthenticated && <Button label="REFRESH DATA" onClick={refresh}/>}  

      </div>
      <div class="text">
        
        {!isAuthenticated && <button onClick={() => login("/")}>Login</button>}

        {isAuthenticated && <button onClick={() => logout()}>Logout</button>}
  
        </div>
      <div class="text"> POPULARNI FILMOVI </div>

      <div class="text">
        <Link to="/datatable"> DATA TABLE </Link>
      </div>

      <div class="text">
        
        {isAuthenticated && <Link to="/login">USER DATA </Link>}
        
        </div>
    </div>
  );
}

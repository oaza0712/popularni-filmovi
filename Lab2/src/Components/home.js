import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import DownloadFile from "./downloadFile";
import "./home.css";
export default function Home() {
  return (
    <div>
      <div class="header">
        <div class="text">
          <Link to="/">HOME</Link>
        </div>
        <div class="text">POPULARNI FILMOVI</div>
        <div class="text">
          <Link to="datatable">DATA TABLE</Link>
        </div>
      </div>
      <div class="meta">
        <h1>Otvoren skup podatka o popularnim filmovima</h1>
        <div>
          {" "}
          <DownloadFile />
        </div>
        <h2>Metapodaci</h2>
        <div class="meta">
          <div class="grey">
            <h3>Licenca: CC0 1.0</h3>
            <h3>Autor: Leona Salihović</h3>
            <div>
              Osoba koja je povezala djelo s ovom licencom posvetila je djelo
              javnoj domeni odričući se svih svojih prava na djelo širom svijeta di
              prema zakonu o autorskim pravima, uključujući sva srodna i srodna
              prava, u mjeri dopuštenoj zakonom. Možete kopirati, mijenjati,
              distribuirati i izvoditi djelo, čak i u komercijalne svrhe, sve
              bez traženja dopuštenja.
            </div>
            </div>
          </div>
          <div></div>

          <div>
            <h3>Jezik</h3>
            
              <div>hrvatski-nazivi atributa, zarnova</div>
              <div>engleski-imena filmova, nagrada i drzava</div>
            
          </div>
          <h3>Format datuma i vremena</h3>
          <div>ISO 8601</div>
          <h3>Ključne riječi</h3>
          <div>film, redatelj, glumci, zarn, nagrada</div>
          <div></div>

        <div class="meta">
          <h3>Popis atributa</h3>
          
            <div>ime_filma</div>
            <div>zarn</div>
            <div>datum_izdavanja</div>
            <div>trajanje_min</div>
            <div>ocjena</div>
            <div>drzava</div>
            <div>redatelj</div>
            <div>glumci</div>
            <div>nagrade</div>
            <div>box_office</div>
            <div>budzet</div>
          
        </div>
        <div></div>
        <div>
          <h3>Datum objavljivanja</h3>
          <div>2022-10-31</div>
        </div>
        <div>
          <h3>Zadnja izmjena</h3>
          <div>2022-10-31</div>
        </div>
      </div>
    </div>
  );
}

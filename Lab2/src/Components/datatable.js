import React from "react";
import { useEffect, useState } from "react";
import { Column } from "react-foundation";
import { DataTable } from "primereact/datatable";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./table.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { OidcSecure } from '@axa-fr/react-oidc';
import Header from "./Header";


import { FilterMatchMode, FilterOperator } from "primereact/api";

import { InputText } from "primereact/inputtext";


import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { CSVLink, CSVDownload } from "react-csv";

import { useRef } from "react";

import "./DataTableDemo.css";

export default function Datatable() {
  const [movies, setMovies] = useState([]);
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ime_film: { value: null, matchMode: FilterMatchMode.CONTAINS },
    zarn: { value: null, matchMode: FilterMatchMode.CONTAINS },
    redatelj: { value: null, matchMode: FilterMatchMode.CONTAINS },
    glumci: { value: null, matchMode: FilterMatchMode.CONTAINS },
    drzava: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nagrade: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ocjena: { value: null, matchMode: FilterMatchMode.CONTAINS },
    box_office: { value: null, matchMode: FilterMatchMode.CONTAINS },
    budzet: { value: null, matchMode: FilterMatchMode.CONTAINS },
    datum_izdavanja: { value: null, matchMode: FilterMatchMode.CONTAINS },
    trajanje_min: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    fetch("http://localhost:8000/json_table")
      .then((response) => {
        console.log(response);
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
    console.log(movies);
    return movies;
  }

  const [globalFilterValue2, setGlobalFilterValue2] = useState("");
  const onGlobalFilterChange2 = (e) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2["global"].value = value;

    setFilters2(_filters2);
    setGlobalFilterValue2(value);
  };

  const dt = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  

  const onSelectionChange = (e) => {
    setSelectedProducts(e.value);
    console.log("SELECTION", e.value);
  };
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
  
  const exportToJson = e => {
    e.preventDefault()
    downloadFile({
      data: JSON.stringify(selectedProducts),
      fileName: 'popularni_filmovi.json',
      fileType: 'text/json',
    })
  }
  const renderHeader2 = () => {
    return (
      <div>
        <CSVLink data={selectedProducts}>Export to CSV</CSVLink>
        <h4 type='button'  onClick={exportToJson}>
          <u>Export to JSON</u>
        </h4>
        <div className="flex align-items-center export-buttons"></div>
        <div className="flex justify-content-end">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue2}
              onChange={onGlobalFilterChange2}
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </div>
    );
  };

  const header2 = renderHeader2();
  return (
    

    <div>
      <Header />
      <div className="card">
        <DataTable
          value={movies}
          ref={dt}
          paginator
          className="p-datatable-customers"
          rows={10}
          dataKey="id"
          filters={filters2}
          filterDisplay="row"
          responsiveLayout="scroll"
          globalFilterFields={[
            "ime_film",
            "datum_izdavanja",
            "trajanje_min",
            "ocjena",
            "zarn",
            "drzava",
            "redatelj",
            "glumci",
            "nagrade",
            "box_office",
            " budzet",
          ]}
          header={header2}
          emptyMessage="No movies found."
          selectionMode="checkbox"
          selection={selectedProducts}
          onSelectionChange={onSelectionChange}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3em" }}
          ></Column>
          <Column
            field="ime_film"
            header="ime_film"
            filter
            filterPlaceholder="Search by ime_film"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="datum_izdavanja"
            header="datum_izdavanja"
            filter
            filterPlaceholder="Search by datum_izdavanja"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="trajanje_min"
            header="trajanje_min"
            filter
            filterPlaceholder="Search by trajanje_min"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="ocjena"
            header="ocjena"
            filter
            filterPlaceholder="Search by ocjena"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="zarn"
            header="zarn"
            filter
            filterPlaceholder="Search by zarn"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="drzava"
            header="drzava"
            filter
            filterPlaceholder="Search by drzava"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="redatelj"
            header="redatelj"
            filter
            filterPlaceholder="Search by redatelj"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="glumci"
            header="glumci"
            filter
            filterPlaceholder="Search by glumci"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="nagrade"
            header="nagrade"
            filter
            filterPlaceholder="Search by nagrade"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="box_office"
            header="box_office"
            filter
            filterPlaceholder="Search by box_office"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="budzet"
            header="budzet"
            filter
            filterPlaceholder="Search by budzet"
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>

  );
}

import React from "react";

class DownloadFile extends React.Component {
  constructor(props) {
    super(props);
  }

  downloadJSONData = () => {
    fetch("http://localhost:8000/download_json").then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "popularni-filmovi.json";
        a.click();
      });
      //window.location.href = response.url;
    });
  };

  downloadCSVData = () => {
    fetch("http://localhost:8000/download_csv").then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "popularni-filmovi.csv";
        a.click();
      });
    });
  };

  render() {
    return (
      <div id="container">
        <div>
          <h2>Preuzimanje skupa podatka</h2>
          <a href="#" onClick={this.downloadJSONData}>
            Download JSON
          </a>
        </div>
        <div>
          {" "}
          <a href="#" onClick={this.downloadCSVData}>
            Download CSV
          </a>
        </div>
      </div>
    );
  }
}

export default DownloadFile;

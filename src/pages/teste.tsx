import React, { useState } from "react";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { api } from "../utils/api";

function App() {
  const { data } = api.ocorrencias.excelFormatOcorrencias.useQuery();

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(data as any);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const blob = new Blob(
      [XLSX.write(wb, { type: "buffer", bookType: "xlsx" })],
      {
        type: "application/octet-stream",
      }
    );
    FileSaver.saveAs(blob, "data.xlsx");
  };

  if (data) {
    return (
      <div>
        <button onClick={handleDownload}>Download</button>
        <button onClick={() => console.log(data)}>ver</button>
      </div>
    );
  }
}

export default App;

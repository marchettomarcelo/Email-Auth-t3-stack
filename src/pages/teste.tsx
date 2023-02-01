// import React, { useState } from "react";
// import FileSaver from "file-saver";

// const MyComponent = () => {
//   const [data, setData] = useState([
//     { name: "John Doe", age: 32, city: "New York" },
//     { name: "Jane Doe", age: 28, city: "London" },
//   ]);

//   const handleDownload = () => {
//     const fileType = "text/csv;charset=utf-8;";
//     const fileName = "data.csv";

//     const csvData = data.map((row) => Object.values(row).join(",")).join("\n");
//     const blob = new Blob([csvData], { type: fileType });

//     FileSaver.saveAs(blob, fileName);
//   };

//   return (
//     <div>
//       <button onClick={handleDownload}>Download CSV</button>
//     </div>
//   );
// };

// export default MyComponent;

import React, { useState } from "react";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";

function App() {
  const [data, setData] = useState([
    ["name1", "city1", "some other info"],
    ["name2", "city2", "more info"],
  ]);

  const handleDownload = () => {
    const ws = XLSX.utils.aoa_to_sheet(data);
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

  return (
    <div>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

export default App;

import Papa from "papaparse";

export const fetchCSVData = async (filePath) => {
  return new Promise((resolve, reject) => {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          reject(new Error(`Failed to fetch CSV file: ${response.statusText}`));
        }
        return response.text();
      })
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            resolve(result.data);
          },
          error: (error) => {
            reject(new Error(`Error parsing CSV data: ${error.message}`));
          },
        });
      })
      .catch((error) => {
        reject(new Error(`Failed to fetch or parse CSV file: ${error.message}`));
      });
  });
};
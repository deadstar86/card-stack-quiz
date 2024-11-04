import Papa from 'papaparse';
import { useState } from 'react';

export default function useCSVImport() {
  const [cards, setCards] = useState([]);

  const importCSV = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCards(results.data); // Sets the parsed CSV data to cards state
      },
    });
  };

  return { cards, importCSV };
}

import React, { useState } from 'react';
import useCSVImport from './hooks/useCSVImport';
import CardStack from './components/CardStack';

function App() {
  const { cards, importCSV } = useCSVImport();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      importCSV(file);
    }
  };

  return (
    <div className="App">
      <h1>Card Stack Quiz</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload CSV</button>
      {cards.length > 0 && <CardStack cards={cards} />}
    </div>
  );
}

export default App;

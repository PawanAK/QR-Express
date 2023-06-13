import { useState } from "react";
import "./app.css";
import QRCode from "react-qr-code";

function App() {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);

  const generateQrcodeHandler = () => {
    if (!value) return;
    setVisible(true);
  };

  return (
    <div className="container">
      <h1>QR code Generator</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your content ..."
      />
      <button onClick={generateQrcodeHandler}>Generate</button>
      {visible && (
        <div className="qr-code-container">
          <QRCode value={value} size={300} />
        </div>
      )}
    </div>
  );
}

export default App;

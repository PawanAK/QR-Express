import { useState } from "react";

const Card = () => {
  const [input, setInput] = useState("");
  const [qr, setQr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getQrCode = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${input}`
      );
      const blob = await res.blob();
      setQr(URL.createObjectURL(blob));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQrCode = () => {
    const link = document.createElement("a");
    link.href = qr;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <form className="form" onSubmit={getQrCode}>
      <h1 className="title">QR Code Generator</h1>
      <input
        type="text"
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
        placeholder="Enter your Content..."
      />

      {isLoading && (
        <div className="loading">
          <span></span>Loading...
        </div>
      )}

      {!isLoading && qr && (
        <div>
          <img src={qr} className="qr_code" alt="QR Code" />
          <button className="download input" onClick={downloadQrCode}>
            Download QR Code
          </button>
        </div>
      )}
    </form>
  );
};

export default Card;

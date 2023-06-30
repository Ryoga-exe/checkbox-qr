import React from "react";
import { useState } from "react";
import QRCodeDrawer from "./components/QRCodeDrawer";
import "./styles/App.css";
import { ErrorCorrectionLevel } from "./types/global";

function App() {
  const [text, setText] = useState("ここにテキストを入力");
  const [errorCorrection, setErrorCorrection] = useState<ErrorCorrectionLevel>("L");

  const errorCorrectionLevels = ["L", "M", "Q", "H"];

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorCorrection(event.target.value as ErrorCorrectionLevel);
  };

  return (
    <>
      <main>
        <div className="container">
          <h1>
            <span className="text-gradient">Checkbox</span> QR
          </h1>
          <label htmlFor="input-text" id="input-text-label">
            テキスト
          </label>
          <textarea
            placeholder="ここにテキストを入力"
            rows={3}
            name="input-text"
            id="input-text"
            onChange={(event) => setText(event.target.value)}
          />
          <fieldset>
            <legend>誤り訂正レベル</legend>
            {errorCorrectionLevels.map((level) => {
              return (
                <span key={level}>
                  <input
                    type="radio"
                    id={`error-correction-level-${level}`}
                    name="error-correction-level"
                    value={level}
                    onChange={handleOptionChange}
                    checked={level === errorCorrection}
                  />
                  <label htmlFor={`error-correction-level-${level}`}>{level}</label>
                </span>
              );
            })}
          </fieldset>
        </div>
        <QRCodeDrawer text={text} errorCorrectionLevel={errorCorrection} />
      </main>
    </>
  );
}

export default App;

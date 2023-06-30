import React, { useState } from "react";
import styled from "styled-components";
import QRCodeDrawer from "src/components/QRCodeDrawer";
import { ErrorCorrectionLevel } from "src/types/global";
import "src/styles/App.css";

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin: 4.5rem 0 1rem 0;
  > span.text-gradient {
    background-image: var(--accent-gradient);
    background-size: 400%;
    background-position: 0%;
  }
`;

const Container = styled.section`
  margin: 0 auto;
  padding: 0 4vw;
  max-width: 1120px;
`;

const InlineRadio = styled.div`
  display: flex;
  background-color: white;
  border-radius: 0.4rem;
  border: 1px solid rgba(var(--accent), 25%);
  overflow: hidden;
  margin: 0.4rem 0;
  div {
    height: 45px;
    position: relative;
    flex: 1;
  }
  input {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  label {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: #b6b6b6;
    display: flex;
    background-color: #ffffff;
    background-image: none;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    border-right: 1px solid rgba(var(--accent), 25%);
    font-size: 1rem;
  }
  div:last-child label {
    border-right: 0;
  }
  input:checked + label {
    background-image: linear-gradient(45deg, #5536df, #d81b60 90%);
    font-weight: 500;
    color: #ffffff;
  }
`;

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
        <Container>
          <H1>
            <span className="text-gradient">Checkbox</span> QR
          </H1>
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
            <InlineRadio>
              {errorCorrectionLevels.map((level) => {
                return (
                  <div key={level}>
                    <input
                      type="radio"
                      id={`error-correction-level-${level}`}
                      name="error-correction-level"
                      value={level}
                      onChange={handleOptionChange}
                      checked={level === errorCorrection}
                    />
                    <label htmlFor={`error-correction-level-${level}`}>{level}</label>
                  </div>
                );
              })}
            </InlineRadio>
          </fieldset>
        </Container>
        <QRCodeDrawer text={text} errorCorrectionLevel={errorCorrection} />
      </main>
    </>
  );
}

export default App;

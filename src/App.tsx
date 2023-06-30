import React, { useState } from "react";
import { MarkGithubIcon } from '@primer/octicons-react'
import styled from "styled-components";
import QRCodeDrawer from "src/components/QRCodeDrawer";
import { ErrorCorrectionLevel } from "src/types/global";
import "src/styles/global.css";

const Header = styled.header`
  display: flex;
  padding: 0 0 0.25rem 0;
  margin: 4.5rem 0 1.4rem 0;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(var(--accent), 25%);
  > a {
    display: block;
    color: black;
  }
`;

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  > span.text-gradient {
    background-image: var(--accent-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 400%;
    background-position: 0%;
  }
`;

const Container = styled.section`
  margin: 0 auto;
  padding: 0 4vw;
  max-width: 1120px;
`;

const Textarea = styled.textarea`
  width: 100%;
  background-color: white;
  border-radius: 0.4rem;
  border: 1px solid rgba(var(--accent), 25%);
  padding: 1rem;
  margin: 0.4rem 0;
  +label {
    font-size: 0.85rem;
    color: #444;
  }
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
    font-size: 1.05rem;
  }
  div:last-child label {
    border-right: 0;
  }
  input:checked + label {
    background: #d81b70;
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
          <Header>
            <H1>
              <span className="text-gradient">Checkbox</span> QR
            </H1>
            <a href="https://github.com/Ryoga-exe/checkbox-qr">
              <MarkGithubIcon verticalAlign="text-bottom" size={40} />
            </a>
          </Header>
          <label htmlFor="input-text" id="input-text-label">
            テキスト
          </label>
          <Textarea
            placeholder="ここにテキストを入力"
            rows={3}
            name="input-text"
            id="input-text"
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value)}
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

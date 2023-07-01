import { useEffect, useRef, useState } from "react";
import qrcode from "qrcode-generator";
import styled from "styled-components";
import type { ErrorCorrectionLevel } from "src/types/global";

const QRWrapper = styled.section`
  padding: 3rem 0;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
    input {
    display: block;
    margin: 0;
  }
`;

interface QRCodeDrawerProps {
  text: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
}

function QRCodeDrawer({ text, errorCorrectionLevel }: QRCodeDrawerProps) {
  const [matrix, setMatrix] = useState<boolean[][]>([[true]]);
  const wrapperRef = useRef(null);
  const handleCheckboxChenge = (i: number, j: number) => {
    const newMatrix = [...matrix];
    newMatrix[i][j] = !newMatrix[i][j];
    setMatrix(newMatrix);
  };
  useEffect(() => {
    qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
    const qr = qrcode(0, errorCorrectionLevel);
    qr.addData(text);
    qr.make();
    const newMatrix = [];
    for (let i = 0; i < qr.getModuleCount(); i++) {
      const row = [];
      for (let j = 0; j < qr.getModuleCount(); j++) {
        row.push(qr.isDark(i, j));
      }
      newMatrix.push(row);
    }
    setMatrix(newMatrix);
  }, [text, errorCorrectionLevel]);

  return (
    <QRWrapper ref={wrapperRef}>
      {(function () {
        const res = [];
        for (let i = 0; i < matrix.length; i++) {
          const wrapper = [];
          for (let j = 0; j < matrix.length; j++) {
            wrapper.push(
              <input
                type="checkbox"
                onChange={() => handleCheckboxChenge(i, j)}
                checked={matrix[i][j]}
                key={`qr-${i}-${j}`}
              />
            );
          }
          res.push(<CheckboxWrapper key={`wrap-${i}`}>{wrapper}</CheckboxWrapper>);
        }
        return <>{res}</>;
      })()}
    </QRWrapper>
  );
}

export default QRCodeDrawer;

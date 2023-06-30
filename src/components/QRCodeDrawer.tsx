import qrcode from "qrcode-generator";
import type { ErrorCorrectionLevel } from "src/types/global";
import { useEffect, useState } from "react";

interface QRCodeDrawerProps {
  text: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
}

function QRCodeDrawer({ text, errorCorrectionLevel }: QRCodeDrawerProps) {
  const [matrix, setMatrix] = useState<boolean[][]>([[true]]);
  const handleCheckboxChenge = (i: number, j: number) => {
    const newMatrix = [...matrix];
    newMatrix[i][j] = !newMatrix[i][j];
    setMatrix(newMatrix);
  };
  useEffect(() => {
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
    <div>
      {(function () {
        const res = [];
        for (let i = 0; i < matrix.length; i++) {
          const wrapper = [];
          for (let j = 0; j < matrix.length; j++) {
            wrapper.push(
              <input
                type="checkbox"
                className="checkbox"
                onChange={() => handleCheckboxChenge(i, j)}
                checked={matrix[i][j]}
                key={`qr-${i}-${j}`}
              />
            );
          }
          res.push(
            <div className="checkbox-wrap" key={`wrap-${i}`}>
              {wrapper}
            </div>
          );
        }
        return <div>{res}</div>;
      })()}
    </div>
  );
}

export default QRCodeDrawer;

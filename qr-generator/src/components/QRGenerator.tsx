import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import * as QRCodeLib from 'qrcode';
import StudentDataForm from './StudentDataForm';

interface QRGeneratorProps {}

type GeneratorMode = 'text' | 'student';

const QRGenerator: React.FC<QRGeneratorProps> = () => {
  const [mode, setMode] = useState<GeneratorMode>('text');
  const [text, setText] = useState<string>('');
  const [studentJsonData, setStudentJsonData] = useState<string>('');
  const [qrValue, setQrValue] = useState<string>('');
  const [size, setSize] = useState<number>(256);
  const [bgColor, setBgColor] = useState<string>('#FFFFFF');
  const [fgColor, setFgColor] = useState<string>('#000000');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = () => {
    if (mode === 'text' && text.trim()) {
      setQrValue(text);
    } else if (mode === 'student' && studentJsonData.trim()) {
      setQrValue(studentJsonData);
    }
  };

  const handleStudentDataChange = (jsonData: string) => {
    setStudentJsonData(jsonData);
  };

  const downloadQR = async () => {
    if (!qrValue) return;
    
    try {
      const canvas = canvasRef.current;
      if (canvas) {
        await QRCodeLib.toCanvas(canvas, qrValue, {
          width: size,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        });
        
        // Create download link
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL();
        link.click();
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const clearQR = () => {
    setText('');
    setStudentJsonData('');
    setQrValue('');
  };

  const switchMode = (newMode: GeneratorMode) => {
    setMode(newMode);
    clearQR();
  };

  return (
    <div className="qr-generator">
      <div className="qr-container">
        <h1>QR Code Generator</h1>
        
        {/* Mode Selector */}
        <div className="mode-selector">
          <button 
            className={`mode-btn ${mode === 'text' ? 'active' : ''}`}
            onClick={() => switchMode('text')}
          >
            📝 Teks/URL Biasa
          </button>
          <button 
            className={`mode-btn ${mode === 'student' ? 'active' : ''}`}
            onClick={() => switchMode('student')}
          >
            👨‍🎓 Data Siswa JSON
          </button>
        </div>

        {/* Student Data Form */}
        {mode === 'student' && (
          <StudentDataForm onDataChange={handleStudentDataChange} />
        )}
        
        <div className="input-section">
          {/* Text Input - Only show in text mode */}
          {mode === 'text' && (
            <div className="input-group">
              <label htmlFor="text-input">Enter text or URL:</label>
              <textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text, URL, or any data to generate QR code..."
                rows={4}
              />
            </div>
          )}

          <div className="controls-row">
            <div className="input-group">
              <label htmlFor="size-input">Size:</label>
              <input
                id="size-input"
                type="number"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                min="128"
                max="512"
                step="32"
              />
            </div>

            <div className="input-group">
              <label htmlFor="bg-color">Background:</label>
              <input
                id="bg-color"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="fg-color">Foreground:</label>
              <input
                id="fg-color"
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
              />
            </div>
          </div>

          <div className="button-group">
            <button 
              onClick={generateQR}
              disabled={
                (mode === 'text' && !text.trim()) || 
                (mode === 'student' && (!studentJsonData || !studentJsonData.trim() || studentJsonData.trim() === '{}'))
              }
              className="generate-btn"
            >
              {mode === 'student' ? 'Generate QR Code JSON' : 'Generate QR Code'}
            </button>
            <button 
              onClick={clearQR}
              className="clear-btn"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="qr-display">
          {qrValue && (
            <div className="qr-result">
              <h3>Generated QR Code:</h3>
              <div className="qr-code-wrapper">
                <QRCode
                  value={qrValue}
                  size={size}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level="M"
                />
              </div>
              
              <div className="download-section">
                <button 
                  onClick={downloadQR}
                  className="download-btn"
                >
                  Download PNG
                </button>
                <p className="qr-info">
                  {mode === 'student' ? 'JSON Data:' : 'Text:'} <span>{qrValue}</span>
                </p>
                {mode === 'student' && (
                  <div className="json-info">
                    <p><strong>💡 Info:</strong> QR Code ini berisi data siswa dalam format JSON yang dapat di-scan dan diproses oleh aplikasi.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Hidden canvas for download functionality */}
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default QRGenerator;
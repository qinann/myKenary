import React, { useState, useRef } from 'react';

interface StudentData {
  no: string;
  id: string;
  nama: string;
  kelas: string;
  sekolah: string;
}

interface CSVUploadProps {
  onDataUploaded: (data: StudentData[]) => void;
}

const CSVUpload: React.FC<CSVUploadProps> = ({ onDataUploaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (csvText: string): StudentData[] => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    // Map headers to our expected format
    const headerMap: { [key: string]: keyof StudentData } = {
      'no': 'no',
      'nomor': 'no',
      'number': 'no',
      'id': 'id',
      'id siswa': 'id',
      'student id': 'id',
      'nama': 'nama',
      'nama lengkap': 'nama',
      'name': 'nama',
      'full name': 'nama',
      'kelas': 'kelas',
      'class': 'kelas',
      'sekolah': 'sekolah',
      'school': 'sekolah'
    };

    const data: StudentData[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      const student: Partial<StudentData> = {};
      
      headers.forEach((header, index) => {
        const mappedKey = headerMap[header];
        if (mappedKey && values[index]) {
          student[mappedKey] = values[index];
        }
      });
      
      // Only add if we have at least nama and id
      if (student.nama && student.id) {
        data.push({
          no: student.no || (i).toString(),
          id: student.id,
          nama: student.nama,
          kelas: student.kelas || '',
          sekolah: student.sekolah || ''
        });
      }
    }
    
    return data;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('File harus berformat CSV');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const text = await file.text();
      const parsedData = parseCSV(text);
      
      if (parsedData.length === 0) {
        setError('Tidak ada data valid yang ditemukan dalam file CSV');
        return;
      }

      // Save to localStorage
      localStorage.setItem('studentData', JSON.stringify(parsedData));
      localStorage.setItem('studentDataTimestamp', new Date().toISOString());
      
      setUploadedCount(parsedData.length);
      onDataUploaded(parsedData);
      
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (err) {
      setError('Error membaca file CSV: ' + (err as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  const clearStoredData = () => {
    localStorage.removeItem('studentData');
    localStorage.removeItem('studentDataTimestamp');
    setUploadedCount(0);
    onDataUploaded([]);
  };

  const getStoredDataInfo = () => {
    const storedData = localStorage.getItem('studentData');
    const timestamp = localStorage.getItem('studentDataTimestamp');
    
    if (storedData && timestamp) {
      const data = JSON.parse(storedData);
      const date = new Date(timestamp);
      return {
        count: data.length,
        date: date.toLocaleString('id-ID')
      };
    }
    return null;
  };

  const storedInfo = getStoredDataInfo();

  return (
    <div className="csv-upload-container">
      <h3>📁 Upload Data Siswa (CSV)</h3>
      
      <div className="upload-section">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="file-input"
        />
        
        <div className="upload-info">
          <p><strong>Format CSV yang didukung:</strong></p>
          <ul>
            <li>Header: no, id, nama, kelas, sekolah</li>
            <li>Atau: nomor, id siswa, nama lengkap, kelas, sekolah</li>
            <li>Minimal harus ada kolom: nama dan id</li>
          </ul>
        </div>
      </div>

      {isUploading && (
        <div className="upload-status uploading">
          <span>📤 Mengupload dan memproses file...</span>
        </div>
      )}

      {error && (
        <div className="upload-status error">
          <span>❌ {error}</span>
        </div>
      )}

      {uploadedCount > 0 && (
        <div className="upload-status success">
          <span>✅ Berhasil mengupload {uploadedCount} data siswa</span>
        </div>
      )}

      {storedInfo && (
        <div className="stored-data-info">
          <h4>💾 Data Tersimpan</h4>
          <p><strong>Jumlah:</strong> {storedInfo.count} siswa</p>
          <p><strong>Diupload:</strong> {storedInfo.date}</p>
          <button 
            onClick={clearStoredData}
            className="clear-button"
          >
            🗑️ Hapus Data
          </button>
        </div>
      )}
    </div>
  );
};

export default CSVUpload;
import React, { useState, useEffect } from 'react';
import CSVUpload from './CSVUpload';

interface StudentData {
  no: string;
  id: string;
  nama: string;
  kelas: string;
  sekolah: string;
}

interface StudentDataFormProps {
  onDataChange: (jsonData: string) => void;
}

const StudentDataForm: React.FC<StudentDataFormProps> = ({ onDataChange }) => {
  const [formData, setFormData] = useState<StudentData>({
    no: '',
    id: '',
    nama: '',
    kelas: '',
    sekolah: ''
  });
  
  const [uploadedStudents, setUploadedStudents] = useState<StudentData[]>([]);
  const [selectedStudentIndex, setSelectedStudentIndex] = useState<number>(-1);

  // Load stored CSV data on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('studentData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUploadedStudents(parsedData);
      } catch (error) {
        console.error('Error loading stored student data:', error);
      }
    }
  }, []);

  const handleCSVDataUploaded = (data: StudentData[]) => {
    setUploadedStudents(data);
    setSelectedStudentIndex(-1);
    // Clear form when new data is uploaded
    setFormData({
      no: '',
      id: '',
      nama: '',
      kelas: '',
      sekolah: ''
    });
  };

  const handleStudentSelection = (index: number) => {
    setSelectedStudentIndex(index);
    if (index >= 0 && index < uploadedStudents.length) {
      const selectedStudent = uploadedStudents[index];
      setFormData(selectedStudent);
      onDataChange(JSON.stringify(selectedStudent, null, 2));
    } else {
      // Clear form if "Pilih Siswa" is selected
      const emptyData = {
        no: '',
        id: '',
        nama: '',
        kelas: '',
        sekolah: ''
      };
      setFormData(emptyData);
      onDataChange('');
    }
  };

  const handleInputChange = (field: keyof StudentData, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onDataChange(JSON.stringify(updatedData, null, 2));
    // Reset selection when manually editing
    setSelectedStudentIndex(-1);
  };

  const fillSampleData = () => {
    const sampleData: StudentData = {
      no: '1',
      id: 'TBJKT7001',
      nama: 'Aderra El Neymar Herrada',
      kelas: 'VII - A',
      sekolah: 'SMP TARUNA BAKTI'
    };
    setFormData(sampleData);
    onDataChange(JSON.stringify(sampleData, null, 2));
    setSelectedStudentIndex(-1);
  };

  const clearForm = () => {
    const emptyData: StudentData = {
      no: '',
      id: '',
      nama: '',
      kelas: '',
      sekolah: ''
    };
    setFormData(emptyData);
    onDataChange('');
    setSelectedStudentIndex(-1);
  };

  return (
    <div className="student-form">
      {/* CSV Upload Section */}
      <CSVUpload onDataUploaded={handleCSVDataUploaded} />
      
      {/* Student Selection from Uploaded Data */}
      {uploadedStudents.length > 0 && (
        <div className="student-selector">
          <label htmlFor="student-select">📋 Pilih Siswa dari Data CSV:</label>
          <select 
            id="student-select"
            value={selectedStudentIndex}
            onChange={(e) => handleStudentSelection(parseInt(e.target.value))}
          >
            <option value={-1}>-- Pilih Siswa --</option>
            {uploadedStudents.map((student, index) => (
              <option key={index} value={index}>
                {student.nama} ({student.id}) - {student.kelas}
              </option>
            ))}
          </select>
        </div>
      )}
      
      <div className="form-header">
        <h3>👨‍🎓 Data Siswa</h3>
        <div className="form-buttons">
          <button type="button" onClick={fillSampleData} className="sample-button">
            Gunakan Data Contoh
          </button>
          <button type="button" onClick={clearForm} className="clear-button">
            Hapus
          </button>
        </div>
      </div>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="no">No:</label>
          <input
            id="no"
            type="text"
            value={formData.no}
            onChange={(e) => handleInputChange('no', e.target.value)}
            placeholder="Nomor urut siswa"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID Siswa:</label>
          <input
            id="id"
            type="text"
            value={formData.id}
            onChange={(e) => handleInputChange('id', e.target.value)}
            placeholder="ID unik siswa (contoh: TBJKT7001)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="nama">Nama Lengkap:</label>
          <input
            id="nama"
            type="text"
            value={formData.nama}
            onChange={(e) => handleInputChange('nama', e.target.value)}
            placeholder="Nama lengkap siswa"
          />
        </div>

        <div className="form-group">
          <label htmlFor="kelas">Kelas:</label>
          <input
            id="kelas"
            type="text"
            value={formData.kelas}
            onChange={(e) => handleInputChange('kelas', e.target.value)}
            placeholder="Kelas siswa (contoh: VII - A)"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="sekolah">Sekolah:</label>
          <input
            id="sekolah"
            type="text"
            value={formData.sekolah}
            onChange={(e) => handleInputChange('sekolah', e.target.value)}
            placeholder="Nama sekolah"
          />
        </div>
      </div>

      <div className="json-preview">
        <h4>Preview JSON:</h4>
        <pre className="json-display">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>

      <div className="table-preview">
        <h4>Preview Tabel:</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>No</td>
              <td>{formData.no || '-'}</td>
            </tr>
            <tr>
              <td>ID Siswa</td>
              <td>{formData.id || '-'}</td>
            </tr>
            <tr>
              <td>Nama Lengkap</td>
              <td>{formData.nama || '-'}</td>
            </tr>
            <tr>
              <td>Kelas</td>
              <td>{formData.kelas || '-'}</td>
            </tr>
            <tr>
              <td>Sekolah</td>
              <td>{formData.sekolah || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDataForm;
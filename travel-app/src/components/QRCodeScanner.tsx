import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {X} from 'lucide-react-native';
import { Camera, CameraType } from 'react-native-camera-kit';

interface StudentData {
  no: string;
  id: string;
  nama: string;
  kelas: string;
  sekolah: string;
}

interface QRCodeScannerProps {
  visible: boolean;
  onClose: () => void;
  onScanSuccess: (studentData: StudentData) => void;
  seatNumber: number;
}

const {width, height} = Dimensions.get('window');

const QRCodeScannerComponent: React.FC<QRCodeScannerProps> = ({
  visible,
  onClose,
  onScanSuccess,
  seatNumber,
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [lastScanRaw, setLastScanRaw] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');
  const lastEventTs = useRef<number>(0);

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'Aplikasi memerlukan akses kamera untuk scan QR code',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        } catch (err) {
          console.warn(err);
          setHasPermission(false);
        }
      } else {
        // For iOS, permission is handled automatically by react-native-camera-kit
        setHasPermission(true);
      }
    };

    if (visible) {
      // Reset state pada setiap pembukaan scanner agar tidak menampilkan hasil lama
      setIsScanning(true);
      setLastScanRaw('');
      setErrorText('');
      requestCameraPermission();
    }
  }, [visible]);

  const onReadCode = (event: any) => {
    if (!isScanning) return;

    // Throttle event agar tidak memproses terlalu sering
    const now = Date.now();
    if (lastEventTs.current && now - lastEventTs.current < 150) {
      return;
    }
    lastEventTs.current = now;
    const qrData =
      event?.nativeEvent?.codeStringValue ||
      event?.codeStringValue ||
      event?.nativeEvent?.codeString ||
      event?.codeString ||
      '';
    console.log('[QRScanner] Raw QR data:', qrData);
    setLastScanRaw(qrData);
    setErrorText('');
    
    try {
      const parsed = JSON.parse(qrData);

      // Normalisasi kunci: terima bahasa Indonesia (nama, kelas, sekolah) dan Inggris (name, class, school)
      const normalized = {
        no: parsed.no?.toString?.() || parsed.seatNumber?.toString?.() || '',
        id: (parsed.id ?? parsed.ID ?? parsed.studentId ?? '').toString?.() || parsed.id || '',
        nama: parsed.nama ?? parsed.name ?? '',
        kelas: parsed.kelas ?? parsed.class ?? parsed.grade ?? '',
        sekolah: parsed.sekolah ?? parsed.school ?? '',
      } as {
        no: string;
        id: string;
        nama: string;
        kelas: string;
        sekolah: string;
      };

      console.log('[QRScanner] Parsed student:', normalized);

      if (normalized.id && normalized.nama && normalized.kelas && normalized.sekolah) {
        // Berhasil: hentikan scanning dan tutup modal
        setIsScanning(false);
        onScanSuccess(normalized);
        onClose();
      } else {
        // Fallback: coba parsing format teks baris dengan "ID:", "Nama:", "Kelas:", "Sekolah:"
        const text = String(qrData || '').trim();
        const getVal = (labelVariants: string[]) => {
          for (const label of labelVariants) {
            const re = new RegExp(`${label}\\s*:\\s*(.+)`, 'i');
            const m = text.match(re);
            if (m && m[1]) return m[1].trim();
          }
          return '';
        };
        const fallback = {
          no: getVal(['No', 'No.', 'Seat', 'Bangku']),
          id: getVal(['ID', 'Id', 'id', 'NIS', 'NISN', 'StudentId']),
          nama: getVal(['Nama', 'Name']),
          kelas: getVal(['Kelas', 'Class', 'Grade']),
          sekolah: getVal(['Sekolah', 'School']),
        } as StudentData;

        if (fallback.id && fallback.nama && fallback.kelas && fallback.sekolah) {
          console.log('[QRScanner] Fallback parsed student:', fallback);
          setIsScanning(false);
          onScanSuccess(fallback);
          onClose();
          return;
        }

        // Jangan tampilkan Alert blokir; beri pesan non-blokir dan lanjutkan scanning
        setErrorText('QR tidak memuat kunci wajib. Gunakan JSON atau teks: ID:, Nama:, Kelas:, Sekolah:.');
      }
    } catch (error) {
      console.warn('[QRScanner] JSON parse error:', error);
      setLastScanRaw(qrData ? `PARSE_ERROR: ${String(error)} | RAW: ${qrData}` : 'PARSE_ERROR: empty payload');
      // Jika gagal JSON, coba parse format teks biasa
      const text = String(qrData || '').trim();
      const getVal = (labelVariants: string[]) => {
        for (const label of labelVariants) {
          const re = new RegExp(`${label}\\s*:\\s*(.+)`, 'i');
          const m = text.match(re);
          if (m && m[1]) return m[1].trim();
        }
        return '';
      };
      const fallback = {
        no: getVal(['No', 'No.', 'Seat', 'Bangku']),
        id: getVal(['ID', 'Id', 'id', 'NIS', 'NISN', 'StudentId']),
        nama: getVal(['Nama', 'Name']),
        kelas: getVal(['Kelas', 'Class', 'Grade']),
        sekolah: getVal(['Sekolah', 'School']),
      } as StudentData;

      if (fallback.id && fallback.nama && fallback.kelas && fallback.sekolah) {
        console.log('[QRScanner] Fallback parsed student:', fallback);
        setIsScanning(false);
        onScanSuccess(fallback);
        onClose();
      } else {
        setErrorText('QR bukan JSON dan tidak bisa diparse sebagai teks. Gunakan format yang didukung.');
      }
    }
  };

  const handleClose = () => {
    setIsScanning(true);
    onClose();
  };

  if (!hasPermission) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>QR Scanner</Text>
            <View style={styles.placeholder} />
          </View>
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>
              Aplikasi memerlukan akses kamera untuk scan QR code
            </Text>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scan QR Code</Text>
          <View style={styles.placeholder} />
        </View>

        {hasPermission === null ? (
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>
              Meminta izin akses kamera...
            </Text>
          </View>
        ) : !hasPermission ? (
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>
              Aplikasi memerlukan akses kamera untuk scan QR code
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionTitle}>
                Scan QR Code untuk Bangku {seatNumber}
              </Text>
              <Text style={styles.instructionText}>
                Arahkan kamera ke QR code siswa yang akan menempati bangku ini
              </Text>
              {lastScanRaw ? (
                <Text style={[styles.instructionText, {marginTop: 8}]}>Terbaca: {lastScanRaw.slice(0, 120)}</Text>
              ) : null}
              {errorText ? (
                <Text style={[styles.instructionText, {marginTop: 6, color: '#FF6B6B'}]}>{errorText}</Text>
              ) : null}
            </View>
            
            <View style={styles.cameraContainer}>
              <Camera
                style={styles.camera}
                cameraType={CameraType.Back}
                scanBarcode={true}
                onReadCode={onReadCode}
                showFrame={true}
                laserColor="#4A90E2"
                frameColor="#4A90E2"
              />
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#2C3E50',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  scanFrame: {
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  instructionContainer: {
    padding: 20,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#BDC3C7',
    textAlign: 'center',
    lineHeight: 20,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default QRCodeScannerComponent;

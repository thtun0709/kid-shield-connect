import { useState, useRef, useEffect } from 'react';
import { Smartphone, QrCode, CheckCircle2, AlertCircle, Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AppHeader } from '@/components/AppHeader';
import BottomNav from './BottomNav';
import { Html5Qrcode } from 'html5-qrcode';
import './DevicePairing.css';

const DevicePairing = () => {
  const [pairingCode, setPairingCode] = useState('');
  const [isPairing, setIsPairing] = useState(false);
  const [pairingStatus, setPairingStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerElementId = 'qr-reader';

  const handlePairDevice = async () => {
    if (pairingCode.length < 6) {
      setPairingStatus('error');
      return;
    }

    setIsPairing(true);
    setPairingStatus('idle');

    // Simulate API call
    setTimeout(() => {
      setIsPairing(false);
      setPairingStatus('success');
      setShowSuccessDialog(true);
      setPairingCode('');
      
      // Reset success dialog after 3 seconds
      setTimeout(() => {
        setShowSuccessDialog(false);
        setPairingStatus('idle');
      }, 3000);
    }, 2000);
  };

  const startScanning = async () => {
    try {
      setIsScanning(true);
      setPairingStatus('idle');
      
      // Initialize scanner if not already initialized
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(scannerElementId);
      }

      // Start scanning
      await scannerRef.current.start(
        { facingMode: 'environment' }, // Use back camera on mobile
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          // QR code detected successfully
          handleScanResult(decodedText);
        },
        (errorMessage) => {
          // QR code scan error (can be ignored for continuous scanning)
          console.log('QR scan error:', errorMessage);
        }
      );
    } catch (error) {
      console.error('Error starting camera:', error);
      setPairingStatus('error');
      setIsScanning(false);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        setIsScanning(false);
      } catch (error) {
        console.error('Error stopping scanner:', error);
      }
    }
  };

  const handleScanResult = async (code: string) => {
    // Stop scanning first
    await stopScanning();
    
    // Set the pairing code
    setPairingCode(code);
    
    // Automatically start pairing process
    setIsPairing(true);
    setPairingStatus('idle');

    // Simulate API call
    setTimeout(() => {
      setIsPairing(false);
      setPairingStatus('success');
      setShowSuccessDialog(true);
      setPairingCode('');
      
      // Reset success dialog after 3 seconds
      setTimeout(() => {
        setShowSuccessDialog(false);
        setPairingStatus('idle');
      }, 3000);
    }, 2000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [isScanning]);

  return (
    <div className="min-h-screen gradient-safe pb-24">
      {/* Header */}
      <AppHeader 
        icon={Smartphone}
        title="Ghép nối thiết bị"
        subtitle="Kết nối với phụ huynh"
      />

      {/* Main Content */}
      <div className="px-6 pt-8 max-w-lg mx-auto space-y-6">
        {/* QR Code Section */}
        <div className="bg-card rounded-3xl p-6 shadow-card animate-fade-in">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex items-center justify-center rounded-2xl overflow-hidden relative">
                {isScanning ? (
                  <div id={scannerElementId} className="w-full max-w-sm" />
                ) : (
                  <div className="flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted">
                    <QrCode className="h-32 w-32 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">Quét mã QR</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {isScanning 
                  ? 'Đưa mã QR vào khung hình để quét'
                  : 'Quét mã QR từ ứng dụng của phụ huynh để kết nối nhanh'
                }
              </p>
              
              {!isScanning ? (
                <Button
                  onClick={startScanning}
                  variant="outline"
                  className="gap-2"
                  disabled={isPairing}
                >
                  <Camera className="h-4 w-4" />
                  Mở máy ảnh quét mã
                </Button>
              ) : (
                <Button
                  onClick={stopScanning}
                  variant="destructive"
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Đóng máy ảnh
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-sm text-muted-foreground font-medium">HOẶC</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Manual Pairing Section */}
        <div className="bg-card rounded-3xl p-6 shadow-card animate-fade-in space-y-4">
          <div>
            <h3 className="font-semibold text-card-foreground mb-2">Nhập mã ghép nối</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Nhập mã 6-8 ký tự từ ứng dụng phụ huynh
            </p>
          </div>

          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Ví dụ: PS-9F3A2B"
              value={pairingCode}
              onChange={(e) => {
                setPairingCode(e.target.value.toUpperCase());
                setPairingStatus('idle');
              }}
              className={`h-14 text-center text-lg font-mono tracking-wider ${
                pairingStatus === 'error' ? 'border-destructive' : ''
              }`}
              disabled={isPairing}
            />

            {pairingStatus === 'error' && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>Mã không hợp lệ. Vui lòng kiểm tra lại.</span>
              </div>
            )}

            <Button
              onClick={handlePairDevice}
              disabled={isPairing || pairingCode.length < 6}
              className="w-full h-12 text-base font-semibold"
            >
              {isPairing ? 'Đang kết nối...' : 'Kết nối thiết bị'}
            </Button>
          </div>
        </div>

        {/* Instructions Card */}
        <div className="bg-accent/10 border border-accent/20 rounded-3xl p-5">
          <h4 className="font-semibold text-accent mb-3 flex items-center gap-2">
            <span className="text-lg">ℹ️</span> Hướng dẫn
          </h4>
          <ol className="text-sm text-foreground/80 space-y-2 list-decimal list-inside">
            <li>Mở ứng dụng Parental Shield trên thiết bị phụ huynh</li>
            <li>Chọn "Thêm thiết bị mới" trong mục Quản lý thiết bị</li>
            <li>Quét mã QR hoặc lấy mã ghép nối</li>
            <li>Nhập mã vào ô bên trên và nhấn "Kết nối thiết bị"</li>
          </ol>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">Kết nối thành công!</DialogTitle>
            <DialogDescription className="text-center">
              Thiết bị của bạn đã được kết nối với phụ huynh. Bạn đã sẵn sàng để được bảo vệ.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default DevicePairing;

import { useState } from 'react';
import { User, Clock, Shield, BookOpen, LogOut, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PinPad } from '@/components/ui/pin-pad';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AppHeader } from '@/components/AppHeader';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import BottomNav from './BottomNav';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const username = 'Thanh Tùng'; // Fixed username
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [parentPin, setParentPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const stats = [
    { label: 'Giới hạn hàng ngày', value: '3 giờ', icon: Clock },
    { label: 'Các ứng dụng an toàn', value: '6 ứng dụng', icon: Shield },
    { label: 'Thời gian học', value: '45 phút', icon: BookOpen },
  ];

  const safetyTips = [
    'Không chia sẻ thông tin cá nhân trực tuyến',
    'Luôn hỏi phụ huynh trước khi tải xuống ứng dụng mới',
    'Nghỉ ngơi đều đặn để nghỉ mắt',
    'Nói với phụ huynh nếu có điều gì trực tuyến khiến bạn khó chịu',
  ];

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
    setParentPin('');
    setPinError(false);
  };

  const handleVerifyPin = async () => {
    // Mock parent PIN - in production, this should be verified with backend
    const correctPin = '1234'; // This should come from parent's settings
    
    if (parentPin === correctPin) {
      setIsVerifying(true);
      
      // Simulate verification delay
      setTimeout(() => {
        localStorage.removeItem('kidToken');
        localStorage.removeItem('kidUsername');
        setShowLogoutDialog(false);
        toast({
          title: "Đã đăng xuất",
          description: "Hẹn gặp lại bạn! 👋",
        });
        navigate('/login');
      }, 500);
    } else {
      setPinError(true);
      
      // Auto clear error and PIN after showing error
      setTimeout(() => {
        setPinError(false);
        setParentPin('');
      }, 1500);
      
      toast({
        title: "Mã PIN không đúng",
        description: "Vui lòng hỏi phụ huynh để lấy mã PIN",
        variant: "destructive",
      });
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutDialog(false);
    setParentPin('');
    setPinError(false);
  };

  return (
    <div className="min-h-screen gradient-safe pb-12">
      {/* Header */}
      <AppHeader 
        icon={User}
        title="Thông tin cá nhân"
        subtitle="Người dùng được bảo vệ"
      />

      <div className="px-6 pt-6 max-w-lg mx-auto space-y-6">
        {/* Profile Card */}
        <Card className="p-6 flex flex-col items-center gap-4 shadow-card border-0 animate-fade-in">
          <div className="bg-primary/10 p-6 rounded-full">
            <User className="h-16 w-16 text-primary" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-card-foreground">{username}</h2>
            <p className="text-muted-foreground">Người dùng được bảo vệ</p>
          </div>
          
          <Button
            onClick={handleLogoutClick}
            variant="outline"
            className="mt-2 gap-2"
          >
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </Button>
        </Card>

        {/* Logout PIN Dialog */}
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
              </div>
              <DialogTitle className="text-center text-xl">Xác nhận đăng xuất</DialogTitle>
              <DialogDescription className="text-center">
                Nhập mã PIN của phụ huynh để đăng xuất
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <PinPad
                value={parentPin}
                onChange={(value) => {
                  setParentPin(value);
                  setPinError(false);
                  
                  // Auto verify when PIN length reaches 4
                  if (value.length === 4) {
                    const correctPin = '1234';
                    
                    if (value === correctPin) {
                      setIsVerifying(true);
                      
                      setTimeout(() => {
                        localStorage.removeItem('kidToken');
                        localStorage.removeItem('kidUsername');
                        setShowLogoutDialog(false);
                        toast({
                          title: "Đã đăng xuất",
                          description: "Hẹn gặp lại bạn! 👋",
                        });
                        navigate('/login');
                      }, 500);
                    } else {
                      setPinError(true);
                      
                      setTimeout(() => {
                        setPinError(false);
                        setParentPin('');
                      }, 1500);
                      
                      toast({
                        title: "Mã PIN không đúng",
                        description: "Vui lòng hỏi phụ huynh để lấy mã PIN",
                        variant: "destructive",
                      });
                    }
                  }
                }}
                maxLength={4}
              />
              {pinError && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive text-center font-medium">
                    ❌ Mã PIN không chính xác
                  </p>
                </div>
              )}
              <p className="text-xs text-muted-foreground text-center">
                Hỏi phụ huynh để lấy mã PIN đăng xuất
              </p>
            </div>

            <DialogFooter className="flex gap-2 sm:gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelLogout}
                disabled={isVerifying}
                className="w-full"
              >
                Hủy bỏ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label}
              className="p-4 flex flex-col items-center gap-2 shadow-card border-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className="h-6 w-6 text-primary" />
              <div className="text-center">
                <p className="text-lg font-bold text-card-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Online Safety Section */}
        <Card className="p-6 shadow-card border-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-card-foreground">
            <Shield className="h-5 w-5 text-primary" />
            Mẹo an toàn trực tuyến
          </h3>
          <ul className="space-y-3">
            {safetyTips.map((tip, index) => (
              <li key={index} className="flex gap-3 text-sm text-muted-foreground">
                <span className="text-accent flex-shrink-0">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Educational Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-6 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h4 className="font-semibold text-foreground mb-2">
            Tiếp tục học tập! 📚
          </h4>
          <p className="text-sm text-muted-foreground">
            Phụ huynh đã thiết lập các bảo vệ này vì họ quan tâm đến bạn. Tiếp tục tò mò và an toàn!
          </p>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Profile;

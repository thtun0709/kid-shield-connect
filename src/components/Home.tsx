import { useState } from 'react';
import { Shield, Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AppHeader } from '@/components/AppHeader';
import AllowedApps from './AllowedApps';
import RequestModal from './RequestModal';
import BottomNav from './BottomNav';

const Home = () => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  
  // Mock data
  const screenTimeUsed = 105; // minutes
  const screenTimeLimit = 180; // 3 hours
  const screenTimePercentage = (screenTimeUsed / screenTimeLimit) * 100;

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} giờ ${mins} phút`;
  };

  return (
    <div className="min-h-screen gradient-safe pb-24">
      {/* Header */}
      <AppHeader 
        icon={Shield}
        title="Kid Shield"
        subtitle="Chế độ an toàn đã được bật"
      />

      {/* Screen Time Card */}
      <div className="px-6 pt-6 max-w-lg mx-auto">
        <div className="bg-card rounded-3xl p-6 shadow-card animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Thời gian sử dụng màn hình hôm nay</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-bold text-primary">{formatTime(screenTimeUsed)}</span>
              <span className="text-muted-foreground"> {formatTime(screenTimeLimit)}</span>
            </div>
            
            <Progress value={screenTimePercentage} className="h-3" />
            
            <p className="text-sm text-muted-foreground">
              {formatTime(screenTimeLimit - screenTimeUsed)} còn lại hôm nay
            </p>
          </div>
        </div>
      </div>

      {/* Allowed Apps Section */}
      <div className="px-6 pt-6 max-w-lg mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-foreground">Các ứng dụng được phép sử dụng hôm nay</h3>
        <AllowedApps />
      </div>

      {/* Digital Wellbeing Tip */}
      <div className="px-6 pt-6 max-w-lg mx-auto">
        <div className="bg-accent/10 border border-accent/20 rounded-3xl p-5 animate-fade-in">
          <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
              <span className="text-lg">💡</span> Mẹo hôm nay
          </h4>
          <p className="text-sm text-foreground/80">
            Nhớ nghỉ ngơi ít nhất 30 phút để nghỉ mắt và tập thể dục!
          </p>
        </div>
      </div>

      {/* Floating Request Button */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center px-6">
        <Button 
          size="lg"
          onClick={() => setIsRequestOpen(true)}
          className="shadow-soft rounded-full h-14 px-8 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          <Plus className="h-5 w-5" />
          Yêu cầu thêm thời gian
        </Button>
      </div>

      <RequestModal open={isRequestOpen} onOpenChange={setIsRequestOpen} />
      <BottomNav />
    </div>
  );
};

export default Home;

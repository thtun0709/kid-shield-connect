import { User, Clock, Shield, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import BottomNav from './BottomNav';

const Profile = () => {
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

  return (
    <div className="min-h-screen gradient-safe pb-12">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-4 shadow-soft">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-semibold">Thông tin cá nhân</h1>
        </div>
      </div>

      <div className="px-6 pt-6 max-w-lg mx-auto space-y-6">
        {/* Profile Card */}
        <Card className="p-6 flex flex-col items-center gap-4 shadow-card border-0 animate-fade-in">
          <div className="bg-primary/10 p-6 rounded-full">
            <User className="h-16 w-16 text-primary" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-card-foreground">Alex</h2>
            <p className="text-muted-foreground">Người dùng được bảo vệ</p>
          </div>
        </Card>

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

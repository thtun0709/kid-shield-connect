import { User, Clock, Shield, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import BottomNav from './BottomNav';

const Profile = () => {
  const stats = [
    { label: 'Daily Limit', value: '3 hours', icon: Clock },
    { label: 'Safe Apps', value: '6 apps', icon: Shield },
    { label: 'Learning Time', value: '45 mins', icon: BookOpen },
  ];

  const safetyTips = [
    'Never share personal information online',
    'Always ask your parents before downloading new apps',
    'Take regular breaks to rest your eyes',
    'Tell your parents if something online makes you uncomfortable',
  ];

  return (
    <div className="min-h-screen gradient-safe pb-12">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-4 shadow-soft">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-semibold">Your Profile</h1>
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
            <p className="text-muted-foreground">Protected User</p>
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
            Online Safety Tips
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
            Keep Learning! 📚
          </h4>
          <p className="text-sm text-muted-foreground">
            Your parents have set up these protections because they care about you. Stay curious and safe!
          </p>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Profile;

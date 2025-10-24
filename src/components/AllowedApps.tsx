import { Youtube, BookOpen, Calculator, Music, Gamepad2, Video } from 'lucide-react';
import { Card } from '@/components/ui/card';

const allowedApps = [
  { id: 1, name: 'YouTube Kids', icon: Youtube, color: 'bg-red-500' },
  { id: 2, name: 'Khan Academy', icon: BookOpen, color: 'bg-green-500' },
  { id: 3, name: 'Calculator', icon: Calculator, color: 'bg-blue-500' },
  { id: 4, name: 'Music', icon: Music, color: 'bg-purple-500' },
  { id: 5, name: 'Educational Games', icon: Gamepad2, color: 'bg-orange-500' },
  { id: 6, name: 'Google Classroom', icon: Video, color: 'bg-indigo-500' },
];

const AllowedApps = () => {
  return (
    <div className="grid grid-cols-2 gap-4 animate-fade-in">
      {allowedApps.map((app, index) => (
        <Card 
          key={app.id}
          className="p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-smooth hover:scale-105 active:scale-95 shadow-card border-0"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className={`${app.color} p-4 rounded-2xl text-white`}>
            <app.icon className="h-8 w-8" />
          </div>
          <span className="text-sm font-medium text-center text-card-foreground">
            {app.name}
          </span>
        </Card>
      ))}
    </div>
  );
};

export default AllowedApps;

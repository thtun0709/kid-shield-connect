import { Youtube, BookOpen, Calculator, Music, Gamepad2, Video, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import YouTubeKids from './YouTubeKids';

const allowedApps = [
  { id: 1, name: 'YouTube Kids', icon: Youtube, color: 'bg-red-500' },
  { id: 2, name: 'Khan Academy', icon: BookOpen, color: 'bg-green-500' },
  { id: 3, name: 'Calculator', icon: Calculator, color: 'bg-blue-500' },
  { id: 4, name: 'Music', icon: Music, color: 'bg-purple-500' },
  { id: 5, name: 'Educational Games', icon: Gamepad2, color: 'bg-orange-500' },
  { id: 6, name: 'Google Classroom', icon: Video, color: 'bg-indigo-500' },
];

const AllowedApps = () => {
  const navigate = useNavigate();
  const [isYouTubeOpen, setIsYouTubeOpen] = useState(false);

  const handleAppClick = (appId: number) => {
    if (appId === 1) {
      // Mở YouTube Kids trong popup modal
      setIsYouTubeOpen(true);
    } else {
      // Chuyển đến trang Blocked cho các app khác
      navigate('/blocked');
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 animate-fade-in">
        {allowedApps.map((app, index) => (
          <Card 
            key={app.id}
            className="p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-smooth hover:scale-105 active:scale-95 shadow-card border-0"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleAppClick(app.id)}
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

      <Dialog open={isYouTubeOpen} onOpenChange={setIsYouTubeOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] h-[95vh] p-0">
          <DialogHeader className="p-4 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <div className="bg-red-500 p-2 rounded-lg text-white">
                  <Youtube className="h-5 w-5" />
                </div>
                YouTube Kids
              </DialogTitle>
              <button
                onClick={() => setIsYouTubeOpen(false)}
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </DialogHeader>
          <div className="w-full h-full p-4 pt-2">
            <YouTubeKids />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AllowedApps;
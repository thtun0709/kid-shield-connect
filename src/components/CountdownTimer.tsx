import { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface CountdownTimerProps {
  totalMinutes: number;
  onTimeUp?: () => void;
  activityName?: string;
}

export const CountdownTimer = ({ 
  totalMinutes, 
  onTimeUp, 
  activityName = "hoạt động" 
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(totalMinutes * 60); // Convert to seconds
  const [isRunning, setIsRunning] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        
        // Show warning when 5 minutes left
        if (newTime === 300 && !showWarning) {
          setShowWarning(true);
        }
        
        // Show warning when 1 minute left
        if (newTime === 60) {
          setShowWarning(true);
        }
        
        // Time's up!
        if (newTime <= 0) {
          setIsRunning(false);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onTimeUp, showWarning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((totalMinutes * 60 - timeLeft) / (totalMinutes * 60)) * 100;
  };

  const getTimerColor = () => {
    if (timeLeft <= 60) return 'text-red-500';
    if (timeLeft <= 300) return 'text-orange-500';
    return 'text-green-500';
  };

  const getProgressColor = () => {
    if (timeLeft <= 60) return 'bg-red-500';
    if (timeLeft <= 300) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="countdown-timer bg-white rounded-2xl shadow-lg p-6 border-4 border-purple-200">
      {/* Main Timer Display */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className={`w-8 h-8 ${getTimerColor()}`} />
          <h3 className="text-xl font-bold text-gray-700">
            Thời gian còn lại cho {activityName}
          </h3>
        </div>
        
        <div className={`text-6xl font-bold ${getTimerColor()} mb-4 animate-pulse-slow`}>
          {formatTime(timeLeft)}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
          <div 
            className={`h-full ${getProgressColor()} transition-all duration-1000 ease-linear rounded-full`}
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Warning Alerts */}
      {showWarning && timeLeft > 0 && timeLeft <= 300 && (
        <Alert className="mb-4 bg-orange-50 border-orange-300 animate-bounce-gentle">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          <AlertDescription className="text-orange-700 font-semibold">
            {timeLeft <= 60 
              ? '⚠️ Chỉ còn 1 phút! Hãy chuẩn bị kết thúc nhé!' 
              : '⏰ Còn 5 phút nữa thôi! Hãy chuẩn bị nhé!'}
          </AlertDescription>
        </Alert>
      )}

      {/* Time's Up Alert */}
      {timeLeft === 0 && (
        <Alert className="bg-green-50 border-green-300">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <AlertDescription className="text-green-700 font-semibold">
            🎉 Thời gian đã hết! Bạn đã hoàn thành tốt! Hãy nghỉ ngơi nhé!
          </AlertDescription>
        </Alert>
      )}

      {/* Fun Emoji Indicators */}
      <div className="text-center text-4xl mt-4">
        {timeLeft > 300 && '😊'}
        {timeLeft <= 300 && timeLeft > 60 && '⏰'}
        {timeLeft <= 60 && timeLeft > 0 && '⚠️'}
        {timeLeft === 0 && '🎉'}
      </div>

      <style>{`
        .animate-pulse-slow {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 1s ease-in-out infinite;
        }
        
        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};

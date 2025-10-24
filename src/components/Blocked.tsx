import { useState } from 'react';
import { ShieldAlert, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RequestModal from './RequestModal';
import BottomNav from './BottomNav';

const Blocked = () => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 bg-background">
      <div className="max-w-md w-full text-center space-y-6 animate-scale-in">
        <div className="flex justify-center mb-6">
          <div className="bg-destructive/10 p-6 rounded-full">
            <ShieldAlert className="h-24 w-24 text-destructive" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground">
            Content Blocked
          </h1>
          <p className="text-lg text-muted-foreground">
            This app or website is blocked by your parent's settings
          </p>
        </div>

        <div className="bg-muted/50 border border-border rounded-3xl p-5 space-y-2">
          <p className="text-sm text-foreground/80">
            Your parents have restricted access to this content to keep you safe online.
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <Button 
            size="lg"
            onClick={() => setIsRequestOpen(true)}
            className="w-full rounded-xl h-12 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            <MessageSquare className="h-5 w-5" />
            Ask for Permission
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full rounded-xl h-12 font-semibold"
          >
            Go Back
          </Button>
        </div>

        <p className="text-xs text-muted-foreground pt-4">
          Learn more about staying safe online in your Profile
        </p>
      </div>

      <RequestModal open={isRequestOpen} onOpenChange={setIsRequestOpen} />
      <BottomNav />
    </div>
  );
};

export default Blocked;

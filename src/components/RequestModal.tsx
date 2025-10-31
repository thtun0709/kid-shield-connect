import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface RequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RequestModal = ({ open, onOpenChange }: RequestModalProps) => {
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!reason) {
      toast.error('Please select a reason');
      return;
    }
    
    setSubmitted(true);
    toast.success('Request sent to your parent!');
    
    setTimeout(() => {
      setSubmitted(false);
      setReason('');
      setMessage('');
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Yêu cầu truy cập</DialogTitle>
              <DialogDescription>
                Yêu cầu phụ huynh cho thêm thời gian hoặc truy cập vào ứng dụng bị chặn
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reason">Lý do</Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger id="reason" className="rounded-xl">
                    <SelectValue placeholder="Chọn lý do" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homework">Bài tập về nhà</SelectItem>
                    <SelectItem value="learning">Học tập & Giáo dục</SelectItem>
                    <SelectItem value="entertainment">Giải trí</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Lời nhắn (Tùy chọn)</Label>
                <Textarea
                  id="message"
                  placeholder="Nói với phụ huynh tại sao bạn cần điều này..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="rounded-xl resize-none"
                  rows={3}
                />
              </div>
            </div>
            
            <Button 
              onClick={handleSubmit}
              className="w-full rounded-xl h-12 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              <Send className="h-4 w-4" />
              Gửi yêu cầu
            </Button>
          </>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center gap-4 animate-scale-in">
            <div className="bg-accent/10 p-4 rounded-full">
              <CheckCircle2 className="h-16 w-16 text-accent" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Yêu cầu đã được gửi!</h3>
              <p className="text-muted-foreground">
                Chờ phụ huynh phê duyệt
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RequestModal;

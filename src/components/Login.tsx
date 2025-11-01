import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (username && pin.length >= 4) {
        // Mock token for kid
        const mockToken = "kid-token-" + Date.now();
        localStorage.setItem("kidToken", mockToken);
        localStorage.setItem("kidUsername", username);
        
        toast({
          title: "🎉 Chào mừng!",
          description: `Xin chào ${username}! Chúc bạn một ngày vui vẻ!`,
        });
        
        navigate("/home");
      } else {
        toast({
          title: "Đăng nhập thất bại",
          description: "Vui lòng kiểm tra tên và mã PIN của bạn",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center gradient-safe">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-card p-10 shadow-card mx-6">
        <div className="flex flex-col items-center animate-fade-in">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-lg">
            <Shield className="h-11 w-11 text-primary-foreground" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-foreground">Parental Shield</h2>
          <div className="mt-2 flex items-center gap-2">
            {/* <h3 className="text-3xl font-bold text-foreground">Xin chào!</h3> */}
            {/* <Smile className="h-8 w-8 text-primary" /> */}
          </div>
          <p className="mt-3 text-center text-base text-muted-foreground">
            Đăng nhập để sử dụng thiết bị an toàn
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-5">
            <div>
              <Label htmlFor="username" className="text-base">Tên của bạn</Label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên của bạn"
                className="mt-2 h-12 text-base"
              />
            </div>

            <div>
              <Label htmlFor="pin" className="text-base">Mã PIN</Label>
              <Input
                id="pin"
                name="pin"
                type="password"
                autoComplete="current-password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Nhập mã PIN 4-6 số"
                maxLength={6}
                className="mt-2 h-12 text-center text-2xl tracking-widest"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Mã PIN do phụ huynh cung cấp
              </p>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary-glow"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>

          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4">
            <p className="text-center text-sm text-foreground/80">
              <span className="text-lg mr-2">🛡️</span>
              Thiết bị được bảo vệ bởi phụ huynh
            </p>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Bảo vệ cho trẻ em - GuardianTech
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

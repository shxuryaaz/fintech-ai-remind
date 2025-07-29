import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Shield, TrendingUp, Lock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate bank-grade authentication
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email && password) {
      toast({
        title: "Authentication Successful",
        description: "Welcome to Black Swan Risk Analytics",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Authentication Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-background to-surface opacity-50" />
      
      <div className="relative w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-gold-muted shadow-[var(--shadow-gold)]">
              <TrendingUp className="h-8 w-8 text-accent-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Black Swan</h1>
          <p className="text-muted-foreground">Elite Risk Analytics Platform</p>
        </div>

        {/* Login Card */}
        <Card className="glass-elevated border-accent/20 shadow-[var(--shadow-elevation)]">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Sign In</CardTitle>
            <CardDescription className="text-muted-foreground">
              Access your risk analytics dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@goldmansachs.com"
                  className="h-12 bg-surface border-accent/30 focus:border-accent text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your secure password"
                    className="h-12 bg-surface border-accent/30 focus:border-accent text-foreground placeholder:text-muted-foreground pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                    className="border-accent/50 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">
                    Remember me
                  </Label>
                </div>
                <Button variant="link" className="text-accent hover:text-accent/80 p-0 h-auto">
                  Forgot password?
                </Button>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full h-12"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Sign In Securely
                  </div>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 rounded-lg bg-surface border border-accent/20">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Bank-Grade Security</p>
                  <p className="text-xs text-muted-foreground">
                    256-bit encryption • Multi-factor authentication • SOC 2 compliant
                  </p>
                </div>
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">Demo Access</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Use any email and password to access the demo dashboard
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            © 2024 Black Swan Analytics. Enterprise-grade risk prediction.
          </p>
        </div>
      </div>
    </div>
  );
}
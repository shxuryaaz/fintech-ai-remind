import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Settings as SettingsIcon, 
  Key, 
  Brain, 
  Link, 
  Shield, 
  Zap,
  Eye,
  EyeOff,
  Save,
  TestTube,
  AlertTriangle,
  CheckCircle,
  Phone,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [blockchainEnabled, setBlockchainEnabled] = useState(true);
  const [riskThresholds, setRiskThresholds] = useState({
    low: [40],
    medium: [60],
    high: [80]
  });
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your configuration has been updated successfully.",
    });
  };

  const testConnection = (service) => {
    toast({
      title: `Testing ${service}...`,
      description: "Connection test initiated.",
    });
    // Simulate test
    setTimeout(() => {
      toast({
        title: `${service} Connection`,
        description: "✅ Connection successful",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Configuration</h1>
          <p className="text-muted-foreground mt-1">Manage API keys, risk thresholds, and system settings</p>
        </div>
        <Button variant="gold" size="lg" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>

      <Tabs defaultValue="api" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-12 bg-surface border border-accent/20">
          <TabsTrigger value="api" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            API Keys
          </TabsTrigger>
          <TabsTrigger value="risk" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            Risk Thresholds
          </TabsTrigger>
          <TabsTrigger value="blockchain" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            Blockchain
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="space-y-6">
          {/* API Key Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* OpenAI Configuration */}
            <Card className="glass border-accent/20">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  OpenAI API
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="openai-key" className="text-foreground">API Key</Label>
                  <div className="relative mt-2">
                    <Input
                      id="openai-key"
                      type={showApiKeys ? "text" : "password"}
                      placeholder="sk-..."
                      className="pr-20 bg-surface border-accent/30 focus:border-accent"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowApiKeys(!showApiKeys)}
                        className="h-8 w-8 p-0"
                      >
                        {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => testConnection("OpenAI")}
                        className="h-8 w-8 p-0"
                      >
                        <TestTube className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="openai-model" className="text-foreground">Model</Label>
                  <Input
                    id="openai-model"
                    defaultValue="gpt-4"
                    className="mt-2 bg-surface border-accent/30 focus:border-accent"
                  />
                </div>
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/40">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              </CardContent>
            </Card>

            {/* ElevenLabs Configuration */}
            <Card className="glass border-accent/20">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Phone className="h-5 w-5 text-orange-400" />
                  ElevenLabs API
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="elevenlabs-key" className="text-foreground">API Key</Label>
                  <div className="relative mt-2">
                    <Input
                      id="elevenlabs-key"
                      type={showApiKeys ? "text" : "password"}
                      placeholder="sk_..."
                      className="pr-20 bg-surface border-accent/30 focus:border-accent"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowApiKeys(!showApiKeys)}
                        className="h-8 w-8 p-0"
                      >
                        {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => testConnection("ElevenLabs")}
                        className="h-8 w-8 p-0"
                      >
                        <TestTube className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="voice-id" className="text-foreground">Voice ID</Label>
                  <Input
                    id="voice-id"
                    defaultValue="21m00Tcm4TlvDq8ikWAM"
                    className="mt-2 bg-surface border-accent/30 focus:border-accent"
                  />
                </div>
                <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Not Configured
                </Badge>
              </CardContent>
            </Card>

            {/* Twilio Configuration */}
            <Card className="glass border-accent/20">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  Twilio API
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="twilio-sid" className="text-foreground">Account SID</Label>
                  <Input
                    id="twilio-sid"
                    type={showApiKeys ? "text" : "password"}
                    placeholder="AC..."
                    className="mt-2 bg-surface border-accent/30 focus:border-accent"
                  />
                </div>
                <div>
                  <Label htmlFor="twilio-token" className="text-foreground">Auth Token</Label>
                  <div className="relative mt-2">
                    <Input
                      id="twilio-token"
                      type={showApiKeys ? "text" : "password"}
                      className="pr-20 bg-surface border-accent/30 focus:border-accent"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowApiKeys(!showApiKeys)}
                        className="h-8 w-8 p-0"
                      >
                        {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => testConnection("Twilio")}
                        className="h-8 w-8 p-0"
                      >
                        <TestTube className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/40">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              </CardContent>
            </Card>

            {/* WhatsApp Configuration */}
            <Card className="glass border-accent/20">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-400" />
                  WhatsApp Business
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="whatsapp-token" className="text-foreground">Access Token</Label>
                  <div className="relative mt-2">
                    <Input
                      id="whatsapp-token"
                      type={showApiKeys ? "text" : "password"}
                      className="pr-20 bg-surface border-accent/30 focus:border-accent"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowApiKeys(!showApiKeys)}
                        className="h-8 w-8 p-0"
                      >
                        {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => testConnection("WhatsApp")}
                        className="h-8 w-8 p-0"
                      >
                        <TestTube className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone-number-id" className="text-foreground">Phone Number ID</Label>
                  <Input
                    id="phone-number-id"
                    className="mt-2 bg-surface border-accent/30 focus:border-accent"
                  />
                </div>
                <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Not Configured
                </Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          {/* Risk Threshold Configuration */}
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-accent" />
                Risk Classification Thresholds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <Label className="text-foreground font-medium">Low Risk Threshold</Label>
                  <div className="px-4">
                    <Slider
                      value={riskThresholds.low}
                      onValueChange={(value) => setRiskThresholds({...riskThresholds, low: value})}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">0</span>
                    <span className="text-accent font-medium">{riskThresholds.low[0]}</span>
                    <span className="text-muted-foreground">100</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Users below this score are classified as low risk
                  </p>
                </div>

                <div className="space-y-4">
                  <Label className="text-foreground font-medium">Medium Risk Threshold</Label>
                  <div className="px-4">
                    <Slider
                      value={riskThresholds.medium}
                      onValueChange={(value) => setRiskThresholds({...riskThresholds, medium: value})}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">0</span>
                    <span className="text-yellow-400 font-medium">{riskThresholds.medium[0]}</span>
                    <span className="text-muted-foreground">100</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Users between low and this score are medium risk
                  </p>
                </div>

                <div className="space-y-4">
                  <Label className="text-foreground font-medium">High Risk Threshold</Label>
                  <div className="px-4">
                    <Slider
                      value={riskThresholds.high}
                      onValueChange={(value) => setRiskThresholds({...riskThresholds, high: value})}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">0</span>
                    <span className="text-red-400 font-medium">{riskThresholds.high[0]}</span>
                    <span className="text-muted-foreground">100</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Users above this score are critical risk
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-accent/20">
                <h3 className="text-lg font-semibold text-foreground mb-4">AI Model Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="model-temp" className="text-foreground">Model Temperature</Label>
                    <Input
                      id="model-temp"
                      type="number"
                      defaultValue="0.3"
                      min="0"
                      max="2"
                      step="0.1"
                      className="mt-2 bg-surface border-accent/30 focus:border-accent"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confidence-threshold" className="text-foreground">Confidence Threshold</Label>
                    <Input
                      id="confidence-threshold"
                      type="number"
                      defaultValue="0.85"
                      min="0"
                      max="1"
                      step="0.05"
                      className="mt-2 bg-surface border-accent/30 focus:border-accent"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-6">
          {/* Blockchain Configuration */}
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Link className="h-5 w-5 text-accent" />
                Blockchain Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-surface border border-accent/20">
                <div>
                  <h3 className="font-medium text-foreground">Enable Blockchain Logging</h3>
                  <p className="text-sm text-muted-foreground">Log all reminder activities on-chain for immutable audit trail</p>
                </div>
                <Switch
                  checked={blockchainEnabled}
                  onCheckedChange={setBlockchainEnabled}
                />
              </div>

              {blockchainEnabled && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rpc-url" className="text-foreground">RPC Node URL</Label>
                    <Input
                      id="rpc-url"
                      defaultValue="https://mainnet.infura.io/v3/..."
                      className="mt-2 bg-surface border-accent/30 focus:border-accent"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contract-address" className="text-foreground">Smart Contract Address</Label>
                    <Input
                      id="contract-address"
                      defaultValue="0x742d35Cc6Ba18a3b2d54C8e6F7C1b9F8d1E2A3B4"
                      className="mt-2 bg-surface border-accent/30 focus:border-accent"
                    />
                  </div>
                  <div>
                    <Label htmlFor="private-key" className="text-foreground">Signing Private Key</Label>
                    <div className="relative mt-2">
                      <Input
                        id="private-key"
                        type={showApiKeys ? "text" : "password"}
                        className="pr-10 bg-surface border-accent/30 focus:border-accent"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowApiKeys(!showApiKeys)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      >
                        {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="gas-limit" className="text-foreground">Gas Limit</Label>
                    <Input
                      id="gas-limit"
                      defaultValue="21000"
                      type="number"
                      className="mt-2 bg-surface border-accent/30 focus:border-accent"
                    />
                  </div>
                </div>
              )}

              <Button variant="elite" onClick={() => testConnection("Blockchain")}>
                <TestTube className="h-4 w-4 mr-2" />
                Test Blockchain Connection
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          {/* Notification Settings */}
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                System Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "High Risk Alerts", desc: "Notify when users exceed critical risk threshold" },
                { label: "System Failures", desc: "Alert on API failures and system errors" },
                { label: "Daily Reports", desc: "Receive daily summary reports" },
                { label: "Payment Confirmations", desc: "Notify when payments are received" }
              ].map((setting, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-surface border border-accent/20">
                  <div>
                    <h3 className="font-medium text-foreground">{setting.label}</h3>
                    <p className="text-sm text-muted-foreground">{setting.desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
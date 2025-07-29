import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Plus, 
  Settings, 
  Zap, 
  MessageSquare, 
  Phone, 
  Brain,
  Clock,
  Users,
  Mail,
  Smartphone,
  Bot,
  ArrowRight,
  Copy,
  Edit,
  Trash2
} from "lucide-react";

const workflowTemplates = [
  {
    id: 1,
    name: "High Risk Voice Reminder",
    description: "Automated voice call for users with 85+ risk score",
    trigger: "Risk Score > 85",
    actions: ["AI Analysis", "Voice Call", "Blockchain Log"],
    status: "Active",
    executions: 1247,
    successRate: 68
  },
  {
    id: 2,
    name: "SMS Warning After 7 Days",
    description: "Send SMS reminder after 7 days overdue",
    trigger: "Days Overdue >= 7",
    actions: ["Risk Assessment", "SMS Send", "Log Event"],
    status: "Active", 
    executions: 892,
    successRate: 72
  },
  {
    id: 3,
    name: "WhatsApp Final Notice",
    description: "Final notice via WhatsApp before legal action",
    trigger: "Days Overdue >= 30",
    actions: ["Legal Check", "WhatsApp Message", "Escalation"],
    status: "Draft",
    executions: 0,
    successRate: 0
  },
  {
    id: 4,
    name: "Smart Recovery Sequence",
    description: "Multi-channel progressive reminder system",
    trigger: "Payment Missed",
    actions: ["Email", "SMS", "Voice Call", "WhatsApp"],
    status: "Active",
    executions: 2156,
    successRate: 82
  }
];

const workflowNodes = [
  { type: "trigger", icon: Zap, label: "Trigger", color: "bg-blue-500" },
  { type: "condition", icon: Brain, label: "AI Decision", color: "bg-purple-500" },
  { type: "action", icon: MessageSquare, label: "Send Message", color: "bg-green-500" },
  { type: "voice", icon: Phone, label: "Voice Call", color: "bg-orange-500" },
  { type: "delay", icon: Clock, label: "Wait", color: "bg-gray-500" },
  { type: "log", icon: Settings, label: "Blockchain Log", color: "bg-accent" }
];

export default function WorkflowBuilder() {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reminder Workflow Builder</h1>
          <p className="text-muted-foreground mt-1">Design automated reminder sequences with AI decision logic</p>
        </div>
        <Button variant="gold" size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Create New Workflow
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12 bg-surface border border-accent/20">
          <TabsTrigger value="templates" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            Templates
          </TabsTrigger>
          <TabsTrigger value="builder" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            Visual Builder
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          {/* Workflow Templates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workflowTemplates.map((template) => (
              <Card key={template.id} className="glass border-accent/20 hover:border-accent/40 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-foreground">{template.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                    </div>
                    <Badge 
                      variant={template.status === "Active" ? "default" : "secondary"}
                      className={template.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/40" : ""}
                    >
                      {template.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Trigger */}
                    <div className="p-3 rounded-lg bg-surface border border-accent/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium text-foreground">Trigger</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{template.trigger}</p>
                    </div>

                    {/* Actions Flow */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Settings className="h-4 w-4 text-accent" />
                        <span className="text-sm font-medium text-foreground">Action Sequence</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {template.actions.map((action, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <Badge variant="outline" className="text-xs">
                              {action}
                            </Badge>
                            {index < template.actions.length - 1 && (
                              <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="text-center">
                        <p className="text-lg font-bold text-foreground">{template.executions.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Executions</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-accent">{template.successRate}%</p>
                        <p className="text-xs text-muted-foreground">Success Rate</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="gold" size="sm" className="flex-1">
                        <Play className="h-3 w-3 mr-1" />
                        Deploy
                      </Button>
                      <Button variant="elite" size="sm" className="flex-1">
                        <Copy className="h-3 w-3 mr-1" />
                        Clone
                      </Button>
                      <Button variant="glass" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          {/* Visual Workflow Builder */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Node Palette */}
            <Card className="glass border-accent/20">
              <CardHeader>
                <CardTitle className="text-foreground">Workflow Nodes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {workflowNodes.map((node, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-accent/20 hover:border-accent/40 transition-colors cursor-grab"
                    draggable
                  >
                    <div className={`p-2 rounded-lg ${node.color}`}>
                      <node.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{node.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Canvas Area */}
            <div className="lg:col-span-3">
              <Card className="glass border-accent/20 h-[600px]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-foreground">Workflow Canvas</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="elite" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                      <Button variant="gold" size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Test Run
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-full">
                  <div className="h-full bg-surface rounded-lg border-2 border-dashed border-accent/30 flex items-center justify-center">
                    <div className="text-center">
                      <Bot className="h-12 w-12 text-accent mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Drag & Drop Workflow Builder
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Drag nodes from the palette to create your automated reminder workflow
                      </p>
                      <Button variant="gold">
                        <Plus className="h-4 w-4 mr-2" />
                        Start Building
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Workflow Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Workflows</p>
                    <p className="text-2xl font-bold text-foreground">24</p>
                    <p className="text-xs text-green-400 mt-1">+3 this month</p>
                  </div>
                  <div className="p-3 rounded-lg bg-surface">
                    <Settings className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Avg Success Rate</p>
                    <p className="text-2xl font-bold text-foreground">74.3%</p>
                    <p className="text-xs text-green-400 mt-1">+5.2% improvement</p>
                  </div>
                  <div className="p-3 rounded-lg bg-surface">
                    <Zap className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Daily Executions</p>
                    <p className="text-2xl font-bold text-foreground">1,847</p>
                    <p className="text-xs text-accent mt-1">Peak: 2,156</p>
                  </div>
                  <div className="p-3 rounded-lg bg-surface">
                    <Play className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Channel Performance */}
          <Card className="glass border-accent/20">
            <CardHeader>
              <CardTitle className="text-foreground">Channel Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { channel: "Voice Calls", success: 68, icon: Phone, color: "text-orange-400" },
                  { channel: "SMS", success: 72, icon: Smartphone, color: "text-blue-400" },
                  { channel: "Email", success: 45, icon: Mail, color: "text-purple-400" },
                  { channel: "WhatsApp", success: 85, icon: MessageSquare, color: "text-green-400" }
                ].map((channel) => (
                  <div key={channel.channel} className="p-4 rounded-lg bg-surface border border-accent/20">
                    <div className="flex items-center gap-3 mb-3">
                      <channel.icon className={`h-5 w-5 ${channel.color}`} />
                      <span className="font-medium text-foreground">{channel.channel}</span>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">{channel.success}%</p>
                      <p className="text-xs text-muted-foreground">Success Rate</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
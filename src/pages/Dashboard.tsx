import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  AlertTriangle, 
  MessageSquare, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Clock,
  Shield,
  Zap,
  Target
} from "lucide-react";

// Mock data for dashboard
const metrics = [
  {
    title: "Total Loan Users",
    value: "12,847",
    change: "+4.2%",
    trend: "up",
    icon: Users,
    color: "text-blue-400"
  },
  {
    title: "High-Risk Loans",
    value: "1,283",
    change: "-2.1%", 
    trend: "down",
    icon: AlertTriangle,
    color: "text-red-400"
  },
  {
    title: "Reminders Sent Today",
    value: "847",
    change: "+12.4%",
    trend: "up", 
    icon: MessageSquare,
    color: "text-accent"
  },
  {
    title: "Recovery Rate",
    value: "68.3%",
    change: "+5.8%",
    trend: "up",
    icon: Target,
    color: "text-green-400"
  }
];

const riskAlerts = [
  {
    id: 1,
    user: "Marcus Johnson",
    risk: "Critical", 
    amount: "$45,000",
    daysOverdue: 15,
    lastContact: "2 days ago",
    score: 92
  },
  {
    id: 2,
    user: "Sarah Chen",
    risk: "High",
    amount: "$28,500", 
    daysOverdue: 8,
    lastContact: "5 days ago",
    score: 78
  },
  {
    id: 3,
    user: "David Rodriguez",
    risk: "Medium",
    amount: "$12,000",
    daysOverdue: 3,
    lastContact: "1 day ago", 
    score: 65
  }
];

const recentActivity = [
  {
    id: 1,
    action: "Voice reminder sent",
    user: "Emily Watson", 
    time: "2 min ago",
    status: "completed"
  },
  {
    id: 2,
    action: "SMS warning delivered",
    user: "Michael Brown",
    time: "8 min ago",
    status: "completed"
  },
  {
    id: 3,
    action: "WhatsApp message pending",
    user: "Lisa Thompson",
    time: "15 min ago", 
    status: "pending"
  },
  {
    id: 4,
    action: "Payment received",
    user: "James Wilson",
    time: "1 hour ago",
    status: "success"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Risk Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time loan default monitoring and automated recovery</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/40">
            <Shield className="h-3 w-3 mr-1" />
            Live Monitoring
          </Badge>
          <Button variant="gold" size="lg">
            <Zap className="h-4 w-4 mr-2" />
            Run AI Analysis
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="glass border-accent/20 hover:border-accent/40 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-400" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-400" />
                    )}
                    <span className={`text-xs ${metric.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-surface ${metric.color}`}>
                  <metric.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Heatmap */}
        <Card className="lg:col-span-2 glass border-accent/20">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" />
              High-Risk Loan Alert Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskAlerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-lg bg-surface border border-accent/20 hover:border-accent/40 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Users className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{alert.user}</p>
                        <p className="text-sm text-muted-foreground">Last contact: {alert.lastContact}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={alert.risk === "Critical" ? "destructive" : alert.risk === "High" ? "secondary" : "outline"}
                        className={alert.risk === "Critical" ? "" : alert.risk === "High" ? "bg-orange-500/20 text-orange-400 border-orange-500/40" : ""}
                      >
                        {alert.risk} Risk
                      </Badge>
                      <span className="text-sm font-mono text-foreground">{alert.amount}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Days Overdue</p>
                        <p className="text-sm font-semibold text-red-400">{alert.daysOverdue}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Black Swan Score</p>
                        <p className="text-sm font-semibold text-accent">{alert.score}/100</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="elite" size="sm">View Profile</Button>
                      <Button variant="gold" size="sm">Send Reminder</Button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Risk Score</span>
                      <span>{alert.score}%</span>
                    </div>
                    <Progress 
                      value={alert.score} 
                      className="h-2 bg-surface-elevated" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass border-accent/20">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === "completed" ? "bg-green-400" :
                    activity.status === "pending" ? "bg-yellow-400" :
                    "bg-accent"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <p className="text-xs text-accent">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={`text-xs ${
                      activity.status === "completed" ? "border-green-400/40 text-green-400" :
                      activity.status === "pending" ? "border-yellow-400/40 text-yellow-400" :
                      "border-accent/40 text-accent"
                    }`}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-accent hover:text-accent/80">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass border-accent/20">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="elite" className="h-20 flex-col gap-2">
              <AlertTriangle className="h-6 w-6" />
              <span className="text-xs">Risk Assessment</span>
            </Button>
            <Button variant="glass" className="h-20 flex-col gap-2">
              <MessageSquare className="h-6 w-6" />
              <span className="text-xs">Bulk Reminders</span>
            </Button>
            <Button variant="glass" className="h-20 flex-col gap-2">
              <DollarSign className="h-6 w-6" />
              <span className="text-xs">Payment Tracking</span>
            </Button>
            <Button variant="glass" className="h-20 flex-col gap-2">
              <Shield className="h-6 w-6" />
              <span className="text-xs">Blockchain Log</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
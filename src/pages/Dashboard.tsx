import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useDashboardStats, useRiskAssessments } from "@/hooks/useSupabaseQuery";
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

export default function Dashboard() {
  const { data: dashboardStats, isLoading: statsLoading } = useDashboardStats();
  const { data: riskAssessments, isLoading: riskLoading } = useRiskAssessments();

  if (statsLoading || riskLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const metrics = [
    {
      title: "Total Loan Users",
      value: dashboardStats?.totalUsers?.toString() || "0",
      change: "+4.2%",
      trend: "up",
      icon: Users,
      color: "text-blue-400"
    },
    {
      title: "High-Risk Loans",
      value: dashboardStats?.highRiskLoans?.toString() || "0",
      change: "-2.1%", 
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-400"
    },
    {
      title: "Reminders Sent Today",
      value: dashboardStats?.remindersSent?.toString() || "0",
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

  const riskAlerts = riskAssessments?.filter(assessment => 
    assessment.risk_level === 'critical' || assessment.risk_level === 'high'
  ).slice(0, 3).map(assessment => ({
    id: assessment.id,
    user: assessment.borrowers?.full_name || "Unknown",
    risk: assessment.risk_level === 'critical' ? "Critical" : "High",
    amount: `$${assessment.loans?.loan_amount?.toLocaleString() || '0'}`,
    daysOverdue: Math.floor(Math.random() * 20) + 1, // Mock data
    lastContact: "2 days ago", // Mock data
    score: Math.floor(assessment.risk_score || 0)
  })) || [];

  const recentActivity = riskAssessments?.slice(0, 4).map((assessment) => ({
    id: assessment.id,
    action: assessment.risk_level === 'critical' ? "Voice reminder sent" : 
            assessment.risk_level === 'high' ? "SMS warning delivered" : 
            "Risk assessment completed",
    user: assessment.borrowers?.full_name || "Unknown",
    time: new Date(assessment.assessment_date).toLocaleDateString(),
    status: "completed"
  })) || [];

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
              {riskAlerts.length > 0 ? riskAlerts.map((alert) => (
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
                        variant={alert.risk === "Critical" ? "destructive" : "secondary"}
                        className={alert.risk === "Critical" ? "" : "bg-orange-500/20 text-orange-400 border-orange-500/40"}
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
              )) : (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No high-risk alerts at this time</p>
                </div>
              )}
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
              {recentActivity.length > 0 ? recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 bg-accent" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <p className="text-xs text-accent">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge 
                    variant="outline"
                    className="text-xs border-accent/40 text-accent"
                  >
                    {activity.status}
                  </Badge>
                </div>
              )) : (
                <div className="text-center py-4 text-muted-foreground">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No recent activity</p>
                </div>
              )}
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
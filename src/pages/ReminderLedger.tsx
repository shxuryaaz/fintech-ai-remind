import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Download, 
  ExternalLink, 
  Phone, 
  MessageSquare, 
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Calendar,
  Link
} from "lucide-react";

// Mock ledger data
const reminderLedger = [
  {
    id: 1,
    timestamp: "2024-01-15 14:23:45",
    user: "Marcus Johnson",
    method: "Voice Call",
    status: "Completed",
    response: "Answered - Promised payment by Friday",
    blockchainTx: "0x742d35cc6ba18a3b2d54c8e6f7c1b9f8d1e2a3b4c5d6e7f8a9b0c1d2e3f4",
    amount: "$12,500",
    riskScore: 92,
    duration: "3m 45s"
  },
  {
    id: 2,
    timestamp: "2024-01-15 13:45:12",
    user: "Sarah Chen",
    method: "SMS",
    status: "Delivered",
    response: "Read - No response yet",
    blockchainTx: "0x8b9c1a2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9",
    amount: "$8,200",
    riskScore: 78,
    duration: "Instant"
  },
  {
    id: 3,
    timestamp: "2024-01-15 12:15:30",
    user: "Emily Watson",
    method: "WhatsApp",
    status: "Failed",
    response: "Number not reachable",
    blockchainTx: "0x5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5",
    amount: "$5,200",
    riskScore: 45,
    duration: "Failed"
  },
  {
    id: 4,
    timestamp: "2024-01-15 11:30:22",
    user: "David Rodriguez",
    method: "Email",
    status: "Completed",
    response: "Opened - Payment plan requested",
    blockchainTx: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
    amount: "$3,400",
    riskScore: 65,
    duration: "Instant"
  },
  {
    id: 5,
    timestamp: "2024-01-15 10:45:18",
    user: "Michael Brown",
    method: "Voice Call",
    status: "Completed",
    response: "No answer - Left voicemail",
    blockchainTx: "0x2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
    amount: "$15,800",
    riskScore: 83,
    duration: "1m 20s"
  },
  {
    id: 6,
    timestamp: "2024-01-15 09:20:45",
    user: "Lisa Thompson",
    method: "SMS",
    status: "Pending",
    response: "Sending...",
    blockchainTx: null,
    amount: "$7,600",
    riskScore: 71,
    duration: "Pending"
  }
];

export default function ReminderLedger() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");

  const filteredLedger = reminderLedger
    .filter(entry => 
      entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.method.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(entry => statusFilter === "all" || entry.status.toLowerCase() === statusFilter.toLowerCase())
    .filter(entry => methodFilter === "all" || entry.method.toLowerCase().includes(methodFilter.toLowerCase()));

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "Failed": return <XCircle className="h-4 w-4 text-red-400" />;
      case "Pending": return <Clock className="h-4 w-4 text-yellow-400" />;
      case "Delivered": return <CheckCircle className="h-4 w-4 text-blue-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-500/20 text-green-400 border-green-500/40";
      case "Failed": return "bg-red-500/20 text-red-400 border-red-500/40";
      case "Pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
      case "Delivered": return "bg-blue-500/20 text-blue-400 border-blue-500/40";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/40";
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case "Voice Call": return <Phone className="h-4 w-4 text-orange-400" />;
      case "SMS": return <MessageSquare className="h-4 w-4 text-blue-400" />;
      case "Email": return <Mail className="h-4 w-4 text-purple-400" />;
      case "WhatsApp": return <MessageSquare className="h-4 w-4 text-green-400" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-400" />;
    }
  };

  const copyTxHash = (hash) => {
    navigator.clipboard.writeText(hash);
  };

  const openBlockExplorer = (hash) => {
    window.open(`https://etherscan.io/tx/${hash}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reminder Ledger</h1>
          <p className="text-muted-foreground mt-1">Complete audit trail of all reminder communications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="elite" size="lg">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="gold" size="lg">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Reminders", value: "2,847", change: "+12.4%", color: "text-blue-400" },
          { label: "Success Rate", value: "74.3%", change: "+5.2%", color: "text-green-400" },
          { label: "Blockchain Logged", value: "2,643", change: "+11.8%", color: "text-accent" },
          { label: "Avg Response Time", value: "2.3h", change: "-0.5h", color: "text-purple-400" }
        ].map((stat, index) => (
          <Card key={index} className="glass border-accent/20">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="glass border-accent/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by user or method..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 bg-surface border-accent/30 focus:border-accent"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] h-11 bg-surface border-accent/30">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-[180px] h-11 bg-surface border-accent/30">
                <MessageSquare className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="voice">Voice Call</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Ledger Table */}
      <Card className="glass border-accent/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Link className="h-5 w-5 text-accent" />
            Communication Ledger ({filteredLedger.length} entries)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface border-b border-accent/20">
                <tr>
                  <th className="text-left p-4 font-medium text-foreground">Timestamp</th>
                  <th className="text-left p-4 font-medium text-foreground">User</th>
                  <th className="text-left p-4 font-medium text-foreground">Method</th>
                  <th className="text-left p-4 font-medium text-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-foreground">Response</th>
                  <th className="text-left p-4 font-medium text-foreground">Amount</th>
                  <th className="text-left p-4 font-medium text-foreground">Blockchain TX</th>
                  <th className="text-left p-4 font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-accent/20">
                {filteredLedger.map((entry) => (
                  <tr key={entry.id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-4">
                      <div className="text-sm text-foreground font-mono">{entry.timestamp}</div>
                      <div className="text-xs text-muted-foreground">{entry.duration}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-foreground">{entry.user}</div>
                      <div className="text-xs text-muted-foreground">Risk: {entry.riskScore}/100</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getMethodIcon(entry.method)}
                        <span className="text-sm text-foreground">{entry.method}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className={getStatusColor(entry.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(entry.status)}
                          {entry.status}
                        </div>
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-foreground max-w-[200px] truncate" title={entry.response}>
                        {entry.response}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-semibold text-foreground">{entry.amount}</div>
                    </td>
                    <td className="p-4">
                      {entry.blockchainTx ? (
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-surface px-2 py-1 rounded text-accent font-mono">
                            {entry.blockchainTx.slice(0, 10)}...{entry.blockchainTx.slice(-8)}
                          </code>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Pending</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        {entry.blockchainTx && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyTxHash(entry.blockchainTx)}
                              className="h-8 w-8 p-0"
                            >
                              <Link className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openBlockExplorer(entry.blockchainTx)}
                              className="h-8 w-8 p-0"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
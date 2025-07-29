import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Filter, 
  Users, 
  AlertTriangle, 
  Phone, 
  MessageSquare, 
  Mail,
  Calendar,
  DollarSign,
  MapPin,
  CreditCard,
  TrendingUp,
  Eye
} from "lucide-react";

// Mock user data
const loanUsers = [
  {
    id: 1,
    name: "Marcus Johnson",
    email: "marcus.j@email.com",
    phone: "+1 (555) 123-4567",
    riskScore: 92,
    riskLevel: "Critical",
    loanAmount: 45000,
    amountDue: 12500,
    daysOverdue: 15,
    lastContact: "2 days ago",
    contactMethod: "Phone",
    location: "New York, NY",
    employment: "Software Engineer",
    loanType: "Personal",
    paymentHistory: "3/12 payments missed"
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "s.chen@email.com", 
    phone: "+1 (555) 234-5678",
    riskScore: 78,
    riskLevel: "High",
    loanAmount: 28500,
    amountDue: 8200,
    daysOverdue: 8,
    lastContact: "5 days ago",
    contactMethod: "SMS",
    location: "San Francisco, CA",
    employment: "Marketing Manager",
    loanType: "Business",
    paymentHistory: "2/10 payments missed"
  },
  {
    id: 3,
    name: "David Rodriguez",
    email: "d.rodriguez@email.com",
    phone: "+1 (555) 345-6789", 
    riskScore: 65,
    riskLevel: "Medium",
    loanAmount: 12000,
    amountDue: 3400,
    daysOverdue: 3,
    lastContact: "1 day ago",
    contactMethod: "Email",
    location: "Austin, TX", 
    employment: "Teacher",
    loanType: "Auto",
    paymentHistory: "1/8 payments missed"
  },
  {
    id: 4,
    name: "Emily Watson",
    email: "e.watson@email.com",
    phone: "+1 (555) 456-7890",
    riskScore: 45,
    riskLevel: "Low", 
    loanAmount: 18000,
    amountDue: 5200,
    daysOverdue: 0,
    lastContact: "3 days ago",
    contactMethod: "WhatsApp",
    location: "Chicago, IL",
    employment: "Nurse",
    loanType: "Medical",
    paymentHistory: "0/6 payments missed"
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "m.brown@email.com", 
    phone: "+1 (555) 567-8901",
    riskScore: 83,
    riskLevel: "High",
    loanAmount: 35000,
    amountDue: 15800,
    daysOverdue: 12,
    lastContact: "1 day ago",
    contactMethod: "Phone",
    location: "Miami, FL",
    employment: "Sales Rep",
    loanType: "Personal", 
    paymentHistory: "4/9 payments missed"
  }
];

export default function UserRisk() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [sortBy, setSortBy] = useState("riskScore");

  const filteredUsers = loanUsers
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(user => riskFilter === "all" || user.riskLevel.toLowerCase() === riskFilter)
    .sort((a, b) => {
      if (sortBy === "riskScore") return b.riskScore - a.riskScore;
      if (sortBy === "amount") return b.loanAmount - a.loanAmount;
      if (sortBy === "overdue") return b.daysOverdue - a.daysOverdue;
      return 0;
    });

  const getRiskColor = (level) => {
    switch (level) {
      case "Critical": return "bg-red-500/20 text-red-400 border-red-500/40";
      case "High": return "bg-orange-500/20 text-orange-400 border-orange-500/40";
      case "Medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
      case "Low": return "bg-green-500/20 text-green-400 border-green-500/40";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/40";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Risk Assessment</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage loan default probabilities</p>
        </div>
        <Button variant="gold" size="lg">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Export Risk Report
        </Button>
      </div>

      {/* Filters & Search */}
      <Card className="glass border-accent/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 bg-surface border-accent/30 focus:border-accent"
                />
              </div>
            </div>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-[180px] h-11 bg-surface border-accent/30">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] h-11 bg-surface border-accent/30">
                <TrendingUp className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="riskScore">Risk Score</SelectItem>
                <SelectItem value="amount">Loan Amount</SelectItem>
                <SelectItem value="overdue">Days Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* User List */}
      <Card className="glass border-accent/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            Loan Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-accent/20">
            {filteredUsers.map((user) => (
              <div key={user.id} className="p-6 hover:bg-surface/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <Users className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={getRiskColor(user.riskLevel)}>
                          {user.riskLevel} Risk
                        </Badge>
                        <span className="text-xs text-muted-foreground">Score: {user.riskScore}/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Loan Amount</p>
                      <p className="font-semibold text-foreground">${user.loanAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Amount Due</p>
                      <p className="font-semibold text-red-400">${user.amountDue.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Days Overdue</p>
                      <p className={`font-semibold ${user.daysOverdue > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {user.daysOverdue}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Last Contact</p>
                      <p className="text-sm text-foreground">{user.lastContact}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="elite" size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="glass" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        SMS
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="gold" size="sm" onClick={() => setSelectedUser(user)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl glass-elevated border-accent/20">
                          <DialogHeader>
                            <DialogTitle className="text-foreground flex items-center gap-2">
                              <Users className="h-5 w-5 text-accent" />
                              {selectedUser?.name} - Detailed Profile
                            </DialogTitle>
                          </DialogHeader>
                          {selectedUser && (
                            <div className="space-y-6">
                              {/* Risk Score Display */}
                              <div className="text-center p-6 rounded-lg bg-surface border border-accent/20">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent to-gold-muted mb-4">
                                  <span className="text-2xl font-bold text-accent-foreground">{selectedUser.riskScore}</span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">Black Swan Risk Score</h3>
                                <Badge variant="outline" className={getRiskColor(selectedUser.riskLevel)}>
                                  {selectedUser.riskLevel} Risk Level
                                </Badge>
                                <Progress value={selectedUser.riskScore} className="mt-4 h-3" />
                              </div>

                              {/* User Details Grid */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                  <div className="p-4 rounded-lg bg-surface">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Mail className="h-4 w-4 text-accent" />
                                      <span className="text-sm font-medium text-foreground">Contact</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                                    <p className="text-sm text-muted-foreground">{selectedUser.phone}</p>
                                  </div>

                                  <div className="p-4 rounded-lg bg-surface">
                                    <div className="flex items-center gap-2 mb-2">
                                      <MapPin className="h-4 w-4 text-accent" />
                                      <span className="text-sm font-medium text-foreground">Location</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{selectedUser.location}</p>
                                    <p className="text-sm text-muted-foreground">{selectedUser.employment}</p>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div className="p-4 rounded-lg bg-surface">
                                    <div className="flex items-center gap-2 mb-2">
                                      <DollarSign className="h-4 w-4 text-accent" />
                                      <span className="text-sm font-medium text-foreground">Loan Details</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Amount: ${selectedUser.loanAmount.toLocaleString()}</p>
                                    <p className="text-sm text-muted-foreground">Type: {selectedUser.loanType}</p>
                                    <p className="text-sm text-red-400">Due: ${selectedUser.amountDue.toLocaleString()}</p>
                                  </div>

                                  <div className="p-4 rounded-lg bg-surface">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Calendar className="h-4 w-4 text-accent" />
                                      <span className="text-sm font-medium text-foreground">Payment History</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{selectedUser.paymentHistory}</p>
                                    <p className="text-sm text-muted-foreground">Last contact: {selectedUser.lastContact}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-3">
                                <Button variant="gold" className="flex-1">
                                  <Phone className="h-4 w-4 mr-2" />
                                  Initiate Voice Call
                                </Button>
                                <Button variant="elite" className="flex-1">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Send SMS Warning
                                </Button>
                                <Button variant="glass" className="flex-1">
                                  <Mail className="h-4 w-4 mr-2" />
                                  Email Reminder
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>

                {/* Risk Score Progress */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Black Swan Risk Score</span>
                    <span>{user.riskScore}/100</span>
                  </div>
                  <Progress value={user.riskScore} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
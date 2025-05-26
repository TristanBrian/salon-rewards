
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings, Users, TrendingUp, DollarSign, Gift, BarChart3, Calendar, Bell, Crown, Shield } from "lucide-react";

const AdminSettings = () => {
  const [businessName, setBusinessName] = useState("Luxe Salon & Spa");
  const [visitsRequired, setVisitsRequired] = useState("10");
  const [rewardDescription, setRewardDescription] = useState("Free Haircut & Style");

  const businessStats = [
    { title: "Total Customers", value: "1,247", change: "+12%", icon: Users, color: "bg-blue-500" },
    { title: "Monthly Revenue", value: "$24,350", change: "+18%", icon: DollarSign, color: "bg-green-500" },
    { title: "Rewards Redeemed", value: "89", change: "+25%", icon: Gift, color: "bg-purple-500" },
    { title: "Avg. Customer Value", value: "$145", change: "+8%", icon: TrendingUp, color: "bg-orange-500" }
  ];

  const recentActivity = [
    { action: "Reward redeemed", customer: "Sarah Johnson", time: "2 min ago", type: "reward" },
    { action: "New customer signup", customer: "Mike Chen", time: "15 min ago", type: "signup" },
    { action: "Settings updated", customer: "Admin", time: "1 hour ago", type: "admin" },
    { action: "Large purchase", customer: "Emma Wilson", time: "2 hours ago", type: "purchase" },
    { action: "Reward redeemed", customer: "David Brown", time: "3 hours ago", type: "reward" }
  ];

  const loyaltyPrograms = [
    { name: "Bronze Tier", visits: 5, reward: "10% Off Next Service", active: true, members: 423 },
    { name: "Silver Tier", visits: 10, reward: "Free Basic Service", active: true, members: 298 },
    { name: "Gold Tier", visits: 15, reward: "Free Premium Service", active: true, members: 156 },
    { name: "Platinum Tier", visits: 25, reward: "VIP Experience Package", active: true, members: 47 }
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case "reward": return <Gift className="w-4 h-4 text-purple-600" />;
      case "signup": return <Users className="w-4 h-4 text-green-600" />;
      case "admin": return <Settings className="w-4 h-4 text-blue-600" />;
      case "purchase": return <DollarSign className="w-4 h-4 text-orange-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Link to="/" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                  <Crown className="w-8 h-8 mr-3 text-orange-600" />
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 ml-11">Full administrative control and business management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Administrator Access
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
                Business Active
              </Badge>
            </div>
          </div>

          {/* Business Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {businessStats.map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Business Configuration */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Business Configuration
                  </CardTitle>
                  <CardDescription>Manage your loyalty program settings and business rules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <Input 
                      value={businessName} 
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visits Required for Reward
                    </label>
                    <Input 
                      type="number" 
                      value={visitsRequired} 
                      onChange={(e) => setVisitsRequired(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reward Description
                    </label>
                    <Input 
                      value={rewardDescription} 
                      onChange={(e) => setRewardDescription(e.target.value)}
                    />
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    Save Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Loyalty Program Tiers */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Loyalty Program Tiers
                  </CardTitle>
                  <CardDescription>Manage reward tiers and requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Tier</TableHead>
                          <TableHead>Visits Required</TableHead>
                          <TableHead>Reward</TableHead>
                          <TableHead>Members</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loyaltyPrograms.map((program, index) => (
                          <TableRow key={index} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{program.name}</TableCell>
                            <TableCell>{program.visits}</TableCell>
                            <TableCell className="max-w-48 truncate">{program.reward}</TableCell>
                            <TableCell>{program.members}</TableCell>
                            <TableCell>
                              <Badge className={program.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                                {program.active ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-orange-600" />
                    Admin Quick Actions
                  </CardTitle>
                  <CardDescription>Administrative functions and management tools</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/all-customers" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      View All Customers
                    </Button>
                  </Link>
                  <Link to="/analytics" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics Dashboard
                    </Button>
                  </Link>
                  <Link to="/manage-rewards" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <Gift className="w-4 h-4 mr-2" />
                      Manage Rewards
                    </Button>
                  </Link>
                  <Link to="/schedule-settings" className="block">
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Settings
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {activity.action}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {activity.customer}
                          </p>
                        </div>
                        <div className="text-xs text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Customer Retention</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <Progress value={87} className="bg-blue-100" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Reward Redemption Rate</span>
                      <span className="font-medium">73%</span>
                    </div>
                    <Progress value={73} className="bg-green-100" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Monthly Growth</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="bg-purple-100" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

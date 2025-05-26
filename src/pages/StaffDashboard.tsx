
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Users, DollarSign, Calendar, Gift, TrendingUp, Clock, Star, UserCheck, BarChart3, ArrowLeft, Shield } from "lucide-react";

const StaffDashboard = () => {
  const todayStats = [
    { title: "Today's Appointments", value: "12", icon: Calendar, color: "bg-blue-500" },
    { title: "Walk-ins Served", value: "8", icon: UserCheck, color: "bg-green-500" },
    { title: "Rewards Redeemed", value: "5", icon: Gift, color: "bg-purple-500" },
    { title: "Revenue Generated", value: "$1,240", icon: DollarSign, color: "bg-orange-500" }
  ];

  const weeklyGoals = [
    { metric: "Appointments Booked", current: 67, target: 80, percentage: 84 },
    { metric: "Customer Satisfaction", current: 94, target: 95, percentage: 99 },
    { metric: "Reward Sign-ups", current: 23, target: 30, percentage: 77 },
    { metric: "Revenue Target", current: 4200, target: 5000, percentage: 84 }
  ];

  const upcomingAppointments = [
    { time: "10:00 AM", customer: "Sarah Johnson", service: "Haircut & Style", duration: "45 min", status: "confirmed" },
    { time: "11:00 AM", customer: "Mike Rodriguez", service: "Beard Trim", duration: "30 min", status: "confirmed" },
    { time: "12:30 PM", customer: "Emma Wilson", service: "Color Treatment", duration: "2 hours", status: "pending" },
    { time: "2:00 PM", customer: "David Kim", service: "Full Service", duration: "1.5 hours", status: "confirmed" },
    { time: "4:00 PM", customer: "Walk-in", service: "Available Slot", duration: "1 hour", status: "available" }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      "confirmed": { color: "bg-green-100 text-green-800", text: "Confirmed" },
      "pending": { color: "bg-yellow-100 text-yellow-800", text: "Pending" },
      "available": { color: "bg-blue-100 text-blue-800", text: "Available" }
    };
    
    const config = statusConfig[status] || statusConfig["available"];
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
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
                  <UserCheck className="w-8 h-8 mr-3 text-indigo-600" />
                  Staff Dashboard
                </h1>
                <p className="text-gray-600 ml-11">Daily operations and customer service management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Staff Member Access
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
                On Duty
              </Badge>
            </div>
          </div>

          {/* Today's Performance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {todayStats.map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Staff Quick Actions
                  </CardTitle>
                  <CardDescription>Essential tools for daily operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/customer-checkin" className="block">
                      <Button className="w-full h-16 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white flex flex-col items-center justify-center space-y-1">
                        <UserCheck className="w-6 h-6" />
                        <span className="text-sm">Customer Check-in</span>
                      </Button>
                    </Link>
                    <Link to="/redeem-rewards" className="block">
                      <Button className="w-full h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex flex-col items-center justify-center space-y-1">
                        <Gift className="w-6 h-6" />
                        <span className="text-sm">Redeem Rewards</span>
                      </Button>
                    </Link>
                    <Link to="/all-customers" className="block">
                      <Button className="w-full h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white flex flex-col items-center justify-center space-y-1">
                        <Users className="w-6 h-6" />
                        <span className="text-sm">View Customers</span>
                      </Button>
                    </Link>
                    <Link to="/analytics" className="block">
                      <Button className="w-full h-16 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white flex flex-col items-center justify-center space-y-1">
                        <BarChart3 className="w-6 h-6" />
                        <span className="text-sm">View Analytics</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Today's Schedule */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Today's Schedule
                  </CardTitle>
                  <CardDescription>Your appointments and available time slots</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-lg">
                            <Clock className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{appointment.time}</p>
                            <p className="text-sm text-gray-600">{appointment.customer}</p>
                            <p className="text-sm text-gray-500">{appointment.service} • {appointment.duration}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(appointment.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Weekly Goals */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Weekly Goals
                  </CardTitle>
                  <CardDescription>Track your performance this week</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weeklyGoals.map((goal, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{goal.metric}</span>
                        <span className="text-gray-600">
                          {typeof goal.current === 'number' && goal.current > 100 ? goal.current : `${goal.current}${typeof goal.current === 'number' && goal.current <= 100 ? '%' : ''}`}
                          {typeof goal.target === 'number' && goal.target > 100 ? ` / ${goal.target}` : ` / ${goal.target}${typeof goal.target === 'number' && goal.target <= 100 ? '%' : ''}`}
                        </span>
                      </div>
                      <Progress value={goal.percentage} className="h-2" />
                      <div className="text-xs text-gray-500 mt-1">
                        {goal.percentage}% complete
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                  <CardDescription>This week's highlights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <UserCheck className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium">Customers Served</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">42</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">Avg. Rating</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">4.8</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Gift className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium">Rewards Processed</span>
                    </div>
                    <span className="text-lg font-bold text-purple-600">18</span>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg text-indigo-800">💡 Pro Tip</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-indigo-700">
                    Encourage customers to sign up for loyalty rewards during check-in. It increases retention by 23% on average!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;

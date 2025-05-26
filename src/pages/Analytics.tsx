
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Users, DollarSign, Calendar, BarChart3, PieChart, Target } from "lucide-react";

const Analytics = () => {
  const monthlyData = [
    { month: "Jan", revenue: 18500, customers: 145, visits: 320 },
    { month: "Feb", revenue: 22300, customers: 167, visits: 380 },
    { month: "Mar", revenue: 19800, customers: 156, visits: 350 },
    { month: "Apr", revenue: 25600, customers: 189, visits: 420 },
    { month: "May", revenue: 28900, customers: 203, visits: 465 },
    { month: "Jun", revenue: 24350, customers: 178, visits: 398 }
  ];

  const topServices = [
    { name: "Haircut & Style", bookings: 145, revenue: "$8,700", growth: "+12%" },
    { name: "Color Treatment", bookings: 89, revenue: "$6,230", growth: "+18%" },
    { name: "Manicure/Pedicure", bookings: 124, revenue: "$3,720", growth: "+8%" },
    { name: "Facial Treatment", bookings: 67, revenue: "$4,020", growth: "+15%" },
    { name: "Massage Therapy", bookings: 45, revenue: "$2,700", growth: "+22%" }
  ];

  const customerMetrics = [
    { metric: "Customer Retention Rate", value: "87%", target: "85%", status: "exceeding" },
    { metric: "Average Visit Value", value: "$145", target: "$130", status: "exceeding" },
    { metric: "Reward Redemption Rate", value: "73%", target: "70%", status: "exceeding" },
    { metric: "Customer Satisfaction", value: "4.8/5", target: "4.5/5", status: "exceeding" },
    { metric: "New Customer Acquisition", value: "23", target: "20", status: "exceeding" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Link to="/staff-dashboard" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
                <p className="text-gray-600">Comprehensive business insights and performance metrics</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Revenue Chart Simulation */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Revenue Trends (Last 6 Months)
              </CardTitle>
              <CardDescription>Monthly revenue, customer count, and visit tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-4 mb-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg" 
                         style={{ height: `${(data.revenue / 30000) * 150}px`, minHeight: '20px' }}>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-b-lg">
                      <p className="text-xs font-medium">{data.month}</p>
                      <p className="text-xs text-gray-600">${(data.revenue / 1000).toFixed(1)}k</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                  <DollarSign className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <p className="text-2xl font-bold text-green-800">$24,350</p>
                  <p className="text-sm text-green-600">This Month's Revenue</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                  <Users className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-2xl font-bold text-blue-800">178</p>
                  <p className="text-sm text-blue-600">Active Customers</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                  <Calendar className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                  <p className="text-2xl font-bold text-purple-800">398</p>
                  <p className="text-sm text-purple-600">Total Visits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Services */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Top Services Performance
                </CardTitle>
                <CardDescription>Most popular services by bookings and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{service.name}</p>
                        <p className="text-xs text-gray-600">{service.bookings} bookings</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">{service.revenue}</p>
                        <p className="text-xs text-green-600">{service.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Key Performance Indicators
                </CardTitle>
                <CardDescription>Progress towards business goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{metric.metric}</span>
                        <span className="text-green-600 font-bold">{metric.value}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={85 + index * 3} className="flex-1" />
                        <span className="text-xs text-gray-500">Target: {metric.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

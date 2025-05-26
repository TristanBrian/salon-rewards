
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Gift, Star, CheckCircle, Clock } from "lucide-react";

const CustomerCheckin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock customer data
  const mockCustomer = {
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    visits: 7,
    totalVisits: 10,
    nextReward: "Free Haircut & Style",
    lastVisit: "2024-01-15",
    memberSince: "2023-06-15",
    favoriteServices: ["Haircut", "Hair Color", "Blowout"],
    tier: "Gold",
    points: 420
  };

  const handleLookup = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCustomer(mockCustomer);
      setIsLoading(false);
    }, 1500);
  };

  const handleCheckin = () => {
    // Simulate check-in process
    setCustomer({ ...customer, visits: customer.visits + 1 });
  };

  const progressPercentage = customer ? (customer.visits / customer.totalVisits) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Customer Check-in</h1>
          </div>

          {/* Phone Number Input */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-6">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Welcome Back!</CardTitle>
              <CardDescription>Enter your phone number to check in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-center text-lg"
                />
              </div>
              <Button 
                onClick={handleLookup} 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading || !phoneNumber}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Looking up...
                  </div>
                ) : (
                  "Look Up Account"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Customer Information */}
          {customer && (
            <div className="space-y-4 animate-fade-in">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-white">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{customer.name}</h2>
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                      {customer.tier} Member
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Progress to next reward</p>
                      <Progress value={progressPercentage} className="mb-2" />
                      <p className="text-sm font-medium">
                        {customer.visits} of {customer.totalVisits} visits
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Last Visit</p>
                        <p className="text-sm font-semibold">Jan 15, 2024</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <Star className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Points</p>
                        <p className="text-sm font-semibold">{customer.points}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 text-center">
                      <Gift className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Next Reward</p>
                      <p className="font-semibold text-green-800">{customer.nextReward}</p>
                      <p className="text-xs text-green-600 mt-1">
                        {customer.totalVisits - customer.visits} more visits to unlock!
                      </p>
                    </div>

                    <Button 
                      onClick={handleCheckin}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Check In Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerCheckin;

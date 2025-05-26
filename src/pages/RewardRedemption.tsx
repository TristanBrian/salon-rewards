
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { ArrowLeft, Gift, Check, Lock, Star, Clock, Sparkles } from "lucide-react";

const RewardRedemption = () => {
  const [redeemedRewards, setRedeemedRewards] = useState(new Set());

  const customerData = {
    name: "Sarah Johnson",
    totalPoints: 420,
    currentVisits: 7,
    memberTier: "Gold",
    memberSince: "June 2023"
  };

  const customerRewards = [
    { 
      id: 1, 
      name: "Free Haircut", 
      description: "Complimentary cut and style session", 
      visits: 10, 
      unlocked: true, 
      points: 100,
      category: "Hair Services",
      expires: "Dec 31, 2024",
      popularity: "Most Popular"
    },
    { 
      id: 2, 
      name: "20% Off Color", 
      description: "Discount on any hair coloring service", 
      visits: 15, 
      unlocked: false, 
      points: 150,
      category: "Hair Services",
      expires: "Dec 31, 2024"
    },
    { 
      id: 3, 
      name: "Free Manicure", 
      description: "Basic manicure service with polish", 
      visits: 8, 
      unlocked: true, 
      points: 80,
      category: "Nail Services",
      expires: "Dec 31, 2024"
    },
    { 
      id: 4, 
      name: "Deluxe Facial", 
      description: "60-minute deep cleansing facial treatment", 
      visits: 20, 
      unlocked: false, 
      points: 200,
      category: "Skincare",
      expires: "Dec 31, 2024"
    },
    { 
      id: 5, 
      name: "30-Min Massage", 
      description: "Relaxing therapeutic massage session", 
      visits: 12, 
      unlocked: false, 
      points: 120,
      category: "Wellness",
      expires: "Dec 31, 2024"
    },
    { 
      id: 6, 
      name: "VIP Treatment", 
      description: "Premium service package with champagne", 
      visits: 25, 
      unlocked: false, 
      points: 250,
      category: "Premium",
      expires: "Dec 31, 2024",
      special: true
    }
  ];

  const handleRedeem = (rewardId) => {
    setRedeemedRewards(prev => new Set([...prev, rewardId]));
  };

  const getTierColor = (tier) => {
    switch(tier) {
      case "Gold": return "bg-gradient-to-r from-yellow-400 to-orange-400";
      case "Silver": return "bg-gradient-to-r from-gray-300 to-gray-500";
      case "Platinum": return "bg-gradient-to-r from-purple-400 to-pink-400";
      default: return "bg-gradient-to-r from-blue-400 to-blue-600";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Hair Services": "bg-purple-100 text-purple-800",
      "Nail Services": "bg-pink-100 text-pink-800",
      "Skincare": "bg-green-100 text-green-800",
      "Wellness": "bg-blue-100 text-blue-800",
      "Premium": "bg-gradient-to-r from-yellow-400 to-orange-400 text-white"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Your Rewards</h1>
              <p className="text-gray-600">Redeem your earned rewards and unlock new benefits</p>
            </div>
          </div>

          {/* Customer Profile Header */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-white">
                      {customerData.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{customerData.name}</h2>
                    <p className="text-gray-600">Member since {customerData.memberSince}</p>
                    <Badge className={`${getTierColor(customerData.memberTier)} text-white`}>
                      {customerData.memberTier} Member
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-2xl font-bold text-gray-800">{customerData.totalPoints}</span>
                    <span className="text-gray-600">points</span>
                  </div>
                  <p className="text-sm text-gray-600">{customerData.currentVisits} visits this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customerRewards.map((reward) => (
              <Card 
                key={reward.id} 
                className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  reward.special ? 'ring-2 ring-yellow-400' : ''
                } ${!reward.unlocked ? 'opacity-75' : ''}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          reward.unlocked ? 'bg-emerald-100' : 'bg-gray-100'
                        }`}>
                          {reward.unlocked ? (
                            redeemedRewards.has(reward.id) ? (
                              <Check className="w-6 h-6 text-emerald-600" />
                            ) : (
                              <Gift className="w-6 h-6 text-emerald-600" />
                            )
                          ) : (
                            <Lock className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        {reward.special && (
                          <Sparkles className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-800">{reward.name}</h3>
                        {reward.popularity && (
                          <Badge variant="secondary" className="text-xs">
                            {reward.popularity}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge className={getCategoryColor(reward.category)}>
                          {reward.category}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          Expires {reward.expires}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {reward.unlocked ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Required visits completed</span>
                          <span className="font-medium text-emerald-600">✓ {reward.visits} visits</span>
                        </div>
                        <Progress value={100} className="bg-emerald-100" />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress to unlock</span>
                          <span className="font-medium">{customerData.currentVisits}/{reward.visits} visits</span>
                        </div>
                        <Progress 
                          value={(customerData.currentVisits / reward.visits) * 100} 
                          className="bg-gray-200" 
                        />
                        <p className="text-xs text-gray-500">
                          {reward.visits - customerData.currentVisits} more visits needed
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{reward.points} points</span>
                      </div>
                      
                      {reward.unlocked ? (
                        redeemedRewards.has(reward.id) ? (
                          <Badge className="bg-gray-100 text-gray-600">
                            <Check className="w-3 h-3 mr-1" />
                            Redeemed
                          </Badge>
                        ) : (
                          <Button 
                            size="sm" 
                            onClick={() => handleRedeem(reward.id)}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            <Gift className="w-3 h-3 mr-1" />
                            Redeem
                          </Button>
                        )
                      ) : (
                        <Button size="sm" disabled variant="outline">
                          <Lock className="w-3 h-3 mr-1" />
                          Locked
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Rewards Summary */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="w-5 h-5 mr-2" />
                Rewards Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">
                    {customerRewards.filter(r => r.unlocked).length}
                  </p>
                  <p className="text-sm text-gray-600">Available Rewards</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {redeemedRewards.size}
                  </p>
                  <p className="text-sm text-gray-600">Redeemed This Month</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {customerRewards.filter(r => !r.unlocked).length}
                  </p>
                  <p className="text-sm text-gray-600">Coming Soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RewardRedemption;

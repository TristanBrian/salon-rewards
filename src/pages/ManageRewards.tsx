
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { ArrowLeft, Gift, Plus, Edit, Trash2, Users, Target, Percent } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ManageRewards = () => {
  const [newRewardName, setNewRewardName] = useState("");
  const [newRewardRequirement, setNewRewardRequirement] = useState("");
  const [newRewardType, setNewRewardType] = useState("");
  const [newRewardValue, setNewRewardValue] = useState("");
  const [newRewardDescription, setNewRewardDescription] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const [rewards, setRewards] = useState([
    { 
      id: 1, 
      name: "Free Basic Haircut", 
      requirement: "10 visits", 
      type: "Service", 
      value: "$45", 
      claimed: 89, 
      active: true,
      description: "Complimentary basic haircut and style"
    },
    { 
      id: 2, 
      name: "20% Off Color Treatment", 
      requirement: "5 visits", 
      type: "Discount", 
      value: "20%", 
      claimed: 156, 
      active: true,
      description: "Discount on any color service"
    },
    { 
      id: 3, 
      name: "Free Manicure", 
      requirement: "7 visits", 
      type: "Service", 
      value: "$35", 
      claimed: 67, 
      active: true,
      description: "Complimentary basic manicure"
    },
    { 
      id: 4, 
      name: "VIP Package Deal", 
      requirement: "15 visits", 
      type: "Package", 
      value: "$200", 
      claimed: 23, 
      active: true,
      description: "Premium service package with extras"
    },
    { 
      id: 5, 
      name: "Birthday Special", 
      requirement: "Birthday month", 
      type: "Special", 
      value: "25%", 
      claimed: 45, 
      active: true,
      description: "Birthday month discount on any service"
    }
  ]);

  const rewardStats = [
    { title: "Total Rewards Created", value: rewards.length.toString(), icon: Gift, color: "bg-purple-500" },
    { title: "Active Rewards", value: rewards.filter(r => r.active).length.toString(), icon: Target, color: "bg-green-500" },
    { title: "Rewards Claimed", value: rewards.reduce((sum, r) => sum + r.claimed, 0).toString(), icon: Users, color: "bg-blue-500" },
    { title: "Avg. Redemption Rate", value: "73%", icon: Percent, color: "bg-orange-500" }
  ];

  const getTypeBadge = (type) => {
    const typeConfig = {
      "Service": { color: "bg-blue-100 text-blue-800" },
      "Discount": { color: "bg-green-100 text-green-800" },
      "Package": { color: "bg-purple-100 text-purple-800" },
      "Special": { color: "bg-orange-100 text-orange-800" }
    };
    
    const config = typeConfig[type] || typeConfig["Service"];
    return <Badge className={config.color}>{type}</Badge>;
  };

  const handleCreateReward = () => {
    if (!newRewardName || !newRewardRequirement || !newRewardType || !newRewardValue) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newReward = {
      id: rewards.length + 1,
      name: newRewardName,
      requirement: newRewardRequirement,
      type: newRewardType,
      value: newRewardValue,
      claimed: 0,
      active: true,
      description: newRewardDescription || `New ${newRewardType.toLowerCase()} reward`
    };

    setRewards([...rewards, newReward]);
    setNewRewardName("");
    setNewRewardRequirement("");
    setNewRewardType("");
    setNewRewardValue("");
    setNewRewardDescription("");
    setIsCreateDialogOpen(false);

    toast({
      title: "Reward Created!",
      description: `${newRewardName} has been added successfully`,
    });
  };

  const handleQuickCreate = (template) => {
    const templates = {
      "10th Visit Free Service": {
        name: "10th Visit Free Service",
        requirement: "10 visits",
        type: "Service",
        value: "$50",
        description: "Complimentary service on 10th visit"
      },
      "Referral 20% Discount": {
        name: "Referral Discount",
        requirement: "1 referral",
        type: "Discount",
        value: "20%",
        description: "20% off for successful referral"
      },
      "Birthday Month Special": {
        name: "Birthday Special",
        requirement: "Birthday month",
        type: "Special",
        value: "25%",
        description: "Birthday month discount"
      },
      "VIP Membership Tier": {
        name: "VIP Membership",
        requirement: "20 visits",
        type: "Package",
        value: "$150",
        description: "VIP tier membership benefits"
      }
    };

    const selectedTemplate = templates[template];
    if (selectedTemplate) {
      setNewRewardName(selectedTemplate.name);
      setNewRewardRequirement(selectedTemplate.requirement);
      setNewRewardType(selectedTemplate.type);
      setNewRewardValue(selectedTemplate.value);
      setNewRewardDescription(selectedTemplate.description);
      setIsCreateDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Link to="/admin-settings" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Admin
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Manage Rewards</h1>
                <p className="text-gray-600">Create and manage loyalty program rewards</p>
              </div>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Reward
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Reward</DialogTitle>
                  <DialogDescription>
                    Add a new reward to your loyalty program
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reward Name *
                    </label>
                    <Input 
                      placeholder="e.g., Free Haircut"
                      value={newRewardName}
                      onChange={(e) => setNewRewardName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requirement *
                    </label>
                    <Input 
                      placeholder="e.g., 10 visits"
                      value={newRewardRequirement}
                      onChange={(e) => setNewRewardRequirement(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type *
                    </label>
                    <Select value={newRewardType} onValueChange={setNewRewardType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reward type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Service">Service</SelectItem>
                        <SelectItem value="Discount">Discount</SelectItem>
                        <SelectItem value="Package">Package</SelectItem>
                        <SelectItem value="Special">Special</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Value *
                    </label>
                    <Input 
                      placeholder="e.g., $50 or 20%"
                      value={newRewardValue}
                      onChange={(e) => setNewRewardValue(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Input 
                      placeholder="Optional description"
                      value={newRewardDescription}
                      onChange={(e) => setNewRewardDescription(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleCreateReward}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Reward
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Reward Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {rewardStats.map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
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
            {/* Rewards List */}
            <div className="lg:col-span-2">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="w-5 h-5 mr-2" />
                    Active Rewards
                  </CardTitle>
                  <CardDescription>Manage your loyalty program rewards and incentives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Reward</TableHead>
                          <TableHead>Requirement</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Claimed</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rewards.map((reward) => (
                          <TableRow key={reward.id} className="hover:bg-gray-50">
                            <TableCell>
                              <div>
                                <p className="font-medium">{reward.name}</p>
                                <p className="text-sm text-gray-500">{reward.description}</p>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{reward.requirement}</TableCell>
                            <TableCell>{getTypeBadge(reward.type)}</TableCell>
                            <TableCell className="font-bold text-green-600">{reward.value}</TableCell>
                            <TableCell>{reward.claimed}x</TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                <Button size="sm" variant="outline">
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Create and Templates */}
            <div className="space-y-6">
              {/* Quick Create */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Create Reward</CardTitle>
                  <CardDescription>Add a new reward to your program</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reward Name
                    </label>
                    <Input 
                      placeholder="e.g., Free Haircut"
                      value={newRewardName}
                      onChange={(e) => setNewRewardName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requirement
                    </label>
                    <Input 
                      placeholder="e.g., 10 visits"
                      value={newRewardRequirement}
                      onChange={(e) => setNewRewardRequirement(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Reward
                  </Button>
                </CardContent>
              </Card>

              {/* Reward Templates */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg">Popular Templates</CardTitle>
                  <CardDescription>Quick start with proven reward ideas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => handleQuickCreate("10th Visit Free Service")}
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    10th Visit Free Service
                  </Button>
                  <Button 
                    onClick={() => handleQuickCreate("Referral 20% Discount")}
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <Percent className="w-4 h-4 mr-2" />
                    Referral 20% Discount
                  </Button>
                  <Button 
                    onClick={() => handleQuickCreate("Birthday Month Special")}
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Birthday Month Special
                  </Button>
                  <Button 
                    onClick={() => handleQuickCreate("VIP Membership Tier")}
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    VIP Membership Tier
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRewards;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Search, Plus, Edit, Gift, Phone, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AllCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");
  const [newCustomerEmail, setNewCustomerEmail] = useState("");
  const { toast } = useToast();

  const [customers, setCustomers] = useState([
    { 
      id: 1, 
      name: "Sarah Johnson", 
      phone: "(555) 123-4567", 
      email: "sarah.j@email.com",
      visits: 12, 
      totalSpent: 1240, 
      lastVisit: "2024-01-15",
      status: "Gold",
      joinDate: "2023-03-15"
    },
    { 
      id: 2, 
      name: "Mike Chen", 
      phone: "(555) 234-5678", 
      email: "mike.chen@email.com",
      visits: 8, 
      totalSpent: 680, 
      lastVisit: "2024-01-10",
      status: "Silver",
      joinDate: "2023-06-20"
    },
    { 
      id: 3, 
      name: "Emma Wilson", 
      phone: "(555) 345-6789", 
      email: "emma.w@email.com",
      visits: 15, 
      totalSpent: 1890, 
      lastVisit: "2024-01-18",
      status: "Platinum",
      joinDate: "2023-01-10"
    },
    { 
      id: 4, 
      name: "David Brown", 
      phone: "(555) 456-7890", 
      email: "david.brown@email.com",
      visits: 5, 
      totalSpent: 425, 
      lastVisit: "2024-01-12",
      status: "Bronze",
      joinDate: "2023-09-05"
    },
    { 
      id: 5, 
      name: "Lisa Garcia", 
      phone: "(555) 567-8901", 
      email: "lisa.garcia@email.com",
      visits: 20, 
      totalSpent: 2150, 
      lastVisit: "2024-01-20",
      status: "Platinum",
      joinDate: "2022-11-30"
    }
  ]);

  const customerStats = [
    { title: "Total Customers", value: customers.length.toString(), icon: Users, color: "bg-blue-500" },
    { title: "Active This Month", value: customers.filter(c => new Date(c.lastVisit) > new Date('2024-01-01')).length.toString(), icon: User, color: "bg-green-500" },
    { title: "Platinum Members", value: customers.filter(c => c.status === "Platinum").length.toString(), icon: Gift, color: "bg-purple-500" },
    { title: "Avg. Visits", value: Math.round(customers.reduce((sum, c) => sum + c.visits, 0) / customers.length).toString(), icon: Phone, color: "bg-orange-500" }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const statusConfig = {
      "Bronze": { color: "bg-amber-100 text-amber-800" },
      "Silver": { color: "bg-gray-100 text-gray-800" },
      "Gold": { color: "bg-yellow-100 text-yellow-800" },
      "Platinum": { color: "bg-purple-100 text-purple-800" }
    };
    
    const config = statusConfig[status] || statusConfig["Bronze"];
    return <Badge className={config.color}>{status}</Badge>;
  };

  const handleAddCustomer = () => {
    if (!newCustomerName || !newCustomerPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least name and phone number",
        variant: "destructive"
      });
      return;
    }

    const newCustomer = {
      id: customers.length + 1,
      name: newCustomerName,
      phone: newCustomerPhone,
      email: newCustomerEmail || "Not provided",
      visits: 0,
      totalSpent: 0,
      lastVisit: new Date().toISOString().split('T')[0],
      status: "Bronze",
      joinDate: new Date().toISOString().split('T')[0]
    };

    setCustomers([...customers, newCustomer]);
    setNewCustomerName("");
    setNewCustomerPhone("");
    setNewCustomerEmail("");
    setIsAddCustomerDialogOpen(false);

    toast({
      title: "Customer Added!",
      description: `${newCustomerName} has been added successfully`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-50 to-indigo-100">
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
                <h1 className="text-3xl font-bold text-gray-800">All Customers</h1>
                <p className="text-gray-600">Manage your customer database and loyalty members</p>
              </div>
            </div>
            <Dialog open={isAddCustomerDialogOpen} onOpenChange={setIsAddCustomerDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Customer
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                  <DialogDescription>
                    Add a new customer to your database
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input 
                      placeholder="e.g., John Smith"
                      value={newCustomerName}
                      onChange={(e) => setNewCustomerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input 
                      placeholder="e.g., (555) 123-4567"
                      value={newCustomerPhone}
                      onChange={(e) => setNewCustomerPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input 
                      placeholder="e.g., john@email.com"
                      type="email"
                      value={newCustomerEmail}
                      onChange={(e) => setNewCustomerEmail(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleAddCustomer}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Customer
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Customer Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {customerStats.map((stat, index) => (
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

          {/* Search and Filters */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Search Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name, phone, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Customers Table */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Customer Database
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  {filteredCustomers.length} customers
                </Badge>
              </CardTitle>
              <CardDescription>Complete list of all registered customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Visits</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-gray-500">Member since {new Date(customer.joinDate).toLocaleDateString()}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{customer.phone}</p>
                            <p className="text-sm text-gray-500">{customer.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{customer.visits}</TableCell>
                        <TableCell className="font-bold text-green-600">${customer.totalSpent}</TableCell>
                        <TableCell>{getStatusBadge(customer.status)}</TableCell>
                        <TableCell>{new Date(customer.lastVisit).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Phone className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="w-3 h-3" />
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
      </div>
    </div>
  );
};

export default AllCustomers;

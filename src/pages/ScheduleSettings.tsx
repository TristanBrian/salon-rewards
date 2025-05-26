
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Settings, Plus, Edit, Trash2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ScheduleSettings = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [isAddSlotDialogOpen, setIsAddSlotDialogOpen] = useState(false);
  const [newSlotService, setNewSlotService] = useState("");
  const [newSlotTime, setNewSlotTime] = useState("");
  const [newSlotStaff, setNewSlotStaff] = useState("");
  const { toast } = useToast();

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const scheduleData = {
    "Monday": { open: "9:00 AM", close: "7:00 PM", staff: 3, slots: 24 },
    "Tuesday": { open: "9:00 AM", close: "7:00 PM", staff: 3, slots: 24 },
    "Wednesday": { open: "9:00 AM", close: "8:00 PM", staff: 4, slots: 28 },
    "Thursday": { open: "9:00 AM", close: "8:00 PM", staff: 4, slots: 28 },
    "Friday": { open: "8:00 AM", close: "9:00 PM", staff: 5, slots: 35 },
    "Saturday": { open: "8:00 AM", close: "6:00 PM", staff: 4, slots: 32 },
    "Sunday": { open: "10:00 AM", close: "5:00 PM", staff: 2, slots: 16 }
  };

  const [services, setServices] = useState([
    { id: 1, name: "Haircut", duration: "45 min", price: "$45", staff: "Any", slots: 8 },
    { id: 2, name: "Color Treatment", duration: "2 hours", price: "$120", staff: "Senior", slots: 3 },
    { id: 3, name: "Highlights", duration: "3 hours", price: "$180", staff: "Senior", slots: 2 },
    { id: 4, name: "Manicure", duration: "30 min", price: "$30", staff: "Nail Tech", slots: 12 },
    { id: 5, name: "Pedicure", duration: "45 min", price: "$40", staff: "Nail Tech", slots: 8 },
    { id: 6, name: "Facial", duration: "60 min", price: "$80", staff: "Esthetician", slots: 6 },
    { id: 7, name: "Massage", duration: "90 min", price: "$120", staff: "Therapist", slots: 4 }
  ]);

  const [timeSlots, setTimeSlots] = useState([
    { id: 1, time: "9:00 AM", service: "Haircut", staff: "Sarah Mitchell", available: true },
    { id: 2, time: "9:45 AM", service: "Manicure", staff: "Emma Chen", available: true },
    { id: 3, time: "10:00 AM", service: "Color Treatment", staff: "Sarah Mitchell", available: false },
    { id: 4, time: "10:30 AM", service: "Facial", staff: "Lisa Johnson", available: true },
    { id: 5, time: "11:00 AM", service: "Haircut", staff: "Mike Rodriguez", available: true }
  ]);

  const staffMembers = [
    { name: "Sarah Mitchell", role: "Senior Stylist", schedule: "Mon-Fri 9-6", status: "active" },
    { name: "Mike Rodriguez", role: "Barber", schedule: "Tue-Sat 10-7", status: "active" },
    { name: "Emma Chen", role: "Nail Technician", schedule: "Wed-Sun 9-5", status: "active" },
    { name: "David Kim", role: "Massage Therapist", schedule: "Mon-Fri 11-8", status: "active" },
    { name: "Lisa Johnson", role: "Esthetician", schedule: "Thu-Mon 10-6", status: "vacation" }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      "active": { color: "bg-green-100 text-green-800", text: "Active" },
      "vacation": { color: "bg-orange-100 text-orange-800", text: "On Vacation" },
      "sick": { color: "bg-red-100 text-red-800", text: "Sick Leave" }
    };
    
    const config = statusConfig[status] || statusConfig["active"];
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  const handleAddTimeSlot = () => {
    if (!newSlotService || !newSlotTime || !newSlotStaff) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newSlot = {
      id: timeSlots.length + 1,
      time: newSlotTime,
      service: newSlotService,
      staff: newSlotStaff,
      available: true
    };

    setTimeSlots([...timeSlots, newSlot]);
    setNewSlotService("");
    setNewSlotTime("");
    setNewSlotStaff("");
    setIsAddSlotDialogOpen(false);

    toast({
      title: "Time Slot Added!",
      description: `${newSlotTime} slot for ${newSlotService} has been created`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100">
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
                <h1 className="text-3xl font-bold text-gray-800">Schedule Settings</h1>
                <p className="text-gray-600">Manage operating hours, staff schedules, and appointment slots</p>
              </div>
            </div>
            <Dialog open={isAddSlotDialogOpen} onOpenChange={setIsAddSlotDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Time Slot
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Time Slot</DialogTitle>
                  <DialogDescription>
                    Create a new appointment time slot
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time *
                    </label>
                    <Input 
                      type="time"
                      value={newSlotTime}
                      onChange={(e) => setNewSlotTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service *
                    </label>
                    <Select value={newSlotService} onValueChange={setNewSlotService}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.name}>
                            {service.name} - {service.duration}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Staff Member *
                    </label>
                    <Select value={newSlotStaff} onValueChange={setNewSlotStaff}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select staff member" />
                      </SelectTrigger>
                      <SelectContent>
                        {staffMembers.filter(staff => staff.status === 'active').map((staff) => (
                          <SelectItem key={staff.name} value={staff.name}>
                            {staff.name} - {staff.role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={handleAddTimeSlot}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Time Slot
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weekly Schedule */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Weekly Operating Hours
                  </CardTitle>
                  <CardDescription>Set your business hours for each day of the week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weekDays.map((day) => (
                      <div key={day} className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedDay === day ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                      }`} onClick={() => setSelectedDay(day)}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{day}</p>
                            <p className="text-sm text-gray-600">
                              {scheduleData[day].open} - {scheduleData[day].close}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{scheduleData[day].staff} staff</p>
                            <p className="text-sm text-gray-600">{scheduleData[day].slots} slots</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Current Day Time Slots */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Today's Time Slots
                  </CardTitle>
                  <CardDescription>Available appointment slots for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Time</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Staff</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeSlots.map((slot) => (
                          <TableRow key={slot.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{slot.time}</TableCell>
                            <TableCell>{slot.service}</TableCell>
                            <TableCell>{slot.staff}</TableCell>
                            <TableCell>
                              <Badge className={slot.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                                {slot.available ? "Available" : "Booked"}
                              </Badge>
                            </TableCell>
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

              {/* Service Configuration */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Service Configuration
                  </CardTitle>
                  <CardDescription>Manage service durations, pricing, and staff assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Service</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Staff Required</TableHead>
                          <TableHead>Daily Slots</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {services.map((service) => (
                          <TableRow key={service.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{service.name}</TableCell>
                            <TableCell>{service.duration}</TableCell>
                            <TableCell className="font-bold text-green-600">{service.price}</TableCell>
                            <TableCell>{service.staff}</TableCell>
                            <TableCell>{service.slots}</TableCell>
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

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Day Editor */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg">Edit {selectedDay}</CardTitle>
                  <CardDescription>Customize hours and capacity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opening Time
                    </label>
                    <Input 
                      type="time" 
                      defaultValue="09:00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Closing Time
                    </label>
                    <Input 
                      type="time" 
                      defaultValue="19:00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Staff Count
                    </label>
                    <Input 
                      type="number" 
                      defaultValue="3"
                      min="1"
                      max="10"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                    <Settings className="w-4 h-4 mr-2" />
                    Update Schedule
                  </Button>
                </CardContent>
              </Card>

              {/* Staff Status */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Staff Status
                  </CardTitle>
                  <CardDescription>Current staff availability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {staffMembers.map((staff, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{staff.name}</p>
                          <p className="text-xs text-gray-600">{staff.role}</p>
                          <p className="text-xs text-gray-500">{staff.schedule}</p>
                        </div>
                        <div>
                          {getStatusBadge(staff.status)}
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
    </div>
  );
};

export default ScheduleSettings;

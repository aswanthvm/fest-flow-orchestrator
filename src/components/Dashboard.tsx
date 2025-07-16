import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CalendarDays, 
  Users, 
  UserCheck, 
  UserCog, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Star,
  Award,
  Activity
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Enhanced mock data
const mockEvents = [
  { id: 1, name: "Tech Symposium 2024", date: "2024-02-15", venue: "Main Auditorium", capacity: 200, category: "Technology" },
  { id: 2, name: "Cultural Fest", date: "2024-03-20", venue: "Campus Grounds", capacity: 500, category: "Cultural" },
  { id: 3, name: "Career Fair", date: "2024-04-10", venue: "Convention Center", capacity: 300, category: "Career" },
  { id: 4, name: "Sports Meet", date: "2024-01-15", venue: "Sports Complex", capacity: 150, category: "Sports" },
  { id: 5, name: "Alumni Meetup", date: "2024-05-22", venue: "Conference Hall", capacity: 100, category: "Networking" },
  { id: 6, name: "Science Exhibition", date: "2024-06-30", venue: "Science Block", capacity: 250, category: "Academic" },
];

const mockStudents = [
  { id: 1, name: "John Doe", dept: "Computer Science", year: 3 },
  { id: 2, name: "Jane Smith", dept: "Electronics", year: 2 },
  { id: 3, name: "Mike Johnson", dept: "Mechanical", year: 4 },
  { id: 4, name: "Sarah Wilson", dept: "Computer Science", year: 1 },
  { id: 5, name: "Tom Brown", dept: "Civil", year: 3 },
  { id: 6, name: "Lisa Davis", dept: "Electronics", year: 2 },
];

const mockRegistrations = [
  { event_id: 1, student_id: 1, status: "confirmed" },
  { event_id: 1, student_id: 2, status: "confirmed" },
  { event_id: 1, student_id: 4, status: "pending" },
  { event_id: 2, student_id: 1, status: "confirmed" },
  { event_id: 2, student_id: 3, status: "confirmed" },
  { event_id: 2, student_id: 5, status: "confirmed" },
  { event_id: 3, student_id: 3, status: "confirmed" },
  { event_id: 3, student_id: 6, status: "confirmed" },
  { event_id: 5, student_id: 2, status: "confirmed" },
  { event_id: 6, student_id: 4, status: "pending" },
];

const mockCoordinators = [
  { id: 1, event_id: 1, staff_name: "Dr. Smith", role: "Lead Coordinator" },
  { id: 2, event_id: 2, staff_name: "Prof. Johnson", role: "Cultural Head" },
  { id: 3, event_id: 3, staff_name: "Ms. Parker", role: "Career Counselor" },
  { id: 4, event_id: 5, staff_name: "Dr. Wilson", role: "Alumni Relations" },
];

export const Dashboard = () => {
  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = mockEvents.filter(event => event.date >= today);
  const pastEvents = mockEvents.filter(event => event.date < today);

  const getEventRegistrations = (eventId: number) => {
    return mockRegistrations.filter(reg => reg.event_id === eventId);
  };

  const getEventCoordinator = (eventId: number) => {
    return mockCoordinators.find(coord => coord.event_id === eventId)?.staff_name || "Not assigned";
  };

  const getCapacityUtilization = (eventId: number) => {
    const event = mockEvents.find(e => e.id === eventId);
    const registrations = getEventRegistrations(eventId).length;
    return event ? Math.round((registrations / event.capacity) * 100) : 0;
  };

  // Data for charts
  const eventCategoryData = mockEvents.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(eventCategoryData).map(([name, value]) => ({
    name,
    value
  }));

  const registrationTrendData = mockEvents.map(event => ({
    name: event.name.split(' ')[0],
    registrations: getEventRegistrations(event.id).length,
    capacity: event.capacity
  }));

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--info))', 'hsl(var(--destructive))'];

  const totalRegistrations = mockRegistrations.length;
  const confirmedRegistrations = mockRegistrations.filter(reg => reg.status === "confirmed").length;
  const pendingRegistrations = totalRegistrations - confirmedRegistrations;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarDays className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockEvents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success">+{upcomingEvents.length}</span> upcoming
            </p>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockStudents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {new Set(mockStudents.map(s => s.dept)).size} departments
            </p>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registrations</CardTitle>
            <UserCheck className="h-5 w-5 text-success group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{confirmedRegistrations}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-warning">{pendingRegistrations}</span> pending approval
            </p>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-info">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coordinators</CardTitle>
            <UserCog className="h-5 w-5 text-info group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockCoordinators.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Managing {new Set(mockCoordinators.map(c => c.event_id)).size} events
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Event Registrations
            </CardTitle>
            <CardDescription>Registration count by event</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={registrationTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Bar dataKey="registrations" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Event Categories
            </CardTitle>
            <CardDescription>Distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events with Capacity */}
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
          <CardDescription>Events scheduled for the future with capacity tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {upcomingEvents.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No upcoming events</p>
            ) : (
              upcomingEvents.map((event) => {
                const registrations = getEventRegistrations(event.id);
                const capacity = getCapacityUtilization(event.id);
                return (
                  <div key={event.id} className="group p-6 border rounded-lg hover:shadow-md transition-all duration-300 bg-gradient-to-r from-card to-muted/20">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {event.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} • {event.venue}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Capacity Utilization</span>
                        <span className="font-medium">{registrations.length}/{event.capacity}</span>
                      </div>
                      <Progress value={capacity} className="h-2" />
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4">
                          <Badge variant={capacity > 80 ? "destructive" : capacity > 50 ? "default" : "secondary"}>
                            {capacity}% filled
                          </Badge>
                          <Badge variant="outline">
                            {getEventCoordinator(event.id)}
                          </Badge>
                        </div>
                        <Badge variant={registrations.filter(r => r.status === "pending").length > 0 ? "secondary" : "default"}>
                          {registrations.filter(r => r.status === "confirmed").length} confirmed
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Top Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.entries(eventCategoryData).sort(([,a], [,b]) => b - a)[0]?.[0] || "N/A"}
            </div>
            <p className="text-sm text-muted-foreground">
              Most popular event type
            </p>
          </CardContent>
        </Card>

        <Card className="text-center animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Avg. Registration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(totalRegistrations / mockEvents.length)}
            </div>
            <p className="text-sm text-muted-foreground">
              Per event
            </p>
          </CardContent>
        </Card>

        <Card className="text-center animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Activity className="h-5 w-5 text-info" />
              Active Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((confirmedRegistrations / totalRegistrations) * 100)}%
            </div>
            <p className="text-sm text-muted-foreground">
              Confirmation rate
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
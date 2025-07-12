import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, UserCheck, UserCog } from "lucide-react";

// Mock data
const mockEvents = [
  { id: 1, name: "Tech Symposium 2024", date: "2024-02-15", venue: "Main Auditorium" },
  { id: 2, name: "Cultural Fest", date: "2024-03-20", venue: "Campus Grounds" },
  { id: 3, name: "Career Fair", date: "2024-04-10", venue: "Convention Center" },
  { id: 4, name: "Sports Meet", date: "2024-01-15", venue: "Sports Complex" },
];

const mockStudents = [
  { id: 1, name: "John Doe", dept: "Computer Science" },
  { id: 2, name: "Jane Smith", dept: "Electronics" },
  { id: 3, name: "Mike Johnson", dept: "Mechanical" },
];

const mockRegistrations = [
  { event_id: 1, student_id: 1 },
  { event_id: 1, student_id: 2 },
  { event_id: 2, student_id: 1 },
  { event_id: 3, student_id: 3 },
];

const mockCoordinators = [
  { id: 1, event_id: 1, staff_name: "Dr. Smith" },
  { id: 2, event_id: 2, staff_name: "Prof. Johnson" },
];

export const Dashboard = () => {
  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = mockEvents.filter(event => event.date >= today);
  const pastEvents = mockEvents.filter(event => event.date < today);

  const getEventRegistrations = (eventId: number) => {
    return mockRegistrations.filter(reg => reg.event_id === eventId).length;
  };

  const getEventCoordinator = (eventId: number) => {
    return mockCoordinators.find(coord => coord.event_id === eventId)?.staff_name || "Not assigned";
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockEvents.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStudents.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRegistrations.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coordinators</CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCoordinators.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Events scheduled for the future</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.length === 0 ? (
              <p className="text-muted-foreground">No upcoming events</p>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.date} • {event.venue}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {getEventRegistrations(event.id)} registrations
                    </Badge>
                    <Badge variant="outline">
                      {getEventCoordinator(event.id)}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Past Events */}
      <Card>
        <CardHeader>
          <CardTitle>Past Events</CardTitle>
          <CardDescription>Previously held events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastEvents.length === 0 ? (
              <p className="text-muted-foreground">No past events</p>
            ) : (
              pastEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg opacity-75">
                  <div>
                    <h3 className="font-semibold">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.date} • {event.venue}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {getEventRegistrations(event.id)} registrations
                    </Badge>
                    <Badge variant="outline">
                      {getEventCoordinator(event.id)}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
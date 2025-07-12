import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, UserCheck, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Registration {
  event_id: number;
  student_id: number;
}

interface Event {
  id: number;
  name: string;
  date: string;
  venue: string;
}

interface Student {
  id: number;
  name: string;
  dept: string;
}

const mockEvents: Event[] = [
  { id: 1, name: "Tech Symposium 2024", date: "2024-02-15", venue: "Main Auditorium" },
  { id: 2, name: "Cultural Fest", date: "2024-03-20", venue: "Campus Grounds" },
  { id: 3, name: "Career Fair", date: "2024-04-10", venue: "Convention Center" },
];

const mockStudents: Student[] = [
  { id: 1, name: "John Doe", dept: "Computer Science" },
  { id: 2, name: "Jane Smith", dept: "Electronics" },
  { id: 3, name: "Mike Johnson", dept: "Mechanical" },
  { id: 4, name: "Sarah Wilson", dept: "Civil" },
  { id: 5, name: "David Brown", dept: "Computer Science" },
];

const initialRegistrations: Registration[] = [
  { event_id: 1, student_id: 1 },
  { event_id: 1, student_id: 2 },
  { event_id: 2, student_id: 1 },
  { event_id: 2, student_id: 3 },
  { event_id: 3, student_id: 4 },
];

export const RegistrationManagement = () => {
  const [registrations, setRegistrations] = useState<Registration[]>(initialRegistrations);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [viewEventId, setViewEventId] = useState<string>("");
  const { toast } = useToast();

  const handleRegisterStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEvent || !selectedStudent) {
      toast({
        title: "Error",
        description: "Please select both event and student",
        variant: "destructive",
      });
      return;
    }

    const eventId = parseInt(selectedEvent);
    const studentId = parseInt(selectedStudent);

    // Check for duplicate registration
    const existingRegistration = registrations.find(
      reg => reg.event_id === eventId && reg.student_id === studentId
    );

    if (existingRegistration) {
      toast({
        title: "Error",
        description: "Student is already registered for this event",
        variant: "destructive",
      });
      return;
    }

    const newRegistration: Registration = {
      event_id: eventId,
      student_id: studentId,
    };

    setRegistrations([...registrations, newRegistration]);
    setSelectedEvent("");
    setSelectedStudent("");
    
    toast({
      title: "Success",
      description: "Student registered successfully",
    });
  };

  const getEventRegistrations = (eventId: number) => {
    return registrations.filter(reg => reg.event_id === eventId);
  };

  const getStudentName = (studentId: number) => {
    return mockStudents.find(student => student.id === studentId)?.name || "Unknown";
  };

  const getStudentDept = (studentId: number) => {
    return mockStudents.find(student => student.id === studentId)?.dept || "Unknown";
  };

  const getEventName = (eventId: number) => {
    return mockEvents.find(event => event.id === eventId)?.name || "Unknown";
  };

  const selectedEventRegistrations = viewEventId 
    ? getEventRegistrations(parseInt(viewEventId))
    : [];

  return (
    <div className="space-y-6">
      {/* Register Student Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Register Student to Event
          </CardTitle>
          <CardDescription>Register a student for an event (prevents duplicate registrations)</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegisterStudent} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event">Select Event</Label>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEvents.map((event) => (
                      <SelectItem key={event.id} value={event.id.toString()}>
                        {event.name} - {event.date}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="student">Select Student</Label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStudents.map((student) => (
                      <SelectItem key={student.id} value={student.id.toString()}>
                        {student.name} ({student.dept})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Register Student
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* View Event Registrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            View Event Registrations
          </CardTitle>
          <CardDescription>View all students registered for a specific event</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="viewEvent">Select Event to View</Label>
              <Select value={viewEventId} onValueChange={setViewEventId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an event to view registrations" />
                </SelectTrigger>
                <SelectContent>
                  {mockEvents.map((event) => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.name} - {event.date}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {viewEventId && (
              <div className="mt-4">
                <h3 className="font-semibold mb-4">
                  Registrations for: {getEventName(parseInt(viewEventId))} 
                  <Badge variant="secondary" className="ml-2">
                    {selectedEventRegistrations.length} students
                  </Badge>
                </h3>
                
                {selectedEventRegistrations.length === 0 ? (
                  <p className="text-muted-foreground">No students registered for this event yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedEventRegistrations.map((registration, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h4 className="font-semibold">{getStudentName(registration.student_id)}</h4>
                        <p className="text-sm text-muted-foreground">
                          🎓 {getStudentDept(registration.student_id)}
                        </p>
                        <Badge variant="outline" className="mt-2">
                          ID: {registration.student_id}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* All Registrations Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            All Registrations Overview
          </CardTitle>
          <CardDescription>Summary of all event registrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEvents.map((event) => {
              const eventRegistrations = getEventRegistrations(event.id);
              return (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      📅 {event.date} • 📍 {event.venue}
                    </p>
                  </div>
                  <Badge variant={eventRegistrations.length > 0 ? "default" : "secondary"}>
                    {eventRegistrations.length} registrations
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
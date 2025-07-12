import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, UserCog, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Coordinator {
  id: number;
  event_id: number;
  staff_name: string;
}

interface Event {
  id: number;
  name: string;
  date: string;
  venue: string;
}

const mockEvents: Event[] = [
  { id: 1, name: "Tech Symposium 2024", date: "2024-02-15", venue: "Main Auditorium" },
  { id: 2, name: "Cultural Fest", date: "2024-03-20", venue: "Campus Grounds" },
  { id: 3, name: "Career Fair", date: "2024-04-10", venue: "Convention Center" },
];

const initialCoordinators: Coordinator[] = [
  { id: 1, event_id: 1, staff_name: "Dr. Smith" },
  { id: 2, event_id: 2, staff_name: "Prof. Johnson" },
  { id: 3, event_id: 1, staff_name: "Dr. Williams" }, // Multiple coordinators for same event
];

export const CoordinatorManagement = () => {
  const [coordinators, setCoordinators] = useState<Coordinator[]>(initialCoordinators);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [staffName, setStaffName] = useState<string>("");
  const [viewEventId, setViewEventId] = useState<string>("");
  const { toast } = useToast();

  const handleAssignCoordinator = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEvent || !staffName.trim()) {
      toast({
        title: "Error",
        description: "Please select an event and enter staff name",
        variant: "destructive",
      });
      return;
    }

    const eventId = parseInt(selectedEvent);

    // Check if coordinator already exists for this event
    const existingCoordinator = coordinators.find(
      coord => coord.event_id === eventId && coord.staff_name.toLowerCase() === staffName.toLowerCase()
    );

    if (existingCoordinator) {
      toast({
        title: "Error",
        description: "This staff member is already a coordinator for this event",
        variant: "destructive",
      });
      return;
    }

    const newCoordinator: Coordinator = {
      id: coordinators.length > 0 ? Math.max(...coordinators.map(c => c.id)) + 1 : 1,
      event_id: eventId,
      staff_name: staffName.trim(),
    };

    setCoordinators([...coordinators, newCoordinator]);
    setSelectedEvent("");
    setStaffName("");
    
    toast({
      title: "Success",
      description: "Coordinator assigned successfully",
    });
  };

  const getEventCoordinators = (eventId: number) => {
    return coordinators.filter(coord => coord.event_id === eventId);
  };

  const getEventName = (eventId: number) => {
    return mockEvents.find(event => event.id === eventId)?.name || "Unknown";
  };

  const getEventDetails = (eventId: number) => {
    return mockEvents.find(event => event.id === eventId);
  };

  const selectedEventCoordinators = viewEventId 
    ? getEventCoordinators(parseInt(viewEventId))
    : [];

  const removeCoordinator = (coordinatorId: number) => {
    setCoordinators(coordinators.filter(coord => coord.id !== coordinatorId));
    toast({
      title: "Success",
      description: "Coordinator removed successfully",
    });
  };

  return (
    <div className="space-y-6">
      {/* Assign Coordinator Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Assign Event Coordinator
          </CardTitle>
          <CardDescription>Assign a staff member as coordinator for an event</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAssignCoordinator} className="space-y-4">
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
                <Label htmlFor="staffName">Staff Name</Label>
                <Input
                  id="staffName"
                  placeholder="Enter staff member name"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Assign Coordinator
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* View Event Coordinators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            View Event Coordinators
          </CardTitle>
          <CardDescription>View all coordinators assigned to a specific event</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="viewEvent">Select Event to View</Label>
              <Select value={viewEventId} onValueChange={setViewEventId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an event to view coordinators" />
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
                <div className="mb-4">
                  <h3 className="font-semibold">
                    Coordinators for: {getEventName(parseInt(viewEventId))}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {getEventDetails(parseInt(viewEventId))?.date} • {getEventDetails(parseInt(viewEventId))?.venue}
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {selectedEventCoordinators.length} coordinators
                  </Badge>
                </div>
                
                {selectedEventCoordinators.length === 0 ? (
                  <p className="text-muted-foreground">No coordinators assigned to this event yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedEventCoordinators.map((coordinator) => (
                      <div key={coordinator.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{coordinator.staff_name}</h4>
                            <p className="text-sm text-muted-foreground">
                              👤 Event Coordinator
                            </p>
                            <Badge variant="outline" className="mt-2">
                              ID: {coordinator.id}
                            </Badge>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeCoordinator(coordinator.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* All Coordinators Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCog className="w-5 h-5" />
            All Coordinators Overview
          </CardTitle>
          <CardDescription>Summary of all event coordinators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEvents.map((event) => {
              const eventCoordinators = getEventCoordinators(event.id);
              return (
                <div key={event.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{event.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        📅 {event.date} • 📍 {event.venue}
                      </p>
                    </div>
                    <Badge variant={eventCoordinators.length > 0 ? "default" : "secondary"}>
                      {eventCoordinators.length} coordinators
                    </Badge>
                  </div>
                  
                  {eventCoordinators.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {eventCoordinators.map((coordinator) => (
                        <Badge key={coordinator.id} variant="outline">
                          {coordinator.staff_name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
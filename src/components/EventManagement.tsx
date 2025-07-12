import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: number;
  name: string;
  date: string;
  venue: string;
}

const initialEvents: Event[] = [
  { id: 1, name: "Tech Symposium 2024", date: "2024-02-15", venue: "Main Auditorium" },
  { id: 2, name: "Cultural Fest", date: "2024-03-20", venue: "Campus Grounds" },
  { id: 3, name: "Career Fair", date: "2024-04-10", venue: "Convention Center" },
];

export const EventManagement = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [newEvent, setNewEvent] = useState({ name: "", date: "", venue: "" });
  const { toast } = useToast();

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEvent.name || !newEvent.date || !newEvent.venue) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const event: Event = {
      id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
      ...newEvent,
    };

    setEvents([...events, event]);
    setNewEvent({ name: "", date: "", venue: "" });
    
    toast({
      title: "Success",
      description: "Event added successfully",
    });
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
    toast({
      title: "Success",
      description: "Event deleted successfully",
    });
  };

  const isUpcoming = (date: string) => {
    return new Date(date) >= new Date(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-6">
      {/* Add Event Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Event
          </CardTitle>
          <CardDescription>Create a new event for your college</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                  id="eventName"
                  placeholder="Enter event name"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDate">Date</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventVenue">Venue</Label>
                <Input
                  id="eventVenue"
                  placeholder="Enter venue"
                  value={newEvent.venue}
                  onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                />
              </div>
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Add Event
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Events List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            All Events
          </CardTitle>
          <CardDescription>Manage your college events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No events found. Add your first event above.</p>
            ) : (
              events.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{event.name}</h3>
                      <Badge variant={isUpcoming(event.date) ? "default" : "secondary"}>
                        {isUpcoming(event.date) ? "Upcoming" : "Past"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>📅 {event.date}</span>
                      <span>📍 {event.venue}</span>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
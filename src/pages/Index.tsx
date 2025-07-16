import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dashboard } from "@/components/Dashboard";
import { EventManagement } from "@/components/EventManagement";
import { StudentManagement } from "@/components/StudentManagement";
import { RegistrationManagement } from "@/components/RegistrationManagement";
import { CoordinatorManagement } from "@/components/CoordinatorManagement";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, UserCheck, UserCog, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                College Event Management
              </h1>
              <p className="text-muted-foreground text-lg">
                Streamlined event organization and student engagement platform
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">Real-time Analytics</Badge>
            <Badge variant="secondary" className="text-xs">Event Tracking</Badge>
            <Badge variant="secondary" className="text-xs">Student Management</Badge>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-12 bg-card border shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CalendarDays className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="registrations" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <UserCheck className="h-4 w-4" />
              Registrations
            </TabsTrigger>
            <TabsTrigger value="coordinators" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <UserCog className="h-4 w-4" />
              Coordinators
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="animate-fade-in">
            <Dashboard />
          </TabsContent>

          <TabsContent value="events" className="animate-fade-in">
            <EventManagement />
          </TabsContent>

          <TabsContent value="students" className="animate-fade-in">
            <StudentManagement />
          </TabsContent>

          <TabsContent value="registrations" className="animate-fade-in">
            <RegistrationManagement />
          </TabsContent>

          <TabsContent value="coordinators" className="animate-fade-in">
            <CoordinatorManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
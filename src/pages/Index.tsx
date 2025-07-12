import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Users, UserCheck, UserCog, Plus } from "lucide-react";
import { EventManagement } from "@/components/EventManagement";
import { StudentManagement } from "@/components/StudentManagement";
import { RegistrationManagement } from "@/components/RegistrationManagement";
import { CoordinatorManagement } from "@/components/CoordinatorManagement";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">College Event Management System</h1>
          <p className="text-muted-foreground mt-2">Manage events, students, registrations, and coordinators</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="registrations" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Registrations
            </TabsTrigger>
            <TabsTrigger value="coordinators" className="flex items-center gap-2">
              <UserCog className="w-4 h-4" />
              Coordinators
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <EventManagement />
          </TabsContent>

          <TabsContent value="students" className="mt-6">
            <StudentManagement />
          </TabsContent>

          <TabsContent value="registrations" className="mt-6">
            <RegistrationManagement />
          </TabsContent>

          <TabsContent value="coordinators" className="mt-6">
            <CoordinatorManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
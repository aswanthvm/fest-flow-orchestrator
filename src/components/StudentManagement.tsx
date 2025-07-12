import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: number;
  name: string;
  dept: string;
}

const initialStudents: Student[] = [
  { id: 1, name: "John Doe", dept: "Computer Science" },
  { id: 2, name: "Jane Smith", dept: "Electronics" },
  { id: 3, name: "Mike Johnson", dept: "Mechanical" },
  { id: 4, name: "Sarah Wilson", dept: "Civil" },
  { id: 5, name: "David Brown", dept: "Computer Science" },
];

export const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [newStudent, setNewStudent] = useState({ name: "", dept: "" });
  const { toast } = useToast();

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newStudent.name || !newStudent.dept) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const student: Student = {
      id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
      ...newStudent,
    };

    setStudents([...students, student]);
    setNewStudent({ name: "", dept: "" });
    
    toast({
      title: "Success",
      description: "Student added successfully",
    });
  };

  const getDepartmentCount = (dept: string) => {
    return students.filter(student => student.dept === dept).length;
  };

  const uniqueDepartments = [...new Set(students.map(student => student.dept))];

  return (
    <div className="space-y-6">
      {/* Add Student Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Student
          </CardTitle>
          <CardDescription>Register a new student in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddStudent} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  placeholder="Enter student name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentDept">Department</Label>
                <Input
                  id="studentDept"
                  placeholder="Enter department"
                  value={newStudent.dept}
                  onChange={(e) => setNewStudent({ ...newStudent, dept: e.target.value })}
                />
              </div>
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Add Student
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Department Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Department Statistics
          </CardTitle>
          <CardDescription>Student distribution across departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uniqueDepartments.map((dept) => (
              <div key={dept} className="p-4 border rounded-lg text-center">
                <h3 className="font-semibold text-lg">{dept}</h3>
                <p className="text-2xl font-bold text-primary mt-2">
                  {getDepartmentCount(dept)}
                </p>
                <p className="text-sm text-muted-foreground">students</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            All Students ({students.length})
          </CardTitle>
          <CardDescription>View all registered students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No students found. Add your first student above.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {students.map((student) => (
                  <div key={student.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{student.name}</h3>
                      <Badge variant="outline">ID: {student.id}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      🎓 {student.dept}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
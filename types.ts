export interface UserType {
  _id: string;
  name: string;
  email: string;
  role: "Manager" | "Employee";
  createdAt: Date;
  updatedAt: Date;
}


export interface TaskType {
  _id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedTo: string; // user ID
  createdBy: string;  // user ID
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}


export type EmployeeType = {
  _id: string;
  name: string;
  email: string;
};


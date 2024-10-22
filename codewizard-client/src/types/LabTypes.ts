export interface Lab {
  _id: string;
  name: string;
  description?: string;
  startDate?: string;
  duration?: number;
  year: number;
  semester: number;
  module: string;
  pdfUrl?: string;
  createdAt: string;
  updatedAt: string;
  enrolledStudents: {user:string}[];
}

export interface InputLab
  extends Omit<Lab, "_id" | "createdAt" | "updatedAt" | "enrolledStudents"> {
  password: string;
}

export interface LabContextType {
  labs: Lab[];
  loading: boolean;
  createLabSession: (lab: InputLab) => void;
  enrollStudent: (labId: string, password: string) => Promise<boolean>;
}

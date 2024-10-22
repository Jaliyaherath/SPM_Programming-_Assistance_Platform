import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

const LabSessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      max: 20,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    duration: {
      type: Number,
    },
    year: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 2,
    },
    module: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    pdfUrl: {
      type: String,
    },
    enrolledStudents: [Attendance.schema],
  },
  {
    timestamps: true,
  }
);

LabSessionSchema.methods.markAttendance = function (user) {
  this.enrolledStudents.push({user});
  return this.save();
};

const LabSession = mongoose.model("LabSession", LabSessionSchema);
export default LabSession;

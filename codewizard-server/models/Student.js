/**
 * Model for Student
 * TODO - Needs to completed
 */
import mongoose from "mongoose";

const StudentSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;


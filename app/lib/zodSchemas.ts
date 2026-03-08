import { z } from 'zod';

export const loginSchema = z.object({
    role: z.enum(['Student', 'Staff'], { message: 'Please select a role' }),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
    role: z.enum(['Student', 'Staff'], { message: 'Please select a role' }),
    identifier: z.string().min(1, 'Identifier is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});

export const staffSchema = z.object({
    StaffName: z.string().min(1, 'Staff Name is required'),
    EmailAddress: z.string().email('Invalid email address'),
    Password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
    MobileNo: z.string().regex(/^\d{10}$/, 'Mobile Number must be 10 digits').optional().or(z.literal('')),
    Description: z.string().optional(),
});

export const studentSchema = z.object({
    EnrollmentNo: z.string().min(1, 'Enrollment No is required'),
    Password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
    StudentName: z.string().min(1, 'Student Name is required'),
    MobileNo: z.string().regex(/^\d{10}$/, 'Mobile Number must be 10 digits').optional().or(z.literal('')),
    EmailAddress: z.string().email('Invalid email address').optional().or(z.literal('')),
    Description: z.string().optional(),
    StaffID: z.string().min(1, 'Please select a staff mentor').optional(),
});

export const assignMentorSchema = z.object({
    StaffID: z.string().min(1, 'Staff Mentor is required'),
    StudentIDs: z.array(z.string()).min(1, 'Please select at least one student'),
    FromDate: z.string().min(1, 'From Date is required'),
    ToDate: z.string().optional(),
    Description: z.string().optional(),
});

export const mentoringSessionSchema = z.object({
    assignmentId: z.string().min(1),
    date: z.string().min(1, 'Date is required'),
    attendance: z.string().min(1, 'Attendance Status is required'),
    stress: z.string().min(1, 'Stress Level is required'),
    agenda: z.string().min(1, 'Agenda is required'),
    issues: z.string().min(1, 'Issues Discussed is required'),
    learnerType: z.string().min(1, 'Learner Type is required'),
    nextDate: z.string().optional(),
    staffOpinion: z.string().optional(),
    studentOpinion: z.string().optional(),
    isParentPresent: z.boolean().optional(),
    parentName: z.string().optional(),
    parentMobile: z.string().optional(),
    parentOpinion: z.string().optional(),
});

export const editMentoringSessionSchema = mentoringSessionSchema.omit({ assignmentId: true }).extend({
    StudentMentoringID: z.string().min(1, 'Record ID is required'),
});

export const editStaffSchema = staffSchema.extend({
    StaffID: z.string().min(1, 'Staff ID is required'),
});

export const editStudentSchema = studentSchema.omit({ StaffID: true }).extend({
    StudentID: z.string().min(1, 'Student ID is required'),
});

export const editStudentMentorSchema = z.object({
    StudentMentorID: z.string().min(1, 'StudentMentorID is required'),
    StudentID: z.string().min(1, 'Student ID is required'),
    StaffID: z.string().min(1, 'Staff ID is required'),
    FromDate: z.string().min(1, 'From Date is required'),
    ToDate: z.string().optional(),
    Description: z.string().optional(),
});

export const manageStudentMentorSchema = z.object({
    StaffID: z.string().min(1, 'Staff Mentor is required'),
    StudentIDs: z.array(z.string()),
    FromDate: z.string().optional(),
    Description: z.string().optional(),
});

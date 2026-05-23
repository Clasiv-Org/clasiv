import { z } from "zod";

const AbbrEntitySchema = z.object({
	name: z.string(),
	abbrv: z.string(),
});

const HodSchema = z.object({
	name: z.string(),
	abbrv: z.string(),
});

const EnrollmentSchema = z.object({
	university: AbbrEntitySchema,
	college: AbbrEntitySchema,
	department: AbbrEntitySchema,
	course: AbbrEntitySchema,
	hod: HodSchema.nullable(),
	admissionYear: z.number(),
	graduationYear: z.number().nullable(),
	currentSemester: z.number(),
	rollNo: z.string(),
	regNo: z.string(),
});

const StudentDataSchema = z.object({
	dob: z.string().nullable(),
	enrollments: z.array(EnrollmentSchema),
});

const StudentProfileSchema = z.object({
	type: z.literal('student'),
	data: StudentDataSchema,
});

const DepartmentSchema = z.object({
	name: z.string(),
	abbrv: z.string(),
	isHod: z.boolean(),
});

const EmploymentSchema = z.object({
	university: AbbrEntitySchema,
	college: AbbrEntitySchema,
	departments: z.array(DepartmentSchema),
});

const TeacherDataSchema = z.object({
	abbrv: z.string(),
	employments: z.array(EmploymentSchema),
});

const TeacherProfileSchema = z.object({
	type: z.literal('teacher'),
	data: TeacherDataSchema,
});

export const UserProfileSchema = z.object({
	userName: z.string().nullable(),
	fullName: z.string(),
	emailId: z.string().nullable(),
	phoneNo: z.string().nullable(),
	baseRole: z.string(),
	extentionRoles: z.array(z.string()),
	createdAt: z.string().nullable(),
	modifiedAt: z.string().nullable(),
	activatedAt: z.string().nullable(),
	lastLoginAt: z.string().nullable(),
	profile: z.discriminatedUnion('type', [
		StudentProfileSchema,
		TeacherProfileSchema,
	]),
	permissions: z.array(z.string()),
});

export const UserSchema = z.object({
	fullName: z.string(),
	userName: z.string().nullable(),
	emailId: z.string().nullable(),
	phoneNo: z.string().nullable(),
	baseRole: z.number(),
	createdAt: z.string().nullable(),
	modifiedAt: z.string().nullable(),
	activatedAt: z.string().nullable(),
	lastLoginAt: z.string().nullable(),
});  

export const ActivationUserSchema = UserSchema.extend({
    password: z.string().nullable().default(null),
});

export type User			= z.infer<typeof UserSchema>;
export type ActivationUser	= z.infer<typeof ActivationUserSchema>;
export type UserProfile		= z.infer<typeof UserProfileSchema>;

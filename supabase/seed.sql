-- Seed Data for Users Table
-- Passwords are in PLAINTEXT as requested

-- 1. Admin User
insert into public.users (username, full_name, phone, password, role)
values (
    'admin', 
    'System Administrator', 
    '01700000000', 
    'admin123', 
    'admin'
);

-- 2. Mentor User
insert into public.users (username, full_name, phone, password, role)
values (
    'mentor_pavel', 
    'Pavel Mahadi', 
    '01800000000', 
    'mentor123', 
    'mentor'
);

-- 3. Student Users
insert into public.users (username, full_name, phone, password, role)
values 
(
    'student_01', 
    'Rahim Ahmed', 
    '01911111111', 
    'pass123', 
    'student'
),
(
    'student_02', 
    'Karim Ullah', 
    '01922222222', 
    'pass123', 
    'student'
),
(
    'student_03', 
    'Sultana Razia', 
    '01933333333', 
    'pass123', 
    'student'
);

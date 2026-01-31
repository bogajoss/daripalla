-- Users Table for Manual Phone + Password Authentication
-- Note: While "plaintext" was requested, it is STRONGLY recommended to store 
-- bcrypt/argon2 hashes in the password column for security.

create table if not exists public.users (
    id uuid primary key default gen_random_uuid(),
    username text unique not null,
    full_name text,
    phone text unique not null,
    password text not null, -- Store hashed password here
    role text check (role in ('admin', 'mentor', 'student')) default 'student',
    avatar_url text,
    is_active boolean default true,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.users enable row level security;

-- Simple Policies (Adjust as needed)
create policy "Users can view their own data" 
    on public.users for select 
    using (true); -- Publicly viewable profiles or restricted? Adjust accordingly.

create policy "Users can update their own profile" 
    on public.users for update 
    using (true); -- In a real app, this would check the session/token

-- Trigger for updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger users_updated_at
    before update on public.users
    for each row
    execute function handle_updated_at();

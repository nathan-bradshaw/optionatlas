create extension if not exists "uuid-ossp";

create table if not exists users(
    id uuid primary key default uuid_generate_v4(),
    email text not null unique,
    password_hash text not null,
    created_at timestamptz not null default now()
);

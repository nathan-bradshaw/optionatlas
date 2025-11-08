create table if not exists decisions(
    id uuid primary key default uuid_generate_v4(),
    user_id uuid not null references users(id) on delete cascade,
    title text not null,
    description text,
    created_at timestamptz not null default now()
);

create table if not exists factors (
    id uuid primary key default uuid_generate_v4(),
    decision_id uuid not null references decisions(id) on delete cascade,
    type text not null check (type in ('PRO', 'CON')),
    text text not null,
    weight int default 1,
    created_at timestamptz not null default now()
);
create table if not exists public.jobs (
  id bigserial primary key,
  source text not null,                    -- bv. greenhouse
  external_id text not null,               -- id van bron
  title text not null,
  company text not null,
  location text default '',
  url text not null,
  salary numeric null,
  posted_at timestamptz null,
  created_at timestamptz not null default now()
);

create unique index if not exists jobs_source_external_id_uidx
  on public.jobs (source, external_id);

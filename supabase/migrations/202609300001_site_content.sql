create table if not exists public.site_sections (
  section text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

alter table public.site_sections enable row level security;
grant select on public.site_sections to anon, authenticated;
grant insert, update, delete on public.site_sections to authenticated;

create table if not exists public.site_editors (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.site_editors enable row level security;
grant select on public.site_editors to authenticated;
drop policy if exists "Editors can see their own access" on public.site_editors;
create policy "Editors can see their own access"
  on public.site_editors for select to authenticated using (user_id = auth.uid());

drop policy if exists "Public can read site sections" on public.site_sections;
drop policy if exists "Signed-in editors manage site sections" on public.site_sections;
create policy "Public can read site sections"
  on public.site_sections for select to anon, authenticated using (true);
create policy "Signed-in editors manage site sections"
  on public.site_sections for all to authenticated
  using (exists (select 1 from public.site_editors where user_id = auth.uid()))
  with check (exists (select 1 from public.site_editors where user_id = auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-assets', 'site-assets', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

drop policy if exists "Public can view site images" on storage.objects;
drop policy if exists "Signed-in editors upload site images" on storage.objects;
drop policy if exists "Signed-in editors update site images" on storage.objects;
drop policy if exists "Signed-in editors delete site images" on storage.objects;
create policy "Public can view site images"
  on storage.objects for select to anon, authenticated using (bucket_id = 'site-assets');
create policy "Signed-in editors upload site images"
  on storage.objects for insert to authenticated with check (
    bucket_id = 'site-assets' and exists (select 1 from public.site_editors where user_id = auth.uid())
  );
create policy "Signed-in editors update site images"
  on storage.objects for update to authenticated
  using (bucket_id = 'site-assets' and exists (select 1 from public.site_editors where user_id = auth.uid()))
  with check (bucket_id = 'site-assets' and exists (select 1 from public.site_editors where user_id = auth.uid()));
create policy "Signed-in editors delete site images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'site-assets' and exists (select 1 from public.site_editors where user_id = auth.uid()));

create table if not exists public.visitor_testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 80),
  quote text not null check (char_length(btrim(quote)) between 3 and 1200),
  rating smallint not null check (rating between 1 and 5),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.visitor_testimonials enable row level security;
grant select, insert on public.visitor_testimonials to anon;
grant select, insert, update, delete on public.visitor_testimonials to authenticated;

drop policy if exists "Visitors can submit pending testimonials" on public.visitor_testimonials;
create policy "Visitors can submit pending testimonials"
  on public.visitor_testimonials for insert to anon, authenticated
  with check (approved = false);

drop policy if exists "Public can read approved testimonials" on public.visitor_testimonials;
create policy "Public can read approved testimonials"
  on public.visitor_testimonials for select to anon, authenticated
  using (approved = true or exists (
    select 1 from public.site_editors where user_id = auth.uid()
  ));

drop policy if exists "Editors can update testimonials" on public.visitor_testimonials;
create policy "Editors can update testimonials"
  on public.visitor_testimonials for update to authenticated
  using (exists (select 1 from public.site_editors where user_id = auth.uid()))
  with check (exists (select 1 from public.site_editors where user_id = auth.uid()));

drop policy if exists "Editors can delete testimonials" on public.visitor_testimonials;
create policy "Editors can delete testimonials"
  on public.visitor_testimonials for delete to authenticated
  using (exists (select 1 from public.site_editors where user_id = auth.uid()));

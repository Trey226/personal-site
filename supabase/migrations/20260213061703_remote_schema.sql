drop extension if exists "pg_net";

create sequence "public"."coupon_redemptions_id_seq";

create sequence "public"."event_categories_id_seq";

create sequence "public"."events_id_seq";

create sequence "public"."members_id_seq";

create sequence "public"."membership_tiers_id_seq";

create sequence "public"."price_rules_id_seq";

create sequence "public"."registrations_id_seq";


  create table "public"."coupon_redemptions" (
    "id" integer not null default nextval('public.coupon_redemptions_id_seq'::regclass),
    "user_id" integer,
    "event_id" integer,
    "registration_id" integer,
    "credit_type" character varying(20) not null,
    "redeemed_at" timestamp without time zone default now()
      );


alter table "public"."coupon_redemptions" enable row level security;


  create table "public"."event_categories" (
    "id" integer not null default nextval('public.event_categories_id_seq'::regclass),
    "name" character varying(50) not null
      );


alter table "public"."event_categories" enable row level security;


  create table "public"."events" (
    "id" integer not null default nextval('public.events_id_seq'::regclass),
    "title" character varying(255) not null,
    "category_id" integer,
    "start_time" timestamp without time zone not null,
    "location" character varying(255),
    "is_published" boolean default false
      );


alter table "public"."events" enable row level security;


  create table "public"."members" (
    "id" integer not null default nextval('public.members_id_seq'::regclass),
    "email" character varying(255) not null,
    "first_name" character varying(100),
    "last_name" character varying(100),
    "membership_tier_id" integer,
    "status" character varying(20) default 'active'::character varying,
    "joined_at" timestamp without time zone default now()
      );


alter table "public"."members" enable row level security;


  create table "public"."membership_tiers" (
    "id" integer not null default nextval('public.membership_tiers_id_seq'::regclass),
    "name" character varying(50) not null,
    "annual_ceu_credits" integer default 0,
    "annual_cert_credits" integer default 0
      );


alter table "public"."membership_tiers" enable row level security;


  create table "public"."price_rules" (
    "id" integer not null default nextval('public.price_rules_id_seq'::regclass),
    "event_id" integer,
    "name" character varying(100),
    "target_tier_id" integer,
    "price" numeric(10,2) not null,
    "valid_from" timestamp without time zone,
    "valid_until" timestamp without time zone
      );


alter table "public"."price_rules" enable row level security;


  create table "public"."registrations" (
    "id" integer not null default nextval('public.registrations_id_seq'::regclass),
    "user_id" integer,
    "event_id" integer,
    "amount_paid" numeric(10,2) not null,
    "status" character varying(20) default 'confirmed'::character varying,
    "created_at" timestamp without time zone default now()
      );


alter table "public"."registrations" enable row level security;

alter sequence "public"."coupon_redemptions_id_seq" owned by "public"."coupon_redemptions"."id";

alter sequence "public"."event_categories_id_seq" owned by "public"."event_categories"."id";

alter sequence "public"."events_id_seq" owned by "public"."events"."id";

alter sequence "public"."members_id_seq" owned by "public"."members"."id";

alter sequence "public"."membership_tiers_id_seq" owned by "public"."membership_tiers"."id";

alter sequence "public"."price_rules_id_seq" owned by "public"."price_rules"."id";

alter sequence "public"."registrations_id_seq" owned by "public"."registrations"."id";

CREATE UNIQUE INDEX coupon_redemptions_pkey ON public.coupon_redemptions USING btree (id);

CREATE UNIQUE INDEX event_categories_name_key ON public.event_categories USING btree (name);

CREATE UNIQUE INDEX event_categories_pkey ON public.event_categories USING btree (id);

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id);

CREATE UNIQUE INDEX members_email_key ON public.members USING btree (email);

CREATE UNIQUE INDEX members_pkey ON public.members USING btree (id);

CREATE UNIQUE INDEX membership_tiers_pkey ON public.membership_tiers USING btree (id);

CREATE UNIQUE INDEX price_rules_pkey ON public.price_rules USING btree (id);

CREATE UNIQUE INDEX registrations_pkey ON public.registrations USING btree (id);

alter table "public"."coupon_redemptions" add constraint "coupon_redemptions_pkey" PRIMARY KEY using index "coupon_redemptions_pkey";

alter table "public"."event_categories" add constraint "event_categories_pkey" PRIMARY KEY using index "event_categories_pkey";

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."members" add constraint "members_pkey" PRIMARY KEY using index "members_pkey";

alter table "public"."membership_tiers" add constraint "membership_tiers_pkey" PRIMARY KEY using index "membership_tiers_pkey";

alter table "public"."price_rules" add constraint "price_rules_pkey" PRIMARY KEY using index "price_rules_pkey";

alter table "public"."registrations" add constraint "registrations_pkey" PRIMARY KEY using index "registrations_pkey";

alter table "public"."coupon_redemptions" add constraint "coupon_redemptions_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public.events(id) not valid;

alter table "public"."coupon_redemptions" validate constraint "coupon_redemptions_event_id_fkey";

alter table "public"."coupon_redemptions" add constraint "coupon_redemptions_registration_id_fkey" FOREIGN KEY (registration_id) REFERENCES public.registrations(id) not valid;

alter table "public"."coupon_redemptions" validate constraint "coupon_redemptions_registration_id_fkey";

alter table "public"."coupon_redemptions" add constraint "coupon_redemptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.members(id) not valid;

alter table "public"."coupon_redemptions" validate constraint "coupon_redemptions_user_id_fkey";

alter table "public"."event_categories" add constraint "event_categories_name_key" UNIQUE using index "event_categories_name_key";

alter table "public"."events" add constraint "events_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.event_categories(id) not valid;

alter table "public"."events" validate constraint "events_category_id_fkey";

alter table "public"."members" add constraint "members_email_key" UNIQUE using index "members_email_key";

alter table "public"."members" add constraint "members_membership_tier_id_fkey" FOREIGN KEY (membership_tier_id) REFERENCES public.membership_tiers(id) not valid;

alter table "public"."members" validate constraint "members_membership_tier_id_fkey";

alter table "public"."price_rules" add constraint "price_rules_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE not valid;

alter table "public"."price_rules" validate constraint "price_rules_event_id_fkey";

alter table "public"."price_rules" add constraint "price_rules_target_tier_id_fkey" FOREIGN KEY (target_tier_id) REFERENCES public.membership_tiers(id) not valid;

alter table "public"."price_rules" validate constraint "price_rules_target_tier_id_fkey";

alter table "public"."registrations" add constraint "registrations_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public.events(id) not valid;

alter table "public"."registrations" validate constraint "registrations_event_id_fkey";

alter table "public"."registrations" add constraint "registrations_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.members(id) not valid;

alter table "public"."registrations" validate constraint "registrations_user_id_fkey";

grant delete on table "public"."coupon_redemptions" to "anon";

grant insert on table "public"."coupon_redemptions" to "anon";

grant references on table "public"."coupon_redemptions" to "anon";

grant select on table "public"."coupon_redemptions" to "anon";

grant trigger on table "public"."coupon_redemptions" to "anon";

grant truncate on table "public"."coupon_redemptions" to "anon";

grant update on table "public"."coupon_redemptions" to "anon";

grant delete on table "public"."coupon_redemptions" to "authenticated";

grant insert on table "public"."coupon_redemptions" to "authenticated";

grant references on table "public"."coupon_redemptions" to "authenticated";

grant select on table "public"."coupon_redemptions" to "authenticated";

grant trigger on table "public"."coupon_redemptions" to "authenticated";

grant truncate on table "public"."coupon_redemptions" to "authenticated";

grant update on table "public"."coupon_redemptions" to "authenticated";

grant delete on table "public"."coupon_redemptions" to "service_role";

grant insert on table "public"."coupon_redemptions" to "service_role";

grant references on table "public"."coupon_redemptions" to "service_role";

grant select on table "public"."coupon_redemptions" to "service_role";

grant trigger on table "public"."coupon_redemptions" to "service_role";

grant truncate on table "public"."coupon_redemptions" to "service_role";

grant update on table "public"."coupon_redemptions" to "service_role";

grant delete on table "public"."event_categories" to "anon";

grant insert on table "public"."event_categories" to "anon";

grant references on table "public"."event_categories" to "anon";

grant select on table "public"."event_categories" to "anon";

grant trigger on table "public"."event_categories" to "anon";

grant truncate on table "public"."event_categories" to "anon";

grant update on table "public"."event_categories" to "anon";

grant delete on table "public"."event_categories" to "authenticated";

grant insert on table "public"."event_categories" to "authenticated";

grant references on table "public"."event_categories" to "authenticated";

grant select on table "public"."event_categories" to "authenticated";

grant trigger on table "public"."event_categories" to "authenticated";

grant truncate on table "public"."event_categories" to "authenticated";

grant update on table "public"."event_categories" to "authenticated";

grant delete on table "public"."event_categories" to "service_role";

grant insert on table "public"."event_categories" to "service_role";

grant references on table "public"."event_categories" to "service_role";

grant select on table "public"."event_categories" to "service_role";

grant trigger on table "public"."event_categories" to "service_role";

grant truncate on table "public"."event_categories" to "service_role";

grant update on table "public"."event_categories" to "service_role";

grant delete on table "public"."events" to "anon";

grant insert on table "public"."events" to "anon";

grant references on table "public"."events" to "anon";

grant select on table "public"."events" to "anon";

grant trigger on table "public"."events" to "anon";

grant truncate on table "public"."events" to "anon";

grant update on table "public"."events" to "anon";

grant delete on table "public"."events" to "authenticated";

grant insert on table "public"."events" to "authenticated";

grant references on table "public"."events" to "authenticated";

grant select on table "public"."events" to "authenticated";

grant trigger on table "public"."events" to "authenticated";

grant truncate on table "public"."events" to "authenticated";

grant update on table "public"."events" to "authenticated";

grant delete on table "public"."events" to "service_role";

grant insert on table "public"."events" to "service_role";

grant references on table "public"."events" to "service_role";

grant select on table "public"."events" to "service_role";

grant trigger on table "public"."events" to "service_role";

grant truncate on table "public"."events" to "service_role";

grant update on table "public"."events" to "service_role";

grant delete on table "public"."members" to "anon";

grant insert on table "public"."members" to "anon";

grant references on table "public"."members" to "anon";

grant select on table "public"."members" to "anon";

grant trigger on table "public"."members" to "anon";

grant truncate on table "public"."members" to "anon";

grant update on table "public"."members" to "anon";

grant delete on table "public"."members" to "authenticated";

grant insert on table "public"."members" to "authenticated";

grant references on table "public"."members" to "authenticated";

grant select on table "public"."members" to "authenticated";

grant trigger on table "public"."members" to "authenticated";

grant truncate on table "public"."members" to "authenticated";

grant update on table "public"."members" to "authenticated";

grant delete on table "public"."members" to "service_role";

grant insert on table "public"."members" to "service_role";

grant references on table "public"."members" to "service_role";

grant select on table "public"."members" to "service_role";

grant trigger on table "public"."members" to "service_role";

grant truncate on table "public"."members" to "service_role";

grant update on table "public"."members" to "service_role";

grant delete on table "public"."membership_tiers" to "anon";

grant insert on table "public"."membership_tiers" to "anon";

grant references on table "public"."membership_tiers" to "anon";

grant select on table "public"."membership_tiers" to "anon";

grant trigger on table "public"."membership_tiers" to "anon";

grant truncate on table "public"."membership_tiers" to "anon";

grant update on table "public"."membership_tiers" to "anon";

grant delete on table "public"."membership_tiers" to "authenticated";

grant insert on table "public"."membership_tiers" to "authenticated";

grant references on table "public"."membership_tiers" to "authenticated";

grant select on table "public"."membership_tiers" to "authenticated";

grant trigger on table "public"."membership_tiers" to "authenticated";

grant truncate on table "public"."membership_tiers" to "authenticated";

grant update on table "public"."membership_tiers" to "authenticated";

grant delete on table "public"."membership_tiers" to "service_role";

grant insert on table "public"."membership_tiers" to "service_role";

grant references on table "public"."membership_tiers" to "service_role";

grant select on table "public"."membership_tiers" to "service_role";

grant trigger on table "public"."membership_tiers" to "service_role";

grant truncate on table "public"."membership_tiers" to "service_role";

grant update on table "public"."membership_tiers" to "service_role";

grant delete on table "public"."price_rules" to "anon";

grant insert on table "public"."price_rules" to "anon";

grant references on table "public"."price_rules" to "anon";

grant select on table "public"."price_rules" to "anon";

grant trigger on table "public"."price_rules" to "anon";

grant truncate on table "public"."price_rules" to "anon";

grant update on table "public"."price_rules" to "anon";

grant delete on table "public"."price_rules" to "authenticated";

grant insert on table "public"."price_rules" to "authenticated";

grant references on table "public"."price_rules" to "authenticated";

grant select on table "public"."price_rules" to "authenticated";

grant trigger on table "public"."price_rules" to "authenticated";

grant truncate on table "public"."price_rules" to "authenticated";

grant update on table "public"."price_rules" to "authenticated";

grant delete on table "public"."price_rules" to "service_role";

grant insert on table "public"."price_rules" to "service_role";

grant references on table "public"."price_rules" to "service_role";

grant select on table "public"."price_rules" to "service_role";

grant trigger on table "public"."price_rules" to "service_role";

grant truncate on table "public"."price_rules" to "service_role";

grant update on table "public"."price_rules" to "service_role";

grant delete on table "public"."registrations" to "anon";

grant insert on table "public"."registrations" to "anon";

grant references on table "public"."registrations" to "anon";

grant select on table "public"."registrations" to "anon";

grant trigger on table "public"."registrations" to "anon";

grant truncate on table "public"."registrations" to "anon";

grant update on table "public"."registrations" to "anon";

grant delete on table "public"."registrations" to "authenticated";

grant insert on table "public"."registrations" to "authenticated";

grant references on table "public"."registrations" to "authenticated";

grant select on table "public"."registrations" to "authenticated";

grant trigger on table "public"."registrations" to "authenticated";

grant truncate on table "public"."registrations" to "authenticated";

grant update on table "public"."registrations" to "authenticated";

grant delete on table "public"."registrations" to "service_role";

grant insert on table "public"."registrations" to "service_role";

grant references on table "public"."registrations" to "service_role";

grant select on table "public"."registrations" to "service_role";

grant trigger on table "public"."registrations" to "service_role";

grant truncate on table "public"."registrations" to "service_role";

grant update on table "public"."registrations" to "service_role";


  create policy "Public Read Redemptions"
  on "public"."coupon_redemptions"
  as permissive
  for select
  to public
using (true);



  create policy "Public Read Categories"
  on "public"."event_categories"
  as permissive
  for select
  to public
using (true);



  create policy "Public Read Events"
  on "public"."events"
  as permissive
  for select
  to public
using (true);



  create policy "Public Read Members"
  on "public"."members"
  as permissive
  for select
  to public
using (true);



  create policy "Public Read Tiers"
  on "public"."membership_tiers"
  as permissive
  for select
  to public
using (true);



  create policy "Public Read Prices"
  on "public"."price_rules"
  as permissive
  for select
  to public
using (true);



  create policy "Public Read Registrations"
  on "public"."registrations"
  as permissive
  for select
  to public
using (true);




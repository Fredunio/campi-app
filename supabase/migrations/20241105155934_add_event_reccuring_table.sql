create type "public"."RecurringFrequency" as enum ('daily', 'weekly', 'monthly', 'yearly');

create table "public"."EventRecurrence" (
    "id" integer generated by default as identity not null,
    "event_id" uuid not null,
    "frequency" "RecurringFrequency" not null,
    "day_of_week" smallint,
    "day_of_month" smallint,
    "month" text,
    "recurring_start_date" timestamp with time zone not null default now(),
    "recurring_end_date" timestamp with time zone,
    "interval" smallint default '1'::smallint
);


alter table "public"."EventRecurrence" enable row level security;

alter table "public"."Event" add column "private" boolean not null default false;

CREATE UNIQUE INDEX "EventRecurrence_id_key" ON public."EventRecurrence" USING btree (id);

CREATE UNIQUE INDEX "EventRecurrence_pkey" ON public."EventRecurrence" USING btree (id);

alter table "public"."EventRecurrence" add constraint "EventRecurrence_pkey" PRIMARY KEY using index "EventRecurrence_pkey";

alter table "public"."EventRecurrence" add constraint "EventRecurrence_event_id_fkey" FOREIGN KEY (event_id) REFERENCES "Event"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."EventRecurrence" validate constraint "EventRecurrence_event_id_fkey";

alter table "public"."EventRecurrence" add constraint "EventRecurrence_id_key" UNIQUE using index "EventRecurrence_id_key";

alter table "public"."EventRecurrence" add constraint "EventRecurrence_month_fkey" FOREIGN KEY (month) REFERENCES "Month"(name) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."EventRecurrence" validate constraint "EventRecurrence_month_fkey";

grant delete on table "public"."EventRecurrence" to "anon";

grant insert on table "public"."EventRecurrence" to "anon";

grant references on table "public"."EventRecurrence" to "anon";

grant select on table "public"."EventRecurrence" to "anon";

grant trigger on table "public"."EventRecurrence" to "anon";

grant truncate on table "public"."EventRecurrence" to "anon";

grant update on table "public"."EventRecurrence" to "anon";

grant delete on table "public"."EventRecurrence" to "authenticated";

grant insert on table "public"."EventRecurrence" to "authenticated";

grant references on table "public"."EventRecurrence" to "authenticated";

grant select on table "public"."EventRecurrence" to "authenticated";

grant trigger on table "public"."EventRecurrence" to "authenticated";

grant truncate on table "public"."EventRecurrence" to "authenticated";

grant update on table "public"."EventRecurrence" to "authenticated";

grant delete on table "public"."EventRecurrence" to "service_role";

grant insert on table "public"."EventRecurrence" to "service_role";

grant references on table "public"."EventRecurrence" to "service_role";

grant select on table "public"."EventRecurrence" to "service_role";

grant trigger on table "public"."EventRecurrence" to "service_role";

grant truncate on table "public"."EventRecurrence" to "service_role";

grant update on table "public"."EventRecurrence" to "service_role";



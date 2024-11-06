alter table "public"."Event" add column "date_from" date;

alter table "public"."Event" add column "date_to" date;

alter table "public"."Event" add column "time_end" timestamp with time zone;

alter table "public"."Event" add column "time_start" timestamp with time zone;



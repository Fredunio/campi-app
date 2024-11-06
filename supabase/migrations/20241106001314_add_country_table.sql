create sequence "public"."Country_id_seq";

create table "public"."Country" (
    "id" integer not null default nextval('"Country_id_seq"'::regclass),
    "iso" character varying(2) not null,
    "name" character varying(100) not null,
    "phone_code" integer not null,
    "continent_code" character varying(2) not null,
    "iso3" character varying(3) not null
);


alter table "public"."UserProfile" add column "birthday" date;

alter table "public"."UserProfile" add column "country_id" text;

alter sequence "public"."Country_id_seq" owned by "public"."Country"."id";

CREATE UNIQUE INDEX "Country_pkey" ON public."Country" USING btree (id);

alter table "public"."Country" add constraint "Country_pkey" PRIMARY KEY using index "Country_pkey";

grant delete on table "public"."Country" to "anon";

grant insert on table "public"."Country" to "anon";

grant references on table "public"."Country" to "anon";

grant select on table "public"."Country" to "anon";

grant trigger on table "public"."Country" to "anon";

grant truncate on table "public"."Country" to "anon";

grant update on table "public"."Country" to "anon";

grant delete on table "public"."Country" to "authenticated";

grant insert on table "public"."Country" to "authenticated";

grant references on table "public"."Country" to "authenticated";

grant select on table "public"."Country" to "authenticated";

grant trigger on table "public"."Country" to "authenticated";

grant truncate on table "public"."Country" to "authenticated";

grant update on table "public"."Country" to "authenticated";

grant delete on table "public"."Country" to "service_role";

grant insert on table "public"."Country" to "service_role";

grant references on table "public"."Country" to "service_role";

grant select on table "public"."Country" to "service_role";

grant trigger on table "public"."Country" to "service_role";

grant truncate on table "public"."Country" to "service_role";

grant update on table "public"."Country" to "service_role";



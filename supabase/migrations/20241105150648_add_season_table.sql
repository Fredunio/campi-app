create table "public"."Season" (
    "name" text not null
);


alter table "public"."Season" enable row level security;

CREATE UNIQUE INDEX "Season_pkey" ON public."Season" USING btree (name);

alter table "public"."Season" add constraint "Season_pkey" PRIMARY KEY using index "Season_pkey";

grant delete on table "public"."Season" to "anon";

grant insert on table "public"."Season" to "anon";

grant references on table "public"."Season" to "anon";

grant select on table "public"."Season" to "anon";

grant trigger on table "public"."Season" to "anon";

grant truncate on table "public"."Season" to "anon";

grant update on table "public"."Season" to "anon";

grant delete on table "public"."Season" to "authenticated";

grant insert on table "public"."Season" to "authenticated";

grant references on table "public"."Season" to "authenticated";

grant select on table "public"."Season" to "authenticated";

grant trigger on table "public"."Season" to "authenticated";

grant truncate on table "public"."Season" to "authenticated";

grant update on table "public"."Season" to "authenticated";

grant delete on table "public"."Season" to "service_role";

grant insert on table "public"."Season" to "service_role";

grant references on table "public"."Season" to "service_role";

grant select on table "public"."Season" to "service_role";

grant trigger on table "public"."Season" to "service_role";

grant truncate on table "public"."Season" to "service_role";

grant update on table "public"."Season" to "service_role";



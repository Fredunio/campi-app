create table "public"."LocationSeason" (
    "season_name" text not null,
    "location_id" uuid not null
);


alter table "public"."LocationSeason" enable row level security;

CREATE UNIQUE INDEX "LocationSeason_pkey" ON public."LocationSeason" USING btree (season_name, location_id);

alter table "public"."LocationSeason" add constraint "LocationSeason_pkey" PRIMARY KEY using index "LocationSeason_pkey";

alter table "public"."LocationSeason" add constraint "LocationSeason_location_id_fkey" FOREIGN KEY (location_id) REFERENCES "Location"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."LocationSeason" validate constraint "LocationSeason_location_id_fkey";

alter table "public"."LocationSeason" add constraint "LocationSeason_season_name_fkey" FOREIGN KEY (season_name) REFERENCES "Season"(name) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."LocationSeason" validate constraint "LocationSeason_season_name_fkey";

grant delete on table "public"."LocationSeason" to "anon";

grant insert on table "public"."LocationSeason" to "anon";

grant references on table "public"."LocationSeason" to "anon";

grant select on table "public"."LocationSeason" to "anon";

grant trigger on table "public"."LocationSeason" to "anon";

grant truncate on table "public"."LocationSeason" to "anon";

grant update on table "public"."LocationSeason" to "anon";

grant delete on table "public"."LocationSeason" to "authenticated";

grant insert on table "public"."LocationSeason" to "authenticated";

grant references on table "public"."LocationSeason" to "authenticated";

grant select on table "public"."LocationSeason" to "authenticated";

grant trigger on table "public"."LocationSeason" to "authenticated";

grant truncate on table "public"."LocationSeason" to "authenticated";

grant update on table "public"."LocationSeason" to "authenticated";

grant delete on table "public"."LocationSeason" to "service_role";

grant insert on table "public"."LocationSeason" to "service_role";

grant references on table "public"."LocationSeason" to "service_role";

grant select on table "public"."LocationSeason" to "service_role";

grant trigger on table "public"."LocationSeason" to "service_role";

grant truncate on table "public"."LocationSeason" to "service_role";

grant update on table "public"."LocationSeason" to "service_role";



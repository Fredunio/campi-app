create table "public"."Month" (
    "name" text not null
);


alter table "public"."Month" enable row level security;

CREATE UNIQUE INDEX "Month_name_key" ON public."Month" USING btree (name);

CREATE UNIQUE INDEX "Month_pkey" ON public."Month" USING btree (name);

alter table "public"."Month" add constraint "Month_pkey" PRIMARY KEY using index "Month_pkey";

alter table "public"."Month" add constraint "Month_name_key" UNIQUE using index "Month_name_key";

grant delete on table "public"."Month" to "anon";

grant insert on table "public"."Month" to "anon";

grant references on table "public"."Month" to "anon";

grant select on table "public"."Month" to "anon";

grant trigger on table "public"."Month" to "anon";

grant truncate on table "public"."Month" to "anon";

grant update on table "public"."Month" to "anon";

grant delete on table "public"."Month" to "authenticated";

grant insert on table "public"."Month" to "authenticated";

grant references on table "public"."Month" to "authenticated";

grant select on table "public"."Month" to "authenticated";

grant trigger on table "public"."Month" to "authenticated";

grant truncate on table "public"."Month" to "authenticated";

grant update on table "public"."Month" to "authenticated";

grant delete on table "public"."Month" to "service_role";

grant insert on table "public"."Month" to "service_role";

grant references on table "public"."Month" to "service_role";

grant select on table "public"."Month" to "service_role";

grant trigger on table "public"."Month" to "service_role";

grant truncate on table "public"."Month" to "service_role";

grant update on table "public"."Month" to "service_role";



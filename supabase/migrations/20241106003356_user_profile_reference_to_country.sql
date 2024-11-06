alter table "public"."UserProfile" alter column "country_id" set data type integer using "country_id"::integer;

alter table "public"."UserProfile" add constraint "UserProfile_country_id_fkey" FOREIGN KEY (country_id) REFERENCES "Country"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."UserProfile" validate constraint "UserProfile_country_id_fkey";





SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "postgis" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."addTagToEntity"("p_tag_name" "text", "p_taggable_entity_id" "uuid", "p_taggable_entity_type" "text") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$DECLARE
    v_tag_id INT;              -- local variable for storing the tag's ID
    v_entity_type TEXT;      -- local variable to check if the entity type exists
BEGIN
    -- Check if the entity type exists in the EntityType table
    SELECT name INTO v_entity_type
    FROM EntityType
    WHERE name = p_taggable_entity_type;

    -- If no matching entity type is found, raise an error
    IF v_entity_type IS NULL THEN
        RAISE EXCEPTION 'Entity type % does not exist in EntityType table', p_taggable_entity_type;
    END IF;

    -- Ensure the tag exists, if not, insert it
    INSERT INTO Tags (name)
    VALUES (p_tag_name)
    ON CONFLICT (name) DO NOTHING;

    -- Retrieve the tag_id for the given tag name
    SELECT id INTO v_tag_id FROM Tags WHERE name = p_tag_name;

    -- Insert the tag association with the entity into the Taggings table
    -- Avoid duplicate entries by checking for existing combinations of tag_id, taggable_id, and taggable_type
    INSERT INTO Taggings (tag_id, taggable_id, taggable_type)
    VALUES (v_tag_id, p_taggable_id, p_taggable_entity_type)
    ON CONFLICT (tag_id, taggable_id, taggable_type) DO NOTHING;
END;$$;


ALTER FUNCTION "public"."addTagToEntity"("p_tag_name" "text", "p_taggable_entity_id" "uuid", "p_taggable_entity_type" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_tags_for_entity"("p_taggable_id" "uuid", "p_taggable_type" "text") RETURNS "text"[]
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    tag_array TEXT[];
BEGIN
    SELECT ARRAY(
        SELECT t.name
        FROM Tags t
        JOIN Taggings tg ON t.id = tg.tag_id
        WHERE tg.taggable_id = p_taggable_id
          AND tg.taggable_type = p_taggable_type
    ) INTO tag_array;

    RETURN tag_array;
END;
$$;


ALTER FUNCTION "public"."get_tags_for_entity"("p_taggable_id" "uuid", "p_taggable_type" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."Condition" (
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "icon" "text" NOT NULL,
    "description" "text"
);


ALTER TABLE "public"."Condition" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."EntityType" (
    "name" "text" NOT NULL
);


ALTER TABLE "public"."EntityType" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Equipment" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v1mc"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "image" "text"
);


ALTER TABLE "public"."Equipment" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."EquipmentCategory" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."EquipmentCategory" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."EquipmentTag" (
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL
);


ALTER TABLE "public"."EquipmentTag" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Event" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v1mc"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "updated_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "location" "uuid",
    "entity" "text"
);


ALTER TABLE "public"."Event" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."EventTag" (
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "name" "text" DEFAULT ''::"text" NOT NULL
);


ALTER TABLE "public"."EventTag" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Feature" (
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "description" "text" DEFAULT ''::"text",
    "icon" "text"
);


ALTER TABLE "public"."Feature" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Guide" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v1mc"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "title" "text" NOT NULL,
    "info" "text",
    "body" "text" NOT NULL,
    "category" integer NOT NULL
);


ALTER TABLE "public"."Guide" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."GuideCategory" (
    "name" "text" NOT NULL
);


ALTER TABLE "public"."GuideCategory" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Location" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v1mc"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "location_area" "extensions"."geography",
    "location_point" "extensions"."geography",
    "user_id" "uuid" NOT NULL,
    "image" "text",
    "enity_name" "text"
);


ALTER TABLE "public"."Location" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."LocationCategory" (
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."LocationCategory" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."LocationSize" (
    "name" "text" NOT NULL,
    "description" "text",
    "display_order" smallint DEFAULT '1'::smallint NOT NULL,
    "number_of_people_info" "text"
);


ALTER TABLE "public"."LocationSize" OWNER TO "postgres";


COMMENT ON COLUMN "public"."LocationSize"."display_order" IS 'Display order in the UI';



COMMENT ON COLUMN "public"."LocationSize"."number_of_people_info" IS 'Number of people that a location can accomodate. Type of data is of type TEXT in the form of 1-4, 10+ etc.';



CREATE TABLE IF NOT EXISTS "public"."LocationTag" (
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."LocationTag" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."LocationType" (
    "name" "text" NOT NULL,
    "description" "text"
);


ALTER TABLE "public"."LocationType" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Post" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v1mc"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "title" "text" NOT NULL,
    "body" "text" NOT NULL,
    "user_id" "uuid" DEFAULT "gen_random_uuid"()
);


ALTER TABLE "public"."Post" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Tag" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."Tag" OWNER TO "postgres";


ALTER TABLE "public"."Tag" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."Tag_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."Tagging" (
    "id" bigint NOT NULL,
    "tag_id" bigint NOT NULL,
    "taggable_id" "uuid" NOT NULL,
    "taggable_type" "text" NOT NULL
);


ALTER TABLE "public"."Tagging" OWNER TO "postgres";


ALTER TABLE "public"."Tagging" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."Tagging_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."Trip" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "updated_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "name" "text" NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"(),
    "locations" "text"[],
    "description" "text",
    "private" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."Trip" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."UserProfile" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "updated_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "username" "text",
    "first_name" "text",
    "last_name" "text",
    "location" "jsonb"
);


ALTER TABLE "public"."UserProfile" OWNER TO "postgres";


ALTER TABLE ONLY "public"."Condition"
    ADD CONSTRAINT "Condition_icon_key" UNIQUE ("icon");



ALTER TABLE ONLY "public"."Condition"
    ADD CONSTRAINT "Condition_pkey" PRIMARY KEY ("name");



ALTER TABLE ONLY "public"."EntityType"
    ADD CONSTRAINT "Entity_pkey" PRIMARY KEY ("name");



ALTER TABLE ONLY "public"."EquipmentCategory"
    ADD CONSTRAINT "EquipmentCategory_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."EquipmentCategory"
    ADD CONSTRAINT "EquipmentCategory_pkey" PRIMARY KEY ("name");



ALTER TABLE ONLY "public"."EquipmentTag"
    ADD CONSTRAINT "EquipmentTag_pkey" PRIMARY KEY ("name");



ALTER TABLE ONLY "public"."Equipment"
    ADD CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."EventTag"
    ADD CONSTRAINT "EventTag_pkey" PRIMARY KEY ("name");



ALTER TABLE ONLY "public"."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Feature"
    ADD CONSTRAINT "Feature_pkey" PRIMARY KEY ("name");



ALTER TABLE ONLY "public"."GuideCategory"
    ADD CONSTRAINT "GuideCategory_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."GuideCategory"
    ADD CONSTRAINT "GuideCategory_pkey" PRIMARY KEY ("name");



ALTER TABLE ONLY "public"."Guide"
    ADD CONSTRAINT "Guide_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."LocationCategory"
    ADD CONSTRAINT "LocationCategory_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."LocationCategory"
    ADD CONSTRAINT "LocationCategory_pkey" PRIMARY KEY ("name");



ALTER TABLE ONLY "public"."LocationSize"
    ADD CONSTRAINT "LocationSize_pkey" PRIMARY KEY ("name");



ALTER TABLE ONLY "public"."LocationTag"
    ADD CONSTRAINT "LocationTag_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."LocationTag"
    ADD CONSTRAINT "LocationTag_pkey" PRIMARY KEY ("name");



ALTER TABLE ONLY "public"."LocationType"
    ADD CONSTRAINT "LocationType_pkey" PRIMARY KEY ("name");



ALTER TABLE ONLY "public"."Location"
    ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Tag"
    ADD CONSTRAINT "Tag_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."Tag"
    ADD CONSTRAINT "Tag_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Tagging"
    ADD CONSTRAINT "Tagging_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."Tagging"
    ADD CONSTRAINT "Tagging_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Tagging"
    ADD CONSTRAINT "Tagging_tag_id_taggable_id_key" UNIQUE ("tag_id", "taggable_id");



ALTER TABLE ONLY "public"."Trip"
    ADD CONSTRAINT "Trip_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."UserProfile"
    ADD CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id");



CREATE INDEX "location_area_index" ON "public"."Location" USING "gist" ("location_area");



CREATE INDEX "location_point_index" ON "public"."Location" USING "gist" ("location_point");



ALTER TABLE ONLY "public"."Event"
    ADD CONSTRAINT "Event_entity_fkey" FOREIGN KEY ("entity") REFERENCES "public"."EntityType"("name") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."Event"
    ADD CONSTRAINT "Event_location_fkey" FOREIGN KEY ("location") REFERENCES "public"."Location"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."Location"
    ADD CONSTRAINT "Location_enity_name_fkey" FOREIGN KEY ("enity_name") REFERENCES "public"."EntityType"("name") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."Location"
    ADD CONSTRAINT "Location_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Post"
    ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."Tagging"
    ADD CONSTRAINT "Tagging_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."Tag"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Trip"
    ADD CONSTRAINT "Trip_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."UserProfile"
    ADD CONSTRAINT "UserProfile_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE "public"."Condition" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Enable delete for users based on user_id" ON "public"."Post" FOR DELETE USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable insert for authenticated users only" ON "public"."Post" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable read access for all users" ON "public"."Condition" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."Equipment" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."Event" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."Feature" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."Location" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."LocationCategory" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."LocationSize" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."LocationType" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."Post" FOR SELECT USING (true);



CREATE POLICY "Enable update for users based on user_id" ON "public"."Post" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



ALTER TABLE "public"."EntityType" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."Equipment" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."EquipmentCategory" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."EquipmentTag" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."Event" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."EventTag" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."Feature" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."Guide" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."GuideCategory" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."Location" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."LocationCategory" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."LocationSize" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."LocationTag" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."LocationType" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."Post" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."Tag" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."Tagging" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."Trip" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."UserProfile" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";













































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































GRANT ALL ON FUNCTION "public"."addTagToEntity"("p_tag_name" "text", "p_taggable_entity_id" "uuid", "p_taggable_entity_type" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."addTagToEntity"("p_tag_name" "text", "p_taggable_entity_id" "uuid", "p_taggable_entity_type" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."addTagToEntity"("p_tag_name" "text", "p_taggable_entity_id" "uuid", "p_taggable_entity_type" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_tags_for_entity"("p_taggable_id" "uuid", "p_taggable_type" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_tags_for_entity"("p_taggable_id" "uuid", "p_taggable_type" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_tags_for_entity"("p_taggable_id" "uuid", "p_taggable_type" "text") TO "service_role";


























































































GRANT ALL ON TABLE "public"."Condition" TO "anon";
GRANT ALL ON TABLE "public"."Condition" TO "authenticated";
GRANT ALL ON TABLE "public"."Condition" TO "service_role";



GRANT ALL ON TABLE "public"."EntityType" TO "anon";
GRANT ALL ON TABLE "public"."EntityType" TO "authenticated";
GRANT ALL ON TABLE "public"."EntityType" TO "service_role";



GRANT ALL ON TABLE "public"."Equipment" TO "anon";
GRANT ALL ON TABLE "public"."Equipment" TO "authenticated";
GRANT ALL ON TABLE "public"."Equipment" TO "service_role";



GRANT ALL ON TABLE "public"."EquipmentCategory" TO "anon";
GRANT ALL ON TABLE "public"."EquipmentCategory" TO "authenticated";
GRANT ALL ON TABLE "public"."EquipmentCategory" TO "service_role";



GRANT ALL ON TABLE "public"."EquipmentTag" TO "anon";
GRANT ALL ON TABLE "public"."EquipmentTag" TO "authenticated";
GRANT ALL ON TABLE "public"."EquipmentTag" TO "service_role";



GRANT ALL ON TABLE "public"."Event" TO "anon";
GRANT ALL ON TABLE "public"."Event" TO "authenticated";
GRANT ALL ON TABLE "public"."Event" TO "service_role";



GRANT ALL ON TABLE "public"."EventTag" TO "anon";
GRANT ALL ON TABLE "public"."EventTag" TO "authenticated";
GRANT ALL ON TABLE "public"."EventTag" TO "service_role";



GRANT ALL ON TABLE "public"."Feature" TO "anon";
GRANT ALL ON TABLE "public"."Feature" TO "authenticated";
GRANT ALL ON TABLE "public"."Feature" TO "service_role";



GRANT ALL ON TABLE "public"."Guide" TO "anon";
GRANT ALL ON TABLE "public"."Guide" TO "authenticated";
GRANT ALL ON TABLE "public"."Guide" TO "service_role";



GRANT ALL ON TABLE "public"."GuideCategory" TO "anon";
GRANT ALL ON TABLE "public"."GuideCategory" TO "authenticated";
GRANT ALL ON TABLE "public"."GuideCategory" TO "service_role";



GRANT ALL ON TABLE "public"."Location" TO "anon";
GRANT ALL ON TABLE "public"."Location" TO "authenticated";
GRANT ALL ON TABLE "public"."Location" TO "service_role";



GRANT ALL ON TABLE "public"."LocationCategory" TO "anon";
GRANT ALL ON TABLE "public"."LocationCategory" TO "authenticated";
GRANT ALL ON TABLE "public"."LocationCategory" TO "service_role";



GRANT ALL ON TABLE "public"."LocationSize" TO "anon";
GRANT ALL ON TABLE "public"."LocationSize" TO "authenticated";
GRANT ALL ON TABLE "public"."LocationSize" TO "service_role";



GRANT ALL ON TABLE "public"."LocationTag" TO "anon";
GRANT ALL ON TABLE "public"."LocationTag" TO "authenticated";
GRANT ALL ON TABLE "public"."LocationTag" TO "service_role";



GRANT ALL ON TABLE "public"."LocationType" TO "anon";
GRANT ALL ON TABLE "public"."LocationType" TO "authenticated";
GRANT ALL ON TABLE "public"."LocationType" TO "service_role";



GRANT ALL ON TABLE "public"."Post" TO "anon";
GRANT ALL ON TABLE "public"."Post" TO "authenticated";
GRANT ALL ON TABLE "public"."Post" TO "service_role";



GRANT ALL ON TABLE "public"."Tag" TO "anon";
GRANT ALL ON TABLE "public"."Tag" TO "authenticated";
GRANT ALL ON TABLE "public"."Tag" TO "service_role";



GRANT ALL ON SEQUENCE "public"."Tag_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."Tag_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."Tag_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."Tagging" TO "anon";
GRANT ALL ON TABLE "public"."Tagging" TO "authenticated";
GRANT ALL ON TABLE "public"."Tagging" TO "service_role";



GRANT ALL ON SEQUENCE "public"."Tagging_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."Tagging_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."Tagging_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."Trip" TO "anon";
GRANT ALL ON TABLE "public"."Trip" TO "authenticated";
GRANT ALL ON TABLE "public"."Trip" TO "service_role";



GRANT ALL ON TABLE "public"."UserProfile" TO "anon";
GRANT ALL ON TABLE "public"."UserProfile" TO "authenticated";
GRANT ALL ON TABLE "public"."UserProfile" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;

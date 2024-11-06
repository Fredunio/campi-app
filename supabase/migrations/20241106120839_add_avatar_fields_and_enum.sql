create type "public"."DefaultAvatarVariant" as enum ('beam', 'marble', 'pixel', 'sunset', 'ring', 'bauhaus');

alter table "public"."UserProfile" add column "avatar_url" text;

alter table "public"."UserProfile" add column "default_avatar_type" "DefaultAvatarVariant" default 'beam'::"DefaultAvatarVariant";



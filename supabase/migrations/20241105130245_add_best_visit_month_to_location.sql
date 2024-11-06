alter table "public"."Location" add column "best_visit_from_month" text;

alter table "public"."Location" add column "best_visit_to_month" text;

alter table "public"."Location" add constraint "Location_best_visit_from_month_fkey" FOREIGN KEY (best_visit_from_month) REFERENCES "Month"(name) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."Location" validate constraint "Location_best_visit_from_month_fkey";

alter table "public"."Location" add constraint "Location_best_visit_to_month_fkey" FOREIGN KEY (best_visit_to_month) REFERENCES "Month"(name) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."Location" validate constraint "Location_best_visit_to_month_fkey";



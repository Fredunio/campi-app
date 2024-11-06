set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.init_user_profile()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  insert into public."UserProfile" (id)
  values (new.id);

  return new;
END;$function$
;



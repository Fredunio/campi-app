# Campi

App for the best camping spots, camping gear, events, trips, reviews, guides etc.

## Stack and Tech

- React (Vite)
- Ionic+ Capacitor
- Tailwindcss
- Postgres + postgis (Supabase)
- React Query (Tanstack)
- React-Hook-Form + yup
- Leaflet - maps
- LocationIQ - Geocoding and Reverse Geocoding
- Appflow - deployment, CI/CD
- Infisical - managing environments secrets
- Trapeze - moblie apps config
- Knip - code enhancing/decluttering

## Dev Workflow

### Supabase

Use local supabase for making changes to db, create migrations and push them to remote instance.
CLI - https://supabase.com/docs/reference/cli

`supabase db diff` to see diffs in schema

`supabase db diff --local --use-migra -f new_migration_name` to create new migration

`supabase db reset` to see if new migration doesn't generate errors

`supabase db push` to push the changes to remote (add `--dry-run` flag to see what would apply before pushing)

You can also use `supabase migration` for creating migrations

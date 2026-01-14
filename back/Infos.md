
# creer la database

- CREATE USER blablabook with PASSWORD 'blablabook';
- CREATE DATABASE blablabook OWNER blablabook;

<!-- pour verifier si c'est bon -->
## se connecter a la db

- psql -U blablabook -d blablabook

### NPM Scripts

- `npm run dev` → Start the API in development mode with hot-reload  
- `npm run build` → Compile TypeScript into JavaScript  
- `npm start` → Run the compiled app  
- `npm run migrate` → Apply Prisma migrations  
- `npm run migrate:init` → Create the first migration  
- `npm run seed` → Seed the database  
- `npm run reset` → Reset the database (drop + migrate + seed)

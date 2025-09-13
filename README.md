# Invoicing App (React + Node + Azure Cosmos DB)

## Setup

1. Backend
   - Copy `backend/.env.example` to `backend/.env` and fill in your Cosmos DB connection info.
   - `cd backend && npm install`
   - `npm run dev` (needs nodemon) or `npm start`

2. Frontend
   - `cd frontend && npm install`
   - `npm run dev` (Vite)

Open the Vite URL (usually http://localhost:5173). The frontend expects the backend at `http://localhost:4000/api` by default. Use `VITE_API_BASE` env in frontend to change base URL.

## Next steps / production notes
- Do not commit secrets. Use Azure Key Vault / Azure App Service settings.
- Replace partition key with a meaningful value for scale (e.g., customerId or companyId).
- Add authentication & validation before production.

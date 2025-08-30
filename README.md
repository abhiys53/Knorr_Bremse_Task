@"
# Knorr Bremse Task - Lab Asset Management

Full-stack app:

- **Backend**: \`lab-asset-server\` (Node.js + Express)
- **Frontend**: \`lab-asset-ui\` (React)
- **Database**: \`Database/\` contains an SQLite \`.db\` file
- **Docs**: \`Lab-Asset-Documentation/\`


## Project Structure
Knorr_Bremse_Task/
├─ Database/                 # SQLite .db file (included)
├─ lab-asset-server/         # Backend (Node/Express)
│  ├─ src/
│  └─ package.json
├─ lab-asset-ui/             # Frontend (React)
│  ├─ src/
│  └─ package.json
├─ Lab-Asset-Documentation/
├─ .gitignore
└─ README.md


## Run Backend
cd lab-asset-server
npm install
npm start
# default: http://localhost:5000


## Run Frontend
cd lab-asset-ui
npm install
npm start
# default: http://localhost:3000


## Database
The SQLite database file lives in \`Database/\`.

## Notes
- node_modules and build artifacts are ignored
- Commit only source code and config files
"@ | Out-File -Encoding utf8 README.md
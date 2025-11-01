# OptionAtlas

- Backend -> `apps/api` (Spring Boot + Java 21 + Postgres)
- Frontend -> `apps/web` (React + TypeScript + Vite)
- Infrastructure -> `infra/docker-compose.yml` (Postgres + pgAdmin)

---

## Commands

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run db:up`   | Start Postgres                               |
| `npm run db:down` | Stop Postgres                                |
| `npm run dev:api` | Run backend only                             |
| `npm run dev:web` | Run frontend only                            |
| `npm run dev`     | Run backend + frontend together              |
| `npm run typegen` | Generate frontend types from backend OpenAPI |

---

## Environment

- Frontend dev -> [http://localhost:5173](http://localhost:5173)
- Backend API -> [http://localhost:8080](http://localhost:8080)
- Swagger UI -> [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- Postgres -> `localhost:5432` (user: `optionatlas`, pass: `optionatlas`)

 🚀 Deployment Instructions

### 🟢 Deploy on Netlify (Live)

1. **Connect GitHub Repository** to Netlify
2. Set your **project name** and provide required **environment variables**
3. Netlify will automatically:
   - Detect your build settings
   - Deploy the latest version of the selected branch
   - Trigger deployments on future pushes

> 💡 No manual config needed — Netlify handles the rest!

---

### 🧪 Run Locally with Docker

```bash
# 1. Clone the project
git clone https://github.com/suraj-chakraborty/mandlax

# 2. Navigate into the project
cd mandlax

# 3. Spin up the containers
docker compose up
Access the project at: http://localhost:3000

Docker automatically maps your local 3000 to the container port.

```

<h2>Tech Decisions<h2>
Next.js 15: Unifies routing, server actions, and frontend logic
React Query: Handles server state, caching, background refetch, and retries
PostgreSQL + Prisma: For robust, scalable data and clean querying
TailwindCSS: Rapid UI development with utility-first classes
Netlify: Continuous deployment and preview builds
Type Safety: Enforced across backend and database logic



🧪 If I Had More Time
📱 Add full mobile responsiveness

🧼 Optimize query & component structure for performance

🔁 Sync video playback with timeline highlights

🤖 Integrate with real APIs if provided for automatic incident detection
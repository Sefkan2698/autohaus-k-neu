# Multi-stage build für optimale Image-Größe
FROM node:20-alpine AS base

# Installiere Dependencies für better-sqlite3
RUN apk add --no-cache python3 make g++ libc6-compat

WORKDIR /app

# Dependencies installieren
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Build der Next.js App
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment Variable für Production Build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build mit standalone output
RUN npm run build

# Production Image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Kopiere nur notwendige Files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Erstelle data Ordner mit richtigen Permissions
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
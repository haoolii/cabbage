# 基礎階段
FROM node:18-alpine AS base

# 安裝依賴階段
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# 構建階段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 運行階段（生產環境）
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 安裝 PM2
RUN npm install -g pm2

# 添加非 root 使用者
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 複製必要檔案
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切換到非 root 使用者
USER nextjs

EXPOSE 8877
ENV PORT=8877
ENV HOSTNAME="0.0.0.0"

# 使用 PM2 啟動應用
CMD ["pm2-runtime", "server.js"]
FROM node:20-alpine
WORKDIR /app

ENV DATABASE_URL="postgresql://postgres:postgres@postgres:5432/sgcursos?schema=public"

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]

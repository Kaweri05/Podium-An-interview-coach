# Dockerfile for deploying Podium on Hugging Face Spaces (Docker SDK)
#
# Hugging Face Spaces expects the app to listen on port 7860 by default,
# so we set PORT=7860 here. server.js already reads process.env.PORT,
# so no code changes are needed.

FROM node:22-slim

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the project
COPY . .

ENV PORT=7860
EXPOSE 7860

CMD ["node", "server.js"]

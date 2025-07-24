FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./


RUN npm install

COPY . .


RUN npm run build
RUN apk add --no-cache ca-certificates
ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]

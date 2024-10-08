FROM --platform=linux/amd64 node:22-alpine

WORKDIR /backend

COPY . .

RUN npm install --frozen-lockfile

EXPOSE 8080

# CMD ["npm", "run", "start:dev"]
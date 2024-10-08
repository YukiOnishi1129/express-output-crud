FROM --platform=linux/amd64 node:22-alpine

WORKDIR /backend

COPY /backend/package*.json .
RUN npm install --frozen-lockfile

COPY /backend .

CMD ["npm", "run", "dev"]
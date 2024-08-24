FROM node:22-alpine as DEV
WORKDIR /app/viblo-clone
COPY package.json .

RUN npm i

COPY . .

RUN npm run build

FROM node:22-alpine as PRODUCTION
WORKDIR /app/viblo-clone

COPY --from=DEV /app/viblo-clone/dist/ /app/viblo-clone/dist/

EXPOSE 5173

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript

EXPOSE 5173
CMD [ "npm", "run", "preview" ]

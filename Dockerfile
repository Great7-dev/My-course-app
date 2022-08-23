FROM node:gallium-alpine

ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

# RUN npm install
RUN yarn

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
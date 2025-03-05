FROM node:18-alpine 

WORKDIR /app 

COPY package.json package-lock.json ./
RUN npm install --force
RUN npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons --force
RUN npm install @react-three/drei --legacy-peer-deps 

COPY . .

RUN npm run build 

EXPOSE 3000 

CMD ["npm", "run", "start"]

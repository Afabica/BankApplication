FOM node:18-alpine 

WORKDIR /app 

COPY package.json package-lock.json ./
RUN npm install --force
RUN npm install nookies jwt-decode react-chartjs-2 chart.js --force


COPY . .

RUN npm run build 

EXPOSE 3000 

CMD ["npm", "run", "start"]

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

# Skopiuj resztę kodu
COPY . .

# Eksponuj port backendu
EXPOSE 3001

# Uruchom backend
CMD ["npm", "run", "dev"]

# Dokumentacja Projektu Shopping List App

## Użyte technologie

### Backend
- **Node.js** - środowisko uruchomieniowe JavaScript
- **TypeScript** - typowany nadzbiór JavaScript
- **Hono** - lekki i szybki framework webowy dla Node.js
- **MongoDB** - nierelacyjna baza danych NoSQL
- **Mongoose** - biblioteka ODM (Object Data Modeling) dla MongoDB i Node.js
- **Socket.io** - biblioteka umożliwiająca komunikację w czasie rzeczywistym
- **JWT (JSON Web Token)** - standard do bezpiecznego przesyłania informacji między stronami
- **Bcrypt** - biblioteka do hashowania haseł
- **Zod** - biblioteka do walidacji danych
- **Nodemon** - narzędzie deweloperskie do automatycznego restartu serwera

### Frontend
- **React 19** - biblioteka JavaScript do budowania interfejsów użytkownika
- **TypeScript** - typowany nadzbiór JavaScript
- **Vite** - nowoczesne narzędzie do budowania aplikacji frontendowych
- **React Router** - biblioteka do obsługi routingu w aplikacjach React
- **React Query** - biblioteka do zarządzania stanem i cachowaniem danych
- **React Hook Form** - biblioteka do obsługi formularzy
- **Zod** - biblioteka do walidacji danych
- **Axios** - klient HTTP do wykonywania zapytań
- **Socket.io-client** - klient Socket.io do komunikacji w czasie rzeczywistym
- **TailwindCSS** - framework CSS do szybkiego tworzenia responsywnych interfejsów
- **Radix UI** - biblioteka dostępnych komponentów UI
- **Jotai** - lekka biblioteka do zarządzania stanem
- **React Hot Toast** - biblioteka do wyświetlania powiadomień

### Narzędzia deweloperskie
- **Biome** - narzędzie do formatowania kodu
- **ESLint** - narzędzie do statycznej analizy kodu
- **Docker** - platforma do konteneryzacji aplikacji
- **Docker Compose** - narzędzie do definiowania i uruchamiania wielokontenerowych aplikacji

## Opis Docker Compose

Projekt wykorzystuje Docker Compose do orkiestracji trzech kontenerów:

### 1. Kontener MongoDB (`mongo`)
- **Obraz**: oficjalny obraz MongoDB
- **Nazwa kontenera**: `mongo_db`
- **Porty**: mapowanie portu 27017 (standardowy port MongoDB)
- **Wolumeny**: `mongo_data` - trwały wolumin do przechowywania danych bazy
- **Restart**: automatyczny restart w przypadku awarii

### 2. Kontener Backend (`backend`)
- **Nazwa kontenera**: `backend_app`
- **Build**: budowany z katalogu `./backend` przy użyciu Dockerfile
- **Porty**: 
  - 3001 - główny port API
  - 3002 - prawdopodobnie port dla Socket.io
- **Zależności**: uruchamiany po kontenerze MongoDB
- **Zmienne środowiskowe**: 
  - `MONGO_URI` - adres połączenia z bazą danych MongoDB
- **Tryb deweloperski**:
  - Synchronizacja zmian w katalogu `./backend` z katalogiem `/app` w kontenerze
  - Ignorowanie katalogu `node_modules`
  - Przebudowa kontenera przy zmianach w `package.json`

### 3. Kontener Frontend (`frontend`)
- **Nazwa kontenera**: `frontend_app`
- **Build**: budowany z katalogu `./frontend` przy użyciu Dockerfile
- **Porty**: mapowanie portu 5173 (standardowy port deweloperski Vite)
- **Zależności**: uruchamiany po kontenerze Backend
- **Tryb deweloperski**:
  - Synchronizacja zmian w katalogu `./frontend` z katalogiem `/app` w kontenerze
  - Ignorowanie katalogu `node_modules`
  - Przebudowa kontenera przy zmianach w `package.json`

### Wolumeny
- **mongo_data**: trwały wolumin do przechowywania danych MongoDB

## Uruchomienie projektu

Aby uruchomić projekt, należy wykonać następujące kroki:

1. Upewnij się, że masz zainstalowany Docker i Docker Compose
2. Sklonuj repozytorium projektu
3. W katalogu głównym projektu uruchom komendę:
   ```
   docker-compose up
   ```
4. Aplikacja będzie dostępna pod adresami:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

Aby zatrzymać aplikację, użyj kombinacji klawiszy `Ctrl+C` lub komendy:
```
docker-compose down
```

Aby usunąć wszystkie kontenery wraz z danymi, użyj komendy:
```
docker-compose down -v
``` 
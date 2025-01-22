# WebAppTraining - Setup and Usage

WebAppTraining to aplikacja webowa składająca się z dwóch kontenerów Docker, które współpracują ze sobą. Jeden z kontenerów obsługuje backend napisany w .NET 8.0, a drugi frontend stworzony w Angularze.

---

## Wymagania wstępne
Aby uruchomić projekt, upewnij się, że masz zainstalowane następujące narzędzia:

- Docker i Docker Compose

---

## Konfiguracja przed uruchomieniem

1. Zdobądź klucze API potrzebne do korzystania z Cloudinary:
   - **CLOUDINARY_API_KEY**: Twój klucz API.
   - **CLOUDINARY_API_SECRET**: Twój sekretny klucz API.
   - **CLOUDINARY_CLOUD_NAME**: Nazwa Twojego konta w Cloudinary.

2. Zaktualizuj plik `docker-compose.yml` w sekcji `api`, wstawiając zdobyte dane do zmiennych środowiskowych:
   ```yaml
   services:
     api:
       environment:
         - CLOUDINARY_API_KEY=your-api-key
         - CLOUDINARY_API_SECRET=your-api-secret
         - CLOUDINARY_CLOUD_NAME=your-cloud-name
   ```

---

## Uruchamianie aplikacji

### Uruchamianie za pomocą Docker Compose
1. Upewnij się, że plik `docker-compose.yml` znajduje się w katalogu głównym projektu.
2. Zbuduj obrazy i uruchom kontenery jednocześnie:
   ```bash
   docker-compose up
   ```
3. Aplikacja powinna być dostępna na następujących adresach:
   - Backend: `http://localhost:5000` lub `https://localhost:5001`
   - Frontend: `http://localhost:4200`

4. Aby zatrzymać aplikację, użyj:
   ```bash
   docker-compose down
   ```

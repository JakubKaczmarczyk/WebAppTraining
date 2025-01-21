# WebAppTraining - Setup and Usage

WebAppTraining to aplikacja webowa składająca się z dwóch kontenerów Docker, które współpracują ze sobą. Jeden z kontenerów obsługuje backend napisany w .NET 8.0, a drugi frontend stworzony w Angularze.

---

## Wymagania wstępne
Aby uruchomić projekt, upewnij się, że masz zainstalowane następujące narzędzia:

- Docker i Docker Compose

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

---

## Notes
- Certyfikaty SSL są generowane wewnątrz kontenerów i nie wymagają dodatkowej konfiguracji.
- Upewnij się, że Docker jest uruchomiony przed próbą uruchomienia kontenerów.


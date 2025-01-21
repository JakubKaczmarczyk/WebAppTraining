# Użycie oficjalnego obrazu .NET SDK do budowania aplikacji
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT=Development
# Instalacja mkcert i OpenSSL
RUN apt-get update && apt-get install -y curl libnss3-tools openssl && \
    curl -JLO https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-amd64 && \
    chmod +x mkcert-v1.4.4-linux-amd64 && mv mkcert-v1.4.4-linux-amd64 /usr/local/bin/mkcert && \
    mkcert -install

# Generowanie certyfikatów w katalogu /ssl
RUN mkdir -p /app/ssl && \
    mkcert -key-file /app/ssl/localhost-key.pem -cert-file /app/ssl/localhost.pem localhost && \
    openssl pkcs12 -export -out /app/ssl/localhost.pfx -inkey /app/ssl/localhost-key.pem -in /app/ssl/localhost.pem -passout pass:

# Kopiowanie plików projektu i budowanie aplikacji
COPY . .
RUN dotnet publish -c Release -o out

# Użycie oficjalnego obrazu .NET Runtime do uruchamiania aplikacji
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Kopiowanie opublikowanych plików z etapu budowy
COPY --from=build /app/out .
COPY --from=build /app/ssl /app/ssl

# Konfiguracja zmiennych środowiskowych
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS=http://+:5000;https://+:5001
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/app/ssl/localhost.pfx
ENV ASPNETCORE_Kestrel__Certificates__Default__Password=""

# Otwieranie portów
EXPOSE 5000
EXPOSE 5001

# Uruchamianie aplikacji
ENTRYPOINT ["dotnet", "API.dll"]

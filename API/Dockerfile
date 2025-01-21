# Użycie oficjalnego obrazu .NET SDK do budowania i uruchamiania aplikacji
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Kopiowanie plików projektu i budowanie aplikacji
COPY . .
RUN dotnet publish -c Release -o out

# Użycie oficjalnego obrazu .NET Runtime do uruchomienia aplikacji
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Kopiowanie opublikowanych plików z etapu budowy
COPY --from=build /app/out .

# Kopiowanie certyfikatu HTTPS
COPY ssl/localhost.pfx ./https/localhost.pfx

# Konfiguracja zmiennych środowiskowych
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS=http://+:5000;https://+:5001
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/app/https/localhost.pfx

# Otwieranie portów
EXPOSE 5000
EXPOSE 5001

# Uruchamianie aplikacji
ENTRYPOINT ["dotnet", "API.dll"]

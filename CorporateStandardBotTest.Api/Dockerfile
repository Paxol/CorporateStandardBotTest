FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["CorporateStandardBotTest.Api/CorporateStandardBotTest.Api.csproj", "CorporateStandardBotTest.Api/"]
COPY ["CorporateStandardBotTest.BusinessLogic/CorporateStandardBotTest.BusinessLogic.csproj", "CorporateStandardBotTest.BusinessLogic/"]
COPY ["CorporateStandardBotTest.UI/CorporateStandardBotTest.UI.esproj", "CorporateStandardBotTest.UI/"]
RUN dotnet restore "CorporateStandardBotTest.Api/CorporateStandardBotTest.Api.csproj"
COPY . .

# Install node js

ENV NODE_VERSION=24.15.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

WORKDIR "/src/CorporateStandardBotTest.Api"

RUN dotnet build "./CorporateStandardBotTest.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./CorporateStandardBotTest.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CorporateStandardBotTest.Api.dll"]

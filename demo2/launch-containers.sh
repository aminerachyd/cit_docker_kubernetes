#!/bin/bash

FRONTEND_PORT=8080
NEWS_PORT=8081
WEATHER_PORT=8082

echo "Launching weather service on port $WEATHER_PORT"
docker run --rm -d -p $WEATHER_PORT:8080 aminerachyd/service-weather

echo "Launching news service on port $NEWS_PORT"
docker run --rm -d -p $NEWS_PORT:8080 aminerachyd/service-news

echo "Launching frontend service on port $FRONTEND_PORT"
docker run --rm -d -p $FRONTEND_PORT:80 \
  -e WEATHER_ENDPOINT=http://localhost:$WEATHER_PORT/weather \
  -e NEWS_ENDPOINT=http://localhost:$NEWS_PORT/news aminerachyd/frontend-newsweather

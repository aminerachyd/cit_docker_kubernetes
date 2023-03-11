package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

type WeatherData struct {
	City        string
	Temperature int
	Humidity    int
}

type Reponse struct {
	WeatherData []WeatherData
	Hostname 	string
}

func main() {
	 	fmt.Println("Starting weather server on port 8080")

	http.HandleFunc("/weather", weatherHandler)
	http.ListenAndServe(":8080", nil)

}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func weatherHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	weatherRabat := WeatherData{
		City:        "Rabat",
		Temperature: 20,
		Humidity:    80,
	}

	weatherCasablanca := WeatherData{
		City:        "Casablanca",
		Temperature: 20,
		Humidity:    80,
	}

	weatherData := []WeatherData{weatherRabat, weatherCasablanca}
	hostname := os.Getenv("HOSTNAME")

	response := Reponse{
		WeatherData: weatherData,
		Hostname: hostname,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
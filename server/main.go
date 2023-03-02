package main

import (
	"dumbsound/database"
	"dumbsound/pkg/mysql"
	"dumbsound/routes"
	"fmt"
	"net/http"

	// "time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	errEnv := godotenv.Load()
	if errEnv != nil {
		panic("Failed to load env file")
	}

	// initial DB
	mysql.DatabaseInit()

	// run migration
	database.RunMigration()

	// Automatic Create admin Account
	database.RunSeeder()

	r := mux.NewRouter()

	routes.RouteInit(r.PathPrefix("/api/v1").Subrouter())

	//path file
	r.PathPrefix("/uploads").Handler(http.StripPrefix("/uploads/", http.FileServer(http.Dir("./uploads"))))

	// Setup allowed Header, Method, and Origin for CORS
	var AllowedHeaders = handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	var AllowedMethods = handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "PATCH", "DELETE"})
	var AllowedOrigins = handlers.AllowedOrigins([]string{"*"})

	// dueDate := time.Now().Add(5 * time.Minute)
	// fmt.Println("Due date is", dueDate.Format("2006-01-02 15:04:05"))

	// dueDates := time.Now().AddDate(0, 0, 30)
	// fmt.Println("Due date is", dueDates.Format("2006-01-02"))

	// future := time.Now().AddDate(0, 0, 30)
	// fmt.Println("30 hari ke depan dari hari ini adalah:", future.Format("02 January 2006"))

	port := "5000"
	fmt.Println("server running localhost:" + port)

	// Embed the setup allowed in 2 parameter
	http.ListenAndServe("localhost:"+port, handlers.CORS(AllowedHeaders, AllowedMethods, AllowedOrigins)(r))

	fmt.Println("server running localhost:" + port)
	http.ListenAndServe("localhost:"+port, r)
}

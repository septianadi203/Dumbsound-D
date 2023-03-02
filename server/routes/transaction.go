package routes

import (
	"dumbsound/handlers"
	"dumbsound/pkg/middleware"
	"dumbsound/pkg/mysql"
	"dumbsound/repositories"

	"github.com/gorilla/mux"
)

func TransactionRoutes(r *mux.Router) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository)

	r.HandleFunc("/transactions", h.FindTransactions).Methods("GET")
	r.HandleFunc("/transaction/{id}", h.GetTransaction).Methods("GET")
	r.HandleFunc("/transaction", h.CreateTransaction).Methods("POST")
	r.HandleFunc("/transaction/{id}", h.UpdateTransaction).Methods("PATCH")
	r.HandleFunc("/transaction/{id}", h.DeleteTransaction).Methods("DELETE")
	r.HandleFunc("/notification", h.Notification).Methods("POST")
	r.HandleFunc("/transactionId", middleware.Auth(h.FindTransactionByID)).Methods("GET")
}

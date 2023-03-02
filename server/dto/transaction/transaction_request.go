package transactiondto

import (
	"dumbsound/models"
	"time"
)

type CreateTransactionRequest struct {
	UserID        int         `json:"userid"`
	User          models.User `json:"user"`
	StartDate     time.Time   `json:"startdate"`
	DueDate       time.Time   `json:"duedate"`
	StatusUser    string      `json:"statususer" gorm:"type: varchar(255)"`
	StatusPayment string      `json:"statuspayment" gorm:"type: varchar(255)"`
	CreatedAt     time.Time   `json:"created_at"`
	UpdatedAt     time.Time   `json:"updated_at"`
}

type UpdateTransactionRequest struct {
	StatusUser    string    `json:"statususer" gorm:"type: varchar(255)"`
	StatusPayment string    `json:"statuspayment" gorm:"type: varchar(255)"`
	DueDate       time.Time `json:"duedate"`
}

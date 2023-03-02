package transactiondto

import (
	"dumbsound/models"
	"time"
)

type TransactionResponse struct {
	ID            int         `json:"id"`
	UserID        int         `json:"userid"`
	User          models.User `json:"user"`
	StartDate     time.Time   `json:"startdate"`
	DueDate       time.Time   `json:"duedate"`
	StatusUser    string      `json:"statususer" gorm:"type: varchar(255)"`
	StatusPayment string      `json:"statuspayment" gorm:"type: varchar(255)"`
}

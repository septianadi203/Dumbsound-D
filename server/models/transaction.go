package models

import "time"

type Transaction struct {
	ID            int       `json:"id"`
	UserID        int       `json:"userid"`
	User          User      `json:"user"`
	StartDate     time.Time `json:"startdate"`
	DueDate       time.Time `json:"duedate"`
	StatusUser    string    `json:"statususer" gorm:"type: varchar(255)"`
	StatusPayment string    `json:"statuspayment" gorm:"type: varchar(255)"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

func (Transaction) TableName() string {
	return "transactions"
}

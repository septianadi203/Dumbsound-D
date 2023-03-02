package artistdto

import (
	"time"
)

type CreateArtistRequest struct {
	Name        string    `json:"name" form:"name" gorm:"type: varchar(255)"`
	Old         string    `json:"old" form:"old" gorm:"type: varchar(255)"`
	Type        string    `json:"type" form:"type" gorm:"type: varchar(255)"`
	StartCareer string    `json:"startcareer" form:"startcareer" gorm:"type: varchar(255)"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type UpdateArtistRequest struct {
	Name        string `json:"name" gorm:"type: varchar(255)"`
	Old         string `json:"old" gorm:"type: varchar(255)"`
	Type        string `json:"type" gorm:"type: varchar(255)"`
	StartCareer string `json:"startcareer" gorm:"type: varchar(255)"`
}

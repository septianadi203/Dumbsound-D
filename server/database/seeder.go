package database

import (
	"dumbsound/models"
	"dumbsound/pkg/bcrypt"
	"dumbsound/pkg/mysql"
	"errors"
	"fmt"
	"log"
	"os"

	"gorm.io/gorm"
)

func RunSeeder() {
	// ==================================
	// CREATE SUPER ADMIN ON MIGRATION
	// ==================================

	// cek is role table exist
	if mysql.DB.Migrator().HasTable(&models.Role{}) {
		// check is user table has minimum 1 user as admin
		err := mysql.DB.First(&models.Role{}, "id = ?", 1).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// create 1 admin
			newRole := []models.Role{
				{
					ID:   1,
					Name: "Admin",
				},
				{
					ID:   2,
					Name: "User",
				},
			}

			// insert admin to database
			errAddRole := mysql.DB.Select("ID", "Name").Create(&newRole).Error
			if errAddRole != nil {
				fmt.Println(errAddRole.Error())
				log.Fatal("Seeding failed")
			}
		}
	}

	// cek is user table exist
	if mysql.DB.Migrator().HasTable(&models.User{}) {
		// check is user table has minimum 1 user as admin
		err := mysql.DB.First(&models.User{}, "role_id = ?", 1).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {

			hashPassword, err := bcrypt.HashingPassword(os.Getenv("ADMIN_PASSWORD"))
			if err != nil {
				log.Fatal("Hash password failed")
			}
			// create 1 admin
			newUser := models.User{
				Fullname: "Admin",
				RoleID:   1,
				Email:    os.Getenv("ADMIN_EMAIL"),
				Gender:   "Male",
				Phone:    "08123456789",
				Address:  "Dumbways dong",
				Password: hashPassword,
			}

			// newUser.Password = hashPassword

			// insert admin to database
			errAddUser := mysql.DB.Select("Fullname", "RoleID", "Email", "Password", "Gender", "Phone", "Address").Create(&newUser).Error
			if errAddUser != nil {
				fmt.Println(errAddUser.Error())
				log.Fatal("Seeding failed")
			}
		}
	}

	fmt.Println("Seeding completed successfully")
}

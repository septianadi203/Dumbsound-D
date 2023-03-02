package handlers

import (
	"context"
	musicdto "dumbsound/dto/music"
	dto "dumbsound/dto/result"
	"dumbsound/models"
	"dumbsound/repositories"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type handlerMusic struct {
	MusicRepository repositories.MusicRepository
}

func HandlerMusic(MusicRepository repositories.MusicRepository) *handlerMusic {
	return &handlerMusic{MusicRepository}
}

func (h *handlerMusic) FindMusics(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	musics, err := h.MusicRepository.FindMusics()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	for i, p := range musics {
		musics[i].Thumbnail = p.Thumbnail
		musics[i].Attache = p.Attache
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: musics}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerMusic) GetMusic(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	music, err := h.MusicRepository.GetMusic(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: music}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerMusic) CreateMusic(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Thumbnail
	// dataContex := r.Context().Value("dataFile")
	// filename := dataContex.(string)

	// Music
	dataMusicContext := r.Context().Value("dataMusic")
	musicFile := dataMusicContext.(string)

	dataContext := r.Context().Value("dataFile")
	filepath := dataContext.(string)

	artistid, _ := strconv.Atoi(r.FormValue("artistid"))
	request := musicdto.CreateMusicRequest{
		ArtistID: artistid,
		Title:    r.FormValue("title"),
		Year:     r.FormValue("year"),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	ctx := context.Background()
	CLOUD_NAME := os.Getenv("CLOUD_NAME")
	API_KEY := os.Getenv("API_KEY")
	API_SECRET := os.Getenv("API_SECRET")

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	respImg, err := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "uploads"})
	if err != nil {
		fmt.Println(err.Error())
	}
	respMusic, err := cld.Upload.Upload(ctx, musicFile, uploader.UploadParams{Folder: "filemusic"})
	if err != nil {
		fmt.Println(err.Error())
	}

	music := models.Music{
		ArtistID:  request.ArtistID,
		Artist:    request.Artist,
		Title:     request.Title,
		Year:      request.Year,
		Thumbnail: respImg.SecureURL,
		Attache:   respMusic.SecureURL,
	}

	data, err := h.MusicRepository.CreateMusic(music)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, _ = h.MusicRepository.GetMusic(data.ID)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerMusic) UpdateMusic(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(musicdto.UpdateMusicRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	music, err := h.MusicRepository.GetMusic(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if request.Title != "" {
		music.Title = request.Title
	}

	if request.Year != "" {
		music.Year = request.Year
	}

	if request.Thumbnail != "" {
		music.Thumbnail = request.Thumbnail
	}

	if request.Attache != "" {
		music.Attache = request.Attache
	}

	data, err := h.MusicRepository.UpdateMusic(music)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerMusic) DeleteMusic(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	music, err := h.MusicRepository.GetMusic(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.MusicRepository.DeleteMusic(music)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

import React from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useParams } from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Container, Image } from "react-bootstrap";

function Music() {
  const { id } = useParams();

  const { data: music } = useQuery("musicCache", async () => {
    const response = await API.get("/music/" + id);
    return response.data.data;
  });

  return (
    <>
      <AudioPlayer
        className="fixed-bottom bg-dark text-white"
        autoPlay
        src={music?.attache}
        header={`${music?.artist.name} - ${music?.title}`}
        layout="stacked-reverse"
      />
      <div className="min-vh-100" style={{ backgroundColor: "#161616" }}>
        <Container>
          <div
            className="d-flex text-white gap-4 align-items-end"
            style={{ paddingTop: "100px" }}
          >
            <Image
              className="object-fit-cover rounded"
              style={{ width: "18rem", height: "18rem" }}
              src={music?.thumbnail}
            />
            <div>
              <div>SONG</div>
              <div style={{ fontSize: "50px" }} className="fw-bold">
                {music?.title}
              </div>
              <div>
                {music?.artist.name} | {music?.year}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Music;

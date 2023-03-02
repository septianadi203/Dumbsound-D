import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { API } from "../config/api";

function AddMusic() {
  // const [preview, setPreview] = useState(null); //For image preview
  const [addMusic, setAddMusic] = useState({
    artistid: "",
    thumbnail: "",
    title: "",
    year: "",
    attache: "",
  });

  const handleChangeAddMusic = (e) => {
    const { name, type } = e.target;
    setAddMusic({
      ...addMusic,
      [name]: type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleAddMusic = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("artistid", addMusic.artistid);
      formData.append("thumbnail", addMusic.thumbnail[0]);
      formData.append("title", addMusic.title);
      formData.append("year", addMusic.year);
      formData.append("attache", addMusic.attache[0]);

      const response = await API.post("/music", formData);
      console.log("Successfully added musics", response);

      alert("Successfully added musics");

      addMusic.artistid = "";
      addMusic.thumbnail = "";
      addMusic.title = "";
      addMusic.year = "";
      addMusic.attache = "";
    } catch (error) {
      alert("Failed to add music");
    }
  });

  let { data: artists } = useQuery("artistsCache", async () => {
    const response = await API.get("/artists");
    return response.data.data;
  });

  return (
    <div style={{ backgroundColor: "#161616" }} className="pt-5 vh-100">
      <Container className="pt-5">
        <h2 className="text-white mb-4">Add Music</h2>
        <Form onSubmit={(e) => handleAddMusic.mutate(e)}>
          <Form.Group className="d-flex mb-4 gap-2">
            <Form.Control
              type="text"
              name="title"
              value={addMusic?.title}
              onChange={handleChangeAddMusic}
              className="w-75"
              placeholder="Title"
              style={{ backgroundColor: "#454545" }}
            />

            <Form.Control
              type="file"
              id="upload"
              name="thumbnail"
              onChange={handleChangeAddMusic}
              className="w-25"
              style={{ backgroundColor: "#454545" }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              name="year"
              value={addMusic?.year}
              onChange={handleChangeAddMusic}
              placeholder="Year"
              style={{ backgroundColor: "#454545" }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Select
              name="artistid"
              value={addMusic?.artistid}
              onChange={handleChangeAddMusic}
              style={{ backgroundColor: "#454545" }}
              required
            >
              <option>-- Pilih --</option>
              {artists?.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="file"
              id="upload"
              name="attache"
              onChange={handleChangeAddMusic}
              className="w-25"
              style={{ backgroundColor: "#454545" }}
            />
          </Form.Group>

          {/* <Form.Group className="mb-4">
            {preview && (
              <Image
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                  marginTop: "10px",
                }}
              />
            )}
          </Form.Group> */}

          <Form.Group className="mb-4 d-flex justify-content-center mt-5">
            <Button
              variant="primary"
              type="submit"
              className="d-flex px-5 border-0"
              style={{ backgroundColor: "#F58033" }}
            >
              Add Song
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}

export default AddMusic;

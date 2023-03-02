import React, { useContext } from "react";
import { Row, Col, Card, Container, Image } from "react-bootstrap";
import background from "../assets/background.png";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { Link } from "react-router-dom";
import "../App.css";
import { RoomsContext } from "../context/roomsContext";

const Beranda = () => {
  const { handleLoginShow } = useContext(RoomsContext);

  const { data: musics } = useQuery("musicsache", async () => {
    const response = await API.get("/musics");
    return response.data.data;
  });

  console.log("music", musics);

  const { data: premium } = useQuery("premiumCache", async () => {
    const response = await API.get("/transactionId");
    return response.data.data.length;
  });

  const { data: status } = useQuery("statusCache", async () => {
    const response = await API.get("/transactionId");
    const length = response.data.data.length;
    return response.data.data[length - 1].statuspayment;
  });

  const { data: dueDate } = useQuery("duedateCache", async () => {
    const response = await API.get("/transactionId");
    const length = response.data.data.length;
    return response.data.data[length - 1].duedate;
  });
  const newDueDate = new Date(dueDate);

  const dateTimeNow = new Date();

  return (
    <>
      <div className="position-relative">
        <Image className="w-100" src={background} />
        <div
          className="position-absolute text-white text-center"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              fontSize: "48px",
            }}
          >
            Connect on DumbSound
          </div>
          <div style={{ fontSize: "24px" }}>
            Discovery, Stream, and share a constantly expanding mix of music
            from emerging and major artists around the world
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#161616" }} className="pb-5">
        <Container>
          <div
            className="text-center py-5"
            style={{ fontSize: "24px", color: "#EE4622" }}
          >
            Dengarkan Dan Rasakan
          </div>
          <div className="d-flex justify-content-end mb-3">
            <Link
              to="/all-music"
              className="text-secondary text-decoration-none text-show"
            >
              Show all
            </Link>
          </div>
          <Row lg={5} md={4} sm={2} className="g-3">
            {musics?.slice(0, 10).map((item, index) => {
              return (
                <Col key={index}>
                  {localStorage.getItem("token") ? (
                    <>
                      {premium !== 0 &&
                      dateTimeNow < newDueDate &&
                      status === "Success" ? (
                        <Link
                          className="text-decoration-none"
                          to={/music/ + item.id}
                        >
                          <Card className="bg-dark h-100 p-3">
                            <div className="d-flex h-100 justify-content-center">
                              <Card.Img
                                variant="top"
                                src={item?.thumbnail}
                                className="rounded"
                              />
                              {console.log(item.thumbnail)}
                            </div>
                            <Card.Body className="p-0 mt-3">
                              <div className="d-flex justify-content-between">
                                <Card.Title className="text-white">
                                  {item?.title}
                                </Card.Title>
                                <Card.Text className="text-white">
                                  {item?.year}
                                </Card.Text>
                              </div>
                              <Card.Text className="text-secondary">
                                {item?.artist.name}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Link>
                      ) : (
                        <Link className="text-decoration-none" to="/pay">
                          <Card className="bg-dark h-100 p-3">
                            <div className="d-flex h-100 justify-content-center">
                              <Card.Img
                                variant="top"
                                src={item?.thumbnail}
                                className="rounded"
                              />
                            </div>
                            <Card.Body className="p-0 mt-3">
                              <div className="d-flex justify-content-between">
                                <Card.Title className="text-white">
                                  {item?.title}
                                </Card.Title>
                                <Card.Text className="text-white">
                                  {item?.year}
                                </Card.Text>
                              </div>
                              <Card.Text className="text-secondary">
                                {item?.artist.name}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Link>
                      )}
                    </>
                  ) : (
                    <Link
                      className="text-decoration-none"
                      onClick={handleLoginShow}
                    >
                      <Card className="bg-dark h-100 p-3">
                        <div className="d-flex h-100 justify-content-center">
                          <Card.Img
                            variant="top"
                            src={item.thumbnail}
                            className="rounded"
                          />
                        </div>
                        <Card.Body className="p-0 mt-3">
                          <div className="d-flex justify-content-between">
                            <Card.Title className="text-white">
                              {item.title}
                            </Card.Title>
                            <Card.Text className="text-white">
                              {item.year}
                            </Card.Text>
                          </div>
                          <Card.Text className="text-secondary">
                            {item.artist.name}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  )}
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Beranda;

import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
// import thumbs from "../assets/data/thumbnail";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { Link } from "react-router-dom";

const AllMusic = () => {
  let { data: musics } = useQuery("musicsCache", async () => {
    const response = await API.get("/musics");
    return response.data.data;
  });

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
    <div
      style={{
        backgroundColor: "#161616",
        paddingTop: "8rem",
        paddingBottom: "5rem",
      }}
    >
      <Container>
        <Row lg={5} md={4} sm={2} className="g-3">
          {musics?.map((item, index) => {
            return (
              <Col key={index}>
                <>
                  {premium !== 0 &&
                  dateTimeNow < newDueDate &&
                  status === "Success" ? (
                    <Link
                      className="text-decoration-none"
                      to={`/music/` + item.id}
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
                  ) : (
                    <Link className="text-decoration-none" to="/pay">
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
                </>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default AllMusic;

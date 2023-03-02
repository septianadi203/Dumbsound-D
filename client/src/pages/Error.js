import React from "react";
import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import imageNotFound from "../assets/PageNoteFound.jpg";

export default function NoMatch() {
  return (
    <Container className="d-flex flex-column justify-content-center align-content-center align-items-center">
      <Image src={imageNotFound} style={{ width: "50rem" }} />
      <div className="text-secondary">
        We're sorry, the page you requested could not be found
      </div>
      <div className="text-secondary">Please go back to the homepage</div>
      <Link to="/" className="btn btn-primary rounded-pill fw-bold px-4 mt-2">
        GO HOME
      </Link>
    </Container>
  );
}

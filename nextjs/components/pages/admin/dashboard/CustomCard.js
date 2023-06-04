"use client";

import { Card } from "react-bootstrap";

export default function CustomCard(props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="fs-6">{props.title}</Card.Title>
        <Card.Text className="text-end">{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

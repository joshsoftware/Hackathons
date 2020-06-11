import React from "react";
import { Row, Label, Col, Card, CardHeader, CardBody } from "reactstrap";

export const ViewStoreDetails = ({ store }) => {
  let categoriesName = store.categories.map((category) => category.code);
  return (
    <Card>
      <CardHeader className="bg-dark text-light font-weight-bolder">
        <h2> Store details </h2>
      </CardHeader>
      <CardBody>
        <div className="container-fluid">
          <Row>
            <Col md={6}>
              <Label>Store Code</Label>
            </Col>
            <Col>{store.code}</Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label>Name</Label>
            </Col>
            <Col>{store.name}</Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label>Address</Label>
            </Col>
            <Col>{store.address}</Col>
          </Row>
          {/* <Row><Col md={6}><Label>Categories</Label></Col><Col>{store.category_names}</Col></Row> */}
          <Row>
            <Col md={6}>
              <Label>Pincode</Label>
            </Col>
            <Col>{store.pincode}</Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label>Slot Duration</Label>
            </Col>
            <Col>{store.duration}</Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label>Opening time</Label>
            </Col>
            <Col>{store.opening_time}</Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label>Closing time</Label>
            </Col>
            <Col>{store.closing_time}</Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label>Categories</Label>
            </Col>
            <Col>{categoriesName}</Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

import React from "react";
import {
  Button,
  InputGroup,
  Form,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  CardText,
} from "reactstrap";
import logo from "assets/noQ-logo.png";
import choose_pincode from "assets/choose_pincode.png";
import choose_category from "assets/choose_category.png";
import choose_shop from "assets/choose_shop.png";
import choose_slot from "assets/choose_slot.png";
import init_message from "assets/init_message.png";
import Navbar from "react-bootstrap/Navbar";

const HomePage = () => {
  return (
    <>
      <div>
        <Navbar className="bg-dark text-light font-weight-bolder">
          <Navbar.Brand href="/">
            <img src={logo} style={{ height: "100px" }} />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Form inline>
            <InputGroup>
              <Col>
                <Button href="/signUp">Register to NoQ</Button>
                {" / "}
                <Button href="/login">Login</Button>
                <br />
              </Col>
            </InputGroup>
          </Form>
        </Navbar>
      </div>
      <div>
        <Container>
          <Card className="border-0">
            <CardTitle>
              <h4>What is NoQ?</h4>
            </CardTitle>
            <CardBody>
              <p>
                NoQ is a platform which makes day-to-day shopping easy while
                following social distancing. The user can book a slot for
                shopping in stores registered on NoQ platform. On successful
                booking, user will receive an e-Token which can be presented at
                store on visit.
                <br />
                The platform ensures the bookings do not exceed given capacity
                by store owner so users can enjoy their little trip to the store
                with safety.
              </p>
            </CardBody>
          </Card>
          <Card className="border-0">
            <CardTitle>
              <h4>How to get e-Token</h4>
            </CardTitle>
            <CardText>
              Follow the 5 easy steps given below to get the e-Token
            </CardText>
            <CardBody>
              <div className="container-fluid">
                <Row>
                  <Col md={3} xs={12} className="ml-5">
                    <h5 className="text-center">Step 1</h5>
                    <br />
                    <img src={init_message} className="step"/>
                    <br />
                    <br />
                    <p>
                      Save the contact <b>917834811114</b> on your phone and
                      send a WhatsApp to it as <b>PROXY ShopTok</b>
                      <br />
                      You will receive a welcome message from NoQ platform.
                      Initiate the conversation.
                    </p>
                    <br />
                  </Col>
                  <Col md={2} xs={12}>
                    <h5 className="text-center">Step 2</h5>
                    <br />
                    <img src={choose_pincode} className="step"/>
                    <br />
                    <br />
                    <p>
                      <b>Provide your area pincode </b> to receive the available
                      shops for slot booking, once you receive Welcome message
                      from platform.
                      <br />
                      Once pincode is sent, you will receive list of categories
                      and their codes
                    </p>
                    <br />
                  </Col>
                  <Col md={2} xs={12}>
                    <h5 className="text-center">Step 3</h5>
                    <br />
                    <img src={choose_category} className="step"/>
                    <br />
                    <br />
                    <p>
                      <b>Select your category and send the category code</b>
                      <br />
                      Based on selected pincode and category, you will receive
                      list of shops along with their codes available for slot
                      booking.
                    </p>
                    <br />
                    <br />
                  </Col>
                  <Col md={2} xs={12}>
                    <h5 className="text-center">Step 4</h5>
                    <br />
                    <img src={choose_shop} className="step"/>
                    <br />
                    <br />
                    <p>
                      <b>
                        To choose a shop, send first three characters of the
                        shop code.
                      </b>
                      <br />
                      You will now receive today's slots available with store
                      selected by you for booking
                    </p>
                    <br />
                  </Col>
                  <Col md={2} xs={12}>
                    <h5 className="text-center">Step 5</h5>
                    <br />
                    <img src={choose_slot} className="step"/>
                    <br />
                    <br />
                    <p>
                      <b>To select a slot from given list, send slot Id.</b>
                      <br />
                      Note: You are allowed to select only one slot at a time
                      <br />
                      On successful booking, you will receive your booking
                      details
                      <br />
                    </p>
                    <br />
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
          <div>
            Visit the store in your slot and present this e-Token. Enjoy hassle-free shopping, while maintaining social distancing.
          <br />
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePage;

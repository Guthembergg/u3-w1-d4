import { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

class SingleComment extends Component {
  state = {};

  render() {
    return (
      <>
        <Row>
          <Col> {this.props.comment} </Col> <Col> {this.props.rate} </Col>
        </Row>
      </>
    );
  }
}
export default SingleComment;

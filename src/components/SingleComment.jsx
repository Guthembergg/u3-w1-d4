import { Component } from "react";
import { Row, Col } from "react-bootstrap";

class SingleComment extends Component {
  state = {};

  render() {
    return (
      <>
        <Row>
          <Col
            className="text-center"
            style={{ color: "red", fontWeight: 600 }}
          >
            {this.props.comment}
          </Col>
          <Col
            className="text-center"
            style={{ color: "blue", fontWeight: 600 }}
          >
            {this.props.rate}
          </Col>
        </Row>
      </>
    );
  }
}
export default SingleComment;

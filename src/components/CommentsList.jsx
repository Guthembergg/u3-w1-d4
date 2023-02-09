import { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import SingleComment from "./SingleComment";

class CommentList extends Component {
  state = {};

  render() {
    return (
      <>
        {this.props.comments && (
          <Row>
            <Col>Comment</Col>
            <Col>Value</Col>
          </Row>
        )}
        {this.props.comments.map((el, i) => {
          return (
            <SingleComment
              comment={el.comment}
              rate={el.rate}
              key={`comment-${i}`}
            />
          );
        })}
      </>
    );
  }
}
export default CommentList;

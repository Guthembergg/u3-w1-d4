import { Component } from "react";
import { Card } from "react-bootstrap";
import CommentArea from "./CommentArea";

class SingleBook extends Component {
  state = {
    selected: false,
  };

  render() {
    return (
      <Card
        className="mb-3"
        style={{
          border: this.state.selected ? "2px solid green" : "1px solid grey",
        }}
      >
        <Card.Img
          variant="top"
          src={this.props.book.img}
          onClick={() => this.setState({ selected: !this.state.selected })}
        />
        <Card.Body>
          <Card.Title style={{ color: "black" }}>
            {this.props.book.title}
          </Card.Title>
          {this.state.selected && <CommentArea book={this.props.book} />}
        </Card.Body>
      </Card>
    );
  }
}

export default SingleBook;

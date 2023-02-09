import { Component } from "react";
import { Form, Button } from "react-bootstrap";

class AddComment extends Component {
  state = {
    MyComment: {
      comment: "",
      rate: "",
      elementId: this.props.asin,
    },
  };

  handleChange = (propertyName, propertyValue) => {
    const value =
      propertyName === "rate" ? parseInt(propertyValue) : propertyValue;

    this.setState({
      MyComment: {
        ...this.state.MyComment,
        [propertyName]: value,
      },
    });
  };

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/`,
        {
          method: "POST",
          body: JSON.stringify(this.state.MyComment),
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U0ZjM3ZmEyNDc4ZDAwMTNhMDU3ZmMiLCJpYXQiOjE2NzU5NDg5MjcsImV4cCI6MTY3NzE1ODUyN30.KLbQdFihLwwaAc5BHQ0L8HaPauH90qhugo64glVZLaw",
          },
        }
      );

      if (response.ok) {
        const parsedBody = await response.json();
        alert(
          "La tua richiesta è andata a buon fine, la risorsa è stata creata con id " +
            parsedBody._id
        );
      } else {
        alert("qualcosa è andato storto con la richiesta");
      }
    } catch (err) {
      alert("ERRORE FATALE", err);
    }

    console.log(e);
  };

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insert your comment"
              value={this.state.MyComment.comment}
              onChange={(e) => {
                console.log(e.target.value);

                this.handleChange("comment", e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              insert a comment for this book
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formComment">
            <Form.Label>Rate</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insert your rate"
              value={this.state.MyComment.rate}
              onChange={(e) => {
                console.log(e.target.value);

                this.handleChange("rate", e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              insert a rate for this book
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}
export default AddComment;

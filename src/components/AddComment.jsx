import { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

class AddComment extends Component {
  state = {
    MyComment: {
      comment: "",
      rate: "",
      elementId: this.props.asin,
    },
  };

  handleChange = (propertyName, propertyValue) => {
    // propertyName sarà una dei nomi degli input: "name", "phone", "numberOfPeople", ecc..
    // propertyValue sarà una tra e.target.value || e.target.checked

    // stiamo controllando se siamo nell'input "numberOfPeope" per decidere se fare il parseInt del numero o meno
    const value =
      propertyName === "rate" ? parseInt(propertyValue) : propertyValue;

    this.setState({
      MyComment: {
        ...this.state.MyComment,
        [propertyName]: value,
        // le parentesi quadre nel contesto di un'oggetto permettono la valutazione di un valore dinamico
        // [propertyName] acquisirà come valore una delle stringhe che abbiamo passato come primo parametro
      },
    });
  };

  handleSubmit = async (e) => {
    try {
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

                // this.setState({ reservation: { ...this.state.reservation, phone: e.target.value } });
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
              placeholder="Insert your comment"
              value={this.state.MyComment.rate}
              onChange={(e) => {
                console.log(e.target.value);

                // this.setState({ reservation: { ...this.state.reservation, phone: e.target.value } });
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

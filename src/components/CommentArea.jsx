import { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import AddComment from "./AddComment";
import CommentList from "./CommentsList";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    hasError: false,
    errorMessage: "",
  };

  fetchComment = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${this.props.book.asin}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U0ZjM3ZmEyNDc4ZDAwMTNhMDU3ZmMiLCJpYXQiOjE2NzU5NDg5MjcsImV4cCI6MTY3NzE1ODUyN30.KLbQdFihLwwaAc5BHQ0L8HaPauH90qhugo64glVZLaw",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        // salvare nello state il nostro array data
        console.log(data);
        this.setState({
          // reservations: [], // simuliamo un database vuoto
          comments: data,
          isLoading: false,
        });
        // ogni volta che cambia lo stato, render() viene invocato di nuovo
      } else {
        // alert('Errore nel caricamento dei contenuti.')
        this.setState({
          isLoading: false,
          hasError: true,
          errorMessage: `Errore nel caricamento dei contenuti. ERRORE: ${response.status}`,
        });
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        hasError: true,
        errorMessage: `FATAL ERROR: ${error.message}`,
      });
    }
  };

  componentDidMount = () => {
    // componentDidMount() avviene dopo la prima invocazione di render(), e avviene UNA VOLTA SOLA poco prima della fine del montaggio del componente
    console.log("SONO COMPONENT DID MOUNT!");
    this.fetchComment();

    // il fatto che componentDidMount() venga eseguito una volta sola e una soltanto
    // unito al fatto che viene eseguito in maniera NON-BLOCCANTE (dopo il render iniziale)
    // lo rende PERFETTO per eseguire operazioni asincrone con fetch()
  };

  render() {
    return (
      <>
        {this.state.comments && <CommentList comments={this.state.comments} />}
        <AddComment asin={this.props.book.asin} />
      </>
    );
  }
}

export default CommentArea;

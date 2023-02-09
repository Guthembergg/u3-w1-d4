import { Component } from "react";
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
        console.log(data);
        this.setState({
          comments: data,
          isLoading: false,
        });
      } else {
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
    console.log("SONO COMPONENT DID MOUNT!");
    this.fetchComment();
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

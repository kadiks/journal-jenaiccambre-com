import React from "react";
import styled from "styled-components";

import { Styles, Api } from "../../utils";

const labelStyles = {
  ...Styles.text.body,
  display: "block",
  marginBottom: 5
};

const inputStyles = {
  ...Styles.text.body,
  borderColor: Styles.colors.secondary
};

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      message: "",
      error: "",
      isSubmitting: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  async onSubmit() {
    const { name, email, message } = this.state;
    this.setState({
      isSubmitting: true
    });
    const comment = await Api.postComment({
      name,
      email,
      message,
      postId: this.props.postId
    });
    console.log("cmp/comment/Form#onSubmit comment", comment);
    if (typeof comment.id !== "undefined") {
      this.setState({
        name: "",
        email: "",
        message: "",
        error: "",
        isSubmitting: false
      });
      this.props.onSubmit({
        comment
      });
    } else {
      this.setState({
        error: comment.message,
        isSubmitting: false
      });
    }
  }
  onInputChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  renderError() {
    if (this.state.error === "") {
      return null;
    }
    return (
      <div className="row">
        <div
          className="col"
          style={{
            fontSize: "1.1em",
            color: Styles.colors.main,
            fontWeight: "bold"
          }}
        >
          An error occured: {this.state.error}
        </div>
      </div>
    );
  }

  renderSubmitting() {
    if (this.state.isSubmitting === false) {
      return null;
    }
    return (
      <div className="row">
        <div
          className="col"
          style={{
            fontSize: "1.1em",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          Processing your request...
        </div>
      </div>
    );
  }

  render() {
    const { isSubmitting } = this.state;
    let containerStyle = {};
    if (isSubmitting === true) {
      containerStyle = { opacity: 0.1 };
    }
    return (
      <div className="row comment-form">
        <div className="col">
          {this.renderSubmitting()}
          {this.renderError()}
          <div className="row" style={containerStyle}>
            <div className="col">
              <label style={labelStyles}>Name</label>
              <input
                style={inputStyles}
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={e => this.onInputChange("name", e.target.value)}
              />
            </div>
          </div>
          <div className="row" style={containerStyle}>
            <div className="col">
              <label style={labelStyles}>Email</label>
              <input
                style={inputStyles}
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.onInputChange("email", e.target.value)}
              />
            </div>
          </div>
          <div className="row" style={containerStyle}>
            <div className="col">
              <label style={labelStyles}>Message</label>
              <textarea
                style={{ ...inputStyles, height: 100 }}
                name="message"
                placeholder="Your message..."
                value={this.state.message}
                onChange={e => this.onInputChange("message", e.target.value)}
              />
            </div>
          </div>
          <div className="row" style={containerStyle}>
            <div className="col">
              <button
                style={{
                  ...Styles.text.body,
                  padding: 5,
                  fontSize: "1em",
                  backgroundColor: Styles.colors.main,
                  color: Styles.colors.tertiary,
                  borderRadius: 0,
                  borderWidth: 0,
                  marginBottom: 15
                }}
                onClick={this.onSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;

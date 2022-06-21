import React, { Component } from "react";
import axios from "axios";

class User extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      const user = (await axios.get(`/api/users/${this.props.selectedUserId}`))
        .data;
      this.setState({ user });
    }
  }

  async componentDidMount() {
    const user = (await axios.get(`/api/users/${this.props.selectedUserId}`))
      .data;
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return <div>{user.bio}</div>;
  }
}

export default User;

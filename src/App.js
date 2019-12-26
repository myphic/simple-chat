import React, { Component } from "react";
import io from "socket.io-client";
import './App.css'

const socket = io.connect("http://localhost:5000");

class App extends Component {
  constructor() {
    super();
    this.state = {
      msg: "",
      chat: [],
      nickname: "",
    };
  }

  componentDidMount() {
    socket.on("chat message", ({ nickname, msg }) => {
      this.setState({
        chat: [...this.state.chat, { nickname, msg }]
      });
    });
  }

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onMessageSubmit = () => {
    const { nickname, msg } = this.state;
    socket.emit("chat message", { nickname, msg });
    this.setState({ msg: "" });
  };

  renderChat() {
    const { chat } = this.state;
    return chat.map(({ nickname, msg }, idm) => (
      <div className="msg" key={idm}>
        <div className="userName" >{nickname}: </div>
        <span className="userMsg">{msg}</span>
      </div>
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="con">
          <div className="wrapper">
              <div className="group">
                <input
                required
                  name="nickname"
                  type="text"
                  onChange={e => this.onTextChange(e)}
                  value={this.state.nickname}
                  maxLength="15"
                />
                <span className="bar"></span>
                <label>Nickname</label>
              </div>
              <div className="group">
                <input
                  required
                  name="msg"
                  type="text"
                  onChange={e => this.onTextChange(e)}
                  value={this.state.msg}
                  maxLength="140"
                />
                <span className="bar"></span>
                <label>Message</label>
              </div>
              <button onClick={this.onMessageSubmit} className="wColor button" disabled={!this.state.nickname || !this.state.msg}>Send</button>
            </div>  
            <div className="msgList">{this.renderChat()}</div>
          </div>
      </div>
    );
  }
}

export default App;
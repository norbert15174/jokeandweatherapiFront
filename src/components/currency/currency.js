import React from "react";
import styled from "styled-components";

const CurrencyWrapper = styled.div`
  width: 80%;
  position: relative;
  left: 10%;
  top: 10%;
`;

const RandomButton = styled.button`
  padding: 10px 10px 10px 10px;
  width: 100px;
  color: #44a08d;
  background-color: white;
  outline: none;
  border: 1px solid #44a08d;
  position: fixed;
  top: 80%;
  left: 45%;
`;

const Bg = styled.div`
  animation: slide 3s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, #44a08d 50%, #093637 50%);
  bottom: 0;
  left: -20%;
  opacity: 0.5;
  position: fixed;
  right: -50%;
  top: 0;
  z-index: -1;
  width: 140%;
  height: 100%;

  &:nth-child(2) {
    animation-direction: alternate-reverse;
    animation-duration: 4s;
  }

  &:nth-child(3) {
    animation-duration: 5s;
  }

  @keyframes slide {
    0% {
      transform: translateX(-25%);
    }
    100% {
      transform: translateX(25%);
    }
  }
`;

const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.25em;
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  left: 50%;
  width: 50%;
  height: 50%;
  padding: 50px 50px 50px 50px;
  position: fixed;
  text-align: center;
  top: 50%;
  transform: translate(-20%, -50%);
`;

const InputValue = styled.input`
  width: 200px;
  padding: 10px 10px 10px 10px;
  color: #44a08d;
`;

const Check = styled.h3`
  color: ${(props) => (props.less === "yes" ? "red" : "yellow")};
`;

class Currency extends React.Component {
  state = {
    data: [],
    roll: "",
    value: "",
  };

  async componentDidMount() {
    await fetch("http://localhost:8080/exchange")
      .then((response) => response.json())
      .then((data) => this.setState({ data }));
  }

  async HandleRoll() {
    await fetch("http://localhost:8080/exchange/random")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          roll: data.value,
          value: "",
        })
      );
  }

  CheckTheValue = (e) => {
    if (this.state.roll) {
      var x = this.state.data.rates[this.state.roll];
      if (x.toFixed(2) > e.target.value) {
        this.setState({
          value: "yes",
        });
        console.log(this.state.value);
      } else if (x.toFixed(2) < e.target.value) {
        this.setState({
          value: "no",
        });
      } else if (x.toFixed(2) === e.target.value) {
        this.setState({
          value: "",
          roll: "",
        });
        window.alert("Udało ci się, zagraj ponownie");
      }
    }
  };

  render() {
    return (
      <CurrencyWrapper>
        <Bg></Bg>
        <Bg></Bg>
        <Bg></Bg>
        <Content>
          <h1>Draw the Currency</h1>
          {this.state.roll ? <h3>Podaj cene 1 {this.state.roll}</h3> : null}
          {this.state.value ? (
            <Check less={this.state.value}>
              {this.state.value === "yes" ? "LESS!!!!!" : "MORE!!!!"}
            </Check>
          ) : null}
          {this.state.roll ? <label>{this.state.roll} : </label> : null}

          <InputValue
            type="text"
            placeholder="Value"
            onChange={(e) => this.CheckTheValue(e)}
          ></InputValue>
          <RandomButton onClick={(e) => this.HandleRoll()}>Draw</RandomButton>
        </Content>
      </CurrencyWrapper>
    );
  }
}

export default Currency;

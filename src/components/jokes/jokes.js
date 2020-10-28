import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const JokesWrapper = styled.div`
  width: 90%;
  height: 100%;
  position: relative;
  left: 5%;
`;

const SearchForm = styled.form`
  width: 100%;
  height: 100px;
  position: relative;
  top: 50px;
  margin-bottom: 50px;
`;

const InputSearch = styled.input`
  padding: 10px 10px 10px 10px;
  width: 10%;
  position: relative;
  left: 20%;
  margin-left: 10px;
  top: 20%;
  outline: none;
  border: none;
  color: red;

  border-bottom: 2px solid black;
  transition: all 1s;
  &:focus {
    border-bottom: 2px solid red;
  }
`;

const ButtonSearch = styled.button`
  border-radius: 5px;
  border: none;
  background-color: #520202;
  color: white;
  left: 20%;
  top: 20%;
  outline: none;
  position: relative;
  font-weight: 700;
  margin-left: 5px;
  font-size: 16px;
  padding: 10px 10px 10px 10px;
`;

const SpanSearch = styled.span`
  font-size: 16px;
  margin-right: 10px;
`;

const JokesArticle = styled.article`
  width: 80%;
  position: relative;
  padding: 20px 20px 20px 20px;
  border-bottom: solid 2px #520202;
`;

class Jokes extends React.Component {
  state = {
    data: [],
    search: '',
    amount: ''
  };

  async componentDidMount() {
    await fetch("http://localhost:8080/jokes?amount=5")
      .then((response) => response.json())
      .then((data) => this.setState({ data }));
  }
  
  handleGetInfo = (e) =>{
    this.setState({
        [e.target.name]: e.target.value,
    })   
  }

  async LoadDataFromUser(){
    await fetch("http://localhost:8080/jokes?amount="+ this.state.amount + "&contains" + this.state.search)
    .then((response) => response.json())
    .then((data) => this.setState({ data }));
  }

  LoadNewData = (e) =>{
      e.preventDefault();
      this.LoadDataFromUser();
      
  }
  render() {
    return (
      <JokesWrapper>
        <SearchForm>
          <InputSearch name="search" type="text" placeholder="search" required onChange={e => this.handleGetInfo(e)}></InputSearch>
          <InputSearch name="amount" type="number" placeholder="amount" required onChange={e => this.handleGetInfo(e)}></InputSearch>

          <ButtonSearch type="submit" onClick={e => this.LoadNewData(e)}>
            <SpanSearch>Search</SpanSearch>
            <FaSearch />
          </ButtonSearch>
          </SearchForm>
          {this.state.data.amount ? (
            <>
              {this.state.data.jokes.map((dane) => (
                <JokesArticle>
                  <h3>Category: {dane.category}</h3>
                  {dane.joke ? (
                    dane.joke
                  ) : (
                    <p>
                      Q: {dane.setup} <br /> A: {dane.delivery}
                    </p>
                  )}
                </JokesArticle>
              ))}
            </>
          ) : (
            <JokesArticle>
              <h3>Category: {this.state.data.category}</h3>
              {this.state.data.joke ? (
                this.state.data.joke
              ) : (
                <p>
                  Q: {this.state.data.setup} <br /> A: {this.state.data.delivery}
                </p>
              )}
            </JokesArticle>
          )}
        
      </JokesWrapper>
    );
  }
}

export default Jokes;

import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const WeatherWrapper = styled.div`
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
  left: 10%;
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
  color: #00cc99;

  border-bottom: 2px solid black;
  transition: all 1s;
  &:focus {
    border-bottom: 2px solid #00cc99;
  }
`;

const ButtonSearch = styled.button`
  border-radius: 5px;
  border: none;
  background-color: #00cc99;
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

const SelectOption = styled.select`
  padding: 10px 10px 9.2px 10px;
  width: 10%;
  position: relative;
  left: 20%;
  margin-left: 10px;
  top: 20%;
  outline: none;
  border: none;
  color: #00cc99;
  margin-right: 30px;
  border-bottom: 2px solid black;
  transition: all 1s;
  &:focus {
    border-bottom: 2px solid #00cc99;
  }
`;

const DisplayData = styled.div`
  width: 60%;
  position: relative;
  left: 20%;
  height: 60%;
`;

const IconImage = styled.img`
  width: 220;
  height: 300;
  position: relative;
  left: 40%;
`;

const WeatherList = styled.ul`
  width: 80%;
  top: -10%;
  position: relative;
  display: grid;
  grid-template-columns: 100%;
`;

const WeatherElement = styled.li`
  width: 100%;
  position: relative;
  list-style: none;
  border-bottom: 2px solid #00cc99;
  padding: 10px 10px 10px 10px;
  top: -3vh;
  color: #808080;
  &:nth-child(1) {
    top: -3vh;
    text-align: center;
    color: #00cc99;
  }
  &:nth-child(2) {
    padding: 10px 10px 10px 10px;
  }
`;

const Temp = styled.h1`

  color: black;
  margin: 0;
  position: relative;
  top: -20px;

`;

const WeatherHeader = styled.h3`

    width: 40%;
    position: relative;
    left: 42%;
    top: -7%;
    
`;

const BoldType = styled.span`

  font-weight: 700;

`;

class Weather extends React.Component {
  state = {
    data: [],
    ready: "",
    city: "",
    lang: "pl"
  };

  async componentDidMount() {
    await fetch("http://localhost:8080/Weather")
      .then((response) => response.json())
      .then((data) => this.setState({ data, ready: "yes" }));
  }

  handleGetInfo = (e) =>{
      this.setState({
          [e.target.name]: e.target.value,
      })
  }

  LoadNewData = (e) => {
      e.preventDefault();
      this.setState({
        ready: '',
    })
      this.LoadWeather();
  }

  async LoadWeather(){
    await fetch("http://localhost:8080/Weather?q=" + this.state.city + "&lang=" + this.state.lang )
    .then((response) => response.json())
    .then((data) => this.setState({ data, ready: "yes" }));
  }

  render() {
    return (
      <WeatherWrapper>
        <SearchForm>
          <InputSearch
            name="city"
            type="text"
            placeholder="city"
            required
            onChange={(e) => this.handleGetInfo(e)}
          ></InputSearch>
          <SelectOption
            name="lang"
            type="number"
            required
            onChange={(e) => this.handleGetInfo(e)}
          >
            <option value="pl">Language</option>
            <option value="pl">Polish</option>
            <option value="de">German</option>
            <option value="en">English</option>
            <option value="fr">French</option>
          </SelectOption>

          <ButtonSearch type="submit" onClick={(e) => this.LoadNewData(e)}>
            <SpanSearch>Search</SpanSearch>
            <FaSearch />
          </ButtonSearch>
        </SearchForm>
        {this.state.ready === "yes" ? (
          <DisplayData>
            <IconImage src={this.state.data.weather["0"].icon} alt="weather" />
            <WeatherHeader>{this.state.data.weather[0].main}</WeatherHeader>
            <WeatherList>
              <WeatherElement>
                <h2>{this.state.data.name}</h2>
                <Temp>{parseInt(this.state.data.main.temp)} °C</Temp>
              </WeatherElement>
              <WeatherElement>
                  
                  <BoldType># pogoda:</BoldType> {this.state.data.weather[0].description}
              </WeatherElement>
              <WeatherElement>

              <BoldType># temp-min:</BoldType> {this.state.data.main.temp_min}

              </WeatherElement>
              <WeatherElement>
              <BoldType># temp-max:</BoldType> {this.state.data.main.temp_max}
              </WeatherElement>
              <WeatherElement>
              <BoldType># szybkość wiatru:</BoldType> {this.state.data.wind.speed}m/s
              </WeatherElement>
              <WeatherElement><BoldType># temp. odczuwalna:</BoldType> {this.state.data.main.feels_like} °C</WeatherElement>
            </WeatherList>
          </DisplayData>
        ) : null}
      </WeatherWrapper>
    );
  }
}

export default Weather;

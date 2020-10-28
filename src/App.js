import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import Menu from './components/menu/menu';
import Jokes from './components/jokes/jokes';
import styled from 'styled-components';
import Weather from './components/weather/weather';
import Currency from './components/currency/currency'
const Container = styled.div`

    width: 100vw;
    min-height: 100vh;
    margin: 0;
    display: grid;
    grid-template-columns: 20% 80%;

`;


function App() {
  return (
    <BrowserRouter>
      <Container>
      <Menu/>
      <Route path="/jokes">
         <Jokes/>
      </Route>
      <Route path="/weather">
        <Weather/>
      </Route>
      <Route path="/asd">
        <Currency/>
      </Route>

      </Container>
    </BrowserRouter>
    
  );
}

export default App;

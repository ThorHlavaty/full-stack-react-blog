import './App.css';
import Posts from './components/Posts';
import { Container, Segment, Header } from 'semantic-ui-react'
import { Route, Switch, Link } from 'react-router-dom';
import PostDetail from './components/PostDetail';
import React, {useState} from 'react'


function App(props) {
  const [loggedIn, setLoggedIn] = useState([false])

  return (
    <Container>
      {loggedIn ? (
            <button onClick={() => {setLoggedIn(false)}}>
              Log Out
            </button>) : 
            (<button onClick={() => {setLoggedIn(true);}}>
              Log In </button>)
}
      <Segment vertical>
        <Switch>
          <Route path="/" exact > <Posts loggedIn={loggedIn}/> </Route>
          <Route path="/post/:postId" ><PostDetail loggedIn={loggedIn}/> </Route>
          <Route>
            <Header>404 - Page not found</Header>
            <Link to="/">Let's go home, okay?</Link>
          </Route>
        </Switch>
      </Segment>
    </Container>
  );
}

export default App;

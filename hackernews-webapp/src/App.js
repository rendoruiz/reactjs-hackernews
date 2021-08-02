import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StoryCatalog from './containers/StoryCatalog';
import StoryDetail from './containers/StoryDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path="/">
              <StoryCatalog />
            </Route>
            <Route path="/s/:id">
              <StoryDetail />
            </Route>
            <Route path="*">
              <StoryCatalog />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

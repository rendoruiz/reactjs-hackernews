import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StoryCatalogView from './containers/StoryCatalogView';
import StoryDetailView from './containers/StoryDetailView';
import UserDetailView from './containers/UserDetailView';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path="/">
              <StoryCatalogView />
            </Route>
            <Route path="/s/:id">
              <StoryDetailView />
            </Route>
            <Route path="/u/:id">
              <UserDetailView />
            </Route>
            <Route path="*">
              <StoryCatalogView />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

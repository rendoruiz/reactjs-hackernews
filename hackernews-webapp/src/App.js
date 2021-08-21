import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import StoryCatalogView from './views/StoryCatalogView';
import StoryDetailView from './views/StoryDetailView';
import UserDetailView from './views/UserDetailView';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <SiteHeader />
          <Switch>
            <Route exact path="/:order?">
              <StoryCatalogView />
            </Route>
            <Route path="/s/:id">
              <StoryDetailView />
            </Route>
            <Route path="/u/:userId/:contentType?">
              <UserDetailView />
            </Route>
            <Route path="*">
              {/* <StoryCatalogView /> */}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

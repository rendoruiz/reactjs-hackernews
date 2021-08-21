import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import NotFound from './views/NotFound';
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
            <Route exact path={["/", "/top", "/best", "/new"]}>
              <StoryCatalogView />
            </Route>
            <Route exact path={["/u/:userId/", "/u/:userId/story", "/u/:userId/comment"]}>
              <UserDetailView />
            </Route>
            <Route path="/s/:id">
              <StoryDetailView />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

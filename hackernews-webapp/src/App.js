import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import NotFoundView from './views/NotFoundView';
import CatalogView from './views/CatalogView';
import StoryView from './views/StoryView';
import UserView from './views/UserView';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <SiteHeader />
          <Switch>
            <Route exact path={["/", "/top", "/best", "/new"]}>
              <CatalogView />
            </Route>
            <Route exact path={["/u/:userId/", "/u/:userId/story", "/u/:userId/comment"]}>
              <UserView />
            </Route>
            <Route path="/s/:id">
              <StoryView />
            </Route>
            <Route path="*">
              <NotFoundView />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

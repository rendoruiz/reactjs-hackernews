import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import NotFoundView from './views/NotFoundView';
import CatalogView from './views/CatalogView';
import StoryView from './views/StoryView';
import UserView from './views/UserView';

function App() {
  return (
    <Router>
      <SiteHeader />
      <div className="content">
        <Switch>
        <Redirect from='/top' to='/' />
          <Route exact path={["/", "/best", "/new"]}>
            <CatalogView />
          </Route>
          <Route exact path={["/u/:userId/", "/u/:userId/story", "/u/:userId/comment"]}>
            <UserView />
          </Route>
          <Route path="/s/:id">
            <StoryView />
          </Route>
          <Route path={["*", "/404"]}>
            <NotFoundView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

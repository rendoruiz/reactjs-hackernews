import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import NotFoundView from './views/NotFoundView';
import CatalogView from './views/CatalogView';
import StoryView from './views/StoryView';
import UserView from './views/UserView';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';

import styles from './styles/App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Router>
        <SiteHeader />
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
        <SiteFooter />
      </Router>
    </div>
  );
}

export default App;

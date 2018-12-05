import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import About from './About';
import Artifact from './Artifact';
import Contact from './Contact';
import ArtifactsPage from './ArtifactsPage';
import ArtifactsTablePage from './ArtifactsTablePage';
import Home from './Home';
import NotFound from './NotFound';
import Search from './Search';
import Donate from './Donate';

/**
 * This component wraps an Artifact component, extracting the artifact ID from the routing
 * information provided.
 * @param {object} props
 */
function ArtifactWrapper(props) {
  return <Artifact artifactId={props.match.params.artifactId} />;
}

/**
 * A dummy artifacts router.
 */
function Artifacts(_) {
  return (
    <Switch>
      <Route exact path="/artifacts" component={ArtifactsPage} />
      <Route path="/artifacts/:artifactId" component={ArtifactWrapper} />
    </Switch>
  );
}

function HomeRedirect(_) {
  return <Redirect to="/home" />;
}

function DonateHandler(_) {
  return (
    <Switch>
      <Route exact path="/donate" component={Donate} />
      <Route path="/donate/:id" component={Donate} />
    </Switch>
  );
}

/**
 * This component handles routing to specific pages.
 */
function App(_) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeRedirect} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/map" component={ArtifactsPage} />
        <Route exact path="/artifacts" component={ArtifactsTablePage} />
        <Route path="/donate" component={DonateHandler} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

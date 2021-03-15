import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import './App.css';
import MenuBar from './components/MenuBar';
import { AuthProvider } from './context/auth';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import UserPosts from './pages/UserPosts';
import AuthRoute from './util/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Container  style={{ marginTop: '7em' }}>
          <Route exact path='/' component={Home}/>
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path="/postform" component={CreatePost} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <Route exact path="/userposts" component={UserPosts} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;

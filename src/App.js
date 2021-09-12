import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

//import { setCurrentUser } from './redux/user/user.actions';
//import { selectCurrentUser } from './redux/user/user.selectors';

import CurrentUserContext from './contexts/current-user/current-user.context';

//to pass the updated value to context, we user Context Provider like we had dispatch in Redux
//We want to set the current user value
//In Redux, we wer using setCurrentUser to pass the user value to redux and update
//here, we will pass the value in 'value' prop to update the context
//to pass the value, we will save it in local state and pass state value
//Another main thing while doing this is where to wrap Context Provider. 
//Only those components will be able to leverage the updated value of context which is wrapped in Provider
//Or if it is wrapped in parent. If it does not find then it gets the default value only using consumer
//For example,here we are wrapping in Header to get the upadted value in Header Component
//If we had to use the same in let's say homepage, shop page 
//then consumer will not get the context updated value in home or shop page and will get which is being set as default value  

class App extends React.Component {
  constructor(){
    super();
    this.state = {currentUser:null}
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
    //const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({currentUser:{
            id: snapShot.id,
            ...snapShot.data()
          }});
        });
      }

      this.setState({currentUser:userAuth});
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Header />
        </CurrentUserContext.Provider>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser
// });

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);

export default App;

//leveraging Context API to handle state management and asynchronous call so excluded all redux thunk and saga code
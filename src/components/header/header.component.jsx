import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
//import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import CurrentUserContext from '../../contexts/current-user/current-user.context';
//import CartContext from '../../contexts/cart/cart.context';
import { CartContext } from '../../providers/cart/cart.provider';

import './header.styles.scss';

//const Header = ({ currentUser, hidden }) => {
//const Header = ({ hidden }) => {
const Header = () => {
  const currentUser = useContext(CurrentUserContext);
  //since now we defined state in provider, we dont need to set it here, WE can consume the same from context
  // const [hidden, setHidden] = useState(true);
  // const toggleHidden = () => setHidden(!hidden);

  const {hidden} = useContext(CartContext)
  return(
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
    {/* In this we have created local state and function to update the state and passing that values to context 
    so hidden value of context will take the hidden value of local state and toggleHidden of context will get the toggleHidden 
    of local state */}
    {/* <CartContext.Provider value={{hidden,toggleHidden}}> */}
    {/* since now all child have access to CartContext after creating provider and wrapping entire application in CartProvider, 
    we dont need to give it here now to access the same in CartIcon and we can access it directly */}
      <CartIcon />
    {/* </CartContext.Provider> */}
    </div>
    {/* hidden is still getting from the local state because it is in the same component where we are defining the state */}
    {hidden ? null : <CartDropdown />}
  </div>
)};

const mapStateToProps = createStructuredSelector({
  //currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);

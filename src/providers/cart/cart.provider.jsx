import React, {useState, useEffect, createContext} from 'react';

import { addItemToCart,removeItemFromCart, filterItemFromCart, getCartItemsCount } from './cart.utils';

export const CartContext = createContext({
    hidden:true,
    toggleHidden: () => {},
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    clearItemFromCart: () => {},
    cartItemsCount: 0
})

const CartProvider = ({children}) => {
    const [hidden, setHidden] = useState(true);
    const toggleHidden = () => setHidden(!hidden);

    const [cartItems, setCartItems] = useState([]);
    const addItem = (item) =>setCartItems(addItemToCart(cartItems,item));
    const removeItem = (item) =>setCartItems(removeItemFromCart(cartItems,item));
    const clearItemFromCart = (item) =>setCartItems(filterItemFromCart(cartItems,item)); 

    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(()=>{
        setCartItemsCount(getCartItemsCount(cartItems))
    },[cartItems])


    return(
        <CartContext.Provider value={{
            hidden,
            toggleHidden,
            cartItems,
            addItem,
            removeItem,
            clearItemFromCart,
            cartItemsCount
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;



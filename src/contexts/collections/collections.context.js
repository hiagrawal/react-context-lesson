
import { createContext } from "react";

import SHOP_DATA from "./shop.data";

const CollectionsContext = createContext(SHOP_DATA);
//This is setting the data of SHOP_DATA to CollectionsContext like we used to set as initial state in reducer with redux
//to get this data in component, we use context consumer

export default CollectionsContext;
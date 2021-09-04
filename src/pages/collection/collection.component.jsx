import React,{useContext} from 'react';
//import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

//import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionsContext from '../../contexts/collections/collections.context';

import './collection.styles.scss';

//one way to get the data from CollectionContext is wrap the component inside this CollectionsContext using consumer which
//gives us a function with the data from the context

//older code when were using redux to get the data
// const CollectionPage = ({ collection }) => {
//   const { title, items } = collection;
//   return (
//     <div className='collection-page'>
//       <h2 className='title'>{title}</h2>
//       <div className='items'>
//         {items.map(item => (
//           <CollectionItem key={item.id} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// };

//Wrapping inside CollectionsContext.Consumer as a component to access the data that this context is returning
// const CollectionPage = ({ match }) => {
//   return(
//     <CollectionsContext.Consumer>
//       {collections => {
//         const collection = collections[match.params.collectionId];
//         const { title, items } = collection;
//         return (
//           <div className='collection-page'>
//             <h2 className='title'>{title}</h2>
//             <div className='items'>
//               {items.map(item => (
//                 <CollectionItem key={item.id} item={item} />
//               ))}
//             </div>
//           </div>
//         );
//       }}
//     </CollectionsContext.Consumer>
//   )  
// };

//Another way is simply using the useContext hook to get the value from context
const CollectionPage = ({ match }) => {
    const collections = useContext(CollectionsContext);
    const collection = collections[match.params.collectionId];
    const { title, items } = collection;
    return (
      <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
          {items.map(item => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  };


// const mapStateToProps = (state, ownProps) => ({
//   collection: selectCollection(ownProps.match.params.collectionId)(state)
// });

//export default connect(mapStateToProps)(CollectionPage);
export default CollectionPage;

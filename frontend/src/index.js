import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import store from '../src/store'
import PrivateRoute from './components/privateRoute';
import AdminRoute from './components/AdminRoute'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import {HelmetProvider} from 'react-helmet-async'
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import Homescreen from './screens/Homescreen'
import Productscreen from './screens/Productscreen';
import Cartscreen from './screens/Cartscreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Shippingscreen from './screens/Shippingscreen';
import Paymentsceen from './screens/Paymentsceen';
import Placeorderscreen from './screens/Placeorderscreen';
import Orderscreen from './screens/Orderscreen';
import Profilescreen from './screens/Profilescreen';
import OrderListscreen from './screens/OrderlListscreen';
import ProductListscreen from './screens/admin/ProductListscreen';
import ProductEditscreen from './screens/admin/ProductEditscreen';
import UserListscreen from './screens/admin/UserListscreen';
import UserEditscreen from './screens/admin/UserEditscreen';



// const router = (
//     <Router>
//       <Routes>
//         <Route path="/" element={<App />}>
//           <Route index={true} path="/" element={<Homescreen />} />
//           <Route path="/product/:id" element={<Productscreen />} />
          
          
          
//         </Route>
//       </Routes>
//     </Router>
//   );
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Homescreen/>} />
      <Route path='/search/:keyword' element={<Homescreen />} />
      <Route path='/page/:pageNumber' element={<Homescreen />} />
      <Route path='/search/:keyword/page/:pageNumber' element={<Homescreen />} />
      <Route path='/product/:id' element={<Productscreen/>} />
      <Route path='/cart' element={<Cartscreen/>}/>
      <Route path='/login' element={<Loginscreen />} />
      <Route path='/register' element={<Registerscreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<Shippingscreen />} />
        <Route path='/payment' element={<Paymentsceen/>}/>
        <Route path='/placeorder' element={<Placeorderscreen/>}/>
        <Route path='/order/:id' element={<Orderscreen />} />
        <Route path='/profile' element={<Profilescreen/>}/>
      </Route>
      {/* Admin users */}
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListscreen />} />
        <Route path='/admin/productlist' element={<ProductListscreen />} />
        <Route path='/admin/userlist' element={<UserListscreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditscreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditscreen />} />
        <Route
          path='/admin/productlist/:pageNumber'
          element={<ProductListscreen />}
        />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
   <HelmetProvider>
  <Provider store={store}>
  <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} /> 
      </PayPalScriptProvider>
  </Provider>
  </HelmetProvider>
</React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productApiSlice.js";
import Product from "../components/products";
import loader from "../components/loader.jsx";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate.jsx";
import { Link } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel.jsx";
import Meta from "../components/Meta.jsx";

// import axios from 'axios'
const Homescreen = () => {
//   const [products,setProducts]=useState([]);
//   useEffect(()=>{
//     const fetchProducts=async ()=>{
//       const {data}=await axios.get('/api/products');  // we get array of object of products
//       setProducts(data);
//     };
//     fetchProducts();
//   },[])

const {pageNumber,keyword}=useParams()
console.log(pageNumber);

const { data, isLoading, error } = useGetProductsQuery({keyword,pageNumber});

return (
  <>
  {!keyword ? <ProductCarousel/> : (
    <Link to='/' className="btn-btn light mb-4" >Go back</Link>
  )}
  {isLoading ? (
        <loader/>
      ) : error ? (
        <message variant='danger'>
          {error?.data?.message || error.error}
        </message>
      ) : (
        <>
        <Meta/>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword :  " "}  />
        </>
      )}
    </>
  );
            }


export default Homescreen;

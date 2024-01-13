import { useParams,useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react'
// import axios from 'axios'
import { useGetProductDetailsQuery,useCreateReviewMutation } from "../slices/productApiSlice.js";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form,Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import Loader from "../components/loader.jsx";
import Rating from "../components/rating";
import { addToCart  } from "../slices/cartSlice.js";
import { toast } from 'react-toastify';
import Message from "../components/message.jsx";
import Meta from "../components/Meta.jsx";

const Productscreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [qty,setQty]=useState(1)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  // const [product,setProduct]=useState([])
  // const { id: productId } = useParams();
  // useEffect(()=>{
  //   const fetchProducts=async ()=>{
  //     const {data}=await axios.get(`/api/products/${productId}`);  // we get object of products
  //     setProduct(data);
  //   };
  //   fetchProducts();
  // },[productId])

  // const product = product.find((p) => p._id === productId);

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  

  // console.log([...Array(product.countInStock).keys()]);
const addToCartHandler=()=>{
   dispatch(addToCart({...product,qty}))
   navigate('/cart')
}

const submitHandler=async(e)=>{
  e.preventDefault()
  try{
    await createReview({
      productId,
      rating,
      comment,
    }).unwrap();
    refetch();
    toast.success('Review created successfully');

  }catch(err){
    toast.error(err?.data?.message || err.error);
  }

}
  
  return (
    <>
    <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {isLoading ? (
        <loader/>
      ) : error ? (
        <message variant='danger'>
          {error?.data?.message || error.error}
        </message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product && product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                       <Col>qty</Col>
                       <Col>
                       </Col>
                       <Form.Control
                       as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x+1} value={x+1}> {x+1} </option>  //display setqty 
                        ))}
                       </Form.Control>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product && product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row className="review">
            <Col md={6}>
              <h2>reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
              {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                <h2>Write a Customer Review</h2>

                {loadingProductReview && <Loader />}

                 {userInfo ? (
                     <Form onSubmit={submitHandler}>
                       <Form.Group className='my-2' controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='my-2' controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>

                     </Form>
                 ) : (
                  <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                 )}
                </ListGroup.Item>
                
              </ListGroup>
            </Col>

          </Row>
        </>
      )}
    </>
  );
};
export default Productscreen;

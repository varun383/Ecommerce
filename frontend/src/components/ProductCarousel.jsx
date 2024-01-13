import { Link } from "react-router-dom"
import { Carousel,Image } from "react-bootstrap"
import Loader from "./loader"
import Message from "./message"
import { useGetTopProductsQuery } from "../slices/productApiSlice"

const ProductCarousel = () => {
    const {data:products,isLoading,error}=useGetTopProductsQuery();
    console.log('data',products);
  return (
   isLoading ? <Loader/> : error ? <Message variant='danger'>{error.message}</Message>
   :(
    <Carousel pause='hover' className="bg-primary mb-4">
        {products && products.map(product => (
            <Carousel.Item key={product._id}>
                <Link to={`product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid/>
                    <Carousel.Caption className="carousel-caption">
                        <h2>{product.name} (${product.price})</h2>

                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}


    </Carousel>
   )
    
  )
}

export default ProductCarousel
import { Navbar, Nav, Container, Badge,NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png'
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';
import SearchBox from './SearchBox';


const Header = () => {
   
  const { cartItems }=useSelector((state) => state.cart) // we get the cart items 
  const {userInfo}=useSelector((state) => state.auth)
  console.log(cartItems);

  
  const [logoutApiCall]=useLogoutMutation()
  const dispatch=useDispatch();
  const navigate=useNavigate()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
 
    <header>
        <Navbar  bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='proshop'/>
              Ecommerce
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' /> 
            <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox/>
              <LinkContainer to='/cart'>
                <Nav.Link><FaShoppingCart/>
                Cart
                {cartItems.length > 0 && (
                  <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                   {cartItems.reduce((total, currentItem) => total + parseInt(currentItem.qty, 10), 0)}


                  </Badge>
                )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu' >
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>

                  

                  
                </NavDropdown>


              )}
            </Nav>
            </Navbar.Collapse>
        </Container>

        </Navbar>
    </header>
  )
}

export default Header;
import { useEffect } from 'react';
import { Box, Typography, Button, Grid, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import { loadStripe } from '@stripe/stripe-js';
import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';


const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0'
    }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('sm')]: {
        marginBottom: 15
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const BottomWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    border-radius: 2px;
    width: 250px;
    height: 51px;
`;
const stripePromise = loadStripe("pk_test_51Nl0Z7SH958JFqSHMd4HOgLjPrOsubjmunLHVj5piwKe2jWkEeef1ej5QT6rlvC5AMUGJb8nQ78fEiL0QK8FiA2F00HeSIuUf4")
const buyNow = async () => {
    const stripe = await stripePromise;
    const response = await fetch('http://localhost:8000/create-checkout-session', {
        method: 'POST',
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });
    if (result.error) {
        console.error(result.error);
    }
}

const Cart = () => {
    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        if (cartItems && id !== cartItems.id)
            dispatch(addToCart(id));
    }, [dispatch, cartItems, id]);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    return (
        <>
            {cartItems.length ?
                <Component container>
                    <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                        <Header>
                            <Typography style={{ fontWeight: 600, fontSize: 18 }}>My Cart ({cartItems?.length})</Typography>
                        </Header>
                        {cartItems.map(item => (
                            <CartItem item={item} removeItemFromCart={removeItemFromCart} />
                        ))
                        }
                        <BottomWrapper>
                            <StyledButton variant="contained" onClick={() => buyNow()}>Place Order</StyledButton>
                        </BottomWrapper>
                    </LeftComponent>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <TotalView cartItems={cartItems} />
                    </Grid>
                </Component> : <EmptyCart />
            }
        </>

    )
}

export default Cart;
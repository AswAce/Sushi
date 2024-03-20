import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ShoppingCartContext from '../../contexts/ShoppingCartContext';
import { useContext } from "react";
import styles from './ShoppingCart.module.css';

const ShoppingCart = (props) => {

    const { show, handleClose } = props;
    const { cartItems, onAdd, onRemove } = useContext(ShoppingCartContext);

    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    const taxPrice = itemsPrice * 0.20;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    return (
        <>
            <Modal show={show} onHide={() => handleClose()}>
                <Modal.Header>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {cartItems.length === 0 && <div>Cart is empty</div>}
                    {cartItems.map((item) => (
                        <div key={item._id} className="row">
                            <div className="col-2">{item.title}</div>

                            <div className="col-2">
                                <button onClick={() => onRemove(item)} className={styles.remove}>
                                    -
                                </button>{' '}
                                <button onClick={() => onAdd(item)} className={styles.add}>
                                    +
                                </button>
                            </div>

                            <div className="col-2 text-right">
                                {item.qty} x ${item.price.toFixed(2)}
                            </div>
                        </div>
                    ))}

                    {cartItems.length !== 0 && (
                        <>
                            <hr></hr>
                            <div className="row">
                                <div className="col-2">Items Price</div>
                                <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
                            </div>

                            <div className="row">
                                <div className="col-2">Tax Price</div>
                                <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
                            </div>

                            <div className="row">
                                <div className="col-2">Shipping Price</div>
                                <div className="col-1 text-right">
                                    ${shippingPrice.toFixed(2)}
                                </div>
                            </div>
                            <hr></hr>

                            <div className="row">
                                <div className="col-2">
                                    <strong>Total Price</strong>
                                </div>
                                <div className="col-1 text-right">
                                    <strong>${totalPrice.toFixed(2)}</strong>
                                </div>
                            </div>
                        </>
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleClose()}>
                        Checkout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ShoppingCart;
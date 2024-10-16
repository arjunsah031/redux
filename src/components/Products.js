import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStart, addSuccess, addFailure } from '../store/cartSlice';
import { fetchProducts } from '../store/productSlice';
import { STATUSES } from '../store/productSlice';

const Products = () => {
    const dispatch = useDispatch();
    const { data: products, status } = useSelector((state) => state.product);
    const cartState = useSelector((state) => state.cart); // Get cart state

    // Local state to track loading for each product
    const [loadingProductId, setLoadingProductId] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAdd = (product) => {
        const isAlreadyInCart = cartState.addedProductInCart.some(
            (item) => item.id === product.id
        );
    
        if (isAlreadyInCart) {
            alert('This product is already in the cart.');
        } else {
            // Set the loading state for the specific product
            setLoadingProductId(product.id);
            dispatch(addStart());
            try {
                // Simulate a delay for adding the product
                setTimeout(() => {
                    dispatch(addSuccess(product));
                    setLoadingProductId(null); // Reset loading after success
                }, 1000); // Simulate a 1-second delay (could be an API call)
            } catch (error) {
                dispatch(addFailure());
                setLoadingProductId(null); // Reset loading on failure
            }
        }
    };

    if (status === STATUSES.LOADING) {
        return <h2>Loading products...</h2>;
    }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong!</h2>;
    }

    return (
        <div className="productsWrapper">
            {products.map((product) => (
                <div className="card" key={product.id}>
                    <img src={product.image} alt="" />
                    <h4>{product.title}</h4>
                    <h5>{product.price}</h5>
                    <button
                        onClick={() => handleAdd(product)}
                        className="btn"
                        disabled={loadingProductId === product.id} // Disable only the button for the loading product
                    >
                        {loadingProductId === product.id ? 'Adding...' : 'Add to cart'} {/* Show spinner text */}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Products;


import { useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import { ProductItem } from '../ProductItem';
import { ButtonCart } from '../ButtonCart';
import { localstorageKey } from '../../services/config';

import styles from './ProductsList.module.scss';


export const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [isProductsLoading, setIsProductsLoading] = useState(false)
    // товаров в корзине
    const [goodsInCart, setGoodsInCart] = useState(0);

    useEffect(() => {
        fetchProducts();
        inCart();
    }, [])

    async function fetchProducts() {
        setIsProductsLoading(true);
        const response = await getProducts();
        setIsProductsLoading(false);

        setProducts(response);
    }

    function inCart() {
        let storage = JSON.parse(localStorage.getItem(localstorageKey));
        setGoodsInCart(storage.length);
    }

    return (
        <div className={styles.ProductsList}>
            <ButtonCart goodsInCart={goodsInCart} />
            <h1>Список товаров</h1>
            {isProductsLoading ? <div>Loading</div> :
                <div className={styles.productsListCards}>
                    {products.map(product =>
                        <ProductItem
                            key={product.id}
                            product={product}
                        />
                    )}
                </div>
            }
        </div>
    )
}

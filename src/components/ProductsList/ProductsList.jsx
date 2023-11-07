
import { useEffect, useState } from 'react'
import { getProducts } from '../../services/api'
import { ProductItem } from '../ProductItem'
import { ButtonCart } from '../ButtonCart';

import styles from './ProductsList.module.scss';


const localstorageKey = 'ayaTestShop';

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

        setProducts(response)
        // console.log(response);
    }

    function inCart(){
        let storage = JSON.parse(localStorage.getItem(localstorageKey));
        setGoodsInCart(storage.length);
    }

    return (
        <div>
            <ButtonCart  goodsInCart={goodsInCart}/>
            <h1>Список товаров</h1>
            {isProductsLoading ? <div>Loading</div> :
                <div className={styles.ProductsList}>
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

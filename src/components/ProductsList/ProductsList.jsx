
import { useEffect, useState } from 'react'
import { getProducts } from '../../services/api'
import { ProductItem } from '../ProductItem'
import { ButtonCart } from '../ButtonCart';

import styles from './ProductsList.module.scss';

export const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [isProductsLoading, setIsProductsLoading] = useState(false)

    useEffect(() => {
        fetchProducts();
    }, [])

    async function fetchProducts() {
        setIsProductsLoading(true);
        const response = await getProducts();
        setIsProductsLoading(false);

        setProducts(response)
        // console.log(response);
    }

    return (
        <div>
            <ButtonCart/>
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

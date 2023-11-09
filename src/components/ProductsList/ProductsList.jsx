
import { ProductItem } from '../ProductItem';
import { ButtonCart } from '../ButtonCart';


import { useGoodsInCart } from '../../hooks/useGoodsInCart';
import { useFetchProducts } from '../../hooks/useFetchProducts';

import styles from './ProductsList.module.scss';

export const ProductsList = () => {
    // все товары
    const [products, isProductsLoading] = useFetchProducts();
    // товаров в корзине
    const [goodsInCart] = useGoodsInCart();

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

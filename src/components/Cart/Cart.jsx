
import { useEffect, useState } from 'react'
import { getSizes, getProducts } from '../../services/api'

import styles from './Cart.module.scss'


const localstorageKey = 'ayaTestShop';

export const Cart = () => {
    // товары из стораджа
    const [products, setProducts] = useState([])

    useEffect(() => {
        assembleCart();

    }, [products])

    async function assembleCart() {
        let storage = JSON.parse(localStorage.getItem(localstorageKey));
        // console.log(storage);

        const cart = [];
        let id = 0;

        const sizes = await getSizes();
        const products = await getProducts();

        // console.log(sizes);

        for (let product of storage) {
            const productData = {};
            productData.id = ++id;
            productData.storage = product;

            const productAllColors = products.filter(pr => pr.id == product.productId);
            productData.name = productAllColors[0].name

            const productOneColor = productAllColors[0].colors.filter(cl => cl.id == product.productColorId)
            productData.color = productOneColor[0]

            const size = sizes.filter(sz => sz.id == product.productSizeId);
            productData.size = size[0];

            cart.push(productData);
        }

        // console.log(cart);

        setProducts(cart)
    }

    function removeFromCart(storageId) {
        console.log(storageId);
        let storage = JSON.parse(localStorage.getItem(localstorageKey));

        console.log(storage);

        storage = storage.filter(product => {
            if (product.productId == storageId.productId
                && product.productSizeId == storageId.productSizeId
                && product.productColorId == storageId.productColorId) {
                return false;
            }
            return true;
        })


        localStorage.setItem(localstorageKey, JSON.stringify(storage));

        setProducts([])
    }

    return (
        <div className={styles.Cart}>
            <h1>Корзина товаров</h1>
            {/* {isProductLoading ? <div>Loading</div> : */}
            <div className={styles.cartContent}>
                {products.map(product =>
                    <div key={product.id} className={styles.card}>
                        <div className={styles.cardImg}>
                            <img src={product.color.images[0]} alt="" />
                        </div>
                        <h2>{product.name}</h2>
                        <span>Цвет: {product.color.name}</span>
                        <span>Размер: {product.size.label}/{product.size.number}</span>
                        <span>Цена: {product.color.price}</span>
                        <button onClick={() => removeFromCart(product.storage)}>Удалить</button>
                    </div>
                )}
            </div>
            {/* } */}
        </div>
    )
}

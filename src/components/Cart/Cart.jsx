
import { useEffect, useState } from 'react'
import { getSizes, getProducts } from '../../services/api'
import { localstorageKey } from '../../services/config'
import { ButtonLink } from "../ButtonLink"

import styles from './Cart.module.scss'


export const Cart = () => {
    // товары из стораджа
    const [products, setProducts] = useState([])

    useEffect(() => {
        assembleCart();
    }, [products])

    async function assembleCart() {
        let storage = JSON.parse(localStorage.getItem(localstorageKey));

        const cart = [];
        let id = 0;

        const sizes = await getSizes();
        const products = await getProducts();

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

        setProducts(cart)
    }

    function removeFromCart(storageId) {
        let storage = JSON.parse(localStorage.getItem(localstorageKey));

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
            <ButtonLink to={'/'}>На главную</ButtonLink>
            <h1>Корзина товаров</h1>
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
        </div>
    )
}

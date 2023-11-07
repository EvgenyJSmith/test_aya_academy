
import { useEffect, useState } from 'react'
import { getSizes, getProducts } from '../../services/api'

import styles from './Cart.module.scss'


const localstorageKey = 'ayaTestShop';

export const Cart = () => {
    // товары из стораджа
    const [products, setProducts] = useState([])

    useEffect(() => {
        asssembleCart();
    }, [])

    async function asssembleCart() {
        let storage = JSON.parse(localStorage.getItem(localstorageKey));
        console.log(storage);

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

        console.log(cart);

        setProducts(cart)
    }

    function removeFromCart(){

    }

    return (
        <div className={styles.Cart}>
            <h1>Корзина товаров</h1>
            <div>
                {products.map(product =>
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                    </div>
                )}
            </div>
        </div>
    )
}

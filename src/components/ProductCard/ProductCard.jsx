
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from 'react'

import { getSizes, getProduct, getProductColor } from '../../services/api'

import styles from './ProductCard.module.scss'
import { ButtonCart } from "../ButtonCart"


const localstorageKey = 'ayaTestShop';

export const ProductCard = () => {
    // категория товара
    const productId = useParams();
    // товар всех цветов
    const [product, setProduct] = useState({})
    // товар 1 цвета
    const [productColor, setProductColor] = useState({})
    // лоадер
    const [isProductLoading, setIsProductLoading] = useState(false)
    // размеры
    const [productSizes, setProductSizes] = useState([])
    // 
    const [imgIndex, setImgIndex] = useState(0);
    // товаров в корзине
    const [goodsInCart, setGoodsInCart] = useState(0);

    useEffect(() => {
        fetchProduct();
        fetchProductColor(1);
        fetchSizes();
        inCart();
    }, [])

    async function fetchProduct() {
        setIsProductLoading(true);
        const response = await getProduct(productId.id);
        setIsProductLoading(false);

        setProduct(response);
        // console.log(response);
    }

    async function fetchProductColor(colorId) {
        const response = await getProductColor(productId.id, colorId)

        setProductColor(response);
        // console.log(response);
    }

    async function fetchSizes() {
        const response = await getSizes()

        setProductSizes(response);
        // console.log(response);
    }


    async function changeColor(colorId) {
        await fetchProductColor(colorId)

        setImgIndex(0);
    }

    function changeImg(step) {
        let newIndex = imgIndex + step;
        if (newIndex < 0) {
            newIndex = productColor.images.length - 1
        }
        else if (newIndex >= productColor.images.length) {
            newIndex = 0
        }

        setImgIndex(newIndex);
    }

    function putInCart(sizeId) {
        const itemIds = {
            productId: productId.id,
            productColorId: productColor.id,
            productSizeId: sizeId,
        }

        putToLocalstorage(localstorageKey, itemIds);
        // console.log(itemIds);
    }

    function inCart(){
        let storage = JSON.parse(localStorage.getItem(localstorageKey));
        setGoodsInCart(storage.length);
    }

    function putToLocalstorage(localstorageKey, data) {
        let storage = JSON.parse(localStorage.getItem(localstorageKey));

        if (!storage) {
            storage = [];
            storage.push(data);

            localStorage.setItem(localstorageKey, JSON.stringify(storage));

            setGoodsInCart(storage.length);

            console.log(storage, data);
            return;
        }


        let clone = false;

        storage.forEach((el)=>{
            if(el.productColorId == data.productColorId && 
                el.productId == data.productId &&
                el.productSizeId == data.productSizeId){
                clone = true;
            }
        })

        if(clone){
            return;
        }

        storage.push(data);
        localStorage.setItem(localstorageKey, JSON.stringify(storage));

        setGoodsInCart(storage.length);

        console.log(storage);
    }

    return (
        <>
            <ButtonCart goodsInCart={goodsInCart}/>
            {/* <Link to={'/'} className={styles.ButtonCart}>Назад</Link> */}
            {isProductLoading ? <div>Loading</div> :
                <div className={styles.ProductCard}>
                    <span>{product.name} {productColor.name}</span>
                    <div className={styles.productCardImg}>
                        {productColor.images && <img src={productColor.images[imgIndex]} alt="" />}
                    </div>
                    <div>
                        <button onClick={() => changeImg(-1)}>prev</button>
                        <button onClick={() => changeImg(1)}>next</button>
                    </div>
                    <div className={styles.productCardContent}>
                        <span>{productColor.description}</span>
                        <div>
                            <span>Цвета: </span>
                            {product.colors?.map(color =>
                                <button key={color.id} onClick={() => changeColor(color.id)}>{color.name}</button>
                            )}
                        </div>
                        <span>Цена: {productColor.price}</span>
                        <div>
                            <span>Размеры: </span>
                            {productSizes.map(size =>
                                <button
                                    key={size.id}
                                    disabled={productColor.sizes.filter(sz => sz === size.id).length ? false : true}
                                    onClick={() => putInCart(size.id)}
                                >
                                    {size.label}/{size.number}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
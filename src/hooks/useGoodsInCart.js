// товаров в корзине
import { useEffect, useState } from 'react';
import { localstorageKey } from '../services/config';

export const useGoodsInCart = () => {
    const [goodsInCart, setGoodsInCart] = useState(0);

    let storage = JSON.parse(localStorage.getItem(localstorageKey));

    useEffect(() => {
        setGoodsInCart(storage.length);
    }, [storage.length])

    return [goodsInCart];
}

// запрос продукта

import { useState, useCallback } from 'react';
import { getProduct } from '../services/api'


export const useFetchProduct = (id) => {
    const [product, setProduct] = useState([])
    const [isProductLoading, setIsProductLoading] = useState(false)

    const fetchProduct = useCallback(
        async () =>{
            setIsProductLoading(true);
            const response = await getProduct(id);
            setIsProductLoading(false);

            setProduct(response);
        },[id]
    )

    return [product, isProductLoading, fetchProduct]
}

import { useEffect, useState, useCallback } from 'react';
import { getProducts } from '../services/api';


export const useFetchProducts = () => {
    const [products, setProducts] = useState([])
    const [isProductsLoading, setIsProductsLoading] = useState(false)

    useEffect(() => {
        // fetchProducts();
        execute();
    }, [])

    const execute = useCallback(async function fetchProducts() {
        setIsProductsLoading(true);
        const response = await getProducts();
        setIsProductsLoading(false);

        setProducts(() => response);
    }, [])

    return [products, isProductsLoading]
}
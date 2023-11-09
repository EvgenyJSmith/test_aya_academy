
import { useEffect, useState, useCallback } from 'react';
import { getProducts } from '../services/api';


export const useFetchProducts = () => {
    const [products, setProducts] = useState([])
    const [isProductsLoading, setIsProductsLoading] = useState(false)

    const fetchProducts = useCallback(async () => {
        setIsProductsLoading(true);
        const response = await getProducts();
        setIsProductsLoading(false);

        setProducts(() => response);
    }, [])

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts])

    return [products, isProductsLoading]
}
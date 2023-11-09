// запрос размеров

import { useEffect, useState, useCallback } from 'react';
import { getSizes } from '../services/api'

export const useFetchSizes = () => {
    const [productSizes, setProductSizes] = useState([])
    const [isProductSizesLoading, setIsProductSizesLoading] = useState(false)

    const fetchSizes = useCallback(async () => {
        setIsProductSizesLoading(true);
        const response = await getSizes()
        setIsProductSizesLoading(false);

        setProductSizes(() => response);
    }, [])

    useEffect(() => {
        fetchSizes();
    }, [fetchSizes])

    return [productSizes, isProductSizesLoading]
}

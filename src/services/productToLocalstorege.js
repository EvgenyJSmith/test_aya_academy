// добавляет товар в локалсторадж, возвращает количество товаров

export const productToLocalstorage =(localstorageKey, newProduct = {})=>{
    let storage = JSON.parse(localStorage.getItem(localstorageKey));
    
        if (!storage) {
            storage = [];
            storage.push(newProduct);

            localStorage.setItem(localstorageKey, JSON.stringify(storage));

            return storage.length;
        }

        let clone = false;

        storage.forEach((el) => {
            if (el.productColorId === newProduct.productColorId &&
                el.productId === newProduct.productId &&
                el.productSizeId === newProduct.productSizeId) {
                clone = true;
            }
        })

        if (clone) {
            return storage.length;
        }

        storage.push(newProduct);
        localStorage.setItem(localstorageKey, JSON.stringify(storage));

        return storage.length;
}


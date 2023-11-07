import { Link } from "react-router-dom";

import styles from './ProductItem.module.scss'

export const ProductItem = (props) => {
    const { product } = props;

    return (
        <Link to={`product-card/${product.id}`} className={styles.ProductItem}>
            <div className={styles.ProductItemImg}>
                <img src={product.colors[0].images[0]} alt="" />
            </div>
            {product.name}
        </Link>
    )
}


import { Link } from 'react-router-dom'

import styles from './ButtonCart.module.scss'

export const ButtonCart = ({goodsInCart}) => {
    return (
        <Link to={'/cart'} className={styles.ButtonCart}>Корзина: {goodsInCart}</Link>
    )
}
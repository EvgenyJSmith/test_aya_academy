

import { Link } from 'react-router-dom'

import styles from './ButtonCart.module.scss'

export const ButtonCart = () => {
    return (
        <Link to={'/cart'} className={styles.ButtonCart}>Корзина</Link>
    )
}
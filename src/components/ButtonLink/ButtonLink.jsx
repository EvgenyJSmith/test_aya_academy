
import { Link } from "react-router-dom"


import styles from './ButtonLink.module.scss';

export const ButtonLink = ({ to, children }) => {
    return (
        <Link to={to} className={styles.ButtonLink}>{children}</Link>
    )
}

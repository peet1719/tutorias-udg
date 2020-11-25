import styles from '../../assets/styles/components/verticalNav.module.scss'
import UserIcon from './../../assets/icons/SVG/user.svg'
import CalendarIcon from './../../assets/icons/SVG/calendar.svg'
import HistorialText from './../../assets/icons/SVG/file_text.svg'
import ConfIcon from './../../assets/icons/SVG/cog.svg'
import Link from 'next/link'
const VerticalNav = () => {

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbar_nav}>
                <li className={styles.logo}>
                    <a href="#" className={styles.nav_link}>
                        <span className={`${styles.link_text} ${styles.logo_text}`}>TutoUDG</span>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fad"
                            data-icon="angle-double-right"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
                        >
                            <g className={styles.fa_group}>
                                <path
                                    fill="currentColor"
                                    d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                                    className={styles.fa_secondary}
                                ></path>
                                <path
                                    fill="currentColor"
                                    d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                                    className={styles.fa_primary}
                                ></path>
                            </g>
                        </svg>
                    </a>
                </li>

                <li className={styles.nav_item}>
                    <Link href="/account/profile">
                        <a className={styles.nav_link}>
                            <UserIcon className={styles.nav_bar_logo}></UserIcon>
                            <span className={styles.link_text}>Perfil</span>
                        </a>
                    </Link>
                </li>

                <li className={styles.nav_item}>
                    <Link href="/account/agenda">
                        <a className={styles.nav_link}>
                            <CalendarIcon className={styles.nav_bar_logo}></CalendarIcon>
                            <span className={styles.link_text}>Agenda</span>
                        </a>
                    </Link>
                </li>
                {/* change for create card */} 
                {/* <li className={styles.nav_item}>
                    <Link href="/account/history">
                        <a className={styles.nav_link}>
                            <HistorialText className={styles.nav_bar_logo}></HistorialText>
                            <span className={styles.link_text}>Historial</span>
                        </a>
                    </Link>
                </li> */}

                <li className={styles.nav_item}>
                    <Link href="/account/edit_password">
                        <a className={styles.nav_link}>

                            <ConfIcon className={styles.nav_bar_logo}></ConfIcon>
                            <span className={styles.link_text}>Ajustes</span>
                        </a>
                    </Link>
                </li>


            </ul>
        </nav>
    )
}

export default VerticalNav;
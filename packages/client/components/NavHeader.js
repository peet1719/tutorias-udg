import { GET_DATA_HEADER } from './graphql/querys/users';
import { dataUserVar, isLoggedInVar, positionDropdownVar } from './../cache'
import useSession from './../components/customHooks/useSession';
import React, { useState, useEffect, useRef, Fragment } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';

import ChevronIcon from './../assets/icons/chevron.svg';
import ArrowIcon from './../assets/icons/arrow.svg';
import { CSSTransition } from 'react-transition-group';
import styles from './../assets/styles/components/navHeader.module.scss';

const NavHeader = () => {
    const [userData, setUserData] = useState({})
    const { getData } = useSession()

    useEffect(() => {

        setUserData({})
        if (localStorage.getItem('token')) {
            const data = getData()

            setUserData(data)

            //Variables reactivas
            isLoggedInVar(true)
            dataUserVar(userData)
        }

    }, [isLoggedInVar(), userData.userName])

    //conseguir los temas para el dropdown 
    const { data, loading, error } = useQuery(GET_DATA_HEADER)

    if (loading) return "";

    const temas = data.getAsignaturas

    return (
        <Fragment>
            <Navbar>
                <NavItem content="Inicio" icon={false} to="" />
                <NavItem content="Temas" icon={false} to="">
                    <DropdownMenu content={temas} multiDropdown={true} calPosition={true}></DropdownMenu>
                </NavItem>
                <NavItem content="Tutores" icon={false} to="tutores" />
                <NavItem content="Aprendices" icon={false} to="aprendices" />
                {loginItem(userData)}
            </Navbar>
        </Fragment>
    )
}

function loginItem(userData) {

    //meter el dropdown en lugar del nombre como el de facebook
    if (userData.userName) {
        const contentProfile = [
            {
                contenido: "Perfil",
                url: "account/profile"
            },
            {
                contenido: "Cerrar Sesión",
                url: ""
            },
        ]
        return (
            <Fragment>
                {
                //Función de notificaciones
                /* <NavItem content={<BellIcon />} icon={true} to=""/>
                <NavItem content={<MessengerIcon />} icon={true} to=""/>
                <NavItem content={<CaretIcon />} icon={true} to="">
                    <DropdownMenu></DropdownMenu>
                </NavItem> */}

                <NavItem content={userData.userName} to="#">
                    <DropdownMenu content={contentProfile} multiDropdown={false} calPosition={false}></DropdownMenu>
                </NavItem>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <NavItem content="Iniciar sesión" to="login" />
                <NavItem content="Registrarme" to="signup" />
            </Fragment>
        )
    }
}

function Navbar(props) {
    return (
        <nav className={styles.navbar}>
            <ul className={`${styles.navbarNav} ${styles.navUl}`}>{props.children}</ul>
        </nav>
    );
}

function NavItem(props) {
    const [open, setOpen] = useState(false);
    const stylesNavItem = props.icon ? `${styles.navA}` : `${styles.navA}`

    const dropdownPositionRef = useRef(null);


    // calcular bien la distancia del dropdown para que no quede chueco con nombres cortos
    useEffect(() => {
        if (props.content === 'Temas') {
            const positionLeft = dropdownPositionRef.current?.offsetLeft
            positionDropdownVar(positionLeft)
            console.log(positionLeft)
            console.log(dropdownPositionRef.current)
        }
    }, [props.children])

    return (
        <Fragment>
            <li className={styles.navItem} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} ref={dropdownPositionRef}>
                <Link href={`/${props.to}`}>
                    <a className={stylesNavItem}>
                        {props.content}
                    </a>
                </Link>
                {open && props.children}
            </li>
        </Fragment>
    )
}

function DropdownMenu({ content, multiDropdown, calPosition }) {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    //estilos del dropdown
    const stlyesDrop = multiDropdown ? `${styles.dropdown}` : `${styles.dropdown__profile}`

    const dropDownHtml = temasDropdown(content, multiDropdown);

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    //calcula el tamaño de los items del dropdown secundario
    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    //calcula el tamaño de los items del dropdown Primario
    function calcular(el) {
        const height = el.offsetHeight * content.length;
        setMenuHeight(height);
    }


    function temasDropdown(contentDropDown, multiDropdown) {

        //dropdown de temas y asignaturas
        if (multiDropdown) {
            contentDropDown = Object.entries(contentDropDown);

            return contentDropDown.map(asigTem => {
                // Si muevo el fragment Aqui seguramente se vea bien la
                return (
                    <Fragment key={asigTem[0]}>
                        <CSSTransition
                            in={activeMenu === 'main'}
                            timeout={300}
                            classNames={{
                                enter: styles["menuPrimaryEnter"],
                                enterActive: styles["menuPrimaryEnterActive"],
                                exit: styles["menuPrimaryExit"],
                                exitActive: styles["menuPrimaryExitActive"]
                            }}
                            onEnter={calcular}
                            unmountOnExit
                        >
                            <div className={styles.menu}>
                                <DropdownItem
                                    rightIcon={<ChevronIcon />}
                                    goToMenu={asigTem[1].asignatura}>
                                    {asigTem[1].asignatura}
                                </DropdownItem>
                            </div>
                        </CSSTransition>
                        <CSSTransition
                            in={activeMenu === asigTem[1].asignatura}
                            timeout={300}
                            classNames={{
                                enter: styles["menuSecondaryEnter"],
                                enterActive: styles["menuSecondaryEnterActive"],
                                exit: styles["menuSecondaryExit"],
                                exitActive: styles["menuSecondaryExitActive"]
                            }}
                            unmountOnExit
                            onEnter={calcHeight}>
                            <div className={styles.menu}>
                                <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                                    <h2>Asignaturas</h2>
                                </DropdownItem>
                                <hr className={styles.spacer}></hr>
                                {asigTem[1].temas.map(tema => {
                                    return <DropdownItem key={tema} url='temas/' >{tema}</DropdownItem>
                                })}
                            </div>
                        </CSSTransition>
                    </Fragment>
                )
            })
        } else {
            return (
                <Fragment>
                    <CSSTransition
                        in={activeMenu === 'main'}
                        timeout={500}
                        classNames={{
                            enter: styles["menuPrimaryEnter"],
                            enterActive: styles["menuPrimaryEnterActive"],
                            exit: styles["menuPrimaryExit"],
                            exitActive: styles["menuPrimaryExitActive"]
                        }}
                        onEnter={calcHeight}
                        unmountOnExit
                    >

                        <Fragment>
                            {contentDropDown.map(contentProfile => {
                                return <DropdownItem key={contentProfile.contenido} url={contentProfile.url} >{contentProfile.contenido}</DropdownItem>
                            })}
                        </Fragment>
                    </CSSTransition>
                </Fragment>
            )
        }

    }

    function DropdownItem(props) {
        const { deleteSession } = useSession()

        /* const link = props.url ? props.url : router.route */
        const link = props.url ? props.url : ''


        //return diferent type of item fisrt work as a link second work as a button  
        if (link) {
            return (
                <Link href={`${process.env.NEXT_PUBLIC_PATH}${link}`} >
                    <a
                        className={`${styles.menuItem} ${styles.navA}`}
                        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)
                        }>
                        <span className={props.leftIcon ? styles.iconButton : ""}>{props.leftIcon}</span>
                        {props.children}
                        <span className={styles.iconRight}>{props.rightIcon} </span>
                    </a>
                </Link>
            );
        } else {
            return (
                <a
                    className={`${styles.menuItem} ${styles.navA}`}
                    onClick={() => props.goToMenu ? setActiveMenu(props.goToMenu) : deleteSession()}>
                    <span className={props.leftIcon ? styles.iconButton : ""}>{props.leftIcon}</span>
                    {props.children}
                    <span className={styles.iconRight}>{props.rightIcon} </span>
                </a>
            );
        }

    }


    return (
        <div
            className={stlyesDrop}
            style={calPosition ? { height: menuHeight, left: positionDropdownVar() } : {height: menuHeight}}
            ref={dropdownRef}
        >
            <div className={styles.menu}>
                {dropDownHtml}
            </div>
        </div>
    )
}

export default NavHeader;
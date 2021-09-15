import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { SidebarData } from './sidebardata';

import './menu.css';

import { CgProfile } from 'react-icons/cg';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineFire } from 'react-icons/ai';
import { RiMenuFoldFill } from 'react-icons/ri';
import { RiMenuUnfoldFill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import HelperMenu from '../helperMenu/HelperMenu';
function Menu() {
    const [sidebar, setSidebar] = useState(false);
    const token = sessionStorage.getItem('token');
    const idUsuario = sessionStorage.getItem('idusuario');
    const showSidebar = () => setSidebar(!sidebar);
    if (token) {
        return (
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <RiMenuUnfoldFill
                            className="icono-opciones"
                            onClick={showSidebar}
                        />
                        <p onClick={showSidebar} className="btn-letter">
                            MENÚ
                        </p>
                    </Link>

                    <h1>A GUÍA DO CAMIÑO</h1>

                    <HelperMenu />
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <RiMenuFoldFill className="icono-cerrar" />
                                <p
                                    onClick={showSidebar}
                                    className="btn-letter2"
                                >
                                    CERRAR MENÚ
                                </p>
                            </Link>
                        </li>
                        <div className="options-container">
                            <li className="list">
                                <a
                                    href={`/perfil/${idUsuario}`}
                                    className="nav-text2"
                                >
                                    <CgProfile className="menu-icons" />
                                    <span className="links-menu"> Perfil </span>
                                </a>
                            </li>
                            <li className="list">
                                <a href={`/search`} className="nav-text2">
                                    <BsSearch className="menu-icons" />{' '}
                                    <span className="links-menu">Buscar</span>
                                </a>
                            </li>

                            <li className="list">
                                <a href={`/tendencias`} className="nav-text2">
                                    <AiOutlineFire className="menu-icons" />
                                    <span className="links-menu">
                                        Tendencias
                                    </span>
                                </a>
                            </li>

                            <li className="list">
                                <a href={`/Contacto`} className="nav-text2">
                                    <HiOutlineMail className="menu-icons" />
                                    <span className="links-menu">
                                        Información General
                                    </span>
                                </a>
                            </li>

                            <li className="list">
                                <a href={`/login`} className="nav-text2">
                                    <RiLogoutBoxLine className="menu-icons" />
                                    <span className="links-menu">
                                        Desconectar
                                    </span>
                                </a>
                            </li>
                        </div>
                    </ul>
                </nav>
            </IconContext.Provider>
        );
    } else {
        return (
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <RiMenuUnfoldFill
                            className="icono-opciones"
                            onClick={showSidebar}
                        />
                        <p onClick={showSidebar} className="btn-letter">
                            MENÚ
                        </p>
                    </Link>

                    <h1>A GUÍA DO CAMIÑO</h1>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <RiMenuFoldFill className="icono-cerrar" />
                                <p className="btn-letter2">CERRAR MENÚ</p>
                            </Link>
                        </li>

                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        );
    }
}

export default Menu;

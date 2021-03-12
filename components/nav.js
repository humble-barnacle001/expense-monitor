import Link from "next/link";
import { useContext } from "react";
import { logOut } from "../actions/auth";
import { Context } from "../context";

const Nav = () => {
    const {
        state: { user, loading },
        dispatch
    } = useContext(Context);

    return (
        <nav className='navbar'>
            <div className='container justify-content-between'>
                <div>
                    <ul className='navbar-nav d-flex'>
                        {user ? (
                            <li className='nav-item'>
                                <Link href='/'>
                                    <a className='nav-link text-primary'>
                                        <span className=' d-none d-sm-flex'>
                                            Home
                                        </span>
                                        <span className='d-sm-none'>
                                            <i className='bi bi-house-fill'></i>
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}
                        <li className='nav-item'>
                            <Link href='/apiStatus'>
                                <a className='nav-link text-primary'>
                                    <span className=' d-none d-sm-flex'>
                                        API Status
                                    </span>
                                    <span className='d-sm-none'>
                                        <i className='bi bi-exclamation-octagon-fill'></i>
                                    </span>
                                </a>
                            </Link>
                        </li>
                        {loading ? (
                            ""
                        ) : (
                            <li className='nav-item'>
                                {user ? (
                                    <Link href='#!'>
                                        <a
                                            className='nav-link text-primary'
                                            onClick={() => {
                                                dispatch({ type: "LOAD" });
                                                logOut();
                                            }}
                                        >
                                            <span className=' d-none d-sm-flex'>
                                                Log Out
                                            </span>
                                            <span
                                                className='d-sm-none'
                                                key='logOut'
                                            >
                                                <i className='bi bi-box-arrow-right'></i>
                                            </span>
                                        </a>
                                    </Link>
                                ) : (
                                    <Link href='/auth'>
                                        <a className='nav-link text-primary'>
                                            <span className=' d-none d-sm-flex'>
                                                Login
                                            </span>
                                            <span
                                                className='d-sm-none'
                                                key='logIn'
                                            >
                                                <i className='bi bi-box-arrow-in-right'></i>
                                            </span>
                                        </a>
                                    </Link>
                                )}
                            </li>
                        )}
                    </ul>
                </div>
                <div>
                    <button
                        className='btn btn-action mr-5'
                        type='button'
                        id='themeToggler'
                        aria-label='Toggle dark mode'
                    >
                        <i className='bi bi-moon-fill'></i>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Nav;

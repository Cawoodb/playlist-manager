import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutNavLinks = () => {
    return (
        <ul className="nav-links">
            <NavLink to="/login">
                <li>Log In</li>
            </NavLink>
            <NavLink to="/createaccount">
                <li>Create Account</li>
            </NavLink>
        </ul>
    );
}

export default SignedOutNavLinks;

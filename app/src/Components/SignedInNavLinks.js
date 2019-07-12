import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInNavLinks = () => {
    return (
        <ul className="nav-links">
            <NavLink to="/about">
                <li>About</li>
            </NavLink>
            <NavLink to="/createexercise">
                <li>Create Exercise</li>
            </NavLink>
        </ul>
    );
}

export default SignedInNavLinks;

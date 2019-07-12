import React from 'react';
import { Link } from 'react-router-dom';
import SignedInNavLinks from './SignedInNavLinks';
import SignedOutNavLinks from './SignedOutNavLinks';

const Nav = () => {
    return (
        <nav>
            <Link to="/">
                <h3>TrainingNode</h3>
            </Link>
    
            <SignedInNavLinks/>
            <SignedOutNavLinks/>
        </nav>
    );
}

export default Nav;

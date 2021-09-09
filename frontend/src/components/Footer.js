import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <footer className='footer-copyright fixed-bottom text-center bg-dark bg-opacity-25 py-3'>
            &copy; {new Date().getFullYear()} CopyRight: ZeroX
        </footer>
    )
}

export default Footer;
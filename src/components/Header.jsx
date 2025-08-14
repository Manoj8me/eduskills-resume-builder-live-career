import React from 'react';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-headerBackground shadow-md p-2 z-50 rounded-b-3xl">
            <div className="flex justify-around max-w-7xl mx-auto">
                <h1 className="text-xl font-bold text-white">Eduskills</h1>
                <p className="flex items-center gap-2 font-bold text-white hover:underline cursor-pointer">
                    <i className="fas fa-comments text-white  icon-contact"></i>
                    Contact Us
                </p>
            </div>
        </header>
    );
};

export default Header;
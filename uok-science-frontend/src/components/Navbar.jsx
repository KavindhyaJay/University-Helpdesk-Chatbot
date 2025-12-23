import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'News & Updates', path: '/news' },
        { name: 'Contact Us', path: '/contact' },
    ];

    return (
        <nav style={{
            backgroundColor: 'var(--primary-color)',
            padding: '1rem 0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ color: 'var(--white)', fontSize: '2rem', fontWeight: 'bold' }}>
                    UOK SCIENCE
                </div>

                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            style={{
                                color: location.pathname === link.path ? 'var(--secondary-color)' : 'var(--white)',
                                fontWeight: location.pathname === link.path ? '600' : '400',
                                transition: 'color 0.3s ease',
                                fontSize: '1rem'
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <Link
                        to="/chat"
                        style={{
                            backgroundColor: location.pathname === '/chat' ? 'var(--secondary-color)' : 'transparent',
                            color: location.pathname === '/chat' ? 'var(--primary-color)' : 'var(--secondary-color)',
                            border: '2px solid var(--secondary-color)',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '2rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <MessageSquare size={18} />
                        AI Chat
                    </Link>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;

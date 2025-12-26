import React from 'react';
import fosimage from '../assets/fos_image.jpg';

const Home = () => {
    return (
        <div style={{
            backgroundImage: `url(${fosimage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 'calc(100vh - 64px)', // Adjust based on navbar height
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(205, 197, 197, 0.42)', // Semi-transparent white overlay
                zIndex: 1
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem' }}>
                <h1 style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontSize: '4rem', fontWeight: 'bold' }}>
                    WELCOME TO UOK SCIENCE FACULTY
                </h1>
                <p style={{ fontSize: '2.5rem', color: 'rgba(10, 9, 9, 1)', maxWidth: '1300px', margin: '0 auto', fontWeight: '500' }}>
                    Empowering the future through science and innovation.
                </p>
            </div>
        </div>
    );
};

export default Home;

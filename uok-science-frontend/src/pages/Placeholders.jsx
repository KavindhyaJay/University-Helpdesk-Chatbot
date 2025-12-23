import React from 'react';

const PageLayout = ({ title, children }) => (
    <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontSize: '2.5rem' }}>{title}</h1>
        {children}
    </div>
);


export const About = () => (
    <PageLayout title="About Us">
        <p>Learn more about our history, mission, and vision.</p>
    </PageLayout>
);

export const News = () => (
    <PageLayout title="News & Updates">
        <p>Stay informed with the latest announcements from the faculty.</p>
    </PageLayout>
);

export const Contact = () => (
    <PageLayout title="Contact Us">
        <p>Get in touch with our administration and departments.</p>
    </PageLayout>
);

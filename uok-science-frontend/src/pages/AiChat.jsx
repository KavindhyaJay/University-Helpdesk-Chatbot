import React, { useState } from 'react';
import { Search, Paperclip, Send } from 'lucide-react';

const AiChat = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Implementation for search would go here
        console.log('Searching for:', query);
        setQuery('');
    };

    return (
        <div style={{
            minHeight: 'calc(100vh - 80px)', // Adjust for navbar
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #FFF8F0 0%, #fff 100%)'
        }}>
            <div className="container" style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}>

                <h1 style={{
                    color: 'var(--primary-color)',
                    marginBottom: '2rem',
                    fontSize: '3rem',
                    fontWeight: '800'
                }}>
                    How can we help you?
                </h1>

                <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '1.5rem',
                    boxShadow: '0 10px 40px rgba(128, 0, 0, 0.1)',
                    border: '1px solid rgba(218, 165, 32, 0.2)'
                }}>
                    <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        <div style={{ position: 'relative' }}>
                            <textarea
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ask your question here..."
                                style={{
                                    width: '100%',
                                    padding: '1.5rem',
                                    paddingRight: '120px', // Space for buttons
                                    fontSize: '1.1rem',
                                    borderRadius: '1rem',
                                    border: '2px solid #e0e0e0',
                                    minHeight: '120px',
                                    resize: 'none',
                                    outline: 'none',
                                    transition: 'border-color 0.3s ease',
                                    backgroundColor: '#fafafa',
                                    color: 'var(--text-color)'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--secondary-color)'}
                                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                            />

                            <div style={{
                                position: 'absolute',
                                bottom: '15px',
                                right: '15px',
                                display: 'flex',
                                gap: '10px'
                            }}>
                                <button
                                    type="button"
                                    title="Add files"
                                    style={{
                                        backgroundColor: '#f0f0f0',
                                        color: '#666',
                                        padding: '10px',
                                        borderRadius: '50%',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center', // Search button
                                        justifyContent: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#e0e0e0';
                                        e.currentTarget.style.color = 'var(--primary-color)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f0f0f0';
                                        e.currentTarget.style.color = '#666';
                                    }}
                                >
                                    <Paperclip size={20} />
                                </button>

                                <button
                                    type="submit"
                                    title="Search"
                                    style={{
                                        backgroundColor: 'var(--primary-color)',
                                        color: 'var(--secondary-color)',
                                        padding: '10px 20px',
                                        borderRadius: '2rem',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.2s',
                                        boxShadow: '0 4px 12px rgba(128, 0, 0, 0.2)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(128, 0, 0, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(128, 0, 0, 0.2)';
                                    }}
                                >
                                    <Search size={20} />
                                    <span>Search</span>
                                </button>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem',
                            marginTop: '1rem',
                            color: '#888',
                            fontSize: '0.9rem'
                        }}>
                            <span>Common topics:</span>
                            <button type="button" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Exam Schedules</button>
                            <button type="button" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Course Modules</button>
                            <button type="button" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Faculty Staff</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AiChat;

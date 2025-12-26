import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Loader, GraduationCap, User, BookOpen, Clock, Calendar } from 'lucide-react';
import { chatAPI } from '../services/chatAPI';

const UniversityChatbot = () => {
    const [query, setQuery] = useState('');
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Ref for auto-scrolling to bottom
    const messagesEndRef = useRef(null);

    // Common university topics for quick access
    const quickTopics = [
        { label: "Faculty ", icon: <BookOpen size={14} /> },
        { label: "Exam Schedule", icon: <Clock size={14} /> },
        { label: "Academic Calendar", icon: <Calendar size={14} /> },
        { label: "Admissions", icon: <GraduationCap size={14} /> },
    ];

    useEffect(() => {
        checkBackendHealth();
    }, []);

    // Auto-scroll to bottom whenever responses change
    useEffect(() => {
        scrollToBottom();
    }, [responses, loading]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const checkBackendHealth = async () => {
        try {
            await chatAPI.healthCheck();
            setError(null);
        } catch (err) {
            setError('Campus server is currently offline. Please try again later.');
        }
    };

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        
        if (!query.trim()) return;

        const currentQuery = query; // Capture query
        setQuery(''); // Clear input immediately for better UX
        setLoading(true);
        setError(null);

        try {
            const result = await chatAPI.sendMessage(currentQuery);
            
            setResponses(prev => [...prev, {
                userMessage: currentQuery,
                botResponse: result.response,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } catch (err) {
            setError(`Connection Error: ${err.message}`);
            // Restore query so user doesn't lose it
            setQuery(currentQuery);
        } finally {
            setLoading(false);
        }
    };

    // Handle "Enter" key to submit
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleQuickTopicClick = (topic) => {
        setQuery(`Tell me about ${topic}`);
        // Optional: auto-submit immediately
        // handleSearch(); 
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8f9fa',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* Header */}
            <div style={{
                backgroundColor: '#003366', // Academic Blue
                color: 'white',
                padding: '1rem 2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '50%' }}>
                    <GraduationCap size={28} />
                </div>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Campus Assistant</h1>
                    <span style={{ fontSize: '0.8rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%', display: 'inline-block' }}></span>
                        Online & Ready to Help
                    </span>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div style={{
                    backgroundColor: '#fee2e2',
                    borderLeft: '4px solid #ef4444',
                    color: '#991b1b',
                    padding: '1rem',
                    margin: '1rem 2rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem'
                }}>
                    {error}
                </div>
            )}

            {/* Chat Area */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                maxWidth: '900px',
                width: '100%',
                margin: '0 auto'
            }}>
                {responses.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        color: '#64748b',
                        marginTop: '4rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <GraduationCap size={48} color="#cbd5e1" />
                        <h2 style={{ margin: 0, color: '#334155' }}>How can I help you today?</h2>
                        <p>Ask about courses, campus events, or administrative support.</p>
                        
                        {/* Quick Topic Chips */}
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
                            {quickTopics.map((topic, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleQuickTopicClick(topic.label)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: 'white',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '2rem',
                                        color: '#003366',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = '#003366';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = '#e2e8f0';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {topic.icon} {topic.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    responses.map((exchange, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {/* User Message */}
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <div style={{
                                    backgroundColor: '#003366',
                                    color: 'white',
                                    padding: '1rem 1.5rem',
                                    borderRadius: '1.5rem 1.5rem 0 1.5rem',
                                    maxWidth: '70%',
                                    boxShadow: '0 2px 8px rgba(0,51,102,0.15)',
                                    lineHeight: '1.5'
                                }}>
                                    {exchange.userMessage}
                                </div>
                                <div style={{ marginTop: 'auto' }}>
                                    <div style={{ width: '32px', height: '32px', backgroundColor: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                        <User size={18} />
                                    </div>
                                </div>
                            </div>

                            {/* Bot Response */}
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-start' }}>
                                <div style={{ marginTop: 'auto' }}>
                                    <div style={{ width: '32px', height: '32px', backgroundColor: '#003366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                        <GraduationCap size={18} />
                                    </div>
                                </div>
                                <div style={{
                                    backgroundColor: 'white',
                                    color: '#1e293b',
                                    padding: '1rem 1.5rem',
                                    borderRadius: '1.5rem 1.5rem 1.5rem 0',
                                    maxWidth: '75%',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    lineHeight: '1.6'
                                }}>
                                    {exchange.botResponse}
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.5rem', textAlign: 'right' }}>
                                        AI Assistant • {exchange.timestamp}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                
                {loading && (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '3rem' }}>
                        <div style={{ display: 'flex', gap: '4px', padding: '0.5rem 1rem', backgroundColor: '#f1f5f9', borderRadius: '1rem' }}>
                            <div className="dot" style={{ animationDelay: '0s' }}></div>
                            <div className="dot" style={{ animationDelay: '0.2s' }}></div>
                            <div className="dot" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Finding answers...</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ 
                padding: '2rem', 
                backgroundColor: 'white', 
                borderTop: '1px solid #e2e8f0' 
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                        placeholder="Type your question here... (Press Enter to send)"
                        style={{
                            width: '100%',
                            padding: '1.25rem',
                            paddingRight: '120px',
                            fontSize: '1rem',
                            borderRadius: '1rem',
                            border: '2px solid #e2e8f0',
                            minHeight: '60px',
                            resize: 'none',
                            outline: 'none',
                            backgroundColor: '#f8f9fa',
                            color: '#1e293b',
                            fontFamily: 'inherit',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#003366'}
                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />

                    <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        display: 'flex',
                        gap: '8px'
                    }}>
                        <button
                            type="button"
                            title="Attach documents"
                            disabled={loading}
                            style={{
                                padding: '8px',
                                backgroundColor: 'transparent',
                                color: '#64748b',
                                border: 'none',
                                cursor: 'pointer',
                                borderRadius: '50%',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <Paperclip size={20} />
                        </button>

                        <button
                            onClick={handleSearch}
                            disabled={loading || !query.trim()}
                            style={{
                                backgroundColor: '#003366',
                                color: 'white',
                                padding: '8px 16px',
                                borderRadius: '2rem',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: loading || !query.trim() ? 'default' : 'pointer',
                                opacity: loading || !query.trim() ? 0.7 : 1,
                                transition: 'all 0.2s'
                            }}
                        >
                            {loading ? <Loader size={18} className="spin" /> : <Send size={18} />}
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Send</span>
                        </button>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                    University AI Bot can make mistakes. Please verify important academic dates with the registrar.
                </div>
            </div>

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .spin { animation: spin 1s linear infinite; }
                
                .dot {
                    width: 6px;
                    height: 6px;
                    background-color: #94a3b8;
                    border-radius: 50%;
                    animation: bounce 1.4s infinite ease-in-out both;
                }
                @keyframes bounce {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }
                
                /* Scrollbar styling for a cleaner look */
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
            `}</style>
        </div>
    );
};

export default UniversityChatbot;
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import AdminLayout from '../components/AdminLayout';
import './ContentManager.css';

const ContentManager = () => {
    const [section, setSection] = useState('reasoning');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchContent(section);
    }, [section]);

    const fetchContent = async (sec) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('content_updates')
                .select('content')
                .eq('section', sec)
                .single();

            if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows found"
            setContent(data?.content?.text || '');
        } catch (error) {
            console.error('Error fetching content:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        setMessage('');
        try {
            const { error } = await supabase
                .from('content_updates')
                .upsert({
                    section,
                    content: { text: content },
                    updated_at: new Date()
                }, { onConflict: 'section' });

            if (error) throw error;
            setMessage('Content updated successfully!');
        } catch (error) {
            setMessage('Error saving content: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <h1>Content Manager</h1>
            <div className="content-editor">
                <div className="form-group">
                    <label>Select Section:</label>
                    <select value={section} onChange={(e) => setSection(e.target.value)}>
                        <option value="reasoning">Reasoning</option>
                        <option value="other">Other</option>
                        {/* Add more sections as needed */}
                    </select>
                </div>
                <div className="form-group">
                    <label>Content (Markdown/HTML supported if rendered):</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="15"
                        placeholder="Enter content here..."
                    />
                </div>
                <button onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Updates'}
                </button>
                {message && <p className="message">{message}</p>}
            </div>
        </AdminLayout>
    );
};

export default ContentManager;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Reasoning.css';

const Reasoning = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dynamicContent, setDynamicContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContent = async () => {
            const { data } = await supabase
                .from('content_updates')
                .select('content')
                .eq('section', 'reasoning')
                .single();
            if (data?.content?.text) {
                setDynamicContent(data.content.text);
            }
        };
        fetchContent();
    }, []);

    const reasoningSections = [
        {
            title: "Coding-Decoding",
            icon: "🔢",
            topics: [
                { name: "Letter Coding", example: "CAT → DBU (each letter +1)" },
                { name: "Number Coding", example: "BOOK → 2-15-15-11" },
                { name: "Substitution", example: "If 5+3=28, 9+1=810, then 7+3=? → 410" },
                { name: "Mixed Coding", example: "Letters + Numbers combination" }
            ]
        },
        {
            title: "Blood Relations",
            icon: "👨‍👩‍👧‍👦",
            topics: [
                { name: "Basic Relations", example: "Mother's brother = Uncle" },
                { name: "Generation Gap", example: "Father's father = Grandfather" },
                { name: "Complex Relations", example: "Mother-in-law's only son = Husband" },
                { name: "Pointing Relations", example: "Pointing to a photo puzzles" }
            ]
        },
        {
            title: "Direction Sense",
            icon: "🧭",
            topics: [
                { name: "Basic Directions", example: "N, S, E, W + NE, NW, SE, SW" },
                { name: "Left/Right Turns", example: "90° turns clockwise/anticlockwise" },
                { name: "Distance & Direction", example: "Shortest distance = √(x²+y²)" },
                { name: "Shadow Problems", example: "Morning shadow → West direction" }
            ]
        },
        {
            title: "Seating Arrangement",
            icon: "💺",
            topics: [
                { name: "Linear (Single Row)", example: "5 persons in a row facing N/S" },
                { name: "Linear (Two Rows)", example: "Two rows facing each other" },
                { name: "Circular", example: "People sitting in circle facing center/outside" },
                { name: "Rectangular/Square", example: "Table arrangements" }
            ]
        },
        {
            title: "Syllogism",
            icon: "📊",
            topics: [
                { name: "All + All", example: "All A are B + All B are C → All A are C" },
                { name: "Some + All", example: "Some A are B + All B are C → Some A are C" },
                { name: "No + All", example: "No A are B + All B are C → No A are C" },
                { name: "Venn Diagram Method", example: "Use circles to visualize" },
                { name: "Either-Or Cases", example: "When definite conclusion not possible" }
            ]
        },
        {
            title: "Inequality",
            icon: "≠",
            topics: [
                { name: "Symbols", example: "< (less), > (greater), ≤, ≥, = (equal)" },
                { name: "A > B > C", example: "A is definitely greater than C" },
                { name: "A ≥ B ≥ C", example: "A > C or A = C (both possible)" },
                { name: "Either-Or", example: "When two conclusions are complementary" },
                { name: "Coded Inequality", example: "$ = >, @ = <, # = ≥, etc." }
            ]
        },
        {
            title: "Number Series",
            icon: "🔢",
            topics: [
                { name: "Difference Series", example: "2, 5, 8, 11 (+3 pattern)" },
                { name: "Ratio Series", example: "2, 6, 18, 54 (×3 pattern)" },
                { name: "Square/Cube Series", example: "1, 4, 9, 16 (n²)" },
                { name: "Two-Tier Series", example: "1, 3, 6, 10 (+2, +3, +4...)" },
                { name: "Prime Series", example: "2, 3, 5, 7, 11, 13..." }
            ]
        },
        {
            title: "Alphabet Series",
            icon: "🔤",
            topics: [
                { name: "Position Value", example: "A=1, B=2... Z=26" },
                { name: "Reverse Position", example: "A=26, B=25... Z=1" },
                { name: "Letter Skip", example: "A, C, E, G (skip 1 letter)" },
                { name: "EJOTY Rule", example: "5th, 10th, 15th, 20th, 25th letters" }
            ]
        },
        {
            title: "Ranking & Order",
            icon: "🏆",
            topics: [
                { name: "From Top", example: "5th from top in 20 students" },
                { name: "From Bottom", example: "Position from bottom" },
                { name: "Total Count", example: "Top + Bottom - 1 = Total" },
                { name: "Overlapping Positions", example: "Rank in two different orders" }
            ]
        },
        {
            title: "Clock & Calendar",
            icon: "🕐",
            topics: [
                { name: "Angle Formula", example: "11/2 × m - 30 × h" },
                { name: "Hands Coincide", example: "11 times in 12 hours" },
                { name: "Right Angle", example: "22 times in 12 hours" },
                { name: "Odd Days", example: "Calculate day of week" },
                { name: "Leap Year", example: "Divisible by 4 (except century)" }
            ]
        },
        {
            title: "Puzzles",
            icon: "🧩",
            topics: [
                { name: "Floor Puzzle", example: "People living on different floors" },
                { name: "Box Puzzle", example: "Items in different boxes" },
                { name: "Schedule Puzzle", example: "Events on different days/months" },
                { name: "Comparison Puzzle", example: "Age, height, weight comparisons" }
            ]
        },
        {
            title: "Input-Output",
            icon: "⚙️",
            topics: [
                { name: "Word Rearrangement", example: "Alphabetical/reverse order" },
                { name: "Number Shifting", example: "Ascending/descending order" },
                { name: "Step-by-Step", example: "Follow pattern in each step" },
                { name: "Last Step", example: "Determine final arrangement" }
            ]
        },
        {
            title: "Data Sufficiency",
            icon: "📈",
            topics: [
                { name: "Statement I alone", example: "First statement sufficient" },
                { name: "Statement II alone", example: "Second statement sufficient" },
                { name: "Both required", example: "Need both statements" },
                { name: "Either sufficient", example: "Any one is enough" },
                { name: "Neither sufficient", example: "Can't answer with given data" }
            ]
        },
        {
            title: "Symbols & Notations",
            icon: "∑",
            topics: [
                { name: "Mathematical", example: "+, -, ×, ÷, =, ≠, <, >" },
                { name: "Logical", example: "∧ (AND), ∨ (OR), ¬ (NOT)" },
                { name: "Sets", example: "∈ (belongs), ⊂ (subset), ∪ (union)" },
                { name: "Special", example: "@ # $ % & * custom symbols" }
            ]
        }
    ];

    const filteredSections = reasoningSections.map(section => ({
        ...section,
        topics: section.topics.filter(t =>
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.example.toLowerCase().includes(searchTerm.toLowerCase()) ||
            section.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(section => section.topics.length > 0);

    return (
        <div className="reasoning-container">
            <div className="reasoning-header">
                <Link to="/" className="back-link">← Back</Link>
                <h2 className="title-gradient">🧠 Reasoning</h2>
                <p className="reasoning-subtitle">Logical & Analytical Reasoning Topics</p>
                {dynamicContent && (
                    <div className="dynamic-content glass-panel" style={{ marginTop: '20px', padding: '15px', whiteSpace: 'pre-wrap' }}>
                        {dynamicContent}
                    </div>
                )}
            </div>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="🔍 Search reasoning topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="reasoning-search"
                />
            </div>

            <div className="reasoning-grid">
                {filteredSections.map((section, idx) => (
                    <div key={idx} className="reasoning-section glass-panel">
                        <h3 className="section-title">
                            <span className="section-icon">{section.icon}</span>
                            {section.title}
                        </h3>
                        <div className="topics-list">
                            {section.topics.map((topic, i) => {
                                // Create URL-friendly topic ID
                                const topicId = section.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
                                const hasPractice = ['coding-decoding', 'blood-relations', 'direction-sense', 'syllogism'].includes(topicId);

                                return (
                                    <div
                                        key={i}
                                        className={`topic-item ${hasPractice ? 'clickable' : ''}`}
                                        onClick={() => hasPractice && navigate(`/reasoning/practice/${topicId}`)}
                                    >
                                        <span className="topic-name">
                                            {topic.name}
                                            {hasPractice && <span className="practice-badge">🎮 Practice</span>}
                                        </span>
                                        <span className="topic-example">{topic.example}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {filteredSections.length === 0 && (
                <div className="no-results">
                    <p>No topics found for "{searchTerm}"</p>
                </div>
            )}
        </div>
    );
};

export default Reasoning;

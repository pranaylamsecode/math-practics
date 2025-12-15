import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './English.css';

const English = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const englishSections = [
        {
            title: "Parts of Speech",
            icon: "📝",
            topics: [
                { name: "Noun", rule: "Person, place, thing, or idea" },
                { name: "Pronoun", rule: "Replaces noun (I, you, he, she, it, we, they)" },
                { name: "Verb", rule: "Action or state (run, is, have)" },
                { name: "Adjective", rule: "Describes noun (beautiful, big, red)" },
                { name: "Adverb", rule: "Describes verb/adj (quickly, very, well)" },
                { name: "Preposition", rule: "Shows relation (in, on, at, by, with)" },
                { name: "Conjunction", rule: "Connects words (and, but, or, because)" },
                { name: "Interjection", rule: "Expresses emotion (Oh! Wow! Alas!)" }
            ]
        },
        {
            title: "Tenses",
            icon: "⏰",
            topics: [
                { name: "Simple Present", rule: "I go, He goes (daily actions)" },
                { name: "Present Continuous", rule: "I am going (happening now)" },
                { name: "Present Perfect", rule: "I have gone (completed recently)" },
                { name: "Simple Past", rule: "I went (completed in past)" },
                { name: "Past Continuous", rule: "I was going (ongoing in past)" },
                { name: "Past Perfect", rule: "I had gone (before another past)" },
                { name: "Simple Future", rule: "I will go (future action)" },
                { name: "Future Perfect", rule: "I will have gone (before future time)" }
            ]
        },
        {
            title: "Active & Passive Voice",
            icon: "🔄",
            topics: [
                { name: "Simple Present", rule: "He writes → It is written by him" },
                { name: "Present Continuous", rule: "He is writing → It is being written" },
                { name: "Simple Past", rule: "He wrote → It was written by him" },
                { name: "Past Continuous", rule: "He was writing → It was being written" },
                { name: "Modal Verbs", rule: "He can do → It can be done by him" }
            ]
        },
        {
            title: "Direct & Indirect Speech",
            icon: "💬",
            topics: [
                { name: "Statement", rule: "Said → told, say → tell/tells" },
                { name: "Question", rule: "Said → asked, use 'if/whether' or 'wh'" },
                { name: "Command", rule: "Said → ordered/commanded, use 'to + V1'" },
                { name: "Request", rule: "Said → requested, use 'to + V1'" },
                { name: "Tense Changes", rule: "Present → Past, Past → Past Perfect" }
            ]
        },
        {
            title: "Articles",
            icon: "🅰️",
            topics: [
                { name: "A", rule: "Before consonant sound (a book, a university)" },
                { name: "An", rule: "Before vowel sound (an apple, an hour)" },
                { name: "The", rule: "Specific/particular thing (the sun, the book)" },
                { name: "No Article", rule: "Uncountable/plural general (Water is, Books are)" }
            ]
        },
        {
            title: "Subject-Verb Agreement",
            icon: "✅",
            topics: [
                { name: "Singular Subject", rule: "He/She/It + Verb+s (He goes)" },
                { name: "Plural Subject", rule: "They/We + Verb (They go)" },
                { name: "Collective Noun", rule: "Usually singular (Team is, Family is)" },
                { name: "Either...or", rule: "Verb agrees with nearest subject" },
                { name: "Each/Every", rule: "Always singular verb" }
            ]
        },
        {
            title: "Common Errors",
            icon: "❌",
            topics: [
                { name: "Its vs It's", rule: "Its = possessive, It's = it is" },
                { name: "Your vs You're", rule: "Your = possessive, You're = you are" },
                { name: "Their/There/They're", rule: "Their = possessive, There = place, They're = they are" },
                { name: "Affect vs Effect", rule: "Affect = verb (influence), Effect = noun (result)" },
                { name: "Less vs Fewer", rule: "Less = uncountable, Fewer = countable" }
            ]
        },
        {
            title: "Phrasal Verbs",
            icon: "🔗",
            topics: [
                { name: "Look after", rule: "Take care of (She looks after her mother)" },
                { name: "Give up", rule: "Quit (He gave up smoking)" },
                { name: "Put off", rule: "Postpone (They put off the meeting)" },
                { name: "Turn down", rule: "Reject (He turned down the offer)" },
                { name: "Break out", rule: "Start suddenly (War broke out)" },
                { name: "Carry out", rule: "Execute (Carry out the plan)" }
            ]
        },
        {
            title: "Idioms & Phrases",
            icon: "💡",
            topics: [
                { name: "Piece of cake", rule: "Very easy task" },
                { name: "Break the ice", rule: "Start conversation in awkward situation" },
                { name: "Hit the nail on the head", rule: "Exactly right" },
                { name: "Blessing in disguise", rule: "Good thing that seemed bad at first" },
                { name: "Burn the midnight oil", rule: "Work/study late at night" },
                { name: "Cost an arm and a leg", rule: "Very expensive" }
            ]
        },
        {
            title: "Synonyms (Common)",
            icon: "🔁",
            topics: [
                { name: "Happy", rule: "Joyful, Cheerful, Delighted, Elated" },
                { name: "Sad", rule: "Unhappy, Sorrowful, Melancholy, Gloomy" },
                { name: "Big", rule: "Large, Huge, Enormous, Massive" },
                { name: "Small", rule: "Tiny, Little, Petite, Miniature" },
                { name: "Important", rule: "Significant, Crucial, Vital, Essential" },
                { name: "Beautiful", rule: "Pretty, Attractive, Gorgeous, Stunning" }
            ]
        },
        {
            title: "Antonyms (Common)",
            icon: "↔️",
            topics: [
                { name: "Happy ↔ Sad", rule: "Opposite emotions" },
                { name: "Big ↔ Small", rule: "Opposite sizes" },
                { name: "Hot ↔ Cold", rule: "Opposite temperatures" },
                { name: "Fast ↔ Slow", rule: "Opposite speeds" },
                { name: "Good ↔ Bad", rule: "Opposite qualities" },
                { name: "Easy ↔ Difficult", rule: "Opposite levels" }
            ]
        },
        {
            title: "One Word Substitution",
            icon: "1️⃣",
            topics: [
                { name: "One who eats too much", rule: "Glutton" },
                { name: "A person who loves books", rule: "Bibliophile" },
                { name: "Government by the people", rule: "Democracy" },
                { name: "Study of stars", rule: "Astronomy" },
                { name: "A person who hates mankind", rule: "Misanthrope" },
                { name: "Fear of heights", rule: "Acrophobia" }
            ]
        },
        {
            title: "Sentence Improvement",
            icon: "📊",
            topics: [
                { name: "Double Negative", rule: "Avoid: 'I don't have no money' → I don't have any money" },
                { name: "Redundancy", rule: "Avoid: 'Repeat again' → Repeat" },
                { name: "Misplaced Modifiers", rule: "Place adjective near noun it describes" },
                { name: "Parallel Structure", rule: "Use same form: 'I like reading, writing, and running'" }
            ]
        },
        {
            title: "Reading Comprehension Tips",
            icon: "📖",
            topics: [
                { name: "Read Title First", rule: "Get main idea from title" },
                { name: "Identify Main Theme", rule: "What is passage mainly about?" },
                { name: "Look for Keywords", rule: "Names, dates, important terms" },
                { name: "Inference Questions", rule: "What can be concluded from passage?" },
                { name: "Tone & Mood", rule: "Author's attitude (positive, negative, neutral)" }
            ]
        },
        {
            title: "Punctuation",
            icon: "❗",
            topics: [
                { name: "Period (.)", rule: "End of sentence" },
                { name: "Comma (,)", rule: "Separate items in list, pause in sentence" },
                { name: "Question Mark (?)", rule: "End of question" },
                { name: "Exclamation (!)", rule: "Strong emotion or command" },
                { name: "Apostrophe (')", rule: "Possession (John's) or contraction (don't)" },
                { name: "Quotation (\" \")", rule: "Direct speech or quotation" }
            ]
        }
    ];

    const filteredSections = englishSections.map(section => ({
        ...section,
        topics: section.topics.filter(t =>
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.rule.toLowerCase().includes(searchTerm.toLowerCase()) ||
            section.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(section => section.topics.length > 0);

    return (
        <div className="english-container">
            <div className="english-header">
                <Link to="/" className="back-link">← Back</Link>
                <h2 className="title-gradient">📚 English</h2>
                <p className="english-subtitle">Grammar, Vocabulary & Reading Comprehension</p>
            </div>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="🔍 Search English topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="english-search"
                />
            </div>

            <div className="english-grid">
                {filteredSections.map((section, idx) => (
                    <div key={idx} className="english-section glass-panel">
                        <h3 className="section-title">
                            <span className="section-icon">{section.icon}</span>
                            {section.title}
                        </h3>
                        <div className="topics-list">
                            {section.topics.map((topic, i) => {
                                const topicId = section.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
                                const hasPractice = ['tenses', 'active-and-passive-voice', 'common-errors', 'synonyms-common'].includes(topicId);

                                return (
                                    <div
                                        key={i}
                                        className={`topic-item ${hasPractice ? 'clickable' : ''}`}
                                        onClick={() => hasPractice && navigate(`/english/practice/${topicId}`)}
                                    >
                                        <span className="topic-name">
                                            {topic.name}
                                            {hasPractice && <span className="practice-badge">🎮 Practice</span>}
                                        </span>
                                        <span className="topic-rule">{topic.rule}</span>
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

export default English;

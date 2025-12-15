import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Formulas.css';

const Formulas = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const formulaSections = [
        {
            title: "Percentages",
            icon: "%",
            formulas: [
                { name: "Percentage", formula: "x% = x/100" },
                { name: "Increase %", formula: "[(New - Old) / Old] × 100" },
                { name: "Decrease %", formula: "[(Old - New) / Old] × 100" },
                { name: "% of a number", formula: "(x% of y) = (x/100) × y" }
            ]
        },
        {
            title: "Profit & Loss",
            icon: "₹",
            formulas: [
                { name: "Profit", formula: "SP - CP" },
                { name: "Loss", formula: "CP - SP" },
                { name: "Profit %", formula: "(Profit / CP) × 100" },
                { name: "Loss %", formula: "(Loss / CP) × 100" },
                { name: "SP (Profit)", formula: "CP × (100 + Profit%) / 100" },
                { name: "SP (Loss)", formula: "CP × (100 - Loss%) / 100" },
                { name: "CP from SP", formula: "SP × 100 / (100 ± Profit/Loss%)" }
            ]
        },
        {
            title: "Simple Interest",
            icon: "💰",
            formulas: [
                { name: "SI", formula: "SI = (P × R × T) / 100" },
                { name: "Amount", formula: "A = P + SI" },
                { name: "Principal", formula: "P = (SI × 100) / (R × T)" },
                { name: "Rate", formula: "R = (SI × 100) / (P × T)" },
                { name: "Time", formula: "T = (SI × 100) / (P × R)" }
            ]
        },
        {
            title: "Compound Interest",
            icon: "📈",
            formulas: [
                { name: "CI (Annual)", formula: "A = P(1 + R/100)^T" },
                { name: "CI (Half-yearly)", formula: "A = P(1 + R/200)^(2T)" },
                { name: "CI (Quarterly)", formula: "A = P(1 + R/400)^(4T)" },
                { name: "CI Amount", formula: "CI = A - P" },
                { name: "Difference SI-CI (2yr)", formula: "P(R/100)²" }
            ]
        },
        {
            title: "Time & Work",
            icon: "⏱️",
            formulas: [
                { name: "Work", formula: "Work = Time × Efficiency" },
                { name: "Days", formula: "Days = 1 / (Work per day)" },
                { name: "Combined Work", formula: "1/A + 1/B = 1/T" },
                { name: "Efficiency", formula: "If A:B = m:n, then Days B:A = m:n" }
            ]
        },
        {
            title: "Speed, Time & Distance",
            icon: "🚀",
            formulas: [
                { name: "Speed", formula: "Speed = Distance / Time" },
                { name: "Distance", formula: "Distance = Speed × Time" },
                { name: "Time", formula: "Time = Distance / Speed" },
                { name: "Average Speed", formula: "2xy / (x+y) for equal distances" },
                { name: "Relative Speed (Same)", formula: "S₁ - S₂" },
                { name: "Relative Speed (Opp)", formula: "S₁ + S₂" },
                { name: "km/h to m/s", formula: "× 5/18" },
                { name: "m/s to km/h", formula: "× 18/5" }
            ]
        },
        {
            title: "Averages",
            icon: "≈",
            formulas: [
                { name: "Average", formula: "Sum / Count" },
                { name: "Weighted Average", formula: "(A×n₁ + B×n₂) / (n₁+n₂)" },
                { name: "New Average (Add)", formula: "Old Avg + (New - Old) / (n+1)" }
            ]
        },
        {
            title: "Ratios & Proportions",
            icon: "⚖️",
            formulas: [
                { name: "Ratio", formula: "a:b = a/b" },
                { name: "Compound Ratio", formula: "(a:b) & (c:d) = ac:bd" },
                { name: "Direct Proportion", formula: "a₁/a₂ = b₁/b₂" },
                { name: "Inverse Proportion", formula: "a₁×b₁ = a₂×b₂" }
            ]
        },
        {
            title: "Mixtures & Alligations",
            icon: "🧪",
            formulas: [
                { name: "Alligation Rule", formula: "(C₁-M):(M-C₂) = Qty₂:Qty₁" },
                { name: "Mean Price", formula: "(Q₁×P₁ + Q₂×P₂) / (Q₁+Q₂)" }
            ]
        },
        {
            title: "Permutations & Combinations",
            icon: "🔢",
            formulas: [
                { name: "Factorial", formula: "n! = n×(n-1)×...×1" },
                { name: "Permutation", formula: "ⁿPᵣ = n! / (n-r)!" },
                { name: "Combination", formula: "ⁿCᵣ = n! / (r!(n-r)!)" },
                { name: "Circular Perm", formula: "(n-1)!" }
            ]
        },
        {
            title: "Probability",
            icon: "🎲",
            formulas: [
                { name: "Probability", formula: "P(E) = Favorable / Total" },
                { name: "NOT Event", formula: "P(A') = 1 - P(A)" },
                { name: "AND (Independent)", formula: "P(A∩B) = P(A) × P(B)" },
                { name: "OR", formula: "P(A∪B) = P(A) + P(B) - P(A∩B)" }
            ]
        },
        {
            title: "Algebra",
            icon: "∑",
            formulas: [
                { name: "(a+b)²", formula: "a² + 2ab + b²" },
                { name: "(a-b)²", formula: "a² - 2ab + b²" },
                { name: "a²-b²", formula: "(a+b)(a-b)" },
                { name: "(a+b)³", formula: "a³ + 3a²b + 3ab² + b³" },
                { name: "(a-b)³", formula: "a³ - 3a²b + 3ab² - b³" },
                { name: "a³+b³", formula: "(a+b)(a²-ab+b²)" },
                { name: "a³-b³", formula: "(a-b)(a²+ab+b²)" }
            ]
        },
        {
            title: "Geometry",
            icon: "📐",
            formulas: [
                { name: "Triangle Area", formula: "½ × Base × Height" },
                { name: "Circle Area", formula: "πr²" },
                { name: "Circle Circumference", formula: "2πr" },
                { name: "Rectangle Area", formula: "Length × Width" },
                { name: "Rectangle Perimeter", formula: "2(L + W)" },
                { name: "Square Area", formula: "Side²" },
                { name: "Square Perimeter", formula: "4 × Side" },
                { name: "Trapezium Area", formula: "½(a+b)×h" }
            ]
        },
        {
            title: "Mensuration (Volume)",
            icon: "📦",
            formulas: [
                { name: "Cube Volume", formula: "a³" },
                { name: "Cuboid Volume", formula: "l × w × h" },
                { name: "Cylinder Volume", formula: "πr²h" },
                { name: "Cone Volume", formula: "⅓πr²h" },
                { name: "Sphere Volume", formula: "⅔πr³" },
                { name: "Cylinder CSA", formula: "2πrh" },
                { name: "Sphere Surface", formula: "4πr²" }
            ]
        }
    ];

    const filteredSections = formulaSections.map(section => ({
        ...section,
        formulas: section.formulas.filter(f =>
            f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
            section.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(section => section.formulas.length > 0);

    return (
        <div className="formulas-container">
            <div className="formulas-header">
                <Link to="/" className="back-link">← Back</Link>
                <h2 className="title-gradient">📚 Math Formulas for Bank Exams</h2>
                <p className="formulas-subtitle">Quick reference for all important formulas</p>
            </div>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="🔍 Search formulas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="formula-search"
                />
            </div>

            <div className="formulas-grid">
                {filteredSections.map((section, idx) => (
                    <div key={idx} className="formula-section glass-panel">
                        <h3 className="section-title">
                            <span className="section-icon">{section.icon}</span>
                            {section.title}
                        </h3>
                        <div className="formulas-list">
                            {section.formulas.map((f, i) => (
                                <div key={i} className="formula-item">
                                    <span className="formula-name">{f.name}</span>
                                    <span className="formula-eq">=</span>
                                    <span className="formula-value">{f.formula}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {filteredSections.length === 0 && (
                <div className="no-results">
                    <p>No formulas found for "{searchTerm}"</p>
                </div>
            )}
        </div>
    );
};

export default Formulas;

// Question bank for Reasoning Practice
export const reasoningQuestions = {
    'coding-decoding': [
        {
            id: 1,
            question: "If CAT is coded as DBU, how is DOG coded?",
            options: ["EPH", "COF", "DPH", "EPG"],
            correct: 0,
            explanation: "Each letter is shifted by +1. D→E, O→P, G→H"
        },
        {
            id: 2,
            question: "If BOOK is coded as 2-15-15-11, what is COOL?",
            options: ["3-15-15-12", "4-16-16-13", "3-14-14-11", "2-14-14-11"],
            correct: 0,
            explanation: "A=1, B=2... C=3, O=15, O=15, L=12"
        },
        {
            id: 3,
            question: "If 'FIRE' is coded as 'GJSF', then 'WATER' is coded as?",
            options: ["XBUFS", "XBSFU", "WBUFS", "VBSFU"],
            correct: 0,
            explanation: "Each letter +1: W→X, A→B, T→U, E→F, R→S"
        },
        {
            id: 4,
            question: "In a code, 'ROSE' is 'PQQC'. What is 'TREE'?",
            options: ["TQCC", "RPCC", "RQCC", "SQCC"],
            correct: 1,
            explanation: "Pattern: -2, -1, -2, -2. T→R, R→Q, E→C, E→C"
        },
        {
            id: 5,
            question: "If 5+3=28, 9+1=810, then 7+3=?",
            options: ["410", "104", "401", "140"],
            correct: 0,
            explanation: "Pattern: (difference)(sum). 7-3=4, 7+3=10 → 410"
        }
    ],
    'blood-relations': [
        {
            id: 1,
            question: "Pointing to a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?",
            options: ["Mother", "Sister", "Daughter", "Grandmother"],
            correct: 0,
            explanation: "Only daughter of my mother = myself. So she is his mother."
        },
        {
            id: 2,
            question: "A is the son of B. C, B's sister has a son D and a daughter E. F is the maternal uncle of D. How is A related to D?",
            options: ["Cousin", "Nephew", "Uncle", "Brother"],
            correct: 0,
            explanation: "A and D are children of siblings (B and C), so they are cousins."
        },
        {
            id: 3,
            question: "If A + B means A is the mother of B; A - B means A is the brother of B; A × B means A is the son of B; then which shows P is the maternal uncle of Q?",
            options: ["P - M + Q", "P + M - Q", "M - P + Q", "Q - M + P"],
            correct: 0,
            explanation: "P - M means P is brother of M. M + Q means M is mother of Q. So P is maternal uncle of Q."
        },
        {
            id: 4,
            question: "X is the daughter of Y. Z is the husband of Y. How is X related to Z?",
            options: ["Daughter", "Sister", "Wife", "Mother"],
            correct: 0,
            explanation: "X is child of Y, and Z is Y's husband, so X is Z's daughter."
        },
        {
            id: 5,
            question: "A's mother is sister of B and daughter of C. How is C related to B?",
            options: ["Mother/Father", "Daughter", "Son", "Grandmother"],
            correct: 0,
            explanation: "C is the parent of A's mother and B (they are siblings)."
        }
    ],
    'direction-sense': [
        {
            id: 1,
            question: "A man walks 5 km North, then turns right and walks 3 km. In which direction is he from starting point?",
            options: ["North-East", "South-East", "North-West", "South-West"],
            correct: 0,
            explanation: "North + Right (East) = North-East direction"
        },
        {
            id: 2,
            question: "Ram walks 10m towards North. From there he walks 6m towards South. Then he walks 3m towards East. How far is he from starting point?",
            options: ["5m", "7m", "4m", "6m"],
            correct: 0,
            explanation: "Net North = 10-6 = 4m, East = 3m. Distance = √(4²+3²) = 5m"
        },
        {
            id: 3,
            question: "A boy is facing West. He turns 45° clockwise, then 180° anticlockwise. Which direction is he facing now?",
            options: ["South-East", "North-East", "South-West", "East"],
            correct: 0,
            explanation: "West → 45° CW = NW → 180° ACW = SE"
        },
        {
            id: 4,
            question: "In the morning, the shadow of a pole is towards West. In which direction is the sun?",
            options: ["East", "West", "North", "South"],
            correct: 0,
            explanation: "Morning sun is in East, shadow falls in opposite direction (West)"
        },
        {
            id: 5,
            question: "A man goes 3 km West, then 4 km South. What is shortest distance from start?",
            options: ["5 km", "7 km", "1 km", "4 km"],
            correct: 0,
            explanation: "Using Pythagoras: √(3²+4²) = √25 = 5 km"
        }
    ],
    'syllogism': [
        {
            id: 1,
            question: "Statements: All cats are dogs. All dogs are animals. Conclusions: I. All cats are animals. II. Some animals are cats.",
            options: ["Only I", "Only II", "Both I & II", "Neither"],
            correct: 2,
            explanation: "From All cats → dogs → animals, both conclusions are valid."
        },
        {
            id: 2,
            question: "Statements: Some books are pens. No pen is pencil. Conclusions: I. No book is pencil. II. Some books are not pencils.",
            options: ["Only I", "Only II", "Both I & II", "Neither"],
            correct: 1,
            explanation: "We can't say 'No book is pencil', but 'Some books are not pencils' is valid."
        },
        {
            id: 3,
            question: "Statements: All phones are gadgets. Some gadgets are expensive. Conclusions: I. Some phones are expensive. II. All expensive things are gadgets.",
            options: ["Only I", "Only II", "Both I & II", "Neither"],
            correct: 3,
            explanation: "Can't determine if phones are expensive, and not all expensive things are gadgets."
        },
        {
            id: 4,
            question: "Statements: No bird is fish. Some fish are mammals. Conclusions: I. No bird is mammal. II. Some mammals are not birds.",
            options: ["Only I", "Only II", "Both I & II", "Neither"],
            correct: 1,
            explanation: "Can't say 'No bird is mammal', but 'Some mammals are not birds' is possible."
        },
        {
            id: 5,
            question: "Statements: All roses are flowers. All flowers are plants. Conclusions: I. All roses are plants. II. Some plants are roses.",
            options: ["Only I", "Only II", "Both I & II", "Neither"],
            correct: 2,
            explanation: "All roses → flowers → plants. Both conclusions follow."
        }
    ]
};

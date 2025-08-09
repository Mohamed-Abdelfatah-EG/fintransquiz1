const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreEl = document.getElementById('score');
const totalQuestionsEl = document.getElementById('total-questions');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

// --- All 10 quiz questions are included below ---
const quizQuestions = [
    {
        question: "When delineating an intragroup advance of funds, which of the following characteristics would most strongly suggest the transaction should be treated as an equity contribution rather than a loan for transfer pricing purposes?",
        answerOptions: [
            { text: "The loan has a fixed repayment date and a market-based interest rate.", isCorrect: false },
            { text: "The advance is used by the borrower to acquire long-term capital assets.", isCorrect: false },
            { text: "Repayment is contingent on the borrower achieving a certain level of profitability, and there is no fixed maturity date.", isCorrect: true },
            { text: "The lender is the parent company of the borrower.", isCorrect: false }
        ]
    },
    {
        question: "What is the primary benefit derived from an MNE group member's credit rating due to 'implicit support' or 'passive association'?",
        answerOptions: [
            { text: "A legally enforceable commitment from the parent company to cover the subsidiary's debts.", isCorrect: false },
            { text: "An improvement in creditworthiness and borrowing terms solely due to being part of a larger, financially strong group, without a formal guarantee.", isCorrect: true },
            { text: "The ability to participate in the MNE's centralized cash pooling arrangement.", isCorrect: false },
            { text: "A direct cash injection from the parent company to improve the subsidiary's balance sheet.", isCorrect: false }
        ]
    },
    {
        question: "When pricing an explicit financial guarantee provided by a parent company to its subsidiary, what is the correct benefit to be priced at arm's length?",
        answerOptions: [
            { text: "The entire improvement in the subsidiary's credit rating, from its standalone rating to the parent's rating.", isCorrect: false },
            { text: "The improvement in the subsidiary's credit rating beyond the level it already achieves from implicit support.", isCorrect: true },
            { text: "The total amount of interest saved by the subsidiary on its loan.", isCorrect: false },
            { text: "A fixed percentage of the loan principal, as commonly charged by commercial banks.", isCorrect: false }
        ]
    },
    {
        question: "In a physical cash pooling arrangement, what is the typical role and arm's-length remuneration for a cash pool leader that only performs coordination and administrative functions?",
        answerOptions: [
            { text: "The cash pool leader should earn the full interest spread between the debit and credit positions.", isCorrect: false },
            { text: "The cash pool leader should receive a service fee, often calculated on a cost-plus basis, for its administrative activities.", isCorrect: true },
            { text: "The cash pool leader should receive a share of the MNE group's overall profits.", isCorrect: false },
            { text: "No remuneration is required as cash pooling is a mutually beneficial arrangement for all participants.", isCorrect: false }
        ]
    },
    {
        question: "Which of the following is NOT a recognized method for determining the arm's-length interest rate on an intragroup loan?",
        answerOptions: [
            { text: "Comparable Uncontrolled Price (CUP) method, using interest rates of loans between independent parties.", isCorrect: false },
            { text: "The lender's cost of funds, plus a premium for risk and a profit margin.", isCorrect: false },
            { text: "Using a written, non-binding 'bankability' opinion from an independent bank.", isCorrect: true },
            { text: "Economic models that build an interest rate from a risk-free rate plus various risk premiums.", isCorrect: false }
        ]
    },
    {
        question: "What is a key difference between a notional cash pool and a physical cash pool?",
        answerOptions: [
            { text: "Notional pooling involves the daily physical transfer of funds to a master account.", isCorrect: false },
            { text: "Notional pooling achieves benefits of netting balances without the actual movement of cash between subsidiary accounts.", isCorrect: true },
            { text: "Only physical pooling requires cross-guarantees among the participants.", isCorrect: false },
            { text: "Physical pooling is less expensive to operate due to lower bank fees.", isCorrect: false }
        ]
    },
    {
        question: "A key concern when analyzing a captive insurance arrangement is to determine if it constitutes a genuine insurance business. Which of the following is an indicator of a genuine insurance business?",
        answerOptions: [
            { text: "The captive insurance entity only insures the risks of a single subsidiary within the MNE group.", isCorrect: false },
            { text: "The captive has no employees and all underwriting and risk management functions are outsourced to the parent company without oversight.", isCorrect: false },
            { text: "The premiums are invested back into the insured entities within the MNE group in the form of loans.", isCorrect: false },
            { text: "There is diversification and pooling of non-correlated risks, and the captive has a real possibility of suffering losses.", isCorrect: true }
        ]
    },
    {
        question: "An MNE's treasury center arranges a hedging contract to protect a subsidiary from foreign exchange risk, but the contract is held in the treasury center's name. What is the most appropriate way to remunerate the treasury center?",
        answerOptions: [
            { text: "The treasury center should receive a service fee for arranging the hedge.", isCorrect: true },
            { text: "No remuneration is needed because the treasury center is just an internal department.", isCorrect: false },
            { text: "The treasury center should be allocated all the profits from the subsidiary's underlying commercial transaction.", isCorrect: false },
            { text: "The treasury center should only be reimbursed for the cost of the hedging instrument.", isCorrect: false }
        ]
    },
    {
        question: "A subsidiary located in a developing country needs a loan. Its parent company is located in a developed country. When determining the arm's-length interest rate, what is a key 'economic circumstance' that must be considered?",
        answerOptions: [
            { text: "The parent company's global financing policy.", isCorrect: false },
            { text: "The subsidiary's historical financial performance.", isCorrect: false },
            { text: "The presence of government regulations like interest rate controls or foreign exchange restrictions in the developing country.", isCorrect: true },
            { text: "The contractual terms of the loan, such as its maturity date.", isCorrect: false }
        ]
    },
    {
        question: "When applying the 'yield approach' to price a financial guarantee, the calculated interest spread represents:",
        answerOptions: [
            { text: "The final arm's-length guarantee fee that must be paid.", isCorrect: false },
            { text: "The minimum fee that the guarantor would be willing to accept.", isCorrect: false },
            { text: "The maximum amount the borrower would be willing to pay for the guarantee.", isCorrect: true },
            { text: "The cost incurred by the guarantor in providing the guarantee.", isCorrect: false }
        ]
    }
];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.classList.add('hide');
    resultContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    totalQuestionsEl.innerText = quizQuestions.length;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = quizQuestions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    currentQuestion.answerOptions.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.isCorrect) {
            button.dataset.correct = answer.isCorrect;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        score++;
    }
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });
    nextBtn.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

restartBtn.addEventListener('click', startQuiz);

function showResults() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreEl.innerText = score;
}

startQuiz();
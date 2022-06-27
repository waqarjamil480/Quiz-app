import {useState} from "react";
import "./App.css";

function App() {
    // taking question index for next question

    // stored all questions
    const [questions, setQuestions] = useState([
        {
            question: "Inside which HTML element do we put the JavaScript?",
            options: ["<scripting>", "<js>", "<javascript>", "<script>"],
            answer: "<script>",
        },
        {
            question: "What does CSS stand for?",
            options: [
                "Cascading Style Sheets",
                " Creative Style Sheets",
                "Computer Style Sheets",
                " Colorful Style Sheets",
            ],
            answer: "Cascading Style Sheets",
        },
        {
            question:
                "Where in an HTML document is the correct place to refer to an external style sheet?",
            options: [
                "In the <body> sections",
                "In the <head> section",
                "At the end of the document",
            ],
            answer: "In the <head> section",
        },
    ]);

    const [questionIndex, setQuestionIndex] = useState(0);
    const [choosed, setChoosed] = useState(null);
    const [showQuestionWrapper, setShowQuestionWrapper] = useState(true);
    // const [restartQuiz, setRestartQuiz] = useState(false);
    const [questionMsg, setQuestionmsg] = useState(
        `${1}/${questions.length} Questions attempted`
    );

    const showQuestion = () => {
        console.log("button clicked");

        // beacuse array length is 3 (1 to 3) and index are  (0 to 2 ) to used -1
        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
            setQuestionmsg(
                `${questionIndex + 2}/${questions.length} Questions attempted`
            );
            setChoosed(null);
        } else {
            setQuestionIndex(questions.length - 1);
            setShowQuestionWrapper(false);
            // alert("on max");
            setQuestionmsg("If you want to retake Quiz click on Below Button");
        }
    };

    const retakeQuiz = () => {
        console.log("re take quiz clicked");
        setQuestionIndex(0);
        setShowQuestionWrapper(true);
        setQuestionmsg(`${1}/${questions.length} Questions attempted`);
        setChoosed(null);
    };

    const choosen = field => {
        setChoosed(field);
    };
    return (
        <div className="App">
            {showQuestionWrapper ? (
                <div className="question-wrapper" key={questionIndex}>
                    <h2>
                        Q{questionIndex + 1} {questions[questionIndex].question}
                    </h2>
                    <ul>
                        {questions[questionIndex].options.map((item, index) => {
                            return (
                                <li>
                                    <div>
                                        <label
                                            onClick={() => choosen(index)}
                                            className={
                                                choosed === index
                                                    ? "choosed"
                                                    : ""
                                            }
                                            for={`option-${
                                                index + 1
                                            }-of-question-${questionIndex + 1}`}
                                        >
                                            <input
                                                type="radio"
                                                id={`option-${
                                                    index + 1
                                                }-of-question-${
                                                    questionIndex + 1
                                                }`}
                                                name={`question-${
                                                    questionIndex + 1
                                                }`}
                                                value={item}
                                                // onChange={(e) => setAnswers(e.target.value)}
                                            />
                                            {item}
                                        </label>
                                        <br />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <button onClick={showQuestion}>Show Next Question</button>
                    <br />
                    <b>answer: {questions[questionIndex].answer}</b>

                    <h2>{questionMsg}</h2>
                </div>
            ) : (
                <div className="results">
                    <h1>Quiz completed</h1>
                    <table id="result">
                        <thead>
                            <th>No.</th>
                            <th>Question</th>
                            <th>Otions</th>
                            <th>Answered</th>
                            <th>Correct</th>
                            <th>Score</th>
                            <th>Grade</th>
                            <th>Percentage</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>No.</td>
                                <td>Question</td>
                                <td>Otions</td>
                                <td>Answered</td>
                                <td>correct</td>
                                <td>Score</td>
                                <td>Grade</td>
                                <td>Percentage</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>{questionMsg}</h2>
                    <button onClick={retakeQuiz}>Start Quiz</button>
                </div>
            )}
        </div>
    );
}

export default App;

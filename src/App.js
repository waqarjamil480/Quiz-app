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
    const [pointValue, setPointValue] = useState(0);
    // const [restartQuiz, setRestartQuiz] = useState(false);
    const [questionMsg, setQuestionmsg] = useState(
        `${1}/${questions.length} Questions attempted`
    );

    const showQuestion = () => {
        // console.log("button clicked");

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

            console.log(questions);
        }
    };

    const retakeQuiz = () => {
        console.log("re take quiz clicked");
        setQuestionIndex(0);
        setShowQuestionWrapper(true);
        setQuestionmsg(`${1}/${questions.length} Questions attempted`);
        setChoosed(null);

        setQuestions(
            questions.map(item => {
                return {
                    question: item.question,
                    options: item.options,
                    answer: item.answer,
                    point: 0,
                };
            })
        );
    };

    const choosen = field => {
        setChoosed(field);
    };
    /*For Answer*/
    const answerChoosen = (value, questionNumber) => {
        const tempQuestions = [...questions];
        const correct = questions[questionNumber].answer;

        tempQuestions[questionNumber].answered = value;
        tempQuestions[questionNumber].point = 0;

        if (value === correct) {
            // console.log("correct");
            // console.log("question index" + questionNumber);
            setPointValue(1);
            tempQuestions[questionNumber].point = pointValue;
        } else {
            setPointValue(0);
            tempQuestions[questionNumber].point = pointValue;
        }
        console.log(tempQuestions[questionNumber]);

        setQuestions(tempQuestions);
    };

    const [obtainedPoints, setObtainedPoints] = useState(0);
    /*For Answer*/

    let totalMarks = 10 * questions.length;

    let obtainedMarks =
        10 * questions.reduce((prev, curr) => prev + curr.point, 0);

    let percentage = (obtainedMarks / totalMarks) * 100;

    /*
    const [result, setResult] = useState("test");

    
    console.log("percentage is" + percentage);
    if (percentage <= 100 && percentage >= 91) {
        setResult("A");
    } else if (percentage <= 90 && percentage >= 81) {
        setResult("B");
    } else if (percentage <= 80 && percentage >= 71) {
        setResult("C");
    } else if (percentage <= 70 && percentage >= 61) {
        setResult("D");
    } else {
        setResult("Fail");
    }
*/
    /*FOR PERCENTAGE*/
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
                                                onChange={e =>
                                                    answerChoosen(
                                                        item,
                                                        questionIndex
                                                    )
                                                }
                                                required="required"
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
                            <th width="30px">No.</th>
                            <th>Question</th>
                            <th>Otions</th>
                            <th>Answered</th>
                            <th>Correct</th>
                            <th colSpan={2}>Score</th>
                        </thead>
                        <tbody>
                            {questions.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.question}</td>
                                        <td>
                                            {item.options.map(
                                                (sitem, sindex) => {
                                                    return (
                                                        <span>
                                                            {sitem + ", "}
                                                        </span>
                                                    );
                                                }
                                            )}
                                        </td>
                                        <td>
                                            <b className="answered">
                                                {item.answered}
                                            </b>
                                        </td>
                                        <td>
                                            <b>{item.answer}</b>
                                        </td>
                                        <td colSpan={2}>{item.point}</td>
                                    </tr>
                                );
                            })}

                            <tr>
                                <td colSpan={2}>
                                    <b>Total Marks: </b> {totalMarks}
                                </td>
                                <td colSpan={2}>
                                    <b>Obtained Marks: </b>
                                    {obtainedMarks}
                                </td>
                                <td colSpan={2}>
                                    <b>Percentage: </b>
                                    {percentage}%
                                </td>
                                <td>
                                    <b>Garde: </b>
                                    {/* {result} */} showing Too many re-renders
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p></p>
                    <h2>{questionMsg}</h2>
                    <button onClick={retakeQuiz}>Start Quiz</button>
                </div>
            )}
        </div>
    );
}
export default App;

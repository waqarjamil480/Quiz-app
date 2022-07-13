import {useEffect, useState} from "react";
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
    let pointValue = 0;

    const [questionMsg, setQuestionmsg] = useState(
        `${1}/${questions.length} Questions attempted`
    );

    const [result, setResult] = useState("YA TO HOGA");
    const [obtainedPoints, setObtainedPoints] = useState(0);

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

    // const [selectedVal, setselectedVal] = React.useState("First");

    const answerChoosen = (value, questionNumber) => {
        //    console.log(event.target.value, event.target.checked)
        //     setselectedVal(event.target.value)

        const tempQuestions = [...questions];
        const correct = questions[questionNumber].answer;

        tempQuestions[questionNumber].answered = value;
        // tempQuestions[questionNumber].point = 0;
        if (value === correct) {
            // console.log("correct");
            // console.log("question index" + questionNumber);
            // setPointValue(1);
            pointValue = 1;

            tempQuestions[questionNumber].point = pointValue;
        } else {
            pointValue = 0;
            tempQuestions[questionNumber].point = pointValue;
        }
        console.log(tempQuestions[questionNumber]);

        setQuestions(tempQuestions);
    };

    /*For Answer*/

    let totalMarks = 10 * questions.length;

    let obtainedMarks =
        10 * questions.reduce((prev, curr) => prev + curr.point, 0);

    let percentage = (obtainedMarks / totalMarks) * 100;

    const showGrades = percentageValue => {
        if (percentageValue <= 100 && percentageValue >= 91) {
            return "A";
        } else if (percentageValue <= 90 && percentageValue >= 81) {
            return "B";
        } else if (percentageValue <= 80 && percentageValue >= 71) {
            return "C";
        } else if (percentageValue <= 70 && percentageValue >= 61) {
            return "C";
        } else {
            return "Fail";
        }
    };

    // useEffect(() => {
    //     showGrades(percentage);
    // }, [percentage]);

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
                                                // checked={selectedVal === item}
                                            />
                                            {item}
                                        </label>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <button onClick={showQuestion}>Show Next Question</button>
                    <br />
                    {/* <b>answer: {questions[questionIndex].answer}</b> */}

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
                            <th width="100px" colSpan={2}>
                                Score
                            </th>
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
                                                {item.answer}
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
                                    {showGrades(percentage)}
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

import "./perticipent.scss";
import React from "react";
import { useState, useEffect } from "react";
import Quize from "../quize/Quize";
import { useData } from "../../context";
import {KeyboardArrowLeft,KeyboardArrowRight,Timer} from '@material-ui/icons'
import ExecutedQuiz from "../executedQuiz/ExecutedQuiz";
export default function Perticipent() {
  const { data, dispatch } = useData();
  const [questionIndex, setquestionIndex] = useState(0);
  const [time, setTime] = useState(150)
  const [completeExam, setcompleteExam] = useState(false);
  
  const [writeAnswer, setwriteAnswer] = useState(0);
  const server = `https://quiz-app-api-nine.vercel.app`;
  const changeIndex = (direction) => {
    if (direction == "previous") {
      if (questionIndex <= 0) {
        setquestionIndex(data.examQuestion.length - 1);
      } else {
        setquestionIndex((prequestionIndex) => prequestionIndex - 1);
      }
    } else if (direction == "next") {
      if (questionIndex >= data.examQuestion.length - 1) {
        setquestionIndex(0);
      } else {
        setquestionIndex((prequestionIndex) => prequestionIndex + 1);
      }
    }
  };
  
  
  const execuate = () => {
    data.examQuestion.forEach((item) => {
      if (item.correctAnswer && item.answer) {
        if (item.correctAnswer.option == item.answer) {
          setwriteAnswer((prewriteAnswer) => prewriteAnswer + 1);
        }
      }
    });
    setcompleteExam(true);
  };
  const procesData = (data) => {
    const processedData = [...data].sort(() => 0.5 - Math.random()).slice(0, 5);
    dispatch({
      type: "examQuestion",
      value: processedData,
    });
  };
  useEffect(() => {
    fetch(`${server}/quize/?catagory=${data.quizTestCatagory}`)
      .then((res) => res.json())
      .then((data) => {
        procesData(data);
        
      });
  }, []);

  return (
    <>
      {!completeExam && (
        <div className="pertcipate">
          <div className="index">
            <div className="number">
              {`${questionIndex + 1}/${
                data.examQuestion.length > 0 ? data.examQuestion.length : ""
              }`}
            </div>
            <div className="point"><Timer/> <span>{Math.floor(time/60)} : {time%60}</span></div>
          </div>
          <div className="quizeContainer">
            {data.examQuestion[questionIndex] && (
              <Quize
                questionIndex={questionIndex}
                setquestionIndex={setquestionIndex}
              />
            )}
          </div>
          <div className="buttons">
            <button onClick={() => changeIndex("previous")}><KeyboardArrowLeft/></button>
            <button onClick={() => changeIndex("next")}><KeyboardArrowRight/></button>
            <div  onClick={() => execuate()}>Finish</div>
          </div>
        </div>
      )}
      {completeExam && (
        <div className="excequetion">
          <div className="head">
            <div className="name">
              <span>Name :</span>
              <span>Md Moshiur Rahman Masud</span>
            </div>
            <div className="catagoty">
              <span>Category :</span>
              <span>National</span>
            </div>
            <div className="mark">
              <span>Point :</span>{" "}
              <span>
                {Math.round((writeAnswer / data.examQuestion.length) * 100)}
              </span>
            </div>
            <div className="time"></div>
          </div>
          <div className="quizContainer">
            {data.examQuestion.map((item) => (
              <ExecutedQuiz item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

import { useRef, useState } from "react";

import React from "react";
import "./createQuize.scss";
import { useData } from "../../context";
import Loading from "../loading/Loading";
export default function CreateQuize() {
  const { data, dispatch } = useData();
  const [stutus, setstutus] = useState("wrong");
  const [loading, setLoading] = useState(false);
  const [createAnotherQuesion, setcreateAnotherQuesion] = useState(false);
  const [createQuestions, setcreateQuestions] = useState([]);
  const [catagory, setcatagory] = useState("javascript");
  const question = useRef();
  const option = useRef();
  const server = `https://quiz-app-api-nine.vercel.app`;
  const submitHandler = () => {
    if (question.current.value) {
      dispatch({
        type: "addOption",
        value: {
          option: option.current.value,
          stutus: stutus,
        },
      });
    } else {
    }
  };

  const sendServer = () => {
    setLoading(true);
    const serverData = {
      creatorId: "2134342g554",
      catagory: catagory,
      question: question.current.value,
      options: data.options,
    };
    fetch(`${server}/quize`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(serverData),
    })
      .then((data) => data.json())
      .then((data) => postAction(data));
  };
  const postAction = (data) => {
    setcreateQuestions((precreateQuestions) => [...precreateQuestions, data]);
    setcreateAnotherQuesion(true);
    question.current.value = "";
    option.current.value = "";
    dispatch({
      type: "clearOption",
    });
    console.log(createQuestions);
    setLoading(false);
  };
  return (
    <div className="createQuize">
      <div className="container">
        <div className="heading">Create Question</div>
        <div className="qno">
          <div className="catagory">
            <span>Catagory : </span>
            <select
              name="catagory"
              id="catagory"
              onChange={(e) => setcatagory(e.target.value)}
            >
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option selected value="javascript">
                Javascript
              </option>
              <option value="react">React</option>
              <option value="express">Express</option>
            </select>
          </div>

          <textarea
            placeholder="write your question here ..."
            ref={question}
            name="question"
            id="question"
            cols="30"
          ></textarea>

          <ul className="options">
            {data.options.map((item) => (
              <li className={item.stutus == "correct" ? "disk" : ""}>
                {item.option}
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          <label htmlFor="option">Write a Option</label>
          <input ref={option} type="text" name="option" id="option" />
          <label htmlFor="stutus">Stutus</label>
          <select
            name="stutus"
            id="stutus"
            onChange={(e) => setstutus(e.target.value)}
          >
            <option value=""></option>
            <option value="correct">Correct</option>
            <option value="wrong">Wrong</option>
          </select>
          <input type="reset" className="resetInput" value="Reset" />
          <input type="submit" value="Add" />
        </form>
        {loading && <Loading message="Saving.." loading={loading} />}
        <button onClick={sendServer} className="green">
          Submit This Question
        </button>
        <button className={createAnotherQuesion ? "green" : "displayNone"}>
          Create another
        </button>
        <div className="createdQuestion">
          {createQuestions.map((element) => (
            <div className="qno">
              <div className="question">{element.question}</div>
              <ul className="options">
                {element.options.map((item) => (
                  <li className={item.stutus == "correct" ? "disk" : ""}>
                    {item.option}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

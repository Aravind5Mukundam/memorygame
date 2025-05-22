import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";
import AssistiveTechInfo from "./components/AssistiveTechInfo";
import axios from "axios";
import GameOver from "./components/GameOver";
import ErrorCard from "./components/ErrorCard";

function App() {
  const initialFormData = { category: "animals-and-nature", number: 10 };

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (
      selectedCards.length === 2 &&
      selectedCards[0].name === selectedCards[1].name
    ) {
      setMatchedCards((prevMatchedCards) => [
        ...prevMatchedCards,
        ...selectedCards,
      ]);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (emojisData.length && matchedCards.length === emojisData.length) {
      setAreAllCardsMatched(true);
    }
  }, [emojisData,matchedCards]);

  const handleFormChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const startGame = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://emojihub.yurace.pro/api/all/category/${formData.category}`
      );
      if (response.status !== 200) {
        throw new Error("could not fetch the data");
      }
      const data = await response.data;
      const dataSlice = await getDataSlice(data);
      const emojisArray = await getEmojisArray(dataSlice);
      setEmojisData(emojisArray);
      setIsGameOn(true);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsFirstRender(false);
    }
  };

  const getDataSlice = async (data) => {
    const randomIndices = getRandomIndices(data);
    const dataSlice = randomIndices.map((index) => data[index]);

    return dataSlice;
  };

  const getRandomIndices = (data) => {
    const randomIndicesArray = [];

    for (let i = 0; i < formData.number / 2; i++) {
      const randomNum = Math.floor(Math.random() * data.length);
      if (!randomIndicesArray.includes(randomNum)) {
        randomIndicesArray.push(randomNum);
      } else {
        i--;
      }
    }
    return randomIndicesArray;
  };

  const getEmojisArray = async (data) => {
    const pairedEmojisArray = [...data, ...data];

    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pairedEmojisArray[i];
      pairedEmojisArray[i] = pairedEmojisArray[j];
      pairedEmojisArray[j] = temp;
    }
    return pairedEmojisArray;
  };
  const turnCard = (name, index) => {
    if (selectedCards.length < 2) {
      setSelectedCards((prevSelectedCards) => [
        ...prevSelectedCards,
        { name, index },
      ]);
    } else if (selectedCards.length === 2) {
      setSelectedCards([{ name, index }]);
    }
  };

  const resetGame = () => {
    setIsGameOn(false);
    setSelectedCards([]);
    setMatchedCards([]);
    setAreAllCardsMatched(false);
  };
  const resetError = () => {
    setIsGameOn(false);
    setSelectedCards([]);
    setMatchedCards([]);
    setAreAllCardsMatched(false);
    setIsError(false);
  };
  return (
    <React.Fragment>
      <main>
        <h1>Memory</h1>
        {!isGameOn && !isError && (
          <Form
            handleSubmit={startGame}
            handleChange={handleFormChange}
            isFirstRender={isFirstRender}
          />
        )}
        {isGameOn && !areAllCardsMatched && (
          <AssistiveTechInfo
            emojisData={emojisData}
            matchedCards={matchedCards}
          />
        )}
        {areAllCardsMatched && <GameOver handleClick={resetGame} />}
        {isGameOn && (
          <MemoryCard
            handleClick={turnCard}
            data={emojisData}
            selectedCards={selectedCards}
            matchedCards={matchedCards}
          />
        )}
        {isError && <ErrorCard handleClick={resetError} />}
      </main>
    </React.Fragment>
  );
}

export default App;

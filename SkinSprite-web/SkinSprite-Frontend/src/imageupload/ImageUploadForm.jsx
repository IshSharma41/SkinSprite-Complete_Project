import React, { useState } from 'react';
import axios from 'axios';
// const API_KEY = ''; 

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const [responsePredictions, setResponsePredictions] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const filteredPredictions = Object.entries(response.data.prediction)
        .filter(([_, value]) => value > 5)
        .map(([prediction, value]) => ({ prediction, value: Math.floor(value * 100) / 100 }));

      setResponsePredictions(filteredPredictions);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleAskQuestion = async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: 'text-davinci-003',
        messages: [
          { role: 'user', content: question },
          { role: 'assistant', content: 'I\'m happy to help! What would you like to know?' },
        ],
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      });

      setAnswer(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error asking question:', error);
    }
  };

  return (
    <div className="medical-image-upload">
      <h1 className="upload-title">SkinSprite</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <label htmlFor="image" className="upload-label">
          Select Image for :
        </label>
        <input type="file" name="image" id="image" accept="image/*" onChange={handleImageChange} required />
        <button type="submit" className="upload-button">
          Upload Image
        </button>
      </form>
      {responsePredictions.length > 0 && (
        <div className="prediction-container">
          <h2>Predictions:</h2>
          <ul>
            {responsePredictions.map(({ prediction, value }) => (
              <li key={prediction}>
                {prediction}: {value.toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="chatbot-container">
        <h2>Ask a Question:</h2>
        <input type="text" value={question} onChange={handleQuestionChange} placeholder="Enter your question" />
        <button onClick={handleAskQuestion} className="ask-button">
          Ask
        </button>
        {answer && <p className="answer">{answer}</p>}
      </div>
    </div>
  );
};

export default ImageUploadForm;

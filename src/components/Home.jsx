import React, { useState } from 'react';
import '../styles/Home.css';
import { callGeminiAPI } from './Gemini';



function Home() {
  const [prompt, setPrompt] = useState('');
  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className='home-container'>
        <div className='home-title-container'>
          <h1>Welcome to [Shellhacks Project Name]</h1>
        </div>
        <div className='home-body-container'>
          <h3>
            To help combat the lack of financial literacy, especially in minority and
            low income communities, we have made a web app designed to educate people about building
            credit.
          </h3>
        </div>
        <input 
          type="text" 
          value={prompt}
          onChange={handleInputChange}
          placeholder="Enter your prompt here..." 
        />
        <button onClick={() => callGeminiAPI(prompt)}>Run Gemini Test</button>
        <h1></h1>
        <div className='steps-container'>
          <div className='step'>
            <h4>
              1. Create an account and fill out all the information needed to run an analysis
            </h4>
          </div>
          <div className='step'>
            <h4>
              2. Run the analysis to see where your strengths and weaknesses are for you to improve your credit
            </h4>
          </div>
          <div className='step'>
            <h4>
              3. Keep coming back and updating your information to track your credit progress over time and keep improving
            </h4>
          </div>
        </div>
        

      </div>
    );
  }
    
export default Home;
    
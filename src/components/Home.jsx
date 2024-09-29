import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import { callGeminiAPI } from './Gemini';


function Home() {
  const [data, setData] = useState(null);
  useEffect(() => {
      const loadData = async () => {
          const userId = localStorage.getItem('userID');
          const response = await fetch(`http://localhost:8000/info/${userId}`);
          const data = await response.json();
          setData(data.data);
          console.log(data.data);
        }
      loadData();
  }, []);

  const prompt = `I'm going to provide you with some financial characteristics of a person. I want you to give me a value from 0 to 1.0 for each characteristics besides the age, country, or current credit score based on how significantly they might be negatively effecting the persons credit in the future. You can also think of it as the things that most positively would effect their credit if the person changed them. In other words, the higher the 'derivative' of future credit with respect to that characteristic, the closer the value for the characteristic should be to 1.0. Even though you're not giving the all of the values a rating, I want you to keep all of the characteristics in mind when considering the ratings. The format of your answer should be a json. Don't provide any explination. Just the json. Don't include '''json before or after your answer. Here's an example:

{
  "creditDebt": 0.0,
  "creditUtilization": 0.8,
  "employmentStatus": 0.6,
  "monthlyExpenses": 0.5,
  "monthlyIncome": 0.7,
  "onTimePayments": 0.9,
  "openCreditAccounts": 0.3,
  "totalSavings": 0.2,
  "otherDebt": 0
}

Your answer should have exactly 9 fields consistent of every field in the example json. Those numbers aren't accurate. Just an example.

Here's the data set:

${JSON.stringify(data)}`;

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

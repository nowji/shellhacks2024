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

  const prompt = `I'm developing a program that takes info from a user and helps them to improve their financial attributes with the goal of increasing their credit score. I'm going to give you a stringified JSON of 12 financial attributes of a user. I want you to assign each attribute a value between 0 and 100. This value will signify how much improvement that attribute needs. It should take in to account how much that attribute effects credit, how poor the user's number for that attribute is, and also be relative to the other attributes. This means that even if a number if very bad, if it doesn't effect credit as much as the other attributes, that should be taken in to account. Or, if an attribute isn't too bad, but all the other attributes are very good, that attribute is relatively bad and should be given a higher value. You need to consider the effect the attributes and their values might have on credit. A high income would have a positive impact and therefore a low negative effect on credit.

Important clarifications: You will not give a score for age, country, or current credit score. creditUtilization and onTimePayments are expressed as a percent (if they have a 100 for onTimePayments, they've paid off 100% of their payments on time). creditDebt, monthlyExpenses, monthlyIncome, totalSavings, and otherDebt are expressed in a dollar amount.

The output should be formatted as a JSON that can be turned in to an actual JSON without error. Do not include anything other than the curly brackets and key value pairs inside.

Here is an example output. The numbers are not accurate. It is just a format example:
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

Here's the actual data set:
${JSON.stringify(data)}`;

  return (
    <div className='home-container'>
        <div className='home-title-container'>
          <h1 class="title">Welcome to FinSight</h1>
        </div>
        <div className='home-body-container'>
          <h3 class="description">
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

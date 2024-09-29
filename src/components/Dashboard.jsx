import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { callGeminiAPI } from './Gemini';
import { GaugeComponent } from 'react-gauge-component';



function Dashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const userId = localStorage.getItem('userID');
            const response = await fetch(`http://localhost:8000/info/${userId}`);
            const data = await response.json();
            console.log(data);
            setData(data.data);
        };
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
    const navigate = useNavigate(); // Initialize the useNavigate hook
    console.log(prompt);
    const handleBeginAnalysis = () => {
        navigate('/Info');
    };

    return (
        <div className='dashboard-container'>
          <h2>Welcome to your Dashboard</h2>
          {data ? (
            <div className='info-dashboard-container'>
              <div className='info-bullet'>
                <h4>Age: {data.age}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Country: {data.country}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Employment Status: {data.employmentStatus}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Credit Score: {data.creditScore}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Credit Utilization: {data.creditUtilization}%</h4>
              </div>
              <div className='info-bullet'>
                <h4>On Time Payments: {data.onTimePayments}%</h4>
              </div>
              <div className='info-bullet'>
                <h4>Open Credit Accounts: {data.openCreditAccounts}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Credit Debt: ${data.creditDebt}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Other Debt: ${data.otherDebt}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Monthly Income: ${data.monthlyIncome}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Monthly Expenses: ${data.monthlyExpenses}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Total Savings: ${data.totalSavings}</h4>
              </div>
            </div>
          ):(
            <div>
              <h4>No information to display yet</h4>
            </div>
          )
        }
        <button className='begin-analysis-button' onClick={handleBeginAnalysis}>{data ? "Update" : "Begin Analysis"}</button>
        {data ? <button className='begin-analysis-button' onClick={() => callGeminiAPI(prompt)}>{"Run Analysis"}</button> : <></>}

        <GaugeComponent
          type="semicircle"
          arc={{
            colorArray: ['#B589D6', '#552586'],
            padding: 0.02,
            subArcs:
              [
                { limit: 40 },
                { limit: 60 },
                { limit: 70 },
                {},
                {},
                {},
                {}
              ]
          }}
          pointer={{type: "blob", animationDelay: 0 }}
          value={50}
        />

        </div>
      );
    }

    export default Dashboard;

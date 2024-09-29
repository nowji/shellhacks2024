import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Analysis.css';
import { callGeminiAPI } from './Gemini';
import { GaugeComponent } from 'react-gauge-component';

const renderGauge = (value) => {
    return (
      <GaugeComponent
        type="semicircle"
        arc={{
          colorArray: ['#B589D6', '#552586'],
          padding: 0.02,
          subArcs: [
            { limit: 40 },
            { limit: 60 },
            { limit: 70 },
            {}, {}, {}, {}
          ]
        }}
        pointer={{ type: "blob", animationDelay: 0 }}
        value={value !== undefined ? value : -1}  // Set default value if undefined
      />
    );
  };

function Analysis() {
    const [data, setData] = useState(null);
    const [aiData, setAiData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const userId = localStorage.getItem('userID');
            const response = await fetch(`http://localhost:8000/info/${userId}`);
            const data = await response.json();
            setData(data.data);

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

            const temp = await callGeminiAPI(prompt);
            setAiData(temp);
        };
        loadData();
    }, []);
    const navigate = useNavigate(); // Initialize the useNavigate hook

    return (
        <div class="analysis">
        <h1 class="analysis-title">Improvement Gauges</h1>
        <div class="desc-wrapper">
        <h4 class="desc">These gauges represent areas you can improve in to increase your credit score.
             The higher gauges represent areas that are more significantly lowering your credit.
             Working on the higher ones first to more effectively improve your credit score!
        </h4>
        </div>
        <div className='analysis-container'>
            <div className='gauge-container'>
                <h4>Credit Debt</h4>
                {renderGauge(aiData && aiData.creditDebt)}
            </div>
            <div className='gauge-container'>
                <h4>Credit Utilization</h4>
                {renderGauge(aiData && aiData.creditUtilization)}
            </div>
            <div className='gauge-container'>
                <h4>Employment Status</h4>
                {renderGauge(aiData && aiData.employmentStatus)}
            </div>
            <div className='gauge-container'>
                <h4>Monthly Expenses</h4>
                {renderGauge(aiData && aiData.monthlyExpenses)}
            </div>
            <div className='gauge-container'>
                <h4>Monthly Income</h4>
                {renderGauge(aiData && aiData.monthlyIncome)}
            </div>
            <div className='gauge-container'>
                <h4>On Time Payments</h4>
                {renderGauge(aiData && aiData.onTimePayments)}
            </div>
            <div className='gauge-container'>
                <h4>Open Credit Accounts</h4>
                {renderGauge(aiData && aiData.openCreditAccounts)}
            </div>
            <div className='gauge-container'>
                <h4>Other Debt</h4>
                {renderGauge(aiData && aiData.otherDebt)}
            </div>
            <div className='gauge-container'>
                <h4>Total Savings</h4>
                {renderGauge(aiData && aiData.totalSavings)}
            </div>
        </div>
        </div>
      );
    }

    export default Analysis;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';


function Dashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const userId = localStorage.getItem('userID');
            const response = await fetch(`http://localhost:8000/info/${userId}`);
            const data = await response.json();
            console.log(data);
            setData(data.data); // Set the fetched data to state
        };
        loadData(); // Call loadData function
    }, []);

    console.log(localStorage.getItem('userID'));
    const navigate = useNavigate(); // Initialize the useNavigate hook

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
                <h4>Credit Debt: ${data.creditDebt}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Credit Score: {data.creditScore}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Credit Score: {data.creditScore}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Credit Utilization: {data.creditUtilization}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Employment Status: {data.employmentStatus}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Monthly Expenses: {data.monthlyExpenses}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Monthly Income: ${data.monthlyIncome}</h4>
              </div>
              <div className='info-bullet'>
                <h4>On Time Payments: {data.onTimePayments}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Open Credit Accounts: {data.openCreditAccounts}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Other Debt: {data.otherDebt}</h4>
              </div>
              <div className='info-bullet'>
                <h4>Total Savings: {data.totalSavings}</h4>
              </div>
            </div>
          ):(
            <div>
              <h4>No information to display yet</h4>
            </div>
          )
        }
        <button className='begin-analysis-button' onClick={handleBeginAnalysis}>{data ? "Update" : "Begin Analysis"}</button>
        </div>
      );
    }

    export default Dashboard;

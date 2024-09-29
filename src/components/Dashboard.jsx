// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { callGeminiAPI } from "./Gemini";

const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();

  // State variables for all the fields
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [creditDebt, setCreditDebt] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [creditUtilization, setCreditUtilization] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [onTimePayments, setOnTimePayments] = useState("");
  const [openCreditAccounts, setOpenCreditAccounts] = useState("");
  const [otherDebt, setOtherDebt] = useState("");
  const [totalSavings, setTotalSavings] = useState("");

  // State for storing Gemini API response
  const [geminiResponse, setGeminiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch existing data on component load
  useEffect(() => {
    const loadData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const userId = localStorage.getItem("userID");

        const response = await fetch(`http://localhost:8000/info/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        if (result.success && result.data) {
          setAge(result.data.age || "");
          setCountry(result.data.country || "");
          setCreditDebt(result.data.creditDebt || "");
          setCreditScore(result.data.creditScore || "");
          setCreditUtilization(result.data.creditUtilization || "");
          setEmploymentStatus(result.data.employmentStatus || "");
          setMonthlyExpenses(result.data.monthlyExpenses || "");
          setMonthlyIncome(result.data.monthlyIncome || "");
          setOnTimePayments(result.data.onTimePayments || "");
          setOpenCreditAccounts(result.data.openCreditAccounts || "");
          setOtherDebt(result.data.otherDebt || "");
          setTotalSavings(result.data.totalSavings || "");
          setGeminiResponse(result.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    loadData();
  }, [getAccessTokenSilently]);

  // Input validation functions
  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setAge(value);
    }
  };

  const handleCreditDebtChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setCreditDebt(value);
    }
  };

  const handleCreditScoreChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setCreditScore(value);
    }
  };

  // Function to handle the Gemini API call
  const handleGeminiAPICall = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = await getAccessTokenSilently();

      const inputData = {
        age,
        country,
        creditDebt,
        creditScore,
        creditUtilization,
        employmentStatus,
        monthlyExpenses,
        monthlyIncome,
        onTimePayments,
        openCreditAccounts,
        otherDebt,
        totalSavings,
      };

      const result = await callGeminiAPI(inputData, token);
      setGeminiResponse(result);
      console.log("Gemini API Response:", result);
    } catch (error) {
      setError("Error making secure API call");
      console.error("Error making secure API call:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to your Dashboard</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {geminiResponse ? (
        <div className="info-dashboard-container">
          {/* Display all the information from Gemini API response */}
          <div className="info-bullet">
            <h4>Age: {geminiResponse.age}</h4>
          </div>
          <div className="info-bullet">
            <h4>Country: {geminiResponse.country}</h4>
          </div>
          <div className="info-bullet">
            <h4>Credit Debt: ${geminiResponse.creditDebt}</h4>
          </div>
          <div className="info-bullet">
            <h4>Credit Score: {geminiResponse.creditScore}</h4>
          </div>
          <div className="info-bullet">
            <h4>Credit Utilization: {geminiResponse.creditUtilization}</h4>
          </div>
          <div className="info-bullet">
            <h4>Employment Status: {geminiResponse.employmentStatus}</h4>
          </div>
          <div className="info-bullet">
            <h4>Monthly Expenses: {geminiResponse.monthlyExpenses}</h4>
          </div>
          <div className="info-bullet">
            <h4>Monthly Income: ${geminiResponse.monthlyIncome}</h4>
          </div>
          <div className="info-bullet">
            <h4>On Time Payments: {geminiResponse.onTimePayments}</h4>
          </div>
          <div className="info-bullet">
            <h4>Open Credit Accounts: {geminiResponse.openCreditAccounts}</h4>
          </div>
          <div className="info-bullet">
            <h4>Other Debt: {geminiResponse.otherDebt}</h4>
          </div>
          <div className="info-bullet">
            <h4>Total Savings: {geminiResponse.totalSavings}</h4>
          </div>
        </div>
      ) : (
        <div>
          <h4>No information to display yet</h4>
        </div>
      )}
      <div className="form">
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={handleAgeChange}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="Credit Debt"
          value={creditDebt}
          onChange={handleCreditDebtChange}
        />
        <input
          type="text"
          placeholder="Credit Score"
          value={creditScore}
          onChange={handleCreditScoreChange}
        />
        <input
          type="text"
          placeholder="Credit Utilization"
          value={creditUtilization}
          onChange={(e) => setCreditUtilization(e.target.value)}
        />
        <input
          type="text"
          placeholder="Employment Status"
          value={employmentStatus}
          onChange={(e) => setEmploymentStatus(e.target.value)}
        />
        <input
          type="text"
          placeholder="Monthly Expenses"
          value={monthlyExpenses}
          onChange={(e) => setMonthlyExpenses(e.target.value)}
        />
        <input
          type="text"
          placeholder="Monthly Income"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
        />
        <input
          type="text"
          placeholder="On Time Payments"
          value={onTimePayments}
          onChange={(e) => setOnTimePayments(e.target.value)}
        />
        <input
          type="text"
          placeholder="Open Credit Accounts"
          value={openCreditAccounts}
          onChange={(e) => setOpenCreditAccounts(e.target.value)}
        />
        <input
          type="text"
          placeholder="Other Debt"
          value={otherDebt}
          onChange={(e) => setOtherDebt(e.target.value)}
        />
        <input
          type="text"
          placeholder="Total Savings"
          value={totalSavings}
          onChange={(e) => setTotalSavings(e.target.value)}
        />
      </div>
      <button className="begin-analysis-button" onClick={handleGeminiAPICall}>
        {geminiResponse ? "Update" : "Begin Analysis"}
      </button>
    </div>
  );
};

export default Dashboard;

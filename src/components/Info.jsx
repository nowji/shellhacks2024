import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Info.css';

function Info() { 
  const [formData, setFormData] = useState({
    age: '',
    country: '',
    employmentStatus: '',
    creditScore: '',
    openCreditAccounts: '',
    creditDebt: '',
    creditUtilization: '',
    onTimePayments: '',
    monthlyIncome: '',
    monthlyExpenses: '',
    otherDebt: '',
    totalSavings: ''
  });
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
      const loadData = async () => {
          const userId = localStorage.getItem('userID');
          const response = await fetch(`http://localhost:8000/info/${userId}`);
          const data = await response.json();
          console.log(data.data);
          setData(data.data);
          if (data.data) {
            setData(data.data);
            setFormData(prevState => ({
                ...prevState,
                ...data.data // Spread the fetched data into formData
            }));
        }
      };
      loadData();
  }, []);

    console.log(localStorage.getItem('userID'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const collectData = async () => {
      let id = localStorage.getItem('userID');
      formData.userId = id; // Add id to formData

      const result = await fetch("http://localhost:8000/info", {
        method: "POST",
        body: JSON.stringify( { id, formData }),
        headers:{
          'Content-Type':'application/json'
        }
      });
    }
    collectData();

    navigate("/dashboard");
  };


  return (
  <div className='info-container'>
    <h2>Enter your Financial Information</h2>
      <form onSubmit={handleSubmit} className="info-form">
        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>

        <div>
          <label>Country of Residence:</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} required />
        </div>

        <div>
          <label>Employment Status:</label>
          <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Unemployed">Unemployed</option>
          </select>
        </div>

        <div>
          <label>Current Credit Score:</label>
          <input type="number" name="creditScore" value={formData.creditScore} onChange={handleChange} required />
        </div>

        <div>
          <label>Number of Open Credit Accounts:</label>
          <input type="number" name="openCreditAccounts" value={formData.openCreditAccounts} onChange={handleChange} required />
        </div>

        <div>
          <label>Total Credit Card Debt:</label>
          <input type="number" name="creditDebt" value={formData.creditDebt} onChange={handleChange} required />
        </div>

        <div>
          <label>Credit Utilization (%):</label>
          <input type="number" name="creditUtilization" value={formData.creditUtilization} onChange={handleChange} required />
        </div>

        <div>
          <label>On-Time Payments Last 12 Months (%):</label>
          <input type="number" name="onTimePayments" value={formData.onTimePayments} onChange={handleChange} required />
        </div>

        <div>
          <label>Monthly Income:</label>
          <input type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} required />
        </div>

        <div>
          <label>Monthly Expenses:</label>
          <input type="number" name="monthlyExpenses" value={formData.monthlyExpenses} onChange={handleChange} required />
        </div>

        <div>
          <label>Total Other Debt:</label>
          <input type="number" name="otherDebt" value={formData.otherDebt} onChange={handleChange} required />
        </div>

        <div>
          <label>Total Savings:</label>
          <input type="number" name="totalSavings" value={formData.totalSavings} onChange={handleChange} required />
        </div>

        <button className='info-submit-button' type="submit">Submit</button>
      </form>
  </div>
  );
}

export default Info;

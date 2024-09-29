import React, { useState, useEffect } from 'react';
import '../styles/Home.css';


function Home() {
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
        <h1></h1>
        <div className='steps-container'>
          <div className='step'>
            <h4>
              1. Create an account and fill out all the information needed to run an analysis
            </h4>
          </div>
          <div className='step'>
            <h4>
              2. Run the analysis to see where your strengths and weaknesses lie in order to improve your credit
            </h4>
          </div>
          <div className='step'>
            <h4>
              3. Keep coming back and updating your information to track your credit progress over time and keep improving
            </h4>
          </div>
        </div>
        <h1 class="about-title">About</h1>
        <p class="about-p">This app is a product of Neema Owji, James Phillips, and Miraziz Akmalov participating in the 2024
        Shellhacks compeition. Our mission was to address the disproportionate financial barriers faced by minorities, offering clear and actionable steps to
        improve credit scores, manage debt, and build strong financial habits. Using the MERN stack integrated
        with the Google Cloud Platform and Gemini language model, this interactive and straightfoward application can
         analyze credit habits in order to give a push in the right direction for those in tough spots. Regardless
        of background or education, this application provides an accessible route to a financially fluent world. </p>
      </div>
    );
  }

export default Home;

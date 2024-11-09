import React, { useState } from 'react';
import "./App.css";
import "./Quote.jsx";
import quotebook from "./quotebook.png";

function App() {
	const [name, setName] = useState('');
	const [message, setMessage] = useState('');	
	const [age, setAge] = useState('');
	const [quotes, setQuotes] = useState([]);
  
	useEffect(() => { fetchQuotes() }, []);
	
	async function handleSubmit(){
		preventDefault();
		const response = await fetch('/api/quote', { method: 'POST'});

	}

	async function fetchQuotes() {
		const response = await fetch('./database.json');
		const data = await response.json();
		setQuotes(data);
	}
	
	return (

    <div className="App">
      {/* TODO: include an icon for the quote book */}
      <img className="logo" src={quotebook} alt="quotebook logo goes here" />
      <h1>Hack at UCI Tech Deliverable</h1>

      <h2>Submit a quote</h2>
      {/* TODO: implement custom form submission logic to not refresh the page */}
      <form action="/api/quote" method="post">
        <div>
          <label className="name" htmlFor="input-name">
            Name
          </label>
          <input type="text" name="name" id="input-name" required />
        </div>
        <label className="quotebox" htmlFor="input-message">Quote</label>
        <input type="text" name="message" id="input-message" required />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      <h2>Previous Quotes</h2>
      {/* TODO: Display the actual quotes from the database */}

      <div class="dropdown">
        <button class="dropbtn">Sort By</button>
        <div class="dropdown-content">
          <a href="http://localhost:5173/quote?age=7">Last week</a>
          <a href="http://localhost:5173/quote?age=30">Last month</a>
          <a href="http://localhost:5173/quote?age=365">Last year</a>
          <a href="http://localhost:5173/quote?age=">All time</a>
        </div>
      </div>

      <div className="messages"></div>

    </div>
  );
}

export default App;

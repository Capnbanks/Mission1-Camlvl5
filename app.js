const express = require('express');
const cors = require("cors")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT
//middleware
app.use(cors())
app.use(express.json())//parsing Json to Js object


//API 1
function calculateCarValue(data) {
    // Check if input data is valid
    if (!data.hasOwnProperty("model") || !data.hasOwnProperty("year") || data.model === "") {
        return { car_value: "Invalid input. Both 'model' and 'year' parameters are required." };
    }

    const { model, year } = data;

    // Validate year
    if (isNaN(year) || year < 0 || !Number.isInteger(year)) {
        return { car_value: "Invalid year. Please provide a valid numeric year." };
    }
 
     // Check if year is 0
     if (year <= 1900) {
        return { car_value: "Invalid year. Year 0 is out of range." };
    }


    // Calculate car value
    const cleanedModel = model.replace(/[^a-zA-Z]/g, ''); // Remove non-alphabetic characters
    const value = [...cleanedModel.toUpperCase()].reduce((acc, char) => acc + char.charCodeAt(0) - 64, 0) * 100 + year;

    return { car_value: value };
}


app.get('/API1', (req, res) => {
    const input_data = { model: "Civic", year: 2014 };
    const output = calculateCarValue(input_data);
    console.log(output); // Output: { car_value: 6614 }
    res.json(output);
});


//API 2

function calculateRiskRating(data) {
    // Check if input data is valid
    if (!data.hasOwnProperty("claim_history")) {
        return { error: "Invalid input. 'claim_history' parameter is required." };
    }

    const { claim_history } = data;

    // Count occurrences of keywords
    const keywords = ["collide", "crash", "scratch", "bump", "smash"];
    let riskRating = 0;
    keywords.forEach(keyword => {
        const regex = new RegExp(keyword, "gi"); // Case insensitive search
        const occurrences = (claim_history.match(regex) || []).length;
        riskRating += occurrences;
    });

    // Map risk rating to a range between 1 and 5
    riskRating = Math.min(Math.max(riskRating, 1), 5);

    return { risk_rating: riskRating };
}

// Test the function

app.get('/API2',(req,res) => {
const input_data = { claim_history: "My only claim was a crash into my house's garage door that left a scratch on my car. There are no other crashes." };
const output2 = calculateRiskRating(input_data);
console.log(output2); // Output: { risk_rating: 3 }
res.json(output2);

} )

//API3  

function calculateQuote(data) {
    // Check if input data is valid
    if (!data.hasOwnProperty("car_value") || !data.hasOwnProperty("risk_rating")) {
        return { error: "Invalid input. Both 'car_value' and 'risk_rating' parameters are required." };
    }

    const { car_value, risk_rating } = data;

    // Validate car value
    if (isNaN(car_value) || car_value <= 0) {
        return { error: "Invalid car value. Please provide a valid numeric value." };
    }

    // Validate risk rating
    if (isNaN(risk_rating) || risk_rating < 1 || risk_rating > 5 || !Number.isInteger(risk_rating)) {
        return { error: "Invalid risk rating. Please provide a rating between 1 and 5." };
    }

    // Calculate yearly premium
    const yearlyPremium = car_value * risk_rating / 100;

    // Calculate monthly premium
    const monthlyPremium = yearlyPremium / 12;

    return { monthly_premium: monthlyPremium.toFixed(2), yearly_premium: yearlyPremium.toFixed(2) };
}

// Test the function

app.get('/API3', (req,res) => {
const input_data = { car_value: 6614, risk_rating: 5 };
const output3 = calculateQuote(input_data);
console.log(output3); // Output: { monthly_premium: "27.50", yearly_premium: "330.70" }
res.json(output3)
})



//test
app.get("/test", (req,res) => {
    res.send("Hello world!");
    console.log(req.body);
})


//exports for testing
module.exports = {
    calculateCarValue,
calculateRiskRating,
calculateQuote
};









//port

app.listen(PORT,(err)=>{
    if(err) {
        console.log(err);
    }else {
        console.log(`server listening on http://localhost:${PORT}`);
    }
})

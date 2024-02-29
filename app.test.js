const {
  calculateCarValue,
  calculateRiskRating,
  calculateQuote,
} = require("./app");
//api1
test("Calculate the cars value", () => {
  const input = { model: "Civic", year: 2014 };
  const output = calculateCarValue(input);
  expect(output.car_value).toBe(6614);
});
//api2
test("Calculate risk rating", () => {
  const input_data = {
    claim_history:
      "My only claim was a crash into my house's garage door that left a scratch on my car. There are no other crashes.",
  };
  const output = calculateRiskRating(input_data);
  expect(output).toEqual({ risk_rating: 3 });
});
//api3
test("Calculate insurance quote", () => {
  const input_data = { car_value: 6614, risk_rating: 5 };
  const output = calculateQuote(input_data);
  expect(output).toEqual({
    monthly_premium: "27.56",
    yearly_premium: "330.70",
  });
});

//Task 5

//test 1
test("Sunny day scenario", () => {
    const input = { model: "Civic", year: 2020 };
    const output = calculateCarValue(input);
    expect(output.car_value).toBe(6620);
  });

  //test 2
  test("Numbers only is ok", () => {
    const input = { model: "911", year: 2020 };
    const output = calculateCarValue(input);
    expect(output.car_value).toBe(2020);
  });

  //test 3
  test("Negative year", () => {
    const input = { model: "Task-Force", year: -987 };
    const output = calculateCarValue(input);
    expect(output.car_value).toBe("Invalid year. Please provide a valid numeric year.");
});

//test 4
test("Wrong data type", () => {
  const input = { model: "C200", year: "twenty twenty" };
  const output = calculateCarValue(input);
  // Check if the car_value property contains the expected error message
  if (isNaN(input.year) || input.year < 0 || !Number.isInteger(input.year)) {
      expect(output.car_value).toBe("Invalid year. Please provide a valid numeric year.");
  } else {
      expect(output.car_value).toBe("Invalid input. Both 'model' and 'year' parameters are required.");
  }
});

//task 6

test("Testing alphabetic characters", () => {
  const input = { model: "Accord", year: 2022 };
  const output = calculateCarValue(input);
  expect(output.car_value).toBe(6422);
});
//Testing lowercase characters
test("Testing lowercase characters", () => {
  const input = { model: "Golf", year: 2023 };
  const output = calculateCarValue(input);
  expect(output.car_value).toBe(6023);
});
//Testing different year
test("Testing different year", () => {
  const input = { model: "Corolla", year: 2019 };
  const output = calculateCarValue(input);
  expect(output.car_value).toBe(9619);
});
//Empty model
test("Empty model", () => {
  const input = { model: "", year: 2020 };
  const output = calculateCarValue(input);
  expect(output.car_value).toBe("Invalid input. Both 'model' and 'year' parameters are required.");
});
//Testing space and non-alphabetic characters
test("Testing space and non-alphabetic characters", () => {
  const input = { model: "Model S", year: 2025 };
  const output = calculateCarValue(input);
  expect(output.car_value).toBe(8825);
});
//Testing year boundary (0)
test("Testing year boundary (0)", () => {
  const input = { model: "M3", year: 0 };
  const output = calculateCarValue(input);
  expect(output.car_value).toBe("Invalid year. Year 0 is out of range.");
});
//Testing year boundary (0)
test("Testing year boundary (0)", () => {
  const input = { model: "M3", year: 588 };
  const output = calculateCarValue(input);
  expect(output.car_value).toBe("Invalid year. Year 0 is out of range.");
});


//Testing a different model
test("Testing a different model", () => {
  const input = { model: "CR-V", year: 2022 };
  const output = calculateCarValue(input);
  expect(output.car_value).toBe(6322);
});
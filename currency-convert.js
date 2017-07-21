// USD EUR 55
// 23 USD = ?? EUR. You can use EUR in the following countries:

const axios = require('axios');

const getExchangeRate = (from, to) => {
	return axios.get(`http://api.fixer.io/latest?base=${from}`).then((res) => {
		return res.data.rates[to];
	});
}

const getCountries = (currencyCode) => {
	return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((res) => {
		return res.data.map((country) => country.name);
	})
}

// const convertCurrency = (from, to, amount) => {
// 	let countries;
// 	return getCountries(to).then((tempCountries) => {
// 		countries = tempCountries;
// 		return getExchangeRate(from, to);
// 	}).then((rate) => {
// 		const exchangeAmount = amount * rate;

// 		return `${amount} ${from} is worth ${exchangeAmount.toFixed(2)} ${to}. ${to} can be used at the following countries: ${countries.join(', ')}.`;
// 	})
// }

const convertCurrency = async (from, to, amount) => {
	const rate = await getExchangeRate(from, to);
	const exchangeAmount = rate * amount;
	const countries = await getCountries(to);

	return `${amount} ${from} is worth ${exchangeAmount.toFixed(2)} ${to}. ${to} can be used at the following countries: ${countries.join(', ')}.`;

}

convertCurrency('USD', 'EUR', 100).then((res) => {
	console.log(res);
})


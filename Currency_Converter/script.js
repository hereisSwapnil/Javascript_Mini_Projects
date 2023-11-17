async function addSelectOptions() {
    const url = 'https://currency-exchange.p.rapidapi.com/listquotes';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4ccc198a8cmsh93b29863c1316bbp1cdb41jsn78f64c5fbf92',
            'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        let result = await response.text();
        console.log(result);
        let fromCurrency = document.getElementById('fromCurrency');
        let toCurrency = document.getElementById('toCurrency');
        result = JSON.parse(result)
        result.forEach(options => {
            let option = document.createElement("option")
            option.value = options
            option.text = options
            fromCurrency.appendChild(option)
            toCurrency.appendChild(option.cloneNode(true))
        })
        fromCurrency.value = "USD";
        toCurrency.value = "INR";
    } catch (error) {
        console.error(error);
    }
}


async function convertCurrency() {
    let fromCurrency = document.getElementById('fromCurrency');
    let toCurrency = document.getElementById('toCurrency');
    let amountInput = document.getElementById('amount');
    let amountOutput = document.getElementById('amountOutput');
    let rate = 1;
    rate = await getExchangeRate(fromCurrency.value, toCurrency.value)
    amountOutput.innerText = rate * amountInput.value;
}


async function getExchangeRate(fromCurrency, toCurrency) {
    const url = `https://currency-exchange.p.rapidapi.com/exchange?from=${fromCurrency}&to=${toCurrency}&q=1`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4ccc198a8cmsh93b29863c1316bbp1cdb41jsn78f64c5fbf92',
            'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return parseFloat(result);
    } catch (error) {
        throw new Error('Error fetching exchange rate from the API');
    }
}

window.onload = function () {
    addSelectOptions();
};
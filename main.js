document.addEventListener("DOMContentLoaded", function () {
  const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";
  const amountInput = document.getElementById("amount");
  const fromCurrencySelect = document.getElementById("fromCurrency");
  const toCurrencySelect = document.getElementById("toCurrency");
  const convertButton = document.getElementById("convertButton");
  const resultDiv = document.getElementById("result");

  let exchangeRates = {};

  async function fetchExchangeRates() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      exchangeRates = data.rates;
    } catch (error) {
      console.error("Valyuta kurslarini olishda xato yuz berdi:", error);
    }
  }

  function convertCurrency(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount;
    const baseAmount = amount / exchangeRates[fromCurrency];
    return baseAmount * exchangeRates[toCurrency];
  }

  convertButton.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
      resultDiv.textContent = "Iltimos, to'g'ri summa kiriting.";
      return;
    }

    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      resultDiv.textContent = "Valyuta topilmadi.";
      return;
    }

    const result = convertCurrency(amount, fromCurrency, toCurrency);
    resultDiv.textContent = `${amount} ${fromCurrency} = ${result.toFixed(
      2
    )} ${toCurrency}`;
  });

  fetchExchangeRates();
});

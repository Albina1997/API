function getBinanceData() {
    const url = 'https://api.binance.com/api/v3/ticker/price';
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Фильтрация данных для оставления только нужных криптовалют
            const filteredData = data.filter(crypto => {
                return ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'ADAUSDT', 'AVAXUSDT', 'MATICUSDT', 'ARBUSDT', 'ATOMUSDT'].includes(crypto.symbol);
            });
            resolve(filteredData);
        })
        .catch(error => {
            reject(error);
        });
    });
}

function displayCryptos(data) {
    const cryptoContainer = document.getElementById('cryptoContainer');
    cryptoContainer.innerHTML = ''; // Очистка контейнера перед обновлением

    data.forEach(crypto => {
        const cryptoBlock = document.createElement('div');
        cryptoBlock.classList.add('crypto-block');
        cryptoBlock.innerHTML = `
            <div class="crypto-symbol">${crypto.symbol}</div>
            <div class="crypto-price">$${parseFloat(crypto.price).toFixed(2)}</div>
        `;
        cryptoContainer.appendChild(cryptoBlock);
    });
}

function displayUpdateDate() {
    const updateDate = new Date();
    const updateDateElement = document.getElementById('updateDate');
    updateDateElement.textContent = 'Data updated: ' + updateDate.toLocaleString();
}

// Загрузка данных при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    getBinanceData()
    .then(data => {
        displayCryptos(data);
        displayUpdateDate();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});
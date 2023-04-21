function attachEvents() {
    
    const divForecast = document.getElementById('forecast');
    const input = document.getElementById('location').value;
    const divCurrent = document.getElementById('current');
    const divUpcomming = document.getElementById('upcoming');
    let getWeatherUrl = `http://localhost:3030/jsonstore/forecaster/locations`;
    const weatherIcons = {
    'Sunny' : '&#x2600', // ☀
    'Partly sunny': '&#x26C5',
    'Overcast': '&#x2601',
    'Rain': '&#x2614',
    'Degrees': '&#176'

    }
    
    document.getElementById('submit').addEventListener('click', getData);

  function  getData() {
        fetch(getWeatherUrl)
        .then(response => response.json())
        .then(data => {
            const index = data.findIndex(el => el.name === input);
            divForecast.style.display = 'block';
            if (index === -1) {
                throw new Error();
            }
            let code = data[index].code;

            fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)
            .then(res => res.json())
            .then(weather => {
                const forecasts = document.createElement('div');
                forecasts.className = 'forecasts';

                //span condition symbol
                const conditionSpanSymbol = document.createElement('span');
                conditionSpanSymbol.className = 'condition symbol';
                conditionSpanSymbol.innerHTML = weatherIcons[weather.forecast.condition];
                forecasts.appendChild(conditionSpanSymbol);

                //span condition
                const conditionSpan = document.createElement('span');
                conditionSpan.className = 'condition';

                //span1 forecast data
                const span1 = document.createElement('span');
                span1.className = 'forecast-data';
                span1.textContent = weather.name;
                conditionSpan.appendChild(span1);

                //span2 forecast data
                const span2 = document.createElement('span');
                span2.className = 'forecast-data';
                span2.innerHTML = `${weather.forecast.low}${weatherIcons.Degrees}/${weather.forecast.high}${weatherIcons.Degrees}`
                conditionSpan.appendChild(span2);

                //span3 forecast data
                const span3 = document.createElement('span');
                span3.className = 'forecast-data';
                span3.textContent = weather.forecast.condition;
                conditionSpan.appendChild(span3);

                forecasts.appendChild(conditionSpan);
                divCurrent.appendChild(forecasts);
            })

            //Upcoming weather
            fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
            .then(response => response.json())
            .then(data => {
                const forecastInfo = document.createElement('div');
                forecastInfo.className = 'forecast-info';

                //each day
                data.forecast.forEach(el => {
                    const mainSpan = document.createElement('span');
                    mainSpan.className = 'upcoming';

                    //symbol
                    const spanSymbol = document.createElement('span');
                    spanSymbol.className = 'symbol';
                    spanSymbol.innerHTML = weatherIcons[el.condition];
                    mainSpan.appendChild(spanSymbol);

                    //span1 forecast-data
                    const forecastSpan1 = document.createElement('span');
                    forecastSpan1.className = 'forecast-data';
                    forecastSpan1.innerHTML = `${el.low}${weatherIcons.Degrees}/${el.high}${weatherIcons.Degrees}`;
                    mainSpan.appendChild(forecastSpan1);

                    //span2 forecast-data
                    const forecastSpan2 = document.createElement('span');
                    forecastSpan2.className = 'forecast-data';
                    forecastSpan2.textContent = el.condition;
                    mainSpan.appendChild(forecastSpan2);

                    divUpcomming.appendChild(mainSpan);
                })
            })
            .catch(() => 
                divForecast.textContent = 'Error');
        })
        .catch(() => divForecast.textContent = 'Error');
        
  }


}

attachEvents();
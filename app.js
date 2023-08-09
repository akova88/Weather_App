const api_key = '59ce505ee91f07f3642cd9dfdb7aa4ed';
const api_url = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=59ce505ee91f07f3642cd9dfdb7aa4ed';
const weather_icon_link = 'http://openweathermap.org/img/wn/10d@2x.png'

const search_input = $('.search-input');
const city_name = $('.city-name');
const weather_state = $('.weather-state');
const weather_icon = $('.weather-icon');
const weather_degree = $('.weather-degree');
const sunrise = $('.sunrise');
const sunset = $('.sunset');
const humidity = $('.humidity>span');
const wind_speed = $('.wind-speed>span');
const default_value = '---';
const default_icon = ''

let city = search_input.val();

function getWeather(city){
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api_key}&lang=vi&units=metric`)
        .then(async function(response){
            let data = await response.json();
            const isSuccess = data.cod == '200';
            let code_icon;
            if(isSuccess){
                code_icon = data.weather[0].icon;
            }

            switch(code_icon) {
                case '09d':
                    $('.container').css({'background-image': 'url(https://i.gifer.com/3VTR.gif)', 'background-repeat': 'no-repeat',
                    'background-size': 'cover'})
                    break;
                case '01n':
                    $('.container').css({'background-image': 'url(https://i.gifer.com/Iqt.gif)', 'background-repeat': 'no-repeat',
                    'background-size': 'cover'})
                    break;
                case '02d':
                    $('.container').css({'background-image': 'url(https://media.giphy.com/media/eiPjKS1DKN6oEcmWha/giphy.gif)','background-repeat': 'no-repeat',
                    'background-size': 'cover'})
                    break;
                case '03d':
                    $('.container').css({'background-image':'url(https://i.gifer.com/hC1.gif)', 'background-repeat': 'no-repeat',
                    'background-size': 'cover'})
                    break;
                case '04d':
                    $('.container').css({'background-image':'url(https://i.gifer.com/7KiB.gif)', 'background-repeat': 'no-repeat',
                    'background-size': 'cover'})
                    break; 
                default:
                        $('.container').css({'background-image':'url(https://i.gifer.com/2yao.gif)', 'background-repeat': 'no-repeat',
                    'background-size': 'cover'})
            }


            city_name.text( isSuccess && data.name || default_value);
            weather_state.text( isSuccess && data.weather[0].description || default_value);
            weather_icon.attr('src', isSuccess && `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` || 'https://i.gifer.com/X5Na.gif' )
            weather_degree.text(isSuccess && Math.round(data.main.temp) || default_value);
            sunrise.text(isSuccess && moment.unix(data.sys.sunrise).format('HH:mm') || default_value);
            sunset.text(isSuccess && moment.unix(data.sys.sunset).format('HH:mm') || default_value);
            humidity.text(isSuccess && data.main.humidity || default_value);
            wind_speed.text(isSuccess && data.wind.speed || default_value);
        })
}
import React from 'react'

export default function Forecast(props) {
console.log(typeof(props.daily))

return ( 
 <div className="forecast">
     {props.daily.map((day, index) => (
         <div className="forecastCard">
         <h3>{day.dt_txt.split(" ")[0]}</h3>
         <h3>{Math.round(day.main.temp)}{props.getSymbol()}</h3>
         <h3>{day.weather[0].main}</h3>
     </div>
     ))}
 </div> 
)
}


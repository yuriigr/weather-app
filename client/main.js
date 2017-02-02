if (Meteor.isClient) {

  Template.weather.helpers({
    //current
    currentWeather: function () {
      return Session.get("currentWeather");
    },
    date: function () {
      return Session.get("date");
    },  
    faLogo: function () {
    return '<i class="fa fa-thermometer-half fa-lg" aria-hidden="true"></i>'; 
    },
    description: function () {
      return Session.get("description");
    },
    temperature: function () {
      return Session.get("temperature");
    },
    icon: function () {
      return Session.get("icon");
    },
    
    //forecast
    weatherForecast: function () {
      return Session.get("weatherForecast");
    },
    
    //item_1
    forecast_date_1: function () {
      return Session.get("forecast_date_1");
    },
    forecast_time_1: function () {
      return Session.get("forecast_time_1");
    },
    forecast_description_1: function () {
      return Session.get("forecast_description_1");
    },
    forecast_temperature_1: function () {
      return Session.get("forecast_temperature_1");
    },
    forecast_icon_1: function () {
      return Session.get("forecast_icon_1");
    },
    
    //item_2
    forecast_date_2: function () {
      return Session.get("forecast_date_2");
    },
    forecast_time_2: function () {
      return Session.get("forecast_time_2");
    },
    forecast_description_2: function () {
      return Session.get("forecast_description_2");
    },
    forecast_temperature_2: function () {
      return Session.get("forecast_temperature_2");
    },
    forecast_icon_2: function () {
      return Session.get("forecast_icon_2");
    },
  
    //item_3
    forecast_date_3: function () {
      return Session.get("forecast_date_3");
    },
    forecast_time_3: function () {
      return Session.get("forecast_time_3");
    },
    forecast_description_3: function () {
      return Session.get("forecast_description_3");
    },
    forecast_temperature_3: function () {
      return Session.get("forecast_temperature_3");
    },
    forecast_icon_3: function () {
      return Session.get("forecast_icon_3");
    },
  
    //item_4
    forecast_date_4: function () {
      return Session.get("forecast_date_4");
    },
    forecast_time_4: function () {
      return Session.get("forecast_time_4");
    },
    forecast_description_4: function () {
      return Session.get("forecast_description_4");
    },
    forecast_temperature_4: function () {
      return Session.get("forecast_temperature_4");
    },
    forecast_icon_4: function () {
      return Session.get("forecast_icon_4");
    }
  });

  Template.weather.events({
    "submit": function (event) {
      // Prevent default submit
      event.preventDefault();
      // Call the api
      //Current weather
      Meteor.call('currentWeather', function(err, weatherResp) {
        if(err) {
          window.alert("Error: " + err.reason);
          console.log("error occured on receiving data on server. ", err );
        } else {
            console.log("weatherResp: ", weatherResp);
            //info
            Session.set("currentWeather", "Weather in " + weatherResp.name);
            Session.set("date", "Today is: " + moment.unix(weatherResp.dt).format("Do MMMM YYYY"));
            Session.set("description",  "Weather conditions: " + weatherResp.weather[0].description);
            Session.set("temperature", "Temperature is: " + Math.round(weatherResp.main.temp)  + ' C' + '\xBA');
            Session.set("icon", weatherResp.weather[0].icon);
          }
      }),
      //weather forecast
        Meteor.call('forecast', function(err, respJson) {
        if(err) {
          window.alert("Error: " + err.reason);
          console.log("error occured on receiving data on server. ", err );
        } else {
          console.log("respJson: ", respJson);
          
          Session.set("weatherForecast", "4 day weather forecast");
          //item_1
          Session.set("forecast_date_1", moment.unix(respJson.list[6].dt).format("ddd D MMM"));
          Session.set("forecast_time_1", moment.unix(respJson.list[6].dt).format("h:mm a"));
          Session.set("forecast_description_1", respJson.list[6].weather[0].description);
          Session.set("forecast_temperature_1", Math.round(respJson.list[6].main.temp)  + 'C' + '\xBA');
          Session.set("forecast_icon_1", respJson.list[6].weather[0].icon);
          
          //item_2
          Session.set("forecast_date_2", moment.unix(respJson.list[14].dt).format("ddd D MMM"));
          Session.set("forecast_time_2", moment.unix(respJson.list[14].dt).format("h:mm a"));
          Session.set("forecast_description_2", respJson.list[14].weather[0].description);
          Session.set("forecast_temperature_2", Math.round(respJson.list[14].main.temp)  + 'C' + '\xBA');
          Session.set("forecast_icon_2", respJson.list[14].weather[0].icon);
          
          //item_3
          Session.set("forecast_date_3", moment.unix(respJson.list[22].dt).format("ddd D MMM"));
          Session.set("forecast_time_3", moment.unix(respJson.list[22].dt).format("h:mm a"));
          Session.set("forecast_description_3", respJson.list[22].weather[0].description);
          Session.set("forecast_temperature_3", Math.round(respJson.list[22].main.temp)  + 'C' + '\xBA');
          Session.set("forecast_icon_3", respJson.list[22].weather[0].icon);
          
          //item_4
          Session.set("forecast_date_4", moment.unix(respJson.list[30].dt).format("ddd D MMM"));
          Session.set("forecast_time_4", moment.unix(respJson.list[30].dt).format("h:mm a"));
          Session.set("forecast_description_4", respJson.list[30].weather[0].description);
          Session.set("forecast_temperature_4", Math.round(respJson.list[30].main.temp)  + 'C' + '\xBA');
          Session.set("forecast_icon_4", respJson.list[30].weather[0].icon);
        }
      });
    }
  });
  
  //geolocation
  Meteor.startup(function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        Session.set('lat', position.coords.latitude);
        Session.set('lon', position.coords.longitude);
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

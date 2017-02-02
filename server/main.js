import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Meteor.methods({
    //The current method 
    currentWeather: function(name) {
      var url = "http://api.openweathermap.org/data/2.5/weather?lat=49.84&lon=24.02&units=metric&APPID=dc3e9261f2af7904fdf26bd7e79e536d";
      //synchronous GET
      var result = Meteor.http.get(url, {timeout:20000});
      if(result.statusCode==200) {
        var weatherResp = JSON.parse(result.content);
        console.log("response received.");
        return weatherResp;
      } else {
        console.log("Response issue: ", result.statusCode);
        var errorJson = JSON.parse(result.content);
        throw new Meteor.Error(result.statusCode, errorJson.error);
      }
    },
    //The forecast method
    forecast: function(name) {
      var url = "http://api.openweathermap.org/data/2.5/forecast?lat=49.84&lon=24.02&units=metric&APPID=dc3e9261f2af7904fdf26bd7e79e536d";
      //synchronous GET
      var result = Meteor.http.get(url, {timeout:30000});
      if(result.statusCode==200) {
        var respJson = JSON.parse(result.content);
        console.log("response received.");
        return respJson;
      } else {
        console.log("Response issue: ", result.statusCode);
        var errorJson = JSON.parse(result.content);
        throw new Meteor.Error(result.statusCode, errorJson.error);
      }
    }
  }); 
});
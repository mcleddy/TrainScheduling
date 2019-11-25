
var config = {
    apiKey: "AIzaSyCcPFcbAjIsgXGQwE-A3AcOXkeD40qypE8",
    authDomain: "train-times-93583.firebaseapp.com",
    databaseURL: "https://train-times-93583.firebaseio.com",
    storageBucket: "train-times-93583.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();


//onclick function variables

$("#submit").on("click", function (event) {
    event.preventDefault();
   var trainName = $("#trainName").val().trim();
   var trainDestination = $("#trainDestination").val().trim();
   var firstTrain = $("#firstTrain").val().trim();
   var frequency = $("#frequency").val().trim();



    //push to database
    var newTrain = {
        trainName: trainName,
        trainDestination: trainDestination,
        firstTrain: firstTrain,
        frequency: frequency,
    };

    database.ref().push(newTrain);
    //reset forms
    console.log(newTrain.trainName);
    console.log(newTrain.trainDestination);
    console.log(newTrain.FirstTrain);
    console.log(newTrain.frequency);

    ///clear boxes
    $("#trainName").val("")
    $("#trainDestination").val("")
    $("#trainTime").val("")
    $("#frequency").val("")
});


// create a database event
database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
    ///bariable
    var tName = childSnapshot.val().trainName;
    var tDestionation = childSnapshot.val().trainDestination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;

    var timeArray = tFirstTrain.split(":");
    var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
    var maxMoment = moment.max(moment().trainTime);
    var tMinutes;
    var tArrival;

    if (maxMoment === trainTime) {
        tArrival = trainTime.format("hh:mm A");
        tMinutes = trainTime.diff(moment(), "minutes");

    } else {

        var differentTimes = moment().diff(trainTime, "minutes");
        var tRemainder = differentTimes % tFrequency;
        tMinutes = tFrequency - tRemainder;
        tArrival = moment()
            .add(tMinutes, "m")
            .format("hh: mm A");
    }
    console.log(tMinutes);
    console.log(tArrival);

    //dump new infointo table
    $("#tableContent >tbody").append(
        $("<tr>").append(
            $("<td>").text(tName),
            $("<td>").text(tDestionation),
            $("<td>").text(tFrequency),
            $("<td>").text(tArrival),
            $("<td>").text(tMinutes),           
        )
    );
});
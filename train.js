$(document).ready(function(){
    // intiliaze firebase
    var config = {
        apiKey: "AIzaSyCcrCx5Clqm1OdmUuBIdhkuhdFLkPUjrBw",
        authDomain: "train-firebase-22e8f.firebaseapp.com",
        databaseURL: "https://train-firebase-22e8f.firebaseio.com",
        projectId: "train-firebase-22e8f",
        storageBucket: "",
        messagingSenderId: "980475848357"
      };
      firebase.initializeApp(config);
      var database = firebase.database();


      
// button for adding trains
$("#add-train-btn").on("click", function(){
    event.preventDefault();
    // vars to hold user inputs

    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var firstTrain = $("#firstTrain-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();
    // var to hold train information
    var newTrain = {
        name: trainName,
        destination: trainDest,
        start: firstTrain,
        frequency: trainFreq
    };
    database.ref().push(newTrain);
    alert("trains are added");

// clear text boxes for new search
$("#train-name-input").val("");
$("#dest-input").val("");
$("#firstTrain-input").val("");
$("#freq-input").val(""); 
});
   database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val());
    // storing everything into var
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;
    console.log(trainName)

    var trainFreq;
    // time entry var
    var firstTime = 0;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // current time
    var currentTime = moment();
    console.log("Current Time:" + moment(currentTime).format("HH:mm"));

    // difference between times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in time:" + diffTime);

    // Time apart
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // minutes for next train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("Minutes till train" + tMinutesTillTrain);

    // Next Train

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("Arrival Time " + moment(nextTrain).format("HH:mm"));

    $("#train-table > tbody").append("<tr><td>"+ trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>")


   });

});

   
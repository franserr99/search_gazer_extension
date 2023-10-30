// //SearchGazer.init({
   
// //}).begin();
// let logData = [];

// console.log = function() {
//     logData.push(Array.from(arguments).join(', '));
// };

// webgazer.setRegression('ridge').setTracker('clmtrackr').setGazeListener(function(data, elapsedTime) {
//     if (data == null) {
//         return;
//     }
//     webgazer.util.bound(data);
//     console.log("hardcoded prediction:",findDomElementGoogle(100, 100));
//     var xprediction = data.x; //these x coordinates are relative to the viewport
//     var yprediction = data.y; //these y coordinates are relative to the viewport
//     console.log("the elapsed time:")
//     console.log(elapsedTime); //elapsed time is based on time since begin was called
//     console.log("X:", xprediction, "Y:", yprediction);
//     console.log("\nthe dom element prediction:")
//     try {
//         console.log(findDomElementGoogle(xprediction, yprediction));
//     } catch (error) {
//         console.log("Error:", error);
//     }
    

// }).begin().showPredictionPoints(true);
// console.log("reading data on this page")



// // Saving to file
// function saveToFile() {
//     const blob = new Blob([logData.join('\n')], { type: 'text/plain;charset=utf-8' });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     link.setAttribute("href", url);
//     link.setAttribute("download", "consoleLogs.txt");
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }


let logData = [];

console.log = function() {
    logData.push(Array.from(arguments).join(', '));
};

webgazer.setRegression('ridge')
        .setTracker('clmtrackr')
        .setGazeListener(function(data, elapsedTime) {
            if (data == null) {
                return;
            }
            //webgazer.util.bound(data);
            //console.log("hardcoded prediction:", findDomElementGoogle(100, 100));
            var xprediction = data.x;
            var yprediction = data.y;
            console.log("the elapsed time:", elapsedTime);
            console.log("X:", xprediction, "Y:", yprediction);
            console.log("\nthe dom element prediction:");
            try {
                console.log(findDomElementGoogle(xprediction, yprediction));
            } catch (error) {
                console.log("Error:", error);
            }
        }
        ).begin()
        .showPredictionPoints(true);

console.log("reading data on this page");

// stop recording after 10s and save the log to a file
setTimeout(function() {
    saveToFile(); // call helper fxn
    webgazer.end();  //stop the process
    
}, 10000);

// saving to file
function saveToFile() {
    const blob = new Blob([logData.join('\n')], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "logs.txt");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

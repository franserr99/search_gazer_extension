let logData = [];

console.log = function() {
    logData.push(Array.from(arguments).join(', '));
};
console.log("x, y, timeElapsed, id, className, tagName");
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
            
            try {
                console.log(findBookCardElement(xprediction, yprediction, elapsedTime));
            } catch (error) {
                console.log("Error:", error);
            }
        }
        ).begin()
        .showPredictionPoints(true);

// stop recording after 10s and save the log to a file
setTimeout(function() {
    saveToFile(); // call helper fxn
    webgazer.end();  //stop the process
    
}, 10000);

// saving to file
function saveToFile() {
    // const blob = new Blob([logData.join('\n')], { type: 'text/plain;charset=utf-8' });
    const filteredLogData = logData.filter(line => line.trim() !== '');
    const blob = new Blob([filteredLogData.join('\n')], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "logs.txt");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

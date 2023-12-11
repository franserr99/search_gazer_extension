let logData = [];

console.log = function () {
  logData.push(Array.from(arguments).join(", "));
};
console.log(
  "x, y, timeElapsed, id, className, tagName, bookName, bookPrice, bookURL, bookRating"
);
webgazer
  .setRegression("ridge")
  .setTracker("clmtrackr")
  .setGazeListener(function (data, elapsedTime) {
    if (data == null) {
      return;
    }
    var xprediction = data.x;
    var yprediction = data.y;

    try {
        findBookCardElement(xprediction, yprediction, elapsedTime)
    } catch (error) {
      // console.log("Error:", error);
    }
  })
  .begin()
  .showPredictionPoints(true);

// stop recording after 10s and save the log to a file
setTimeout(function () {
  saveToFile();
  webgazer.end();
}, 10000);

// saving to file
function saveToFile() {
  const filteredLogData = logData.filter((line) => line.trim() !== "");
  const blob = new Blob([filteredLogData.join("\n")], {
    type: "text/plain;charset=utf-8",
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "logs.txt");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

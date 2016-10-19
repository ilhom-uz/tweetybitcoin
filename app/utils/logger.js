var logEnabled = true;

var log = function log(message) {
    if (logEnabled)
        console.log("\n" + new Date() + "\n========== >>> " + message);
};

var logError = function logError(message) {
    if (logEnabled)
        console.log("\n" + new Date() + "\n!!!!!!!!!! ERROR >>> " + message);
};

function consoleLog(message) {
    if (logEnabled)
        console.log(message);
}

module.exports = {
    log: log,
    logError: logError,
    consoleLog: consoleLog
};
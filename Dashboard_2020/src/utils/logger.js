const fs = require('fs').promises;

const dateStr = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
let errLogPath = `src/logs/error- ${dateStr}.log`;
let eventLogPath = `src/logs/event- ${dateStr}.log`;

export async function logError(error) {
    let msg = `${new Date().toLocaleTimeString()} :: ${error}`;
    // eslint-disable-next-line no-console
    console.log('ERROR', msg);
    msg += '\n';
    return fs.appendFile(errLogPath, msg)
        .catch(err => {
            // eslint-disable-next-line no-console
            console.log(err);
        });
}

export async function logEvent(event) {
    let msg = `${new Date().toLocaleTimeString()} :: ${event}`;
    // eslint-disable-next-line no-console
    console.log('INFO ', msg);
    msg += '\n';
    return fs.appendFile(eventLogPath, msg)
        .catch(err => {
            // eslint-disable-next-line no-console
            console.log(err);
        });
}

export async function logData(data, type) {
    let msg = `${new Date().toLocaleTimeString()} :: ${event}`;
    // eslint-disable-next-line no-console
    // console.log('INFO ', msg);
    msg += '\n';
    return fs.appendFile(eventLogPath, msg)
        .catch(err => {
            // eslint-disable-next-line no-console
            console.log(err);
        });
}

// module.exports = {
//     logError,
//     logEvent
// };

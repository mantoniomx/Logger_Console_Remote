import LoggerConsole from './console/logger-console.js';

export default class Logger {


    constructor(options) {
        options = options || {};
        this.console = new LoggerConsole();
    }

    log(message, title = '') {
        this.console.log(message, title);
    }

    info(message, title = '') {
        this.console.info(message, title);
    }

    warn(message, title = '') {
        this.console.warn(message, title);
    }

    debug(message, title = '') {
        this.console.debug(message, title);
    }

    trace(message, title = '') {
        this.console.trace(message, title);
    }

    critical(message, title = '') {
        this.console.critical(message, title);
    }

    error(message, title = '') {
        this.console.error(message, title);
    }
}
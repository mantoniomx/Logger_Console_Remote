import LogLevel from '../enums/log-level-enum.js'
import LogColor from '../enums/log-color-enum.js'
import LoggerRemote from '../remote/logger-remote.js';
export default class LoggerConsole {

    constructor(options) {
        options = options || {};
        this.collapsed = options.collapsed || true;
        this.level = options.level || LogLevel.ALL;
        this.hidemessage = options.hidemessage || false;
        this.logger = console;
        this.errorHandling = options.errorHandling || true;
        this.logconsole_remote = options.logremote || null;
        this.remotelog = null;
        if (this.errorHandling) {
            if (window && !window.onerror) {
                window.onerror = function(message, url, lineno, colno, error) {
                    console.groupCollapsed.call(console, `EXCEPTION => CRITICAL ERROR @ ${ new Date().toLocaleTimeString()}`);
                    let data = {
                        "UserAgent": this.navigator.userAgent,
                        "Error Message ": message,
                        "Url ": url,
                        "Error line": lineno,
                        "Error No Col ": colno
                    };
                    console.log(data);
                    console.log(error);
                    console.groupEnd();
                    return true;
                }
            }
        }

        if (this.logconsole_remote) {
            this.remotelog = new LoggerRemote(this.logconsole_remote);
        }
    }


    createMessage(message = '', headTitle = '', level = LogLevel.GLOBAL) {
        if (!this.hidemessage) {
            let formattedTime = this.getFormattedTime();
            let nameLog = Object.keys(LogLevel).find(x => LogLevel[x] === level);
            let title = `${nameLog} => ${(headTitle ? headTitle : ' CONSOLE ')} ${formattedTime}`;
            this.openMessage(this.logger, title);
            this.logger.log(`%c ${nameLog.toLowerCase()}`, `color: ${LogColor[nameLog]}; font-weight: bold`, message);
            this.closeMessage(this.logger);
        }
    }

    openMessage(logger, message) {
        let headerMessage = this.collapsed ? logger.groupCollapsed : logger.group
        try {
            headerMessage.call(logger, message);
        } catch (e) {
            logger.log(message);
        }
    }

    closeMessage(logger) {
        try {
            logger.groupEnd();
        } catch (e) {
            logger.log('—— log end ——');
        }
    }


    getFormattedTime() {
        var time = new Date();
        return (" @ " + (this.pad(time.getHours(), 2)) + ":" + (this.pad(time.getMinutes(), 2)) + ":" + (this.pad(time.getSeconds(), 2)) + "." + (this.pad(time.getMilliseconds(), 3)))
    }

    repeat(str, times) {
        return (new Array(times + 1)).join(str)
    }

    pad(num, maxLength) {
        return this.repeat('0', maxLength - num.toString().length) + num
    }


    log(message, title = '') {
        this.createMessage(message, title, LogLevel.GLOBAL);
    }

    info(message, title = '') {
        this.createMessage(message, title, LogLevel.INFO);
    }

    warn(message, title = '') {
        this.createMessage(message, title, LogLevel.WARN);
    }

    debug(message, title = '') {
        this.createMessage(message, title, LogLevel.DEBUG);
    }

    trace(message, title = '') {
        this.createMessage(message, title, LogLevel.TRACE);
    }

    critical(message, title = '') {
        this.createMessage(message, title, LogLevel.CRITICAL);
    }

    error(message, title = '') {
        this.createMessage(message, title, LogLevel.ERROR);
    }

}
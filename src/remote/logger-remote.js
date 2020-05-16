"use strict";
import LogLevel from '../enums/log-level-enum.js';

class LoggerRemote {

    constructor(options) {
        options = options || {};
        this.url = options.url || '';
        this.method = options.method || 'POST';
        this.loglevel = options.loglevel || LogLevel.ALL;
        this.timestamp = options.timestamp || (() => (new Data()));
        this.headers = options.headers || [{ 'Content-Type': 'application/json' }];
        if (!this.url || typeof this.url === 'undefined')
            throw new Error('options must include a url property');

    }

    send(messages, title = '', logLevel = LogLevel.GLOBAL) {
        var headers = new Headers();
        this.headers.forEach(function(header) {
            headers.append(
                Object.keys(header)[0],
                header[Object.keys(header)[0]]
            );
        });

        var data = JSON.stringify({
            context: navigator.userAgent,
            level: {
                label: logLevel,
                value: LogLevel(logLevel)
            },
            timestamp: this.timestamp,
            logger: title ? title : '',
            messages: messages
        });

        let params = {
            method: this.method,
            headers: headers,
            body: data
        };
        fetch(this.url, params).then().catch();
    }
}

export default LoggerRemote;
'use strict';
var SERVER_URL = 'http://192.168.0.103:5000';

function Server() {
    var self = this;
    self.url = SERVER_URL;
    self.client_id = 'mobileapp';
    self.client_secret = '*';
    var methods = ['get', 'post', 'put', 'delete'];
    var i; var methodsL = methods.length;
    for(i = 0; i < methodsL; i++) {
        var method = methods[i];
        self[method] = self.getRequestFunc(method, self.url);
    }
}

Server.prototype.getRequestFunc = function(method, serverUrl) {
    var self = this;
    return function(url, data, contentType) {
        return new Promise(function(resolve, reject) {
            var account = window.account || {};
            var requestUrl = serverUrl + url;
            var jsonContentType = 'application/json';
            contentType = contentType || jsonContentType;
            if(typeof data === 'object') {
                data.client_id = self.client_id;
                data.client_secret = self.client_secret;
            }
            if(
                method !== 'get' &&
                contentType.indexOf(jsonContentType) !== -1
            ) {
                data = JSON.stringify(data);
            }
            // server:Log.proto(
            //     '%s:%s; start request',
            //     method, url, data);
            $.ajax({
                url : requestUrl,
                type : method,
                data : data,
                headers : {
                    Accept : 'application/json'
                },
                success : function(response) {
                    // serverLog.proto(
                    //     '%s:%s; received response',
                    //     method, url, response);
                    resolve(response);
                },
                error : function(error, textStatus, errorThrow) {
                    if(self.errorHandler) { self.errorHandler(error); }
                    // serverLog.error('%s:%s; request status code: %s',
                    //     method, url, error.status, error, textStatus, errorThrow);
                    reject(error);
                },
                beforeSend : function(xhr) {
                    // Basic auth
                    // FIXME: Всё это похоже на один большой костыль
                    var basic = 'bW9iaWxlYXBwOg==';
                    // Bearer auth
                    if(account.access_token) {
                        xhr.setRequestHeader(
                            'Authorization',
                            'Bearer ' + account.access_token
                        );
                    }
                },
                dataType : 'json',
                contentType : contentType
            });
        });
    };
};

Server.prototype.sendCode = function(phone) {
    var contentType = 'application/x-www-form-urlencoded';
    return server.post('/auth/sendcode', { phone : phone }, contentType);
};

Server.prototype.authenticate = function(user, pass) {
    var self = this;
    var params = {
        grant_type : 'password',
        username : user || 79530506547,
        password : pass || 1234,
        scope : 'full'
    };
    var contentType = 'application/x-www-form-urlencoded';
    return server.post('/oauth2/token', params, contentType)
    .then(function(response) {
        self.saveAccountData(response);
        return response;
    });
};

Server.prototype.saveAccountData = function(data) {
    var self = this;
    window.account = window.account || {};
    Object.keys(data).forEach(function(key) {
        window.account[key] = data[key];
    });
    localStorage.setItem(
        'account',
        JSON.stringify(window.account)
    );
};

Server.prototype.restoreAccountData = function() {
    var dataString = localStorage.getItem('account');
    var data = JSON.parse(dataString) || {};
    window.account = data;
};

window.server = new Server();

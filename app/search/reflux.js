import Reflux from 'reflux';
import reqwest from 'reqwest';
import Config from 'config';
import {SigninStore} from '../signinflux';

const SearchActions = Reflux.createActions([
    'create',
    'list'
]);

const SearchStore = Reflux.createStore({
    listenables: [SearchActions],
    onCreate:function(name,imagetypes,images,featuretypes){
        var self = this;
        var url = Config.url + '/api/search';

        var data = {name:name, imagetypes:imagetypes,images:images,featuretypes:featuretypes};
        var json = JSON.stringify(data);

        reqwest({
            url: url,
            type: 'json',
            method: 'post',
            contentType: "application/json",
            headers: {
                appid: SigninStore.ent.appid
            },
            dataType: "json",
            data: json,
            success: function (data, status) {
                self.trigger('create', data);
            },
            error: function (reason) {
                console.log('error',reason);
            }
        });
    },
    onList:function () {
        var self = this;
        var url = Config.url + '/api/search';

        reqwest({
            url: url,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            headers: {
                appid: SigninStore.ent.appid
            },
            data: {},
            success: function (data, status) {
                self.trigger('list', data);
            },
            error: function (reason) {
                console.log('error',reason);
            }
        });
    },
});

exports.SearchActions = SearchActions;
exports.SearchStore = SearchStore;
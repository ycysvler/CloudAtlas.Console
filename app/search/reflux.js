import Reflux from 'reflux';
import $ from 'jquery';
import Config from 'config';

const SearchActions = Reflux.createActions([
    'create'
]);

const SearchStore = Reflux.createStore({
    listenables: [SearchActions],
    onCreate:function(name,imagetypes,images,featuretypes){
        var self = this;
        var url = Config.url + '/api/search';

        var data = {name:name, imagetypes:imagetypes,images:images,featuretypes:featuretypes};
        var json = JSON.stringify(data);

        $.ajax({
            url: url,
            type: 'POST',
            contentType: "application/json",
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
});

exports.SearchActions = SearchActions;
exports.SearchStore = SearchStore;
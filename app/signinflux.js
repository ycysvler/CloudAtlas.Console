import Reflux from 'reflux';
import $ from 'reqwest';
import Config from 'config';

const SigninActions = Reflux.createActions([
    'signin',
    'getUser',
    'getEnt'
]);


const SigninStore = Reflux.createStore({
    listenables: [SigninActions],

    user:null,
    ent:{"appid" : "ca52bf40-8a65-11e7-a0b9-1d87294b8940",
        "entid" : "ent_20170808220894",
        "entname" : "test"},

    onSingnin:function(name, password){
        var self = this;

        $.ajax({
            url:'',
            type:'POST',
            data:{name:name, password:password},
            success: function (data, status) {
                var result = {
                    user:{mobile:'',entid:'',icon:''},
                    ent:{entid:'', appid:''}
                };

                self.user = result.user;
                self.ent = result.ent;

                self.trigger('results', data);
            },
            error: function (reason) {
                console.log('error',reason);
            }
        })
    },

    onGetUser:function () {
        var self = this;
        self.trigger('results', data);
    },

    onGetEnt:function(){
        var self = this;
        self.trigger('getEnt', self.ent);
    }
});

exports.SigninActions = SigninActions;
exports.SigninStore = SigninStore;
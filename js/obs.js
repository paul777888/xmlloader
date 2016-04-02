//add observer
function Obs (sender){
    this._sender = sender;
    this._listeners = [];
}

Obs.prototype = {
    attach: function(listener){
        this._listeners.push(listener);
    },
    notify: function(args){
        var index;
        
        for(index=0;index<this._listeners.length;index++){
            this._listeners[index](this._sender,args);           
        }
    }
};
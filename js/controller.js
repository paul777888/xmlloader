function Controller(model, view) {
    console.log('Controller initiating...');
    this._model = model;
    this._view = view;

    var _this = this;

    this._view.listModified.attach(function (sender, args) {
        _this.updateSelected(args.index);
    });

    this._view.addButtonClicked.attach(function () {
        _this.addItem();
    });

    this._view.delButtonClicked.attach(function () {
        _this.delItem();
    });
    
    this._view.sortByNameBtnClicked.attach(function () {
        _this.sortListByName();
    });
    
    this._view.sortByValueBtnClicked.attach(function () {
        _this.sortListByValue();
    });
    
    this._view.showXMLBtnClicked.attach(function () {
        _this.showXML();
    });
}

Controller.prototype = {
    addItem : function () {
        var item = document.getElementById('key-value').value;
        if(item){
            if (/\w=\w/.test(item)) {
                this._model.addItem(item.toUpperCase());
            }else{
                this._view._elements.errMsg.innerHTML='Value is not added, Please type in correct key=value';
                this._view._elements.input.value='';
                this._view._elements.input.focus();
            }
            
        }
    },

    delItem : function () {
        var index;

        index = this._model.getSelectedIndex();
        if (index !== -1) {
            this._model.removeItemAt(this._model.getSelectedIndex());
        }
    },

    updateSelected : function (index) {
        this._model.setSelectedIndex(index);
    },
    
    sortListByName: function(){
        this._model.sortListByName();
    },
    
    sortListByValue: function(){
        this._model.sortListByValue();
    },
    
    showXML: function(){
        this._model.showXML();
    }
};




//instantiate
function init() {
    var model = new Model(['KEY1=VALUE1', 'KEY2=VALUE2']),
        view = new View(model, {
            'input':document.getElementById('key-value'),
            'errMsg':document.getElementById('errMsg'),
            'list' : document.getElementById('list'), 
            'addButton' : document.getElementById('plusBtn'), 
            'delButton' : document.getElementById('minusBtn'),
            'sortByNameBtn' : document.getElementById('sortByNameBtn'),
            'sortByValueBtn' : document.getElementById('sortByValueBtn'),
            'showXMLBtn' : document.getElementById('showXMLBtn'),

        }),
        controller = new Controller(model, view);
    
    view.show();
};

init();
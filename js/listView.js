function View(model,elements){
    console.log('View initiating...');
    this._model = model;
    this._elements = elements;
    
    this.listModified = new Obs(this);
    this.addButtonClicked = new Obs(this);
    this.delButtonClicked = new Obs(this);
    this.sortByNameBtnClicked = new Obs(this);
    this.sortByValueBtnClicked = new Obs(this);
    this.showXMLBtnClicked = new Obs(this);
 
    var _this = this;
    
    //attach model listeners
    this._model.itemAdded.attach(function(){
        _this.rebuildList();
        _this._elements.input.value='';
        _this._elements.input.focus();
    });
    this._model.itemRemoved.attach(function(){
        _this.rebuildList();
    });
    this._model.itemSorted.attach(function(){
        _this.rebuildList();
    });
    this._model.itemXML.attach(function(){
        _this.rebuildList();
        console.log(this,_this);
        _this._elements.sortByNameBtn.disabled = true;
        _this._elements.sortByValueBtn.disabled = true;

    });
    this._elements.list.addEventListener('change',function(e){
        _this.listModified.notify({index:e.target.selectedIndex});
    });
    this._elements.addButton.addEventListener('click',function(){
        _this.addButtonClicked.notify();
    });
    this._elements.delButton.addEventListener('click',function(){
        _this.delButtonClicked.notify();
    });
    this._elements.sortByNameBtn.addEventListener('click',function(){
        _this.sortByNameBtnClicked.notify();
    });
    this._elements.sortByValueBtn.addEventListener('click',function(){
        _this.sortByValueBtnClicked.notify();
    });
    
    this._elements.showXMLBtn.addEventListener('click',function(){
        _this.showXMLBtnClicked.notify();
    });
}

View.prototype = {
    show: function(){
        this.rebuildList();
    },
    
    rebuildList: function(){
        var list, items, key;
        
        list = this._elements.list;
        list.innerHTML='';
        
        items = this._model.getItems();
        for(key in items){
            if(items.hasOwnProperty(key)){
                var node = document.createElement("OPTION");
                var textnode = document.createTextNode(items[key]);
                node.appendChild(textnode);
                list.appendChild(node);
            }
        }
        this._model.setSelectedIndex(-1);
    }
};
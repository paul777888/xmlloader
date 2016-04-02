function Model(items){
    console.log('Model initiating...');
    this._items=items;
    this._selectedIndex = -1;
    
    this.itemAdded = new Obs(this);
    this.itemRemoved = new Obs(this);
    this.selectedIndexChanged = new Obs(this);
    this.itemSorted = new Obs(this);
    this.itemXML = new Obs(this);
}

Model.prototype = {
    getItems:function(){
        return [].concat(this._items);
    },
    
    addItem: function(item){
        this._items.push(item);
        this.itemAdded.notify({item:item});
    },
    
    removeItemAt: function(index){
        var item;
        item = this._items[index];
        this._items.splice(index,1);
        this.itemRemoved.notify({item:item});
        if(index === this._selectedIndex){
            this.setSelectedIndex(-1);
        }
    },

    getSelectedIndex: function(){
        return this._selectedIndex;
    },
    
    setSelectedIndex : function(index){
        var previousIndex;
        previousIndex = this._selectedIndex;
        this._selectedIndex = index;
        this.selectedIndexChanged.notify({previous:previousIndex});
    },
    
    sortListByName:function(){
        this._items.sort();
        this.itemSorted.notify();
    },
    
    sortListByValue:function(){
        for(var i=0;i<this._items.length;i++){
            var split1 = this._items[i].split('=');
            var temp1=split1[0];
            split1[0]=split1[1];
            split1[1]=temp1;
            this._items[i]=split1.join('=');
        }
        var sortedByValue = this._items.sort();
        for(var i=0;i<sortedByValue.length;i++){
            var split2 = sortedByValue[i].split('=');
            var temp2=split2[0];
            split2[0]=split2[1];
            split2[1]=temp2;
            sortedByValue[i]=split2.join('=');
        }
        this.itemSorted.notify();
    },
    
    showXML:function(){
        var numOfItem = document.querySelectorAll('option');
//        undoArr=[];
//        for(var i=0;i<arr.length;i++){
//            undoArr.push(arr[i]);
//        }
//        console.log(arr,undoArr);
        for(var i=0;i<this._items.length;i++){
            if(numOfItem[i].textContent.includes("=")){
                var split0 = this._items[i].split('=');
                var splitKey1='<'+split0[0]+'>';
                var splitKey2='</'+split0[0]+'>';
                var splitValue=split0[1];
                this._items[i]=splitKey1+splitValue+splitKey2;
        }
            
        this.itemXML.notify();
    }
    }
       
};


function HashTable() {
    var table = [];

    var loseloseHashCode = function(key) {
        var hash = 0;
        for (var i=0; i<key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    };

    var djb2HashCode = function(key) {
        var hash = 5381;
        for (var i=0; i<key.length; i++) {
            hash = hash * 33 + key.charCodeAt(i);
        }

        return hash % 1013;
    }

    var valuePair = function(key, value) {
        this.key = key;
        this.value = value;

        this.toString = function() {
            return '[' + this.key + '-' + this.value + ']';
        }
    };

    this.put = function(key, value) {
        var position = djb2HashCode(key);

        if(table[position] == undefined) {
            table[position] = new valuePair(key, value);
        } else {
            var index  = ++position;
            while (table[index] != undefined) {
                index++;
            }
            table[index] = new valuePair(key, value);
        }
    }

    this.get = function(key) {
        var position = djb2HashCode(key);

        if (table[position] !== undefined) {
            return table[position].value;
        } else {
            var index = ++position;
            while (table[index] === undefined || table[index].key!=key) {
                index++;
            }

            if (table[index].key === key) {
                return table[index].value;
            }
        }
        return undefined;
     };

    this.remove = function(key){
        var position = djb2HashCode(key);

        if (table[position] !== undefined){
            if (table[position].key === key) {
                table[position] = undefined;
            } else {
                var index = ++position;
                while (table[index] === undefined || table[index].key !== key){
                    index++;
                }
                if (table[index].key === key) {
                    table[index] = undefined;
                }
            }
        }
    };


    this.print = function() {
        for (var i = 0; i < table.length; ++i) {
            if (table[i] !== undefined) {
               console.log(table[i].toString());
            }
        }
    };
}

function LinkedList() {

    let Node = function(element){

        this.element = element;
        this.next = null;
    };

    let length = 0;
    let head = null;

    this.append = function(element){

        let node = new Node(element),
            current;

        if (head === null){ //first node on list
            head = node;
        } else {

            current = head;

            //loop the list until find last item
            while(current.next){
                current = current.next;
            }

            //get last item and assign next to added item to make the link
            current.next = node;
        }

        length++; //update size of list
    };

    this.insert = function(position, element){

        //check for out-of-bounds values
        if (position >= 0 && position <= length){

            let node = new Node(element),
                current = head,
                previous,
                index = 0;

            if (position === 0){ //add on first position

                node.next = current;
                head = node;

            } else {
                while (index++ < position){
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }

            length++; //update size of list

            return true;

        } else {
            return false;
        }
    };

    this.removeAt = function(position){

        //check for out-of-bounds values
        if (position > -1 && position < length){

            let current = head,
                previous,
                index = 0;

            //removing first item
            if (position === 0){
                head = current.next;
            } else {

                while (index++ < position){

                    previous = current;
                    current = current.next;
                }

                //link previous with current's next - skip it to remove
                previous.next = current.next;
            }

            length--;

            return current.element;

        } else {
            return null;
        }
    };

    this.remove = function(element){

        let index = this.indexOf(element);
        return this.removeAt(index);
    };

    this.indexOf = function(element){

        let current = head,
            index = 0;

        while (current) {
            if (element === current.element) {
                return index;
            }
            index++;
            current = current.next;
        }

        return -1;
    };

    this.isEmpty = function() {
        return length === 0;
    };

    this.size = function() {
        return length;
    };

    this.getHead = function(){
        return head;
    };

    this.toString = function(){

        let current = head,
            string = '';

        while (current) {
            string += current.element + (current.next ? ', ' : '');
            current = current.next;
        }
        return string;

    };

    this.print = function(){
        console.log(this.toString());
    };
}
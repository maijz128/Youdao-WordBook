
var app = null;

(function(){
    app = new App();

    function click(id, func){
        document.getElementById(id)
        .addEventListener('click', function(element, event){
            if(func) func(element, event);
        });
    }
})();

function App(){
    var self = this;
    this.data = {
        wordbook : null,
    };
    this.appData = {
        words: ['a', 'b', 'c'],
        inputText: '',
        wordBookName: '',
    };
    this.app = new Vue({
        el: '#app',
        data: self.appData,
        methods: {
            add: function(){
                var lines = splitLines(self.appData.inputText);
                var words = [];
                lines.forEach(function(line){
                    var ws = line.split(',');
                    words = words.concat(ws);
                });
                self.add(words);
            },
            clear: function(){
                self.clear();
            },
            save: function(){
                self.save();
            },
            clearInput: function(){
                self.appData.inputText = '';
            },
        }
    });
    this._initWordBook = function(){
        if(!self.data.wordbook){
            var name = '';
            self.data.wordbook = new WordBook(name);
        }
        return self.data.wordbook;
    };
    this.add = function(words){
        var wordbook = self._initWordBook();
        if(wordbook){
            wordbook.add(words);
            self.refresh();  
        } 
    };
    this.clear = function(){
        var wordbook = self.data.wordbook;
        if(wordbook){
            wordbook.clear();
            self.refresh();  
        } 
    };
    this.save = function(){
        var wordbook = self.data.wordbook;
        if(wordbook){
            var name = this.appData.wordBookName;
            wordbook.setName(name);
            var file = wordbook.toFile();
            saveText(file.text, file.filename);
        }   
    };
    this.refresh = function(){
        var wordbook = self.data.wordbook;
        if(wordbook){
            var words = wordbook.toList();
            self.appData.words = words;
        }
    };
}

function splitLines(text){
    var lines = text.split(/\r*\n/);
    return lines;
}

function saveText(text, filename){
    download(text, filename, 'text');
}

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
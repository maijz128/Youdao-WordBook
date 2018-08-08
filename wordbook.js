(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (global.WordBook = factory());
}(this, (function () {
    'use strict';

    function WordBook(name) {
        this.name = null;
        this.words = new Set();
        if(name) this.setName(name);
    }
    WordBook.prototype.setName = function(name){
        if(typeof(name) === 'string'){
            this.name = name.trim();
        }
    };
    WordBook.prototype.add = function (words) {
        var self = this;
        if (typeof (words) === 'string') {
            this._add(words);
        } else if (words && words instanceof Array) {
            words.forEach(function (word) {
                self._add(word);
            });
        }
    };
    WordBook.prototype.clear = function () {
        this.words.clear();
    };
    WordBook.prototype.build = function () {
        /*
        <wordbook>
            <item><word>test</word>
            <tags>test</tags>
            <progress>-1</progress>
            </item>
        </wordbook>
        */
        var tagName = this.name;
        var wordbook = document.createElement('wordbook');
        this.words.forEach(function (word) {
            var elItem = document.createElement('item');

            var elWord = document.createElement('word');
            elWord.innerHTML = word;
            elItem.appendChild(elWord);

            if (tagName) {
                var elTags = document.createElement('tags');
                elTags.innerHTML = tagName;
                elItem.appendChild(elTags);
            }

            wordbook.appendChild(elItem);
        });
        return wordbook;
    };
    WordBook.prototype.toList = function(){
        return Array.from(this.words);
    };
    WordBook.prototype.toFile = function () {
        var wordbook = this.build();
        var text = wordbook.outerHTML;
        var filename = this.name ? 'wordbook-' + this.name + '.xml' : 'wordbook.xml';
        return {
            filename: filename,
            text: text
        };
    };
    WordBook.prototype._add = function (word) {
        if (typeof (word) === 'string') {
            var w = word.trim();
            if (w) this.words.add(w);
        }
    };

    return WordBook;
})));
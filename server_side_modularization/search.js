var dictionary = require('./dictionary');

function search(word, dictionary){
	for( i in dictionary){
		if(dictionary[i] == word){
			return true;
		}
	}
	return false;
}

console.log(search('apple', dictionary));
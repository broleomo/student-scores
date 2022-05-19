import './App.css';
import data from './data.js';

function App() {
  let lowScoringData = data.filter(question => question['percent_correct'] < 0.5)
  // let highScoringData = data.filter(question => question['percent_correct'] > 0.5)

function countRepeatedWords(sentence) {
  let words = sentence.split(" ");
  let wordMap = {};

  for (let i = 0; i < words.length; i++) {
    let currentWordCount = wordMap[words[i]];
    let count = currentWordCount ? currentWordCount : 0;
    wordMap[words[i]] = count + 1;
  }
  return wordMap;
}
let wordCountedArray = lowScoringData.map(question => (
  question['text'] = countRepeatedWords(question['text'])
));

let newCountedArray = wordCountedArray.map((words => (words.flat()
)))
console.log(newCountedArray);
  return (
    <div className="App">
      <header className="App-header">
        Hello World
      </header>
    </div>
  );
}

export default App;

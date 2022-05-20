import './App.css';
import data from './data.js';

const App = () => {
  let lowScoringData = data.filter(question => question['percent_correct'] < 0.5)
  // let highScoringData = data.filter(question => question['percent_correct'] > 0.5)

const countWords = (sentence) => sentence.split(" ");
let wordCountedArray = lowScoringData.map(question => (
  question['text'] = countWords(question['text'])
));

var mergedWordList = [].concat.apply([], wordCountedArray);

const wordCounts = [];
mergedWordList.forEach((x) => {
  wordCounts[x] = (wordCounts[x] || 0) + 1;
});



// wordCounts.filter(word => word > 1)

console.log(wordCounts);

  return (
    <div className="App">
      <header className="App-header">
        Low 
      </header>
    </div>
  );
}

export default App;

import './App.css';
import * as dataJson from './quiz_question_data.json';

const App = () => {
  // Cleaning up data to remove all HTML tags.
  let stringifyData = JSON.stringify(dataJson).replace(/<\/?[^>]+>/gi, '');
  const parsedData = JSON.parse(stringifyData)
  const dataArray = Object.values(parsedData);

  const lowScoringData = dataArray.filter(question => question['percent_correct'] < 0.5)
  const highScoringData = dataArray.filter(question => question['percent_correct'] > 0.5)

// Splitting sentences into array of individual strings.
const splitWords = (sentence) => sentence.split(" ");
const wordCountedArrayLow = lowScoringData.map(question => (
  question['text'] = splitWords(question['text'])
));

const wordCountedArrayHigh = highScoringData.map(question => (
  question['text'] = splitWords(question['text'])
));

// Filter out all strings with numbers and special characters in them out of the array.
const containsNumber = (str) => /[0-9]/.test(str);
const containsSpecialChars = (str) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};↵–':'“”"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

// Filter out some commonly used articles, prepositions, conjuctions, pronouns and adverbs.
const containsArticlesPrepositions = (str) => {
  const articlesPrepositions = /of|do|did|the|as|an|by|to|in|on|is|from|she|he|they|we|us|our|are|if|so|it|for|or|be|not|and|a|how|who|will|when|where|which|what|why|but/
  return articlesPrepositions.test(str.toLowerCase());
}

// This puts together all of the words arrays used in all of the questions into one big array of strings.
const mergedWordListLow = [].concat.apply([], wordCountedArrayLow);
const mergedWordListHigh = [].concat.apply([], wordCountedArrayHigh);

// This does a count of repeated words and assigns a count to each word.
const wordCountsLow = [];
mergedWordListLow.forEach((x) => {
  x = x.toLowerCase();
  if(!containsNumber(x) && !containsSpecialChars(x) && !containsArticlesPrepositions(x)) {
    wordCountsLow[x] = (wordCountsLow[x] || 0) + 1;
  }
});

// Splits the word count objects into objects with name and count assigned separately.
const splitKeyValue = obj => {
  const keys = Object.keys(obj);
  const res = [];
  for(let i = 0; i < keys.length; i++){
     res.push({
        'name': keys[i],
        'count': obj[keys[i]]
     });
  };
  return res;
};

const separatedLowWords = splitKeyValue(wordCountsLow);
const topLowWords = separatedLowWords.sort((a,b) => (a.count > b.count) ? 1 : -1).reverse().slice(0, 11);

const wordCountsHigh = [];
mergedWordListHigh.forEach((x) => {
  x = x.toLowerCase();
  if(!containsNumber(x) && !containsSpecialChars(x) && !containsArticlesPrepositions(x)) {
    wordCountsHigh[x] = (wordCountsHigh[x] || 0) + 1;
  }
});
const separatedHighWords = splitKeyValue(wordCountsHigh);
const topHighWords = separatedHighWords.sort((a,b) => (a.count > b.count) ? 1 : -1).reverse().slice(0, 11);


  return (
    <div className="app-container">
      <header className='heading'>
        <h3>Top 10 commonly occuring words in Low Scoring questions:</h3>
        {topLowWords.map( word => (
          <div>{word.name}</div>
        ))}
      </header>
      <header className='heading'>
        <h3>Top 10 commonly occuring words in High Scoring questions:</h3>
        {topHighWords.map(word => (
          <div>{word.name}</div>
        ))}
      </header>
    </div>
  );
}

export default App;

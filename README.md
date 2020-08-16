# n-gram-counter
Count N-Grams

# install
```bash
npm install n-gram-counter
```

# usage
Call the function with `data` and `n`;
## counting sequential number pairs
When you pass in an array, you will get back an array where the grams are an array of items.
```javascript
const count = require('n-gram-counter');

const n = 2; // pairs

// an array of one 1, two 2's, three 3's, four 4's, and five 5's
const nums = [ 0, 0, 0, 71, 85, 91, 93, 1000, 1000 ];

const counts = count({ data: nums, n });
/*
counts is like [ [ pair, count ], [ pair, count ], ... ]
[
  [ [ 0, 0 ], 2 ],
  [ [ 0, 71 ], 1 ],
  [ [ 71, 85 ], 1 ],
  [ [ 85, 91 ], 1 ],
  [ [ 91, 93 ], 1 ],
  [ [ 93, 1000 ], 1 ],
  [ [ 1000, 1000 ], 1 ]
]
*/
```

## counting trigrams in text
When you pass in text, you will get back an array where the grams are substrings from that text.
```javascript
const count = require('n-gram-counter');

const n = 3; // three characters in a row

const text = "" +
"al/2011/100cm/fgdc/30085/m_3008501_ne_16_1_20110815.txt" +
"al/2011/100cm/fgdc/30085/m_3008501_nw_16_1_20110815.txt" +
"al/2011/100cm/fgdc/30085/m_3008502_ne_16_1_20110815.txt";

const counts = count({ data: text, n });
/*
[
  [ '2011', 6 ], [ '3008', 6 ], [ '0085', 6 ], [ '1081', 3 ],
  [ '1108', 3 ], [ 'al/2', 3 ], [ 'l/20', 3 ], [ '/201', 3 ],
  ...
]
*/

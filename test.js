const test = require("ava");
const count = require('./index.js');

const nums = [
    1,
    2, 2,
    3, 3, 3,
    4, 4, 4, 4,
    5, 5, 5, 5, 5
];

const text = `
al/2011/100cm/fgdc/30085/m_3008501_ne_16_1_20110815.txt
al/2011/100cm/fgdc/30085/m_3008501_nw_16_1_20110815.txt
al/2011/100cm/fgdc/30085/m_3008502_ne_16_1_20110815.txt
al/2011/100cm/fgdc/30085/m_3008502_nw_16_1_20110815.txt
al/2011/100cm/fgdc/30085/m_3008503_ne_16_1_20110815.txt
al/2011/100cm/fgdc/30085/m_3008503_nw_16_1_20110815.txt
al/2011/100cm/fgdc/30085/m_3008504_ne_16_1_20110815.txt
`;

test('counting unigrams', t => {
    const counts = count({ data: nums, debug: false, n: 1 });
    const expected = "[[[5],5],[[4],4],[[3],3],[[2],2],[[1],1]]";
    t.is(JSON.stringify(counts), expected);
});

test('counting bigrams', t => {
    const counts = count({ data: nums, debug: false, n: 2 });
    const expected = '[[[5,5],4],[[4,4],3],[[3,3],2],[[1,2],1],[[2,2],1],[[2,3],1],[[3,4],1],[[4,5],1]]';
    t.is(JSON.stringify(counts), expected);
});

test('counting trigrams', t => {
    const counts = count({ data: nums, debug: false, n: 3 });
    const expected = '[[[5,5,5],3],[[4,4,4],2],[[1,2,2],1],[[2,2,3],1],[[2,3,3],1],[[3,3,3],1],[[3,3,4],1],[[3,4,4],1],[[4,4,5],1],[[4,5,5],1]]';
    t.is(JSON.stringify(counts), expected);
});

test('counting when n equals length of an array of numbers', t => {
    const counts = count({ data: nums, debug: false, n: nums.length });
    t.is(counts.length, 1);
    t.is(counts[0][1], 1);
    t.is(JSON.stringify(counts[0][0]), JSON.stringify(nums));
});

test('counting when n equals length of an array of numbers minus 1', t => {
    const counts = count({ data: nums, debug: false, n: nums.length - 1 });
    t.is(counts.length, 2);
    t.is(counts[0][1], 1);
    t.is(counts[1][1], 1);
    t.is(JSON.stringify(counts[0][0]), JSON.stringify(nums.slice(0, nums.length-1)));
    t.is(JSON.stringify(counts[1][0]), JSON.stringify(nums.slice(1, nums.length)));
});

test('counting trigrams in text', t => {
    const counts = count({ data: text, debug: true, n: 3 });
    console.log('counts:', JSON.stringify(counts));
    const expected = `[["201",14],["300",14],["011",14],["008",14],["085",14],["100",7],["108",7],["110",7],["815",7],["850",7],["\\nal",7],["al/",7],["l/2",7],["/20",7],["11/",7],["1/1",7],["/10",7],["00c",7],["0cm",7],["cm/",7],["m/f",7],["/fg",7],["fgd",7],["gdc",7],["dc/",7],["c/3",7],["/30",7],["85/",7],["5/m",7],["/m_",7],["m_3",7],["_30",7],["_16",7],["16_",7],["6_1",7],["_1_",7],["1_2",7],["_20",7],["081",7],["15.",7],["5.t",7],[".tx",7],["txt",7],["xt\\n",7],["t\\na",6],["_ne",4],["ne_",4],["e_1",4],["_nw",3],["nw_",3],["w_1",3],["501",2],["502",2],["503",2],["01_",2],["1_n",2],["02_",2],["2_n",2],["03_",2],["3_n",2],["504",1],["04_",1],["4_n",1]]`;
    t.is(JSON.stringify(counts), expected);
});

const count_array = ({ arr, debug, n }) => {
    const counts = {};
    if (debug) console.log("arr:", arr);
    for (let i = n; i <= arr.length; i++) {
        const ngram = arr.slice(i - n, i);
        if (debug) console.log("ngram:", ngram);
        if (counts.hasOwnProperty(ngram)) counts[ngram].count++;
        else counts[ngram] = { original: ngram, count: 1 };
    }
    if (debug) console.log("counts:", counts);
    const sorted = Object.entries(counts).sort((a, b) => Math.sign(b[1].count - a[1].count));
    if (debug) console.log("sorted:", sorted);
    const results = sorted.map(it => [it[1].original, it[1].count]);
    if (debug) console.log("results:", results);
    return results;
}

const count_text = ({ text, debug, n }) => {
    const counts = {};
    if (debug) console.log("text: " + text.substring(0, 100).trim() + "...");
    for (let i = n; i <= text.length; i++) {
        const ngram = text.substring(i - n, i);
        if (debug) console.log("ngram:", ngram);
        if (counts.hasOwnProperty(ngram)) counts[ngram]++;
        else counts[ngram] = 1;
    }
    if (debug) console.log("counts:", counts);
    const sorted = Object.entries(counts).sort((a, b) => Math.sign(b[1] - a[1]));
    if (debug) console.log("sorted:", sorted);
    return sorted;
}

module.exports = ({ data, debug, n }) => {
    if (Array.isArray(data)) {
        return count_array({ arr: data, debug, n });
    } else {
        return count_text({ text: data, debug, n });
    }
};

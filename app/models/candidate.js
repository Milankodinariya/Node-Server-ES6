const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const CandidateSchema   = new Schema({
    title: String,
    length: String,
    category: String,
    author: String,
});

module.exports = mongoose.model('Candidate', CandidateSchema);


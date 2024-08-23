const mongoose = require('mongoose');
const { Schema } = mongoose;

const issueSchema = new Schema({
    project: { type: String, required: true },
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_by: { type: String, required: true },
    assigned_to: String,
    status_text: String,
    open: { type: Boolean, default: true },
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now }
});

const Issue = mongoose.model('Issue', issueSchema);

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    issues: [issueSchema]
});

const Project = mongoose.model('Project', ProjectSchema);
console.log('Models loaded');

module.exports = Issue;

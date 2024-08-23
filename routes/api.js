'use strict';

const IssueModel = require('../models.js').Issue;
const ProjectModel = require('../models.js').Project;
const ObjectId = require('mongoose').Types.ObjectId;


module.exports = function (app) {
  console.log('api.js loaded');

  app.route('/api/issues/:project')
  
    .get(async (req, res) => {
      let project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text, open } = req.query;
      ProjectModel.findOne({ name: project }, (err, project) => {
        if (!project) {
          return res.json([]);
        }
        let issues = project.issues;
        if (issue_title) {
          issues = issues.filter(issue => issue.issue_title === issue_title);
        }
        if (issue_text) {
          issues = issues.filter(issue => issue.issue_text === issue_text);
        }
        if (created_by) {
          issues = issues.filter(issue => issue.created_by === created_by);
        }
        if (assigned_to) {
          issues = issues.filter(issue => issue.assigned_to === assigned_to);
        }
        if (status_text) {
          issues = issues.filter(issue => issue.status_text === status_text);
        }
        if (open) {
          issues = issues.filter(issue => issue.open === open);
        }
        res.json(issues);
    })
    })
    
    .post(async (req, res) => {
      let project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: 'required field(s) missing' });
      }
      ProjectModel.findOne({ name: project }, (err, project) => {
        if (!project) {
          project = new ProjectModel({ name: project });
        }
        project.issues.push({ issue_title, issue_text, created_by, assigned_to, status_text });
        project.save((err, project) => {
          if (err) {
            return res.json({ error: 'could not save' });
          }
          res.json(project.issues[project.issues.length - 1]);
        });
      });
    })
    
    .put(async (req, res) => {
      let project = req.params.project;
      const { _id, issue_title, issue_text, created_by, assigned_to, status_text, open } = req.body;
      if (!_id) {
        return res.json({ error: 'missing _id' });
      } else if (!issue_title && !issue_text && !created_by && !assigned_to && !status_text && !open) {
        return res.json({ error: 'no update field(s) sent', _id });
      } else {
        ProjectModel.findOne({ name: project }, (err, project) => {
          if (!project) {
            return res.json({ error: 'could not update', _id });
          }
          let issue = project.issues.id(_id);
          if (!issue) {
            return res.json({ error: 'could not update', _id });
          }
          if (issue_title) {
            issue.issue_title = issue_title;
          }
          if (issue_text) {
            issue.issue_text = issue_text;
          }
          if (created_by) {
            issue.created_by = created_by;
          }
          if (assigned_to) {
            issue.assigned_to = assigned_to;
          }
          if (status_text) {
            issue.status_text = status_text;
          }
          if (open !== undefined) {
            issue.open = open;
          }
          project.save((err, project) => {
            if (err) {
              return res.json({ error: 'could not update', _id });
            }
            res.json({ result: 'successfully updated', _id });
          });
        });
      }     
    })
    
    .delete(async (req, res) => {
      let project = req.params.project;
      const { _id } = req.body;
      if (!_id) {
        return res.json({ error: 'missing _id' });
      }
      ProjectModel.findOne({ name: project }, (err, project) => {
        if (!project) {
          return res.json({ error: 'could not delete', _id });
        }
        let issue = project.issues.id(_id);
        if (!issue) {
          return res.json({ error: 'could not delete', _id });
        }
        issue.remove();
        project.save((err, project) => {
          if (err) {
            return res.json({ error: 'could not delete', _id });
          }
          res.json({ result: 'successfully deleted', _id });
        });
      })
    });
    
};

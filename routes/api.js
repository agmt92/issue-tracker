"use strict";

const json = require("body-parser/lib/types/json");

module.exports = function (app) {
  let issues = [];

  app
    .route("/api/issues/:project")

    .get(async (req, res) => {
      const project = req.params.project;
      const {
        _id,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        open,
      } = req.query;

      let filteredIssues = issues.filter((issue) => issue.project === project);

      if (_id)
        filteredIssues = filteredIssues.filter((issue) => issue._id === _id);
      if (issue_title)
        filteredIssues = filteredIssues.filter(
          (issue) => issue.issue_title === issue_title
        );
      if (issue_text)
        filteredIssues = filteredIssues.filter(
          (issue) => issue.issue_text === issue_text
        );
      if (created_by)
        filteredIssues = filteredIssues.filter(
          (issue) => issue.created_by === created_by
        );
      if (assigned_to)
        filteredIssues = filteredIssues.filter(
          (issue) => issue.assigned_to === assigned_to
        );
      if (status_text)
        filteredIssues = filteredIssues.filter(
          (issue) => issue.status_text === status_text
        );
      if (open)
        filteredIssues = filteredIssues.filter(
          (issue) => issue.open.toString() === open.toString()
        );

      res.json(filteredIssues);
    })

    .post(async (req, res) => {
      const project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } =
        req.body;

      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: "required field(s) missing" });
      }

      const newIssue = {
        _id: new Date().getTime().toString(),
        issue_title,
        issue_text,
        created_on: new Date().toISOString(),
        updated_on: new Date().toISOString(),
        created_by,
        assigned_to: assigned_to || "",
        open: true,
        status_text: status_text || "",
        project,
      };

      issues.push(newIssue);
      res.json({ ...newIssue, result: "successfully created" });
    })

    .put(async (req, res) => {
      const project = req.params.project;
      const updateFields = req.body;
      const { _id } = updateFields;
    
      // Check for missing _id
      if (!_id) {
        return res.json({ error: 'missing _id' });
      }
    
      // Remove _id from the update fields
      delete updateFields._id;
    
      // Check if there are no fields to update
      if (Object.keys(updateFields).length === 0) {
        return res.json({ error: 'no update field(s) sent', _id });
      }

      // Find the index of the issue with the provided _id
      const issueIndex = issues.findIndex(issue => issue._id === _id && issue.project === project);
    
      // Check if the issue was found
      if (issueIndex === -1) {
        return res.json({ error: 'could not update', _id });
      }
    
      // Update fields if provided
      const issue = issues[issueIndex];
      for (const key in updateFields) {
        if (updateFields[key] !== undefined) {
          issue[key] = updateFields[key];
        }
      }
    
      // Update the updated_on field
      issue.updated_on = new Date().toISOString();
    
      res.json({ result: 'successfully updated', _id });
    })
    

    .delete(async (req, res) => {
      const project = req.params.project;
      const { _id } = req.body;

      if (!_id) {
        return res.json({ error: "missing _id" });
      }

      const issueIndex = issues.findIndex(
        (issue) => issue._id === _id && issue.project === project
      );

      if (issueIndex === -1) {
        return res.json({ error: "could not delete", _id });
      }

      issues.splice(issueIndex, 1);

      res.json({ result: "successfully deleted", _id });
    });
};
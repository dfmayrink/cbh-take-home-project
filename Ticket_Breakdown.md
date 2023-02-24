# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

#1 As a Admin user, I would like the possibility to override the default database Id per Agent
The admin user needs the possibility to override the default database Id with a custom one.
We then need to add a custom field in the create/update agent page that will allow the persistence of this field.
Tasks that needed to be accomplished:
- Add a new field with a custom Id in the Agent page
- Update the Rest (or GraphQL definition) endpoint in the backend so it accepts the new field
- Update mongoose to add the new field in the persistence layer
- Update unit test for checking if the field was correctly persisted
Estimation to complete: 1 business day

#2 As a user that can generate reports, I need the custom Id to be displayed in reports
The report user needs to see the custom Id in the report.
Tasks that need to be accomplished:
- Check the SQL query to check if the field needs to be added to the query, the logic for retrieving the data is inside getShiftsByFacility
- Update the function so any custom Id will be returned in the returning JSON
- Update unit tests so this new logic can be checked
- Add a new column in the report, called Custom ID
- Populate that column with custom ids returned from getShiftsByFacility when present. The column should show an empty string on no value for custom Id.
Estimation to complete: 2 business days

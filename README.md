# Roller Coaster Database

## Project Overview

I (Alex Densmore - GitHub username 'alexander89d') completed this project with a classmate (GitHub username 'loganseals') as the main course project for CS 340 (Introduction to Databases) during Spring 2019 while I was a student at Oregon State University. **Students in that class were granted express permission to post the source code they submitted for this project publicly for use in professional portfolios. Furthermore, I have been granted permission by my project partner to post this project (including his work since we both contributed to this project) publicly.**

The project assignment spanning the whole class with various checkpoints throughout required the creation of a MySQL database, a Node.js or Python Flask server (we opted for Node.js), and a frontend website (which we coded in HTML, CSS, and client-side JavaScript). Through the frontend website, users could perform CRUD (Create, Read, Update, and Delete) operations for various amusement park-related entities: roller coasters, amusement parks, roller coaster features, manufacturers, and park owners. Our MySQL databases were hosted on school servers and then deleted after the course was over, so this site (which was only ever usable to those logged onto Oregon State's network) is no longer live.

Since this was a group project, see the [commits history](https://github.com/alexander89d/roller-coaster-database/commits/master) to view what contributions each of us individually made.

## Repository Structure

When making this repository public on GitHub, the files, which were originally all in the same folder on GitHub, were separated into the following three folders based on the major component to which they belonged. Each of these components was hosted separately.
- [Fronted/](Frontend/): Contains the HTML, CSS, JavaScript, and image files for the frontend website.
- [Server/](Server/): Contains the Node.js server code and the package.json file with dependencies.
- [SQL/](SQL/): Contains the code generated through phpMyAdmin for cloning the database in [rcdb_dump.sql](SQL/rcdb_dump.sql) as well as drafts of all the necessary database queries in [DMQ.sql](SQL/DMQ.sql) (these queries are incorporated into the server's Node.js file).

## Documentation

In addition to submitting code for the frontend, server, and database, we were required to provide documentation with our submission. **I have slightly revised the order of sections and added / clarified headings in the documentation to make the purpose of different sections clearer to outside readers who did not complete this course. In addition, I have removed last names of those who provided peer reviews of our work. The actual content of each section is the original documentaiton content submitted with this project.** 

The documentation is divided into the following sections:
- Project Outline: This section includes a project overview, entity definitions, and entity attributes
- ERD and Schema Diagrams
- Changes Based on Feedback: This section includes text of all feedback from peers and graders that we received on Parts 1-6, indication of what changes we chose to make based on feedback (and reasoning why certin suggestions were not implemented), and descriptions of any additional changes we decided to make ourselves

This documentation can be viewed at [https://alexdensmore.dev/projects/documentation/roller-coaster-database.pdf](https://alexdensmore.dev/projects/documentation/roller-coaster-database.pdf).

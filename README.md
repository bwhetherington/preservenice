# Installation

1. `git clone git@github.com:bwhetherington/pv-template.git`
2. `npm install`

# Running the website

## Development

- Run the webpack watcher with `npm run dev`
- In another terminal, run the server with `npm start`
- Navigate to http://localhost:8080 in your browser

## Production

- Build the website with `npm run build`
- Run the server with `npm start`

# How to contribute

## General information

This project uses React, alongside the [Material-UI](https://material-ui.com/) package for styling.
Code should be styled and formatted according to the [AirBnB Style Guide](https://github.com/airbnb/javascript). In addition, information for styling JSX portions of code
for React can be found [here](https://github.com/airbnb/javascript/tree/master/react).

## Getting started in VS Code

For the best development experience in VS code, please download the ESLint and Prettier plugins.
This will allow the code to automatically be formatted according to the AirBnB JavaScript standard
whenever a file is saved.

# TODO

- Figure out why Webpack is building an unneeded build.index.html

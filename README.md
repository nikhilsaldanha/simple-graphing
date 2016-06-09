# simple-graphing

A web tool for simple graphing in D3.js, rendered in React.js for real-time tweaking.

## Usage

1. Download or Clone the repo:

   `git clone https://github.com/nikhilsaldanha/simple-graphing.git`

2. Change directory to the cloned repo and ensure you have **NPM** so you can install dependencies:

  `npm install`

3. Next run `npm start`. This starts the app in the browser on localhost on port 3333. You can change this in **webpack.config.js**.

4. Try uploading a csv file with two columns. I have also included a CSV file in the repo which you can test with.

## Idea

The idea was to give users complete control of every aspect of the graph right from the data to space between the ticks on the axes.

This amount of detail may be cumbersome to code on various graphing libraries, but is simplified greatly by exposing each of these tiny settings as simple controls that the user can tweak and observe in real-time.

## App Structure

### Frontend
The frontend is served using [**React.js**](https://facebook.github.io/react/) using principles of [**Redux**](http://redux.js.org/) for state management, all bundled using [**Webpack**](https://webpack.github.io/).
I have used the amazing **ES6** which is transpiled to ES5 by [**Babel**](https://babeljs.io/).

I chose [**D3.js**](https://d3js.org/) for creating the graphs because of the great amount of low-level control that is available with it and because I am such a big fan of Mike Bostock.

### **Backend**
Currently there is no database and hence no server is required. In the future, option to save created graphs may be added.


## **Future Work and Areas for Contribution**

* ~~The first order of business would be to improve the folder structure.~~

* Currently the UI looks sub-par which I'm looking to improve.

* As of now, the app only produces a Line Graph. I would like to add other graph types.

* I'm going to be deploying this App on Heroku soon!

## **License**

### The MIT License (MIT)

Copyright (c) 2016 Nikhil Saldanha

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

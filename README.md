### SpotLink: Paintbucket BFS challenge 

## <a name="quick-start"></a>Quick Start

### Run Via NPM after Cloaning:

```bash
npm install 
npm start
```
### Build a prod version and run using [Server for static builds](https://create-react-app.dev/docs/deployment/#static-server)
```bash

npm run build 
npm install -g serve
serve -s build
or to specifiy port 
serve -s build -l 4000
```

## Background 
The application builds a 10 row by 15 column grid using React.js. The app uses two inputs, a color  picker and a select input, to allow a user to change the color of a table cell. Originally, the app or th UI was built for the app Sandbox. The implmentation at that point included three files: index.html, index.js. styles.css.

## Original Implementation
The application existed on Sandbox and had three files
1) index.html
2) index.js
3) styles.css

Index.html instantiated the Table and the Select / Color inputs. It also handled the linking of CSS and the JS file

Index.js had three functions. CreateTable, onClick, and instantiating the table by calling CreateTable with parameters 10, 15. 

styles.css styling did not exist in great number. The only styling in this file was setting the cell width and height to 10 px. 

## React Implementation
The react implementation likewise depends on the index file => or in the case of react it is called App.js. Also, React implementation relies on two components. These two components represent the two input html elements originally located in the index.html: ColorPicker, and Select. For the react implementation, these are functional or non-stateful components.

## Comments on differences
The original implementation was in many ways easy to work with since access to the DOM required less craftiness. For example, the react implementation required keeping a mirror copy of the grid as an abstraction. This is because we can much easier update an abstraction rather than an element that has been instantiated. Moreover, the DOM allows the user to use a query to get all <Td> elements and then programmatically updated their baackgroundcolor if the logic permits.
  
## BFS implementation did not differ
  Regardless of whether react or non-react is implementation differ from one another, the implementation of BFS would not differ materially. In the case of this repo, BFS is implemented if a user selects a cell and the 'fill' action is selected (managed by react state as action). Specifically, in both implementations I would call BFS in the onClick function fr the table cell. If the user had selected fill rather than paint, I would then call BFS with the row an col of the cell. Also, in the react case the parameter for the abstraction of the table, colors, can be sent over as another argument. Finally, the new color can be sent over. 

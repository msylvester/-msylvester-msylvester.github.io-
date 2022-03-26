### Spot Paint

##Background 
The application builds a 10 row by 15 column grid using React.js. The app uses two inputs, a color  picker and a select input, to allow a user to change the color of a table cell. Originally, the app or th UI was build using three files: index.html, index.js. styles.css.

##Original Implmentation
The applicaiton existed on Sandbox and had three files
1) index.html
2) index.js
3) styles.css

Index.HTMl instantiated the Table and the Select / Color inputs. It also handled the linking of CSS and the JS file

Index.js had three functions. CreateTabl, onClick, and instantiating the table by calling CreateTable with parameters 10, 15. 

styles.css styling did not exist in great number. The only styling in this file was setting the cell width and height to 10 px. 

##React Implmentation
The react implmentation likewise depends on the index file => or in the case of react it is called App.js. Also, React implmentation relies on two components. These two components represent the two input html elements originally located in the index.html: ColorPicker, and Select. For the react implementation, these are functional or non-stateful components.

##Comments on differences
The original implmentation was in many ways easy to work with since access to the DOM required less craftinesss. For example, the react implmentation required keeping a mirror copy of the grid as an abstraction. This is because we can much easier update an abstraction rather than an element that has been instantiated. Moreover, the DOM allows the user to use a query to get all <Td> elments and then programtiaclly updated their baackgroundcolor if the logicpermits.
  
##BFS implmmentation did not differ
  Regardless of whether react or non-react js implemntations differ from one another, the implementation of BFS would not differ materially. In the case of this repo, BFS is implemnmted if a user selects a cell and the 'fill' action is selected (managed by react state as action). Specifically, in both implmentations I woudl call BFS in the onClick function fr the table cell. If the user had selected fill rather than paint, I would then call BFS with the row an col of the cell. Also, in the react case the paramter for the abstraction of the table, colors, can be sent over as another argument. Finaly, the new color can be sent over. 

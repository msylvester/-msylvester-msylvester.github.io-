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
```
or to specifiy port 
```bash
serve -s build -l 4000
```

### Background - MS Paint im React 
MS Paint is software found on most 90s home desktop computers. This app generally allowed the user to paint with a 'brush' and fill areas with 'paint buckets'. This app renders a 10 x 15 square grid. Each square is rendered as a table cell or _td_ in the HTML lexicon. Further, the cells are 10px by 10px, which is coded in the styling of the table cell element (found in App.js). The 'brush' in this app is simulated by the action 'paint' and hanges the background color of a table cell. Similiarly, the action 'fill' applies the backgroudn color selected by the user to all cells accessible by the source cell. The source cell is defined as the cell selected by the user. In the app, this is defined as the cell whose id can be found in the _onClick_ event. 
  
Moreover, The app uses two HTML _inputs_, a color picker and a select input, to allow a user to change the color of a table cell. Originally, the app or th UI was built for the app Sandbox. The implmentation at that point included three files: index.html, index.js. styles.css, and did not use React.js. 

### Breadth First Search (BFS)
Interested parties should take note of App.js where the BFS method can be found. BFS is an algortihm best explained in terms of Vertices and Edges G=*(V,E).

```bash
A graph G is an ordered pair (V,E) where V is a finite set and E ⊆ V nCr 2 is a set of pairs of elements in V. 

```


Breadth First Search is useful in a number of applications. I recognized it could be used to _fill_ adjacent cells if the adjacent cell is currently non-colored (or White/#FFFFFF/rgb(255,255,255)). Further, BFS guarantees that each vertice will be visited if there is a path between two vertices; where each of the two vertices is in the graph, G. For this reason, I adjusted the algorithim for BFS

### BFS in all its glory 
#### [source](https://www.hackerearth.com/practice/algorithms/graphs/breadth-first-search/tutorial/)

```bash
BFS (G, s)                   //Where G is the graph and s is the source node
      let Q be queue.
      Q.enqueue( s ) //Inserting s in queue until all its neighbour vertices are marked.

      mark s as visited.
      while ( Q is not empty)
           //Removing that vertex from queue,whose neighbour will be visited now
           v  =  Q.dequeue( )

          //processing all the neighbours of v  
          for all neighbours w of v in Graph G
               if w is not visited 
                        Q.enqueue( w )             //Stores w in Q to further visit its neighbour
                        mark w as visited.
```


### BFS in this app 
```bash
  /**
   * @name bfs implmenents the BFS algo
   * @param {integer} row the data-source row value of the cell clicked on
   * @param {integer} col the data-source col value of the cell clicked on
   * @param {Object} colors one-dimenionsal object with keys equal to the id of every <td>
   * @param {string} newColor the selected color
   */
  bfs = (row, col, colors, newColor) => {
    //instantiate an obj named vis which stores the visited value for cell (<td>) & the queue
    let vis = {},
      queueBFS = [];

    for (let i = 1; i <= noRows; i++) {
      for (let j = 1; j <= noCols; j++) {
        vis[`${i}_${j}`] = 0;
      }
    }

    // Push the initial datasource & the corresponding datasource in visit
    queueBFS.push([row, col]);
    vis[`${row}_${col}`] = 1;

    while (queueBFS.length) {
      //due to the laborious nature of checking, creating const to be safe
      let coord = queueBFS[0];
      const nRow = coord[0],
        nCol = coord[1],
        nRowMinus = nRow - 1,
        nRowPlus = nRow + 1,
        nColPlus = nCol + 1,
        nColMinus = nCol - 1,
        preColor = colors[`${nRow}_${nCol}`];

      colors[`${nRow}_${nCol}`] = newColor;

      queueBFS.shift();

      // check pix on either side and above and below the cell clicked on
      if (
        this.validCoord(nRowPlus, nCol) &&
        vis[`${nRowPlus}_${nCol}`] == 0 &&
        colors[`${nRowPlus}_${nCol}`] == preColor
      ) {
        queueBFS.push([nRowPlus, nCol]);
        vis[`${nRowPlus}_${nCol}`] = 1;
      }
      if (
        this.validCoord(nRowMinus, nCol) &&
        vis[`${nRowMinus}_${nCol}`] == 0 &&
        colors[`${nRowMinus}_${nCol}`] == preColor
      ) {
        queueBFS.push([nRowMinus, nCol]);
        vis[`${nRowMinus}_${nCol}`] = 1;
      }

      if (
        this.validCoord(nRow, nColPlus) &&
        vis[`${nRow}_${nColPlus}`] == 0 &&
        colors[`${nRow}_${nColPlus}`] == preColor
      ) {
        queueBFS.push([nRow, nColPlus]);
        vis[`${nRow}_${nColPlus}`] = 1;
      }
      if (
        this.validCoord(nRow, nColMinus) &&
        vis[`${nRow}_${nColMinus}`] == 0 &&
        colors[`${nRow}_${nColMinus}`] == preColor
      ) {
        queueBFS.push([nRow, nColMinus]);
        //console.log(`we added row:${nRow} // and we aded col:${nColMinus}`)
        vis[`${nRow}_${nColMinus}`] = 1;
      }
    }
    this.setState(colors);
  };
```
                        
### How to Trigger the BFS algorithm
BFS triggers when fill can be ascribed to the state variable named action. Visually, the result of BFS is a feature akin to the paintbucket in most version of MS Paint & Photoshop. Namely, the cells accessible from the root or selected cell will have the background color changed to color selected in the Color Picker input.  


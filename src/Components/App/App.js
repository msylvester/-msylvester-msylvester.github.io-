/* eslint-disable */
import { Component } from "react";
import "./App.css";
import ColorPicker from "../ColorPicker";
import SelectPaint from "../Select/Select";
import { noRows, noCols, hexToRgb } from "./utils";

/**
 * @name makeInc augments the base Array class by using this funciton to create a list from 1 to N
 * @param {int} N is the size of the array
 * @param {function} f is a function for which to generate the values in the list
 * @returns an array with elements equal to 1 at index 0 and N at index N-1
 */
Array.prototype.makeInc = (N, f) => {
  return [...Array(N).keys()].map(f).map(n => n);
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputColor: hexToRgb("#000000"),
      action: "paint",
      colors: {},
    };
  }
  componentDidMount() {
    let { colors } = this.state;
    []
      .makeInc(noRows, i => i + 1)
      .map(row => {
        []
          .makeInc(noCols, i => i + 1)
          .map(col => {
            colors[`${row}_${col}`] = hexToRgb("#FFFFFF");
          });
      });
    this.setState({ colors });
  }

  setColor = inputColor => {
    this.setState({
      inputColor,
    });
  };

  onClick = e => {
    const { action, inputColor, colors } = this.state,
      {
        target: {
          dataset: { row, col },
          id,
        },
      } = e;

    if (action === "paint") {
      colors[id] = hexToRgb(inputColor);
      this.setState({ colors });
    }
    if (action === "fill")
      this.dfs(parseInt(row), parseInt(col), colors, inputColor);
  };

  handleChange = e => {
    const {
      target: { value: action },
    } = e;
    this.setState({ action });
  };

  /**
   * @name validCoord
   * @param {integer} row the data-row or dataset row attr of the cell (<td>)
   * @param {integer} col the data-set or dataset col attr of the cell (<td>)
   * @returns boolean
   */
  validCoord = (row, col) => {
    if (row > noRows || col > noCols || row < 0 || col < 0) return false;
    return true;
  };

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
        preColor = colors[`${nRow}_${nCol}`];

      colors[`${nRow}_${nCol}`] = newColor;

      queueBFS.shift();

      ["row", "col"].forEach(turn => {
        [-1, 1].forEach(inc => {
          let tempRow = turn === "row" ? parseInt(nRow) + parseInt(inc) : nRow,
            tempCol = turn === "col" ? parseInt(nCol) + parseInt(inc) : nCol;

          if (
            this.validCoord(tempRow, tempCol) &&
            vis[`${tempRow}_${tempCol}`] == 0 &&
            colors[`${tempRow}_${tempCol}`] == preColor
          ) {
            queueBFS.push([tempRow, tempCol]);
            vis[`${tempRow}_${tempCol}`] = 1;
          }
        });
      });
    }
    this.setState({ colors });
  };
  /**
   * @name dfs implmenents the DFS algo
   * @param {integer} row the data-source row value of the cell clicked on
   * @param {integer} col the data-source col value of the cell clicked on
   * @param {Object} colors one-dimenionsal object with keys equal to the id of every <td>
   * @param {string} newColor the selected color
   */
  dfs = (row, col, colors, newColor) => {
    //instantiate an obj named vis which stores the visited value for cell (<td>) & the queue
    let vis = {},
      stackDFS = [];

    for (let i = 1; i <= noRows; i++) {
      for (let j = 1; j <= noCols; j++) {
        vis[`${i}_${j}`] = 0;
      }
    }

    // Push the initial datasource & the corresponding datasource in visit
    stackDFS.push([row, col]);
    vis[`${row}_${col}`] = 1;

    while (stackDFS.length) {
      //due to the laborious nature of checking, creating const to be safe
      let coord = stackDFS.pop();
      const nRow = coord[0],
        nCol = coord[1],
        preColor = colors[`${nRow}_${nCol}`];

      colors[`${nRow}_${nCol}`] = newColor;

      ["row", "col"].forEach(turn => {
        [-1, 1].forEach(inc => {
          let tempRow = turn === "row" ? parseInt(nRow) + parseInt(inc) : nRow,
            tempCol = turn === "col" ? parseInt(nCol) + parseInt(inc) : nCol;

          if (
            this.validCoord(tempRow, tempCol) &&
            vis[`${tempRow}_${tempCol}`] == 0 &&
            colors[`${tempRow}_${tempCol}`] == preColor
          ) {
            stackDFS.push([tempRow, tempCol]);
            vis[`${tempRow}_${tempCol}`] = 1;
          }
        });
      });
    }
    this.setState({ colors });
  };
  render = () => {
    const {
      state: { inputColor, action, colors },
      handleChange,
      setColor,
      onClick,
    } = this;

    return (
      <div className='App' display='flex' alignItems='center'>
        <table id='table' border='1'>
          <tbody>
            {[]
              .makeInc(noRows, i => i + 1)
              .map((row, k) => {
                return (
                  <tr key={k}>
                    {[]
                      .makeInc(noCols, i => i + 1)
                      .map((col, index) => {
                        return (
                          <td
                            style={{
                              width: "10px",
                              height: "10px",
                              background: colors[`${row}_${col}`],
                            }}
                            data-row={row}
                            data-col={col}
                            title={`row ${row} col ${col}`}
                            id={`${row}_${col}`}
                            key={`${row}_${col}`}
                            onClick={e => onClick(e)}
                          />
                        );
                      })}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div>
          <br />
          <ColorPicker
            key={"colorPicker"}
            inputColor={inputColor}
            setColor={setColor}
          />
          <SelectPaint
            selected={action}
            handleChange={handleChange}
            key={"selectPaint"}
          />
        </div>
      </div>
    );
  };
}
export default App;
/* eslint-enable */

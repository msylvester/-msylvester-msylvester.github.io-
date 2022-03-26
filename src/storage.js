helper = async (grid, src, fillColor = null, n = null) => {
    let visited = new Array(n);
    for (var k = 0; k < n; k++) {
        visited[k] = false;
    }
    var q = new queue();
    q.push(src);
    visited[src] = true;
    while (!q.empty()) {
        let node = q.front();
        grid[node].style.backgroundColor = fillColor;
        await MakeDelay(delay)
        q.pop();

        var nbrs = this.giveNbrs(node);
        for (var i = 0; i < nbrs.length; i++) {
            if (visited[nbrs[i]] === false && grid[nbrs[i]].style.backgroundColor !== 'black') {
                q.push(nbrs[i]);
                visited[nbrs[i]] = true;
            }
        }
    }
}
giveNbrs = (pos, n = null) => {
    const { col = null } = pos
    const arr = [];
    if ((pos - 1 >= 0) && (pos % col !== 0)) {


        arr.push(pos - 1);
    }
    if ((pos + 1 < n) && ((pos + 1) % col !== 0)) {
        arr.push(pos + 1);
    }
    if (pos - col >= 0) {
        arr.push(pos - col);
    }
    if (pos + col < n) {
        arr.push(pos + col)
    }
    return arr;
}


updateBoard = (e) => {
    const { inputColor: color, action } = this.state;
    action === "paint"
        ? (e.target.style.backgroundColor = color)
        : this.fillSquares(e, { oldC: e.target.style.backgroundColor, newC: color });
}
fillBFS = async (cx, cy, color, colMax = 15) => {
    const { newC, oldC } = color, pos = (cx * colMax) + cy;
    let grid = this.state.colors
    let fillColor = this.hexToRgb(newC);


    await this.helper(grid, pos);


}

fillSquares = (e, { oldC, newC }) => {
    const {
        target: {
            dataset: { row = null, col = null }
        }
    } = e;

    console.log(`here is teh old color: ${oldC}`);
    this.fillBFS(row, col, { newC, oldC });
};
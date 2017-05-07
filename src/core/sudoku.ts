function cross(A: Array<string>, B: Array<string>) {
    let C = [];
    for(let a in A){
        for(let b in B){
            C.push(a + b);
        }
    }

    return C;
}

function createUnitList(cols: Array<any>, rows: Array<any>){
    let unitlist = [];
    for(let c in cols) {
        unitlist.push(cross(rows, [cols[c]]));
    }
    for(let r in rows) {
        unitlist.push(cross([rows[r]], cols));
    }
    var rrows = [['A','B','C'], ['D','E','F'], ['G','H','I']];
    var ccols = [['1','2','3'], ['4','5','6'], ['7','8','9']];
    for (var rs in rrows) {
        for (var cs in ccols) {
            unitlist.push(cross(rrows[rs], ccols[cs]));
        }
    }
    return unitlist;
}

function createUnits(squares:Array<any>, unitlist:Array<any>): Array<Array<any>> {
    let units = [];
    for (let s in squares){
        units[squares[s]] = [];
        for (let u in unitlist) {
            if (squares[s] in unitlist[u]) {
                units[squares[s]].push(unitlist[u]);
            }
        }
    }
    return units;   
}

let rows = ['A','B','C','D','E','F','G','H','I'];
let cols = ['1','2','3','4','5','6','7','8','9'];
let digits = "123456789";
export const squares = cross(rows, cols);
export const unitList = createUnitList(cols, rows);
export const units = createUnits(squares, unitList);
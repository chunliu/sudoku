function cross(A: string[], B: string[]) {
    const C: string[] = [];
    for (const a of A) {
        for (const b of B) {
            C.push(a + b);
        }
    }

    return C;
}

function createUnitList(cols: string[], rows: string[]) {
    const unitlist = [];
    for (const c of cols) {
        unitlist.push(cross(rows, [c]));
    }
    for (const r of rows) {
        unitlist.push(cross([r], cols));
    }
    const rrows = [["A", "B", "C"], ["D", "E", "F"], ["G", "H", "I"]];
    const ccols = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]];
    for (const rs of rrows) {
        for (const cs of ccols) {
            unitlist.push(cross(rs, cs));
        }
    }
    return unitlist;
}

function member(item: string, list: string[]) {
  for (const i of list){
    if (item === i) {
        return true;
    }
  }
  return false;
}

interface IUnits {
    [index: string]: any[];
}

interface IPeers {
    [index: string]: {[index: string]: boolean};
}

function createUnits(squares: string[], unitlist: any[]): IUnits {
    const units: IUnits = {};
    for (const s of squares){
        units[s] = [];
        for (const u of unitlist) {
            if (member(s, u)) {
                units[s].push(u);
            }
        }
    }
    return units;
}

function createPeers(squares: string[], units: IUnits): IPeers {
    const peers: IPeers = {};
    for (const s of squares) {
        peers[s] = {};
        for (const u of units[s]) {
            const ul = u;
            for (const s2 of ul) {
                if (s2 !== s) {
                    peers[s][s2] = true;
                }
            }
        }
    }
    return peers;
}

function assign(values: {[index: string]: string}, square: string, digit: string) {
    return true;
}

function eliminate(values: {[index: string]: string}, square: string, digit: string) {
    if (values[square].indexOf(digit) == -1) {
        return values;
    }
    values[square] = values[square].replace(digit, "");
    if(values[square].length == 0) {
        return false;
    } 
    if (values[square].length == 1) {
        
    }
    return true;
}

function parseGrid(grid: string, squares: string[], digits: string) {
    const values: {[index: string]: string} = {};
    for (const s of squares) {
        values[s] = digits;
    }
    const allDigits = "0.-123456789";
    let grid2 = "";
    for (const c of grid) {
        if (allDigits.indexOf(c) >= 0) {
            grid2 += c;
        }
    }
    for (let i = 0; i < squares.length; i++) {
        if (digits.indexOf(grid2.charAt(i)) >= 0 
            && !assign(values, squares[i], grid2.charAt(i))) {

        }
    }
}

const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const cols = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const digits = "123456789";
export const squares = cross(rows, cols);
export const unitList = createUnitList(cols, rows);
export const units = createUnits(squares, unitList);
export const peers = createPeers(squares, units);

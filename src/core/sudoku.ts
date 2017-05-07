function cross(A: Array<string>, B: Array<string>) {
    let C = [];
    for(let a of A){
        for(let b of B){
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

function member(item: any, list: Array<any>){
  for (let i in list){
    if (item == list[i]) {
        return true;
    }
  }
  return false;
}

interface IUnits {
    [index:string]: Array<any>;
}

interface IPeers {
    [index:string]: {[index:string]: boolean};
}

function createUnits(squares:Array<any>, unitlist:Array<any>): IUnits {
    let units: IUnits = {};
    for (let s in squares){
        units[squares[s]] = [];
        for (let u in unitlist) {
            if (member(squares[s], unitlist[u])) {
                units[squares[s]].push(unitlist[u]);
            }
        }
    }
    return units;   
}

function createPeers(squares:Array<any>, units: IUnits): IPeers {
    let peers: IPeers = {}; 
    for(let s of squares) {
        peers[s] = {};
        for(let u in units[s]) {
            let ul = units[s][u];
            for(let s2 in ul){
                if(ul[s2] != s){
                    peers[s][ul[s2]] = true;
                }
            }
        } 
    }
    return peers;
}

let rows = ['A','B','C','D','E','F','G','H','I'];
let cols = ['1','2','3','4','5','6','7','8','9'];
let digits = "123456789";
export const squares = cross(rows, cols);
export const unitList = createUnitList(cols, rows);
export const units = createUnits(squares, unitList);
export const peers = createPeers(squares, units);
interface IUnits {
    [index: string]: any[];
}

interface IPeers {
    [index: string]: {[index: string]: boolean};
}
const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const cols = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const digits = "123456789";

export class Sudoku {
    Squares: string[];
    UnitList: string[][];
    Units: IUnits;
    Peers: IPeers;
    constructor(){
        this.Squares = this.Cross(rows, cols);
        this.UnitList = this.CreateUnitList(cols, rows);
        this.Units = this.CreateUnits();
        this.Peers = this.CreatePeers();
    }
    private Cross(A: string[], B: string[]) {
        const C: string[] = [];
        for (const a of A) {
            for (const b of B) {
                C.push(a + b);
            }
        }
        return C;
    }
    private CreateUnitList(cols: string[], rows: string[]) {
        const unitlist = [];
        for (const c of cols) {
            unitlist.push(this.Cross(rows, [c]));
        }
        for (const r of rows) {
            unitlist.push(this.Cross([r], cols));
        }
        const rrows = [["A", "B", "C"], ["D", "E", "F"], ["G", "H", "I"]];
        const ccols = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]];
        for (const rs of rrows) {
            for (const cs of ccols) {
                unitlist.push(this.Cross(rs, cs));
            }
        }
        return unitlist;
    }
    private Member(item: string, list: string[]) {
        for (const i of list){
            if (item === i) {
                return true;
            }
        }
        return false;
    }    
    private CreateUnits(): IUnits {
        const units: IUnits = {};
        for (const s of this.Squares){
            units[s] = [];
            for (const u of this.UnitList) {
                if (this.Member(s, u)) {
                    units[s].push(u);
                }
            }
        }
        return units;
    }
    private CreatePeers(): IPeers {
        const peers: IPeers = {};
        for (const s of this.Squares) {
            peers[s] = {};
            for (const u of this.Units[s]) {
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
}

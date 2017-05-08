export const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
export const COLS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
export const DIGITS = "123456789";
interface IUnits {
    [index: string]: string[][];
}

interface IPeers {
    [index: string]: {[index: string]: boolean};
}

export class Sudoku {
    public Squares: string[];
    public UnitList: string[][];
    public Units: IUnits;
    public Peers: IPeers;
    constructor() {
        this.Squares = this.Cross(ROWS, COLS);
        this.UnitList = this.CreateUnitList(ROWS, COLS);
        this.Units = this.CreateUnits();
        this.Peers = this.CreatePeers();
    }
    public Solve(grid: string) {
        return this.Search(this.ParseGrid(grid));
    }
    public Dislay(input: {[index: string]: string} | boolean) {
        if (typeof input === "boolean") {
            console.log("input is boolean");
            return;
        }
        const values: {[index: string]: string} = input;
        let width: number = 0;
        for (const s of this.Squares) {
            if (width < values[s].length) {
                width = values[s].length;
            }
        }
        width += 1;
        let dash: string = "";
        for (let i = 0; i < width * 3; i++) {
            dash += "-";
        }
        const line = dash + "+" + dash + "+" + dash;
        let result = "";
        for (const r of ROWS) {
            let row = "";
            for (const c of COLS) {
                row += values[r + c] + " ";
                if (c === "3" || c === "6") {
                    row += "|";
                }
            }
            result += row + "\r\n";
            if (r === "C" || r === "F") {
                result += line + "\r\n";
            }
        }
        console.log(result);
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
    private CreateUnitList(rows: string[], cols: string[]) {
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
    private CreateUnits(): IUnits {
        const units: IUnits = {};
        for (const s of this.Squares){
            units[s] = [];
            for (const u of this.UnitList) {
                if (u.indexOf(s) !== -1) {
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
    // Constraint Propagation
    private Assign(values: {[index: string]: string}, square: string, digit: string) {
        let result = true;
        const v = values[square];
        for (const c of v) {
            if (c !== digit) {
                result = result && (this.Eliminate(values, square, c) ? true : false);
            }
        }
        return result ? values : false;
    }
    private Eliminate(values: {[index: string]: string}, square: string, digit: string) {
        if (values[square].indexOf(digit) === -1) {
            // digit has already been elimiated.
            return values;
        }
        values[square] = values[square].replace(digit, ""); // eliminate digit from values.
        if (values[square].length === 0) {
            // Contradiction: removed last value
            return false;
        } else if (values[square].length === 1) {
            // If a square s is reduced to one value d2, then eliminate d2 from the peers.
            let result = true;
            for (const s in this.Peers[square]) {
                result = result && (this.Eliminate(values, s, values[square]) ? true : false);
            }
            if (!result) {
                return false;
            }
        }
        for (const u of this.Units[square]) {
            // If a unit u is reduced to only one place for a value d, then put it there.
            const dplaces: string[] = [];
            for (const s of u) {
                if (values[s].indexOf(digit) !== -1) {
                    dplaces.push(s);
                }
            }
            if (dplaces.length === 0) {
                return false;
            } else if (dplaces.length === 1) {
                if (!this.Assign(values, dplaces[0], digit)) {
                    return false;
                }
            }
        }
        return values;
    }
    private ParseGrid(grid: string) {
        const values: {[index: string]: string} = {};
        for (const s of this.Squares) {
            values[s] = DIGITS;
        }
        const allDigits = "0.-123456789";
        let grid2 = "";
        for (const c of grid) {
            if (allDigits.indexOf(c) >= 0) {
                grid2 += c;
            }
        }
        for (let i = 0; i < this.Squares.length; i++) {
            if (DIGITS.indexOf(grid2.charAt(i)) >= 0
                && !this.Assign(values, this.Squares[i], grid2.charAt(i))) {
                return false;
            }
        }
        return values;
    }
    private Search(input: {[index: string]: string} | boolean): {[index: string]: string} | boolean {
        // Using depth-first search and propagation, try all possible values.
        if (typeof input === "boolean" && !input) {
            return false; // Failed earlier.
        }
        const values = input as {[index: string]: string};
        let min = 10;
        let max = 1;
        let sq = "";
        for (const s of this.Squares) {
            if (values[s].length > max) {
                max = values[s].length;
            }
            if (values[s].length > 1 && values[s].length < min) {
                min = values[s].length;
                sq = s;
            }
        }
        if (max === 1) {
            return values; // Solved.
        }
        for (let i = 0; i < values[sq].length; i++) {
            // Duplicate the array and then do propagation on it.
            const result = this.Search(this.Assign(Object.assign({}, values), sq, values[sq].charAt(i)));
            if (result) {
                return result;
            }
        }
        return false;
    }
}

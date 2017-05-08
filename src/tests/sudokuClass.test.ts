import {Sudoku} from "../core/sudokuClass";

describe("Sudoku Class", () => {
    const sudoku = new Sudoku();

    it("square length should be 81", () => {
        expect(sudoku.Squares.length).toBe(81);
    });
    it("unit list length should be 27", () => {
        expect(sudoku.UnitList.length).toBe(27);
    });
    it("a square is in 3 units", () => {
        for(let s of sudoku.Squares) {
            expect(sudoku.Units[s].length).toBe(3);
        }
    });
    it("peers length should be 20", () => {
        for(let s of sudoku.Squares) {
            // console.log(Sudoku.peers[s]);
            expect(Object.keys(sudoku.Peers[s]).length).toBe(20);
        }
    });
    it("solve puzzle", () => {
        // const grid = "003020600900305001001806400008102900700000008006708200002609500800203009005010300";
        // sudoku.Dislay(sudoku.ParseGrid(grid));
        const grid = "4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......";
        sudoku.Dislay(sudoku.Solve(grid));
    })
})
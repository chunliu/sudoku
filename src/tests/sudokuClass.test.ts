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
    })
})
import * as Sudoku from "../core/sudoku";

describe("Sudoku core", () => {
    it("square length should be 81", () => {
        expect(Sudoku.squares.length).toBe(81);
    });
    it("unit list length should be 27", () => {
        expect(Sudoku.unitList.length).toBe(27);
    });
    it("a square is in 3 units", () => {
        for(let s of Sudoku.squares) {
            expect(Sudoku.units[s].length).toBe(3);
        }
    });
    it("peers length should be 20", () => {
        for(let s of Sudoku.squares) {
            // console.log(Sudoku.peers[s]);
            expect(Object.keys(Sudoku.peers[s]).length).toBe(20);
        }
    })
})
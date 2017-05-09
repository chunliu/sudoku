import {loadGrid} from "../redux/configureStore"; 

describe("redux tests", () => {
    const grid = "003020600900305001001806400008102900700000008006708200002609500800203009005010300";
    it("loadGrid test", () => {
        expect(Object.keys(loadGrid(grid)).length).toBe(81);
    });
});
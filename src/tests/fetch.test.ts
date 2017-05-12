import {fetchSudoku} from "../redux/configureStore";

describe("Fetch API test", () => {
    it("fetch text file", () => {
        fetchSudoku().then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    });
});
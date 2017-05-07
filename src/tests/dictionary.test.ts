import {Dictionary} from "../core/dictionary"; 

describe("GetValue", () => {
    let dict = new Dictionary<string, string>();

    beforeEach(() => {
        var keys = ["key1", "key2", "key3"];
        var values = ["value1", "value2", "value3"];

        for (var i = 0; i < keys.length; i++) {
            dict.add(keys[i], values[i]);
        }
    });
    it("Should get the value associated to a given key", () => {
        // Assert
        expect(dict.getValue("key3")).toBe("value3");
    });    
})
import * as React from "react";
import {shallow} from "enzyme";
import {Square} from "../components/board/Square"; 

describe("<Square />", () => {
    it("render Square", () => {
        expect(shallow(<Square />).contains(<button className="square">1</button>)).toBe(true);
    });
});

import * as React from "react";
import {shallow} from "enzyme";
import {StyledSquare} from "../components/board/Square";

describe("<Square />", () => {
    it("render Square", () => {
        expect(shallow(<StyledSquare status={0} 
           onSquareClick={() => {alert("abc")}} 
           squareKey="A1" value="1"/>).contains(<button key="A1" 
                disabled={false} className="square" onClick={() => {alert("abc")}}>1</button>)).toBe(true);
    });
});

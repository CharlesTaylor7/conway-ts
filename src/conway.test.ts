import { renderView, nextState, parse } from "./conway";

describe("renderView", () => {
  it("can render an empty game", () => {
    expect(renderView([])).toEqual("");
  });

  it("can render a 1 row game", () => {
    expect(renderView([["Live", "Dead"]])).toEqual("* .");
  });

  it("can render a multi row game", () => {
    expect(
      renderView([
        ["Live", "Dead"],
        ["Dead", "Live"],
      ])
    ).toEqual("* .\n. *");
  });
});

describe("parse", () => {
  it("can parse empty strings", () => {
    expect(parse([""])).toEqual([[]]);
  });
  it("can parse input", () => {
    expect(parse([".*.", "*.."])).toEqual([
      ["Dead", "Live", "Dead"],
      ["Live", "Dead", "Dead"],
    ]);
  });
});

describe("nextState", () => {
  it("advancing an empty game is empty", () => {
    expect(nextState([])).toEqual([]);
  });

  it("advancing a game of empty rows is empty", () => {
    expect(nextState([[], [], []])).toEqual([[], [], []]);
  });

  describe("Underpopulation", () => {
    it("1 row dies", () => {
      expect(nextState([["Dead", "Live", "Dead"]])).toEqual([
        ["Dead", "Dead", "Dead"],
      ]);
    });

    it("3 rows; some live & 1 dies", () => {
      expect(
        nextState([
          ["Dead", "Dead", "Dead"],
          ["Live", "Dead", "Live"],
          ["Dead", "Live", "Live"],
        ])
      ).toEqual([
        ["Dead", "Dead", "Dead"],
        ["Dead", "Dead", "Live"],
        ["Dead", "Live", "Live"],
      ]);
    });
  });

  describe("Overpopulation", () => {
    it("3 rows; some live & 1 dies", () => {
      expect(
        nextState([
          ["Live", "Live", "Live"],
          ["Live", "Live", "Live"],
          ["Live", "Live", "Live"],
        ])
      ).toEqual([
        ["Live", "Dead", "Live"],
        ["Dead", "Dead", "Dead"],
        ["Live", "Dead", "Live"],
      ]);
    });
  });

  describe("Generation", () => {
    it("glider", () => {
      expect(
        nextState([
          ["Dead", "Live", "Dead", "Dead"],
          ["Dead", "Dead", "Live", "Dead"],
          ["Live", "Live", "Live", "Dead"],
          ["Dead", "Dead", "Dead", "Dead"],
        ])
      ).toEqual([
        ["Dead", "Dead", "Dead", "Dead"],
        ["Live", "Dead", "Live", "Dead"],
        ["Dead", "Live", "Live", "Dead"],
        ["Dead", "Live", "Dead", "Dead"],
      ]);
    });
  });
});

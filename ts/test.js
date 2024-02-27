function fn(pt) {
    if (pt === void 0) { pt = { x: 1, y: "2" }; }
    return pt.x;
}
fn({ x: 1 });

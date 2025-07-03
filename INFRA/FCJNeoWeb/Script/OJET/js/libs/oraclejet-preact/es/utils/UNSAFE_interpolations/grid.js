/* @oracle/oraclejet-preact: 15.1.0 */
const gridInterpolations = {
    gridTemplateColumns: ({ gridTemplateColumns }) => gridTemplateColumns === undefined
        ? {}
        : {
            gridTemplateColumns
        },
    gridAutoRows: ({ gridAutoRows }) => gridAutoRows === undefined
        ? {}
        : {
            gridAutoRows
        }
};

export { gridInterpolations };
/*  */
//# sourceMappingURL=grid.js.map

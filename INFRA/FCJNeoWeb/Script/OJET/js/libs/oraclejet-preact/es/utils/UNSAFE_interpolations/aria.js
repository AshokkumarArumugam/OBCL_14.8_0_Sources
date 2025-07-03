/* @oracle/oraclejet-preact: 15.1.0 */
const ariaInterpolations = {
    ariaLabel: ({ ariaLabel }) => ariaLabel === undefined
        ? {}
        : {
            ariaLabel
        },
    labelledBy: ({ labelledBy }) => labelledBy === undefined
        ? {}
        : {
            ariaLabelledBy: labelledBy
        }
};

export { ariaInterpolations };
/*  */
//# sourceMappingURL=aria.js.map

export const requiredProps = (...required) => ({
    _required: required,
    get requiredProps() {
        return this._required;
    }
});



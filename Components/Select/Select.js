/* eslint-disable */
import options from './utils';
const SelectPaint = props => {
    const { selected = '', handleChange } = props;
    return (
        <select value={selected} onChange={handleChange}>
            {options.map((option, k) => {
                const { value = '', label = '' } = option;
                return <option key={k} value={value}>{label}</option>;
            })}
        </select>
    );
};
export default SelectPaint;
/* eslint-enable */



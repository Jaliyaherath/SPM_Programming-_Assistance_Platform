export default interface IDropDownProp {
    dropDownProps: {
        value: number;
        label: string;
    }[];
    handleChange: (value: string) => void;

}
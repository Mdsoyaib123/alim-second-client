import { countryCodes } from "@/utils/countryCodes";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const CountryCodeSelect = ({ value, onChange }: Props) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-gray-100 w-[120px] px-2 py-2 border-r border-gray-400 focus:outline-none"
        >
            {countryCodes.map((country, idx) => (
                <option key={idx} value={country.code}>
                    {country.name.slice(0, 3).toUpperCase()} ({country.code})
                </option>
            ))}
        </select>
    );
};

export default CountryCodeSelect;

import React, {  useRef, useState } from "react";
import { useClickOut } from "../../hooks/useClickOut";
import './styles/Dropdown.css';

type Option = {
    name: string,
    img: any
}

interface DropdownProps  {
    /**This is a description */
    selected: string,
    setSelected: (selection: string) => void,
    options: Array<Option>,
    show: boolean
}


/**
 * This is a Custom button that takes only one prop named title
 */
export const Dropdown: React.FC<DropdownProps> = ({ selected, setSelected, options, show }) => {

    const [showOptions, setShowOptions] = useState<boolean>(false)
    const dropdownRef = useRef(null);

    useClickOut(dropdownRef, () => setShowOptions(false));

    const handleSelect = (event: any) => {
        setShowOptions((showOptions) => !showOptions);
    }

    const handleOptionClick = (event: any) => {
        const selection = event.target.id;
        setShowOptions(false);
        setSelected(selection);
    }

    return (
        <div className="Dropdown-Container" >
            {show && <div className="Dropdown" ref={dropdownRef}>
                <div className="Select" defaultValue={selected} onClick={handleSelect} >
                    <span>{showOptions || !selected ? 'Select your news' : selected}</span> <span className="Dropdown-Arrow"> &#62;</span>
                </div>
                {showOptions && <div className="Options-Container">
                    {options.map(({ name, img }) => {
                        return <div className="Dropdown-Option" key={name} id={name} onClick={handleOptionClick}>
                            <img className="Img-Dropdown-Option" src={img} alt={name} />
                            <span >
                                {name}
                            </span>
                        </div>
                    })}
                </div>}
            </div>}
        </div>
    )
}
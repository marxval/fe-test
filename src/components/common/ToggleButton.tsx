import './styles/ToggleButton.css'

type IToggleButton = {
    value: string,
    setValue: any,
    options: Array<string>
}

/**
 * Toggle Button Group for selecting Fav hits or from the API
 */
export const ToggleButton: React.FC<IToggleButton> = ({ value, setValue, options }) => {

    const handleClick = (e: any) => {
        e.preventDefault();
        const optionSelected = e.currentTarget.id;
        setValue(optionSelected);
    }

    return (
        <div className='Button-Group'>
            {options.map((option, ix) => {
                const selected = value === option;
                return <button className={`Toggle-Button ${selected ? 'Toggle-Button-Selected' : ''}`} key={ix} id={option} disabled={selected} onClick={handleClick}> {option} </button>
            })}
        </div>
    )

}
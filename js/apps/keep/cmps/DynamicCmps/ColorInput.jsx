
export function ColorInput({ onChangeNoteColor }) {

    const colors = ['#007bff', '#28a745', '#a92a2a', '#bf9500',
        '#17a2b8', '#343a40', '#2F435A', '#775439']


    return <div className='color-input'>
        {colors.map(color => {
            return <div
                onClick={() => onChangeNoteColor('backgroundColor', color)}
                style={{ backgroundColor: color }}
                key={color}
                className="color-value"
            >
            </div>
        })}
    </div>
}
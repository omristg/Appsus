
export function ColorInput({ onChangeNoteColor }) {

    const colors = ['#007bff', '#28a745', '#dc3545', '#FFD53D',
        '#17a2b8', '#343a40', '#2F435A', '#f8f9fa']


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
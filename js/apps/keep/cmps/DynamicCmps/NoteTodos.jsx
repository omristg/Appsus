import { NoteTodoSingle } from './NoteTodoSingle.jsx'

export class NoteTodos extends React.Component {
    state = {
        isNoteSelected: false
    }

    onToggleNoteSelected = () => {
        this.setState({ isNoteSelected: !this.state.isNoteSelected })
    }


    componentDidUpdate(prevProps, prevState) {
        // console.log(this.state);
    }
    
    
    render() {

        const { note, onRemoveNote } = this.props
        const { label, todos } = note.info
        const { isNoteSelected } = this.state
        return (
            <div className="note-preview" >
                <h4>{label}</h4>
                <ul className="note-todos">
                    {todos.map((todo, idx) => {
                        return <NoteTodoSingle key={idx} idx={idx} todo={todo} isNoteSelected={isNoteSelected} />
                    })}
                </ul>
                <button className="fa trash" onClick={() => onRemoveNote(note)}></button>
                <button onClick={this.onToggleNoteSelected} >edit</button>
            </div>
        )

    }
}


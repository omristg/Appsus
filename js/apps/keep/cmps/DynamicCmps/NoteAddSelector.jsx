import { NoteAdd } from "./NoteAdd.jsx";

export class NoteAddSelector extends React.Component {
    state = {
        isNotesOptsOpen: false,
        isTypeSelected: false,
        selectedType: ''
    }

    onToggleNotesOpts = () => {
        this.setState({ isNotesOptsOpen: !this.state.isNotesOptsOpen })

    }


    onSelectType = (type) => {
        console.log(type);
        this.setState({ selectedType: type })
        this.onToggleNotesOpts()
        this.onToggleIsTypeSelected()
    }

    onToggleIsTypeSelected = () => {
        this.setState({ isTypeSelected: !this.state.isTypeSelected })
    }



    render() {
        const { isNotesOptsOpen, isTypeSelected, selectedType } = this.state
        const { loadNotes } = this.props

        return (
            <section className="note-add-selector">
                <button onClick={this.onToggleNotesOpts}>Add Notes</button>
                {isNotesOptsOpen && <div>
                    <button onClick={() => { this.onSelectType('note-txt') }}>Text</button>
                    <button onClick={() => { this.onSelectType('note-todos') }}>Todos</button>
                    <button onClick={() => { this.onSelectType('note-img') }}>Image</button>
                </div>}
                {isTypeSelected && <NoteAdd selectedType={selectedType} loadNotes={loadNotes}
                    onToggleIsTypeSelected={this.onToggleIsTypeSelected} />}
            </section>
        )






    }

}
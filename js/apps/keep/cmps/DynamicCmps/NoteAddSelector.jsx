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
                <button className="fa-solid plus" className={!isNotesOptsOpen ? 'fa-solid plus' : 'fa-solid chevron-left'} onClick={this.onToggleNotesOpts}></button>
                {isNotesOptsOpen && <div className="note-add-opts">
                    <button className="fa-solid font" onClick={() => { this.onSelectType('note-txt') }}></button>
                    <button className="fa-solid list" onClick={() => { this.onSelectType('note-todos') }}></button>
                    <button className="fa-brands youtube" onClick={() => { this.onSelectType('note-vid') }}></button>
                    <button  className="fa img" onClick={() => { this.onSelectType('note-img') }}></button>
                </div>}
                {isTypeSelected && <NoteAdd selectedType={selectedType} loadNotes={loadNotes}
                    onToggleIsTypeSelected={this.onToggleIsTypeSelected} />}
            </section>
        )






    }

}

import { NoteAddTxt } from "./NoteAddTxt.jsx"
import { NoteAddTodos } from "./NoteAddTodos.jsx"

export function NoteAdd(props) {

    const { selectedType } = props

    switch (selectedType) {
        case 'note-txt':
            return <NoteAddTxt {...props} />
        case 'note-todos':
            return <NoteAddTodos {...props} />
        // case 'note-img':
        //     return <NoteImg  {...props} />
    }
}



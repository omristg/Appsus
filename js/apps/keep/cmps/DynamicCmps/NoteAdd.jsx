
import { NoteAddTxt } from "./NoteAddTxt.jsx"

export function NoteAdd(props) {

    const { selectedType } = props

    switch (selectedType) {
        case 'note-txt':
            return <NoteAddTxt {...props} />
        // case 'note-todos':
        //     return <NoteTodos {...props} />
        // case 'note-img':
        //     return <NoteImg  {...props} />
    }
}



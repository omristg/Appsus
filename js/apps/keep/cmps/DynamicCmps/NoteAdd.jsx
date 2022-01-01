
import { NoteAddTxt } from "./NoteAddTxt.jsx"
import { NoteAddTodos } from "./NoteAddTodos.jsx"
import { NoteAddVid } from "./NoteAddVid.jsx"
import { NoteAddImg } from "./NoteAddImg.jsx"


export function NoteAdd(props) {

    const { selectedType } = props

    switch (selectedType) {
        case 'note-txt':
            return <NoteAddTxt {...props} />
        case 'note-todos':
            return <NoteAddTodos {...props} />
        case 'note-img':
            return <NoteAddImg  {...props} />
        case 'note-vid':
            return <NoteAddVid {...props} />
    }
}



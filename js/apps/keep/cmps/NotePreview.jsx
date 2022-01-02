import { NoteTxt } from './DynamicCmps/NoteTxt.jsx'
import { NoteTodos } from './DynamicCmps/NoteTodos.jsx'
import { NoteImg } from './DynamicCmps/NoteImg.jsx'
import { NoteVid } from './DynamicCmps/NoteVid.jsx'

export function NotePreview(props) {

    const { note } = props

    switch (note.type) {
        case 'note-txt':
            return <NoteTxt {...props} />
        case 'note-todos':
            return <NoteTodos {...props} />
        case 'note-img':
            return <NoteImg  {...props} />
        case 'note-vid':
            return <NoteVid  {...props} />

    }
}


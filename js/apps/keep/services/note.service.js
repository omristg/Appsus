import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/utils.service.js'

export const noteSerive = {
    query,
    removeNote
}

const STORAGE_KEY = 'notesDB'

_createNotes()

function _createNotes() {
    let notes = _loadFromStorage()
    if (!notes || !notes.length) {
        notes = [
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: true,
                info: { txt: 'Fullstack Me Baby!' }
            },
            {
                id: utilService.makeId(),
                type: 'note-todos',
                info: {
                    label: 'Get my stuff together',
                    todos:
                        [
                            { txt: 'Driving liscence', doneAt: null },
                            { txt: 'Coding power', doneAt: 187111111 }
                        ]
                }
            },
            {
                id: utilService.makeId(),
                type: 'note-img',
                info: { url: 'https://robohash.org/txt.png', title: 'Bobi and Me' },
                style: { backgroundColor: '#00d' }
            },
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: false,
                info: { txt: 'Remember to eat lunch' }
            },
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: false,
                info: { txt: 'Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. ' }
            },

        ]
    }
    console.log(notes);
    _saveToStorage(notes)
}

function removeNote(noteId) {
    let notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveToStorage(notes)
    return Promise.resolve(notes)

}

// Late change to filtered
function query(filterBy = null) {
    const notes = _loadFromStorage()
    if (!filterBy) return Promise.resolve(notes)
    const filteredNotes = _getFilteredNote(notes, filterBy)
    return Promise.resolve(filteredNotes)
}

function _getFilteredNote(notes, filterBy) {
    // console.log(filterBy);
    // console.log(notes[0].type);
    return notes.filter(note => note.type === filterBy)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(STORAGE_KEY)
}


function _saveToStorage(books) {
    storageService.saveToStorage(STORAGE_KEY, books)
}

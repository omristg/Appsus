import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/utils.service.js'

export const noteService = {
    query,
    removeNote,
    getNoteById,
    saveNote,
    getYTVideosOpts,
    duplicateNote,
}

const STORAGE_KEY = 'notesDB'
const API_KEY = 'AIzaSyBhduIz7IWiaUm7jFFSr8_3WGjciMPjjiY'


function duplicateNote(note) {
    const notes = _loadFromStorage()
    const noteToPush = { ...note, id: utilService.makeId(), isPinned:false }
    notes.push(noteToPush)
    _saveToStorage(notes)
    return Promise.resolve()
}

_createNotes()

function _createNotes() {
    let notes = _loadFromStorage()
    if (!notes || !notes.length) {
        console.log('from func');
        notes = [
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: true,
                info: { txt: 'Fullstack Me Baby!' },
                styles: { backgroundColor: '#2F435A' }

            },
            {
                id: utilService.makeId(),
                type: 'note-todos',
                isPinned: false,
                info: {
                    label: 'Get my stuff together',
                    todos:
                        [
                            { txt: 'Driving liscence', doneAt: null },
                            { txt: 'Coding power', doneAt: 187111111 }
                        ]
                },
                styles: { backgroundColor: '#2F435A' }
            },
            {
                id: utilService.makeId(),
                type: 'note-img',
                isPinned: false,
                info: { url: 'https://robohash.org/txt.png', title: 'Bobi and Me' },
                style: { backgroundColor: '#AB6B51' }
            },
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: false,
                info: { txt: 'Remember to eat lunch' },
                styles: { backgroundColor: '#AB6B51' }
            },
            {
                id: utilService.makeId(),
                type: 'note-txt',
                isPinned: false,
                info: { txt: 'Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling.' },
                styles: { backgroundColor: '#AB6B51' }
            },
            {
                id: utilService.makeId(),
                type: 'note-vid',
                isPinned: false,
                info: { videoId: 'VP3xjJFfLS8' },
                styles: { backgroundColor: '#2F435A' }
            },
            {
                id: utilService.makeId(),
                type: 'note-img',
                isPinned: false,
                info: { url: 'data:image/jpeg;base64,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', title: 'Bobi and Me' },
                style: { backgroundColor: '#AB6B51' }
            },
        ]
    }
    console.log(notes);
    _saveToStorage(notes)
}


function getYTVideosOpts(searchVal) {
    console.log('dsadsa');
    console.log(searchVal);
    return axios
        .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${searchVal}`)
        .then(res => res.data.items)
        .catch(err => {
            console.log('Cannot get this', err);
            throw err
        })
}


function saveNote(noteToSave) {
    console.log(noteToSave.styles);
    return noteToSave.id ? _updateNote(noteToSave) : _addNote(noteToSave);
}

function getNoteById(noteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => note.id === noteId)
    return Promise.resolve(note)
}

function removeNote(noteId) {
    let notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveToStorage(notes)
    return Promise.resolve(notes)
}


function query(filterBy = null) {
    let notes = _loadFromStorage()
    const filteredNotes = _getFilteredNote(notes, filterBy)
    if (filterBy) return Promise.resolve(filteredNotes)
    
    const unPinnedNotes = notes.filter(note => note.isPinned === false)
    const pinnedNotes = notes.filter(note => note.isPinned === true)
    notes = { unPinnedNotes, pinnedNotes }
    return Promise.resolve(notes)
}

function _getFilteredNote(notes, filterBy) {
    return notes.filter(note => note.type === filterBy)
}

function _addNote(noteToSave) {
    const newNote = { ...noteToSave, id: utilService.makeId() }
    const notes = _loadFromStorage()
    notes.unshift(newNote)
    _saveToStorage(notes)
    return Promise.resolve()
}

function _updateNote(noteToSave) {
    const notes = _loadFromStorage()
    const noteIdx = notes.findIndex(note => note.id === noteToSave.id)
    notes[noteIdx] = noteToSave
    _saveToStorage(notes)
    return Promise.resolve()
}

// Storage Helpers

function _loadFromStorage() {
    return storageService.loadFromStorage(STORAGE_KEY)
}

function _saveToStorage(notes) {
    storageService.saveToStorage(STORAGE_KEY, notes)
}





// function query(filterBy = null) {
//     const notes = _loadFromStorage()
//     if (!filterBy) return Promise.resolve(notes)
//     const filteredNotes = _getFilteredNote(notes, filterBy)
//     return Promise.resolve(filteredNotes)
// }

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
        ]
    }
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

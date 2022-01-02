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
    const noteToPush = { ...note, id: utilService.makeId(), isPinned: false }
    notes.push(noteToPush)
    _saveToStorage(notes)
    return Promise.resolve()
}

_createNotes()

function _createNotes() {
    let notes = _loadFromStorage()
    if (!notes || !notes.length) {
        console.log('from func');
    const notes = [
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: true,
            info: { txt: 'Fullstack Me Baby!' },
            styles: { backgroundColor: '#775439' }
        },
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: true,
            info: { txt: 'home WIFI password: 09038145' },
            styles: { backgroundColor: '#28a745' }
        },
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: false,
            info: { txt: 'אישור הזמנה איביי 095563325' },
            styles: { backgroundColor: '#343a40' }
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
            styles: { backgroundColor: '#007bff' }
        },
        {
            id: utilService.makeId(),
            type: 'note-todos',
            isPinned: false,
            info: {
                label: 'Supermarket',
                todos:
                    [
                        { txt: 'milk', doneAt: null },
                        { txt: 'eggs', doneAt: null },
                        { txt: 'coriander', doneAt: null },
                        { txt: 'cucumbers', doneAt: null },
                        { txt: 'tomatos', doneAt: null },
                        { txt: 'black coffee', doneAt: null },
                        { txt: 'cookies', doneAt: null },
                    ]
            },
            styles: { backgroundColor: '#28a745' }
        },
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: false,
            info: { txt: 'Iris has called, need to tell Itay to call her back' },
            styles: { backgroundColor: '#343a40' }
        },
 
        {
            id: utilService.makeId(),
            type: 'note-img',
            isPinned: false,
            info: {
                url: 'data:image/jpeg;base64,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',
                title: 'Main goal for the summer'
            },
            style: { backgroundColor: '#AB6B51' }
        },
        {
            id: utilService.makeId(),
            type: 'note-img',
            isPinned: true,
            info: {
                url: 'https://media.threatpost.com/wp-content/uploads/sites/103/2021/07/20141444/white-pegasus-e1626804896117.jpg',
                title: ''
            },
            style: { backgroundColor: '#AB6B51' }
        },
        {
            id: utilService.makeId(),
            type: 'note-vid',
            isPinned: false,
            info: { videoId: 'w7ejDZ8SWv8' },
            styles: { backgroundColor: '#343a40' }
        },
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: false,
            info: { txt: 'Remember to eat lunch' },
            styles: { backgroundColor: '#bf9500' }
        },
        {
            id: utilService.makeId(),
            type: 'note-img',
            isPinned: false,
            info: {
                url: 'data:image/jpeg;base64,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',
                title: 'Venice'
            },
            style: { backgroundColor: '#AB6B51' }
        },
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: false,
            info: { txt: 'Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling.' },
            styles: { backgroundColor: '#28a745' }
        },
        {
            id: utilService.makeId(),
            type: 'note-vid',
            isPinned: false,
            info: { videoId: 'VP3xjJFfLS8' },
            styles: { backgroundColor: '#343a40' }
        },
        {
            id: utilService.makeId(),
            type: 'note-vid',
            isPinned: false,
            info: { videoId: '5qap5aO4i9A' },
            styles: { backgroundColor: '#343a40' }
        },
        {
            id: utilService.makeId(),
            type: 'note-vid',
            isPinned: true,
            info: { videoId: 'X4t0JxiBeO0' },
            styles: { backgroundColor: '#17a2b8' }
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

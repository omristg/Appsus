import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/utils.service.js'


export const mailService = {
    query,
    saveMail,
    saveMail,
    removeMail,
    createMail,
    getMailToTrash,
}

const KEY = 'mailsDB'
const TRASH_KEY = 'mailsTrashDB'

_createInboxMails()

function createMail(details) {
    const time = new Date;
    const dayOfWeek = [Sun, Mon, Tue, Wen, Thu, Fri, Sat]
    const monthOfyear = [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec]
    const mailDetails = { ...details };
    const mail = {
        id: utilService.makeId(),
        sentFrom: "Muki",
        sentTo: mailDetails.sentTo,
        subject: mailDetails.subject,
        mailContent: mailDetails.txt,
        isInbox: false,
        isStarred: false,
        isImportant: false,
        isDraft: false,
        isSent: true,
        isChecked: false,
        isRead: false,
        isTrash: false,
        sentDate: [{
            day: `'${dayOfWeek[time.getDay]}'`,
            month: `${monthOfyear[time.getMonth()]}`,
            dayNum: time.getUTCDay(),
        }]
    }
    _saveToStorage( mail )
}


function _createInboxMails() {
    const mails = _loadFromStorage()
    if (!mails || !mails.length) {
        const mails = [
            {
                id: utilService.makeId(),
                sentFrom: "Muki",
                subject: "mi est eros convallis auctor arcu dapibus",
                mailContent: "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
                arrivedDate: {
                    day: "Tue",
                    month: "Dec",
                    dayNum: 28,
                },
                isInbox: true,
                isStarred: true,
                isImportant: true,
                isDraft: true,
                isSent: false,
                isChecked: false,
                isRead: true,
                isTrash: false,
                readDate: [{
                    day: "Tue",
                    month: "Dec",
                    dayNum: 28,
                }]
            },
            {
                id: utilService.makeId(),
                sentFrom: "Puki",
                subject: "lorem euismod dictumst inceptos mi",
                mailContent: "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
                arrivedDate: {
                    day: "Mon",
                    month: "Dec",
                    dayNum: 27,
                },
                isInbox: true,
                isSent: false,
                isImportant: true,
                isDraft: false,
                isStarred: false,
                isChecked: true,
                isRead: true,
                isTrash: false,
                readDate: [{
                    day: "",
                    month: "",
                    dayNum: "",
                }]
            },
            {
                id: utilService.makeId(),
                sentFrom: "Shuki",
                subject: "lorem euismod dictumst inceptos mi",
                mailContent: "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
                arrivedDate: {
                    day: "Mon",
                    month: "Dec",
                    dayNum: 27,
                },
                isInbox: true,
                isSent: false,
                isImportant: false,
                isDraft: true,
                isStarred: true,
                isChecked: true,
                isRead: false,
                isTrash: false,
                readDate: [{
                    day: "Mon",
                    month: "Dec",
                    dayNum: 27,
                }]
            },
            {
                id: utilService.makeId(),
                sentFrom: "Yoni",
                subject: "lorem euismod dictumst inceptos mi",
                mailContent: "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
                arrivedDate: {
                    day: "Mon",
                    month: "Dec",
                    dayNum: 27,
                },
                isInbox: false,
                isSent: true,
                isImportant: false,
                isDraft: false,
                isStarred: true,
                isChecked: true,
                isRead: false,
                isTrash: true,
                readDate: [{
                    day: "Mon",
                    month: "Dec",
                    dayNum: 27,
                }]
            }
        ]
        _saveToStorage(mails)
    }
}

function query(filterBy = null) {
    const mails = _loadFromStorage()
    if (!filterBy) return Promise.resolve(mails)
    const filterMails = _getFilteredMails(mails, filterBy)
    return Promise.resolve(filterMails)
}

function _getFilteredMails(mails, filterBy) {
    return mails.filter(mail => {
        if (mail[filterBy]) return mail
    })
}

function getMailToTrash(mails) {
    _saveToStorage(mails, TRASH_KEY)
    return removeMail(mails.id)
    // return mails.forEach(mail=>{return removeMail(mail.id)})

}

function removeMail(mailId, KEY = 'mailsDB') {
    let mails = _loadFromStorage(KEY)
    mails = mails.filter(mail => mail.id !== mailId)
    _saveToStorage(mails)
    return Promise.resolve(mails)
}

function saveMail(mailToSave) {
    return mailToSave.id ? _updateMail(mailToSave) : _addMail(mailToSave);
}

function _addMail(mailToSave) {
    const newMail = { ...mailToSave, id: utilService.makeId() }
    const mails = _loadFromStorage()
    notes.unshift(newNote)
    _saveToStorage(mails)
    return Promise.resolve()
}

function _updateMail(mailToSave) {
    const mails = _loadFromStorage()
    const mailIdx = mails.findIndex(mail => mail.id === mailToSave.id)
    mails[mailIdx] = mailToSave
    _saveToStorage(mails)
    return Promise.resolve()
}

function _saveToStorage(mails, KEY = 'mailsDB') {
    storageService.saveToStorage(KEY, mails)
}
function _loadFromStorage(KEY = 'mailsDB') {
    return storageService.loadFromStorage(KEY)
}
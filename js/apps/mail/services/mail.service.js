import { storageService } from '../../../services/storage.service.js'
// import { utilService } from '../../../services/utils.service.js'


export const mailService = {
    query
}

const KEY = 'mailsDB'

_createInboxMails()

function query(filterBy = null) {
    const mails = _loadFromStorage()
    if (!filterBy) return Promise.resolve(mails)
    const filterMails = _getFilteredBooks(mails, filterBy)
    return Promise.resolve(filterMails)
}

function _createInboxMails() {
    const mails = _loadFromStorage()
    if (!mails || !mails.length) {
        const mails = [
            {
                id: "jksdghbcsd",
                sentFrom: "Muki",
                subject: "mi est eros convallis auctor arcu dapibus himenaeos",
                mailContent: "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
                arrivedDate: {
                    day: "Tue",
                    month: "Dec",
                    dayNum: 28,
                },
                isStarred: false,
                isChecked: false,
                isRead: true,
                readDate: [{
                    day: "Tue",
                    month: "Dec",
                    dayNum: 28,
                }]
            },
            {
                id: "kjsdvjjnsduk",
                sentFrom: "Puki",
                subject: "lorem euismod dictumst inceptos mi",
                mailContent: "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
                arrivedDate: {
                    day: "Mon",
                    month: "Dec",
                    dayNum: 27,
                },
                isStarred: false,
                isChecked: false,
                isRead: false,
                readDate: [{
                    day: "",
                    month: "",
                    dayNum: "",
                }]
            },
            {
                id: "opiwejfnje",
                sentFrom: "shuki",
                subject: "lorem euismod dictumst inceptos mi",
                mailContent: "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
                arrivedDate: {
                    day: "Mon",
                    month: "Dec",
                    dayNum: 27,
                },
                isStarred: false,
                isChecked: false,
                isRead: true,
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

function _saveToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
import { mailService } from '../services/mail.service.js';
import { MailList } from '../cmps/MailList.jsx';
import { MailSearch } from '../cmps/MailSearch.jsx';
import { MailNav } from '../cmps/MailNav.jsx';

// export 

export class MailApp extends React.Component {

    state = {
        mails: null,
        filterBy: null,
        selectedMail: null,
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        const { filterBy } = this.state
        mailService.query(filterBy)
            .then(mails => {
                this.setState({ mails })
            })
    }

    onSetFilter = (filterBy) => {
        console.log(filterBy);
        // this.setState({ filterBy }, this.loadMails)
    }

    openCompose = () => {
        console.log('New Message');
    }

    mailSearchFor = (val) => { console.log('searching', val) }

    render() {
        const { mails } = this.state
        if (!mails) return <h2>There is no mail to show</h2>
        return (
            <section className="mail-app-container">
                <div className="mail-header">
                    <h1>Email LOGO</h1>
                    <MailSearch mails={mails} mailSearchFor={this.mailSearchFor} />
                </div>
                <main className="main-mail-preview">
                    <div className="mail-nav-container">
                        <button onClick={this.openCompose} >➕Compuse</button>
                        <MailNav onSetFilter={this.onSetFilter} />
                    </div>
                        <MailList mails={mails} />
                        {/* <MailOpenMessage /> */}
                </main>
            </section>
        )
    }
}


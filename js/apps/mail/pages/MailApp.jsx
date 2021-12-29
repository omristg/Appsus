import { mailService } from '../services/mail.service.js';
import { MailList } from '../cmps/MailList.jsx';

// import { Loader } from '../../../cmps/Loader.jsx';


export class MailApp extends React.Component {

    state = {
        mails: null,
        filterBy: null,
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

    // onSetFilter = (filterBy) => {
    //     this.setState({ filterBy }, this.loadMails)
    // }

    render() {
        const { mails } = this.state
        console.log(mails);
        if (!mails) return <h2>bbb</h2>
        return (
            <section className="mail-app-container">
                <div className="mail-serch-bar">
                </div>
                <h2>This is Mail</h2>
                <div className="mail-preview">
                <MailList mails={mails} />
                </div>
            </section>
        )
    }
}

// onSetMailNav={this.onSetMailNav}

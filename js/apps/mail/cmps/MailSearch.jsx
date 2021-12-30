

export class MailSearch extends React.Component {

    state = {

    }


    render() {
        const {mails, mailSearchFor} = {...this.props}
        // console.log(this.props);
        // console.log(mails);
        // console.log(mailSearchFor);

        return (
            <div className="mail-search-bar">
                {/* <form action="" onChange={mailSearchFor(value)}> */}
                {/* <label htmlFor="" onChange={mailSearchFor(this.value)}> */}
                <button>🔍</button>
                <input type="text" placeholder="Search mail" />
                {/* </label> */}
                {/* </form> */}
            </div>
        )
    }
}
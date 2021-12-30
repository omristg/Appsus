

export class NoteTodoSingle extends React.Component {

    state = {
        isDone: false,
        txt: this.props.todo.txt,
        isLineSelected: false
    }

    onToggleIsDone = ({ target }) => {
        console.log(target.value);
        this.setState({ isDone: !this.state.isDone })
    }

    onToggleIsLineSelected = () => {
        this.setState({ isLineSelected: !this.isLineSelected })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state);
    }

    onSubmit = (ev) => {
        ev.preventDefault()

    }

    render() {
        const { txt } = this.state
        const { isNoteSelected } = this.state
       return (
            <li className="note-todo-single clean-list">
                <form onSubmit={this.onSubmit}>
                    <input type="checkbox" onChange={this.onToggleIsDone} />
                    <div onClick={this.onToggleIsLineSelected}>{txt}</div>
                </form>
            </li>
        )


        // if (!isNoteSelected)
        // else return (
        //     <li className="note-todo-single clean-list">
        //         <form onSubmit={this.onSubmit}>
        //             <input type="checkbox" onChange={this.onToggleIsDone} />
        //             {/* <div>{txt}</div> */}
        //             <input type="text" onChange={this.handleChange}
        //                 name="txt" value={txt} />
        //         </form>
        //     </li>
        // )

    }
}



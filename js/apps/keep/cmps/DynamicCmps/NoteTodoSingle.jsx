

export function NoteTodoSingle({ todo, idx }) {
    const { txt } = todo
    // console.log(todo);
    return (
        <li className="note-todo-single">
            {txt}
        </li>

    )
} 
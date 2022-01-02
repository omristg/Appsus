export function LongTxt({ text, isLongTextShown }) {

    if (!isLongTextShown) text = text.substring(0, 20)

    return (
        <span className="desc">
            {text}
        </span>

    )
}
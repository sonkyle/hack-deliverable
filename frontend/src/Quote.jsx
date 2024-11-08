
function Quote({name, message, time}){
    return (
        <div className="quote">
            <p className = "name">{name}</p>
            <p className = "message">{message}</p>
            <p className = "time">{time}</p>
        </div>
    );
}

export default Quote;
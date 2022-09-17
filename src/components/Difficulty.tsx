//component for difficulty

const Difficulty = () => {
    return (
        <div>
            <h1>Difficulty</h1>

            <h3>Select Difficulty for the new Game:</h3>
            <br />
            <div className="diffDiv">
                <button className="diffBtn" onClick={() => { }}>Easy</button>
                <button className="diffBtn" onClick={() => { }}>Medium</button>
                <button className="diffBtn" onClick={() => { }}>Hard</button>
                <button className="diffBtn" onClick={() => { }}>Expert</button>
                <button className="diffBtn" onClick={() => { }}>Random</button>
            </div>
        </div>
    );
}

export default Difficulty;
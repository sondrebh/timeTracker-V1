//--- --- ---

class Box extends React.Component {
    constructor(props) {
        super(props);
    }
    
    handleInput(e) {
        if (e.key === 'Enter') {
            
          }
    }

    render() {
        return (
            <div className={this.props.position + " Box"}>
                <p className="boxTitle">{this.props.title}</p>

                {this.props.position === "center" && 
                <input
                    onKeyDown={this.handleInput} 
                    placeholder="Your task here..."
                />}
            </div>
        );
    }
}

//--- --- ---

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Box title="Summarized log" position="left" />
                <Box title="timeTracker V1" position="center" />
                <Box title="Raw log" position="right" />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
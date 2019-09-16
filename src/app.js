//--- --- ---

class Box extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className={this.props.position + " Box"}>
                
            </div>
        );
    }
}

//--- --- ---

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Box position="left" />
                <Box position="center" />
                <Box position="right" />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
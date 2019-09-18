class Task extends React.Component {
    constructor(props) {
        super(props);
        
        switch (this.props.position) {
            case "left":
                
            break;

            case "right":
                
            break;
        }
    }
    
    componentDidMount() {
        anime({
            targets: 'div.right.Box > div:last-child',
            opacity: ['0', '1'],
            height: ['0px','60px'],
            duration: 600,
            easing: "easeInOutBack"
        });
    }

    render() {
        return (
            <div className="taskContainer">

            {this.props.pos === "right" &&
                <div className="task">
                    <p>{this.props.start} <a>H</a></p>
                    <p>{this.props.task}</p>
                    <p>{this.props.end}</p>
                </div>
            }

            {this.props.pos === "left" &&
                <div className="task">
                    <p>{this.props.end}</p>
                    <p>{this.props.task}</p>
                    <p>{this.props.start}</p>
                </div>
            }

            </div>
        );
    }
}

//--- --- ---

class Box extends React.Component {
    constructor(props) {
        super(props);
        
        switch (this.props.position) {
            case "left":
                
            break;
        
            case "center":
                this.state = {
                    currentTask: ""
                };        
            break;

            case "right":
                
            break;
        }

        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    handleChange(e) {
        if (e.key === 'Enter') {
            
            if(this.props.appState.tasks.length) {
                console.log("s");
                let finishedTasks = this.props.appState.tasks;
                finishedTasks[finishedTasks.length - 1].end = new Date();
                this.props.setAppState(() => {
                    return {
                        tasks: finishedTasks
                    }
                });

                const taskToConcat = [{
                    start: new Date(),
                    task: e.target.value,
                    end: null
                }];

                this.props.setAppState(prevState => {
                    return {
                        tasks: prevState.tasks.concat(taskToConcat)
                    }
                });

               
            
            } else if (!this.props.appState.tasks.length) {
                const taskToConcat = [{
                    start: new Date(),
                    task: e.target.value,
                    end: null
                }];
                
                this.props.setAppState(prevState => {
                    return {
                        started: true,
                        tasks: prevState.tasks.concat(taskToConcat)
                    }
                });
            }

            anime({
                targets: 'input',
                backgroundColor: ["hsl(0, 0%, 18%)", "hsl(0, 0%, 80%)"],
                duration: 200,
                easing: "easeInOutBack",
                complete: () => {
                    anime({
                        targets: 'input',
                        backgroundColor: ["hsl(0, 0%, 80%)", "hsl(0, 0%, 18%)"],
                        duration: 200, 
                        easing: "easeInOutBack"
                    });
                }
            });

            this.setState({
                currentTask: ""
            });
        } else {
            this.setState({
                currentTask: e.target.value
            });
        }
    }

    componentDidMount() {
        if(this.props.position === "center") {
            anime({
                targets: '.center',
                height: ['0px','140px'],
                easing: 'spring(1, 90, 18, 16)'
            });
        }

        if(this.props.position === "right") {
            anime({
                targets: '.right',
                width: ['0px','400px'],
                easing: 'spring(1, 90, 18, 16)'
            });
        }
    }

    render() {
        return (
            <div ref={this.props.position} className={this.props.position + " Box"}>
                <p className="boxTitle">{this.props.title}</p>

                {this.props.position === "center" && 
                    <input
                        onChange={this.handleChange}
                        onKeyDown={this.handleChange} 
                        value={this.state.currentTask}
                        maxLength="18"
                        placeholder="Your task here..."
                    />
                }

                {this.props.position === "right" && this.props.appState.tasks.map(task => {
                    return (
                        <Task pos="right" key={task.task} start={task.start.getHours()} task={task.task} end={task.start.getHours()}/>
                    );
                })}
            </div>
        );
    }
}

//--- --- ---

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            started: false,
            duplicate: false,
            tasks: []
        };

        this.updateState = this.updateState.bind(this);
    }
    
    updateState(state) {
        this.setState(state);
    }

    render() {
        return (
            <div className="App">
                {this.state.duplicate ? <Box title="All time spent" position="left" /> : <p></p>}
                <Box title="timeTracker V1" position="center" appState={this.state} setAppState={a => {this.updateState(a)}} />
                {this.state.started ? <Box title="Task history" position="right" ref="right" appState={this.state}/> : <p></p>}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
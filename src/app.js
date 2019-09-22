function gen(startDate, endDate) {
    var diff = endDate.getTime() - startDate.getTime();
    return round((diff / 60000)/60, 2);
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

let current = "";

function updateTime(start, i) {
    if(current === i) {
        let task = document.querySelector("#task"+i);
        task.innerHTML = gen(start, new Date()) + " <a>H</a>";
        console.log(gen(start, new Date()));
        setTimeout(()=>{
            updateTime(start, i);
        }, 250);
    }
}

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
                    <p id={this.props.id}>{this.props.start} <a>H</a></p>
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
        this.getTimeSpent = this.getTimeSpent.bind(this);
        this.returnDuplicates = this.returnDuplicates.bind(this);
    }
    
    handleChange(e) {
        if (e.key === 'Enter') {

            if(this.props.appState.tasks.length) {
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
                    end: null,
                    spent: 0,
                    last: null
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
                    end: null,
                    spent: 0,
                    last: null
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

        if(this.props.position === "left") {
            anime({
                targets: '.left',
                width: ['0px','400px'],
                easing: 'spring(1, 90, 18, 16)'
            });
        }
    }

    createTime(start, end) {
        return ("0" + start.getHours()).slice(-2) + ':' + ("0" + start.getMinutes()).slice(-2) + " - " + (end === null ? '' : (("0" + end.getHours()).slice(-2) + ':' + ("0" + end.getMinutes()).slice(-2)));
    }

    getTimeSpent(start, end, i) {
        if(end === null) {
            current = i;
            setTimeout(()=>{updateTime(start, i)}, 500);
            return gen(start, new Date());
        } else {
            current = i;
            return gen(start, end);
        }
    }

    returnDuplicates() {
        
        
        <Task pos="right" key={task.task + i} id={"task" + i} start={this.getTimeSpent(task.start, task.end, i)} task={task.task} end={this.createTime(task.start, task.end)}/>
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

                {this.props.position === "right" && this.props.appState.tasks.map((task, i) => {
                    return (
                        <Task pos="right" key={task.task + i} id={"task" + i} start={this.getTimeSpent(task.start, task.end, i)} task={task.task} end={this.createTime(task.start, task.end)}/>
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
            tasks: [],
            duplicates: [],
            isDuped: false
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
                {this.state.started ? <Box title="Task history" position="right" ref="right" appState={this.state} setAppState={a => {this.updateState(a)}} /> : <p></p>}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Task = function (_React$Component) {
    _inherits(Task, _React$Component);

    function Task(props) {
        _classCallCheck(this, Task);

        var _this = _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).call(this, props));

        switch (_this.props.position) {
            case "left":

                break;

            case "right":

                break;
        }
        return _this;
    }

    _createClass(Task, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            anime({
                targets: 'div.right.Box > div:last-child',
                opacity: ['0', '1'],
                height: ['0px', '60px'],
                duration: 600,
                easing: "easeInOutBack"
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "taskContainer" },
                this.props.pos === "right" && React.createElement(
                    "div",
                    { className: "task" },
                    React.createElement(
                        "p",
                        null,
                        this.props.start,
                        " ",
                        React.createElement(
                            "a",
                            null,
                            "H"
                        )
                    ),
                    React.createElement(
                        "p",
                        null,
                        this.props.task
                    ),
                    React.createElement(
                        "p",
                        null,
                        this.props.end
                    )
                ),
                this.props.pos === "left" && React.createElement(
                    "div",
                    { className: "task" },
                    React.createElement(
                        "p",
                        null,
                        this.props.end
                    ),
                    React.createElement(
                        "p",
                        null,
                        this.props.task
                    ),
                    React.createElement(
                        "p",
                        null,
                        this.props.start
                    )
                )
            );
        }
    }]);

    return Task;
}(React.Component);

//--- --- ---

var Box = function (_React$Component2) {
    _inherits(Box, _React$Component2);

    function Box(props) {
        _classCallCheck(this, Box);

        var _this2 = _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).call(this, props));

        switch (_this2.props.position) {
            case "left":

                break;

            case "center":
                _this2.state = {
                    currentTask: ""
                };
                break;

            case "right":

                break;
        }

        _this2.handleChange = _this2.handleChange.bind(_this2);
        _this2.componentDidMount = _this2.componentDidMount.bind(_this2);
        return _this2;
    }

    _createClass(Box, [{
        key: "handleChange",
        value: function handleChange(e) {
            if (e.key === 'Enter') {

                if (this.props.appState.tasks.length) {
                    console.log("s");
                    var finishedTasks = this.props.appState.tasks;
                    finishedTasks[finishedTasks.length - 1].end = new Date();
                    this.props.setAppState(function () {
                        return {
                            tasks: finishedTasks
                        };
                    });

                    var taskToConcat = [{
                        start: new Date(),
                        task: e.target.value,
                        end: null
                    }];

                    this.props.setAppState(function (prevState) {
                        return {
                            tasks: prevState.tasks.concat(taskToConcat)
                        };
                    });
                } else if (!this.props.appState.tasks.length) {
                    var _taskToConcat = [{
                        start: new Date(),
                        task: e.target.value,
                        end: null
                    }];

                    this.props.setAppState(function (prevState) {
                        return {
                            started: true,
                            tasks: prevState.tasks.concat(_taskToConcat)
                        };
                    });
                }

                anime({
                    targets: 'input',
                    backgroundColor: ["hsl(0, 0%, 18%)", "hsl(0, 0%, 80%)"],
                    duration: 200,
                    easing: "easeInOutBack",
                    complete: function complete() {
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
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.props.position === "center") {
                anime({
                    targets: '.center',
                    height: ['0px', '140px'],
                    easing: 'spring(1, 90, 18, 16)'
                });
            }

            if (this.props.position === "right") {
                anime({
                    targets: '.right',
                    width: ['0px', '400px'],
                    easing: 'spring(1, 90, 18, 16)'
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { ref: this.props.position, className: this.props.position + " Box" },
                React.createElement(
                    "p",
                    { className: "boxTitle" },
                    this.props.title
                ),
                this.props.position === "center" && React.createElement("input", {
                    onChange: this.handleChange,
                    onKeyDown: this.handleChange,
                    value: this.state.currentTask,
                    maxLength: "18",
                    placeholder: "Your task here..."
                }),
                this.props.position === "right" && this.props.appState.tasks.map(function (task) {
                    return React.createElement(Task, { pos: "right", key: task.task, start: task.start.getHours(), task: task.task, end: task.start.getHours() });
                })
            );
        }
    }]);

    return Box;
}(React.Component);

//--- --- ---

var App = function (_React$Component3) {
    _inherits(App, _React$Component3);

    function App(props) {
        _classCallCheck(this, App);

        var _this3 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this3.state = {
            started: false,
            duplicate: false,
            tasks: []
        };

        _this3.updateState = _this3.updateState.bind(_this3);
        return _this3;
    }

    _createClass(App, [{
        key: "updateState",
        value: function updateState(state) {
            this.setState(state);
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            return React.createElement(
                "div",
                { className: "App" },
                this.state.duplicate ? React.createElement(Box, { title: "All time spent", position: "left" }) : React.createElement("p", null),
                React.createElement(Box, { title: "timeTracker V1", position: "center", appState: this.state, setAppState: function setAppState(a) {
                        _this4.updateState(a);
                    } }),
                this.state.started ? React.createElement(Box, { title: "Task\xA0history", position: "right", ref: "right", appState: this.state }) : React.createElement("p", null)
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));

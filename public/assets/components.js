class TaskForm extends React.Component {
  _handleSubmit(event){
    event.preventDefault()
    if(this._task.value.length > 0)
    this.props.addTask(this._task.value)
    this._task.value = ''
  }

  render(){
    return(
      <form className="form" onSubmit={this._handleSubmit.bind(this)}>
        <label>New Task</label>
        <input  placeholder="Task" ref={value => this._task = value} />
        <input type="submit" value="Add" />
      </form>
    )
  }
}

class Task extends React.Component {

  _handleCheck(event){
    this.props.onCheck(event.target.checked)
  }

  _handleButton(){
    this.props.onRemove()
  }

  render(){
    return (
      <div className="task">
        <input type="checkbox" onChange={this._handleCheck.bind(this)}/>
        <h2>{this.props.content}</h2>
        <button onClick={this._handleButton.bind(this)}>Remove</button>
        <hr />
      </div>
    )
  }
}

class TaskList extends React.Component {
  constructor(){
    super()

    this.state = {
      tasks: [
        {id: 0, checked: false, content: "Task #1"},
        {id: 1, checked: false, content: "Task #2"},
        {id: 2, checked: false, content: "Task #3"}
      ],
      idCount: 3
    }
  }

  _getTasks(){
    return this.state.tasks.map(task => <Task onRemove={this._removeTask.bind(this, task.id)} onCheck={this._checkTask.bind(this, task.id)} content={task.content} key={task.id}/>)
  }

  _getCompletedTasks(){
    return this.state.tasks.filter(task => task.checked).length
  }

  _checkTask(id, checked){
    const task = this.state.tasks.filter(task => task.id === id)
    task[0].checked = checked
    const newTasks = this.state.tasks.filter(task => task.id !== id).concat(task)
    this.setState({
      tasks: newTasks.sort((a, b) => a.id - b.id)
    })
  }

  _removeTask(id){
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== id)
    })
  }

  _addTask(content){
    const task = {id: this.state.idCount, checked: false, content}

    this.setState({
      tasks: this.state.tasks.concat([task]),
      idCount: this.state.idCount + 1
    })
  }

  render(){
    return (
    <div className="tasks-manager">
      <TaskForm addTask={this._addTask.bind(this)} />
      <p>Checked: {this._getCompletedTasks()}/{this.state.tasks.length}</p>
      <div className='tasks'>
        {this._getTasks()}
      </div>
    </div>
    )
  }
}

jQuery(() => 
  ReactDOM.render(
    <TaskList />,
    document.getElementById('content')
))
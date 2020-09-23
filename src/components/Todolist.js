import React, { Component } from 'react'

export default class Todolist extends Component {
    state = {
        tasks: []
    }

    iTask = React.createRef();

    addTask = (e) => {
        e.preventDefault();
        const task = this.iTask.current.value;
        const tasks = [...this.state.tasks];
        let lastTask = tasks.slice(-1)[0];

        if(!lastTask) lastTask = 0;
        else lastTask = lastTask.id;
        
        if(task.length < 5 || tasks.find(t => t.name === task)) return;

        tasks.push({id:lastTask + 1, name:task, resolved:false});
        this.setState({tasks});
        this.iTask.current.value = "";
    }

    deleteTask = (id) => {
        const tasks = [...this.state.tasks];
        const index = tasks.findIndex(task => task.id === id);
        tasks.splice(index, 1);
        this.setState({tasks});
    }

    checkTask = (id) => {
        const tasks = [...this.state.tasks];
        const task = tasks.find(task => task.id === id);
        if(task.resolved) task.resolved = false
        else task.resolved = true;
        this.setState({tasks});
    }

    render() {
        const count = this.state.tasks.filter(task => task.resolved).length;
        let strCount = "tâches accomplies";
        if(count <= 1) strCount = "tâche accomplie";
        return (
            <main>
                <h1>Todolist</h1>
        <p className="count">{count + ' / ' + this.state.tasks.length + ' '}
        {strCount}</p>
                <ul>
        {this.state.tasks.map((task, index) => <li key={index}><span className={task.resolved ? "resolved" : null}>{task.name}</span> <button onClick={() => this.checkTask(task.id)}><span role="img" aria-label="valid">✅</span></button> <button onClick={() => this.deleteTask(task.id)}><span role="img" aria-label="delete">❌</span></button></li>)}
                </ul>
                <form>
                    <input type="text" placeholder="Entrez votre tâche ici" ref={this.iTask} /> <input type="submit" value="Ajouter la tâche" onClick={this.addTask}/>
                </form>
            </main>
        )
    }
}

import S from 's-js';
import SArray from 's-array';

S.root(() => {
    var Todo = t => ({
            // our Todo constructor
            title: S.data(t.title),
            done: S.data(t.done),
        }), // properties are data signals
        todos = SArray([]), // our array of todos
        newTitle = S.data(''), // title for new todos
        addTodo = () => {
            // push new title onto list
            todos.push(Todo({ title: newTitle(), done: false }));
            newTitle(''); // clear new title
        },
        view = S.root(() =>
            <div>
                {' '}// declarative main view
                <input type="text" {...data(newTitle)} />
                <a onClick={addTodo}>+</a>
                {todos.map(todo =>
                    <div>
                        {' '}// insert todo views
                        <input type="checkbox" {...data(todo.done)} />
                        <input type="text" {...data(todo.title)} />
                        <a onClick={() => todos.remove(todo)}>&times;</a>
                    </div>,
                )}
            </div>,
        );

    document.body.appendChild(view);
});

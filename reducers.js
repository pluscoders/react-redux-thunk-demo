const { combineReducers } = Redux

function initRootReducer(callback) {
    getAllTodos((error, _todos) => {
        if (error) return alert(error.message)

        const todos = (state = _todos, action) => {
            switch (action.type) {
                case 'ADD_TODO':
                    return [
                        ...state,
                        {
                            id: action.id,
                            text: action.text,
                            completed: false
                        }
                    ]
                case 'TOGGLE_TODO':
                    return state.map(todo =>
                        (todo.id === action.id)
                            ? { ...todo, completed: !todo.completed }
                            : todo
                    )
                default:
                    return state
            }
        }

        const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
            switch (action.type) {
                case 'SET_VISIBILITY_FILTER':
                    return action.filter
                default:
                    return state
            }
        }

        const rootReducer = combineReducers({
            todos,
            visibilityFilter
        })

        callback(rootReducer)
    })
}
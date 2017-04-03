let nextToIds = 1;

export const addTodo = text => ({
  type: 'ADD_TODO',
  todo: {
    id: nextToIds++,
    text,
  },
});


export const queryTodoList = () => {
  return new Promise((resolve, reject) => {
    resolve([{
      id: 1,
      content: 'study vue ssr',
      completed: false
    }])
  })
}
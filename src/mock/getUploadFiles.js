export default function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: [
          {
            name: 'test1',
          },
          {
            name: 'test2',
          },
          {
            name: 'test3',
          },
          {
            name: 'test4',
          },
          {
            name: 'test5',
          },
        ],
      })
    }, 1000)
  })
}

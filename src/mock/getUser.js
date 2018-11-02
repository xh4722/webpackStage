export default function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: {
          id: 1,
          name: 'hbp',
          balance: 1000000,
        },
      })
    }, 1000)
  })
}

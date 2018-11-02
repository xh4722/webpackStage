export default function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: {
          softwares: ['Abaqus', 'Star-CCM', 'Fluent'],
        },
      })
    }, 1000)
  })
}

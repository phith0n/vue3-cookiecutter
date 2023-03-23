export const refreshWithFilter = async (router, name, filter) => {
  const query = {};
  for (let key in filter) {
    if(filter[key]) {
      query[key] = filter[key]
    }
  }

  await router.push({
    name,
    query
  })
}

export const getFileExtension = filename => {
  const blocks = filename.split('.')
  if (blocks.length >= 2) {
    return '.' + blocks[blocks.length-1]
  } else {
    return ''
  }
}

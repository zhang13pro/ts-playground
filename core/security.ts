{
  const convertToUpperCase = (strOrArray) => {
    if (typeof strOrArray === "string") {
      return strOrArray.toUpperCase()
    } else if (Array.isArray(strOrArray)) {
      return strOrArray.map((item) => item.toUpperCase())
    }
  }
}

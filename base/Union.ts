{
  type UnionInter =
    | {
        age: number
      }
    | {
        age: never
        [key: string]: string
      }

  const a: UnionInter = {
    age: 10,
    name: "Lex",
    ssg: "cool",
  }
}


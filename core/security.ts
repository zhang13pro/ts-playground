// 类型守卫---类型收缩
{
  // typeof
  const convertToUpperCase = (strOrArray: string | string[]) => {
    if (typeof strOrArray === "string") {
      return strOrArray.toUpperCase()
    } else if (Array.isArray(strOrArray)) {
      return strOrArray.map((item) => item.toUpperCase())
    }
  }
}

{
  // switch
  const convert = (c: "a" | 1) => {
    switch (c) {
      case 1:
        return c.toFixed() // c is 1
      case "a":
        return c.toLowerCase() // c is 'a'
    }
  }

  const feat = (
    c: { animal: "panda"; name: "China" } | { feat: "video"; name: "Japan" }
  ) => {
    switch (c.name) {
      case "China":
        return c.animal // c is "{ animal: 'panda'; name: 'China' }"
      case "Japan":
        return c.feat // c is "{ feat: 'video'; name: 'Japan' }"
    }
  }
}

{
  // 字面量恒等
  const convert = (c: "a" | 1) => {
    if (c === 1) {
      return c.toFixed() // c is 1
    } else if (c === "a") {
      return c.toLowerCase() // c is 'a'
    }
  }
}

{
  // instanceof
  class Dog {
    wang = "wangwang"
  }
  class Cat {
    miao = "miaomiao"
  }

  const getName = (animal: Dog | Cat) => {
    if (animal instanceof Dog) {
      return animal.wang
    } else if (animal instanceof Cat) {
      return animal.miao
    }
  }
}

{
  // in
  interface Dog {
    wang: string
  }
  interface Cat {
    miao: string
  }

  const getName = (animal: Dog | Cat) => {
    if ("wang" in animal) {
      return animal.wang // ok
    } else if ("miao" in animal) {
      return animal.miao // ok
    }
  }
}

{
  // 自定义类型守卫
  interface Dog {
    wang: string
  }
  interface Cat {
    miao: string
  }

  const isDog = function (animal: Dog | Cat): animal is Dog {
    return "wang" in animal
  }
  const getName = (animal: Dog | Cat) => {
    if (isDog(animal)) {
      return animal.wang
    }
  }
}

{
  enum A {
    one,
    two,
  }
  enum B {
    one,
    two,
  }

  const cpWithNumber = (param: A) => {
    if (param === 1) {
      // bad
      return param
    }
  }
  const cpWithOtherEnum = (param: A) => {
    if (param === (B.two as unknown as A)) {
      // ALERT bad
      return param
    }
  }
  const cpWithSelf = (param: A) => {
    if (param === A.two) {
      // good
      return param
    }
  }
}

{
  interface Dog {
    wang: string
  }
  interface Cat {
    miao: string
  }

  const getName = <T extends Dog | Cat>(animal: T) => {
    if ("wang" in animal) {
      return animal.wang // ts(2339)
    }

    return animal.miao // ts(2339)
  }
}

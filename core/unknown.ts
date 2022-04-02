// 类型兼容
{
  let never: never = (() => {
    throw Error("never")
  })()

  let a: number = never // ok
  let b: () => any = never // ok
  let c: {} = never // ok
}

{
  // top type
  let unknown: unknown
  const a: number = unknown // ts(2322)
  const b: () => any = unknown // ts(2322)
  const c: {} = unknown // ts(2322)
}

{
  // 数字枚举和数字类型相互兼容
  enum A {
    one,
  }

  let num: number = A.one // ok
  let fun = (param: A) => void 0
  fun(1) // ok
}

{
  enum A {
    one,
  }

  enum B {
    one,
  }

  let a: A

  let b: B

  a = b // ts(2322)

  b = a // ts(2322)
}

interface I1 {
  name: string
}
interface I2 {
  id: number
  name: string
}
class C2 {
  id = 1
  name = "1"
}

let O1: I1

let O2: I2

let InstC2: C2

{
  O1 = O2
  O1 = InstC2
}

{
  // 对象字面的 freshness 特性
  O1 = {
    id: 2, // ts(2322)
    name: "name",
  }

  let O3 = {
    id: 2,
    name: "name",
  }

  O1 = O3 // ok

  O1 = {
    id: 2,
    name: "name",
  } as I2 // ok
}

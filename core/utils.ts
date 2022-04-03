/**
 * 内置工具函数
 */

/**
 * 操作接口类型
 */
interface Person {
  name: string
  age?: number
  weight?: number
}

{
  type Partial<T> = {
    [P in keyof T]?: T[P]
  }
  type PartialPerson = Partial<Person>
}

{
  type Required<T> = {
    [P in keyof T]-?: T[P]
  }
  type RequiredPerson = Required<Person>
}

{
  type Readonly<T> = {
    readonly [P in keyof T]: T[P]
  }
  type ReadonlyPerson = Readonly<Person>
}

{
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
  }
  type NewPerson = Pick<Person, "name" | "age">
}

{
  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
  type NewPerson = Omit<Person, "weight">
}

/**
 * 联合类型
 */
{
  type Exclude<T, U> = T extends U ? never : T
  type T = Exclude<"a" | "b" | "c", "a"> // => 'b' | 'c'
  type NewPerson = Pick<Person, Exclude<keyof Person, "weight">>
}

{
  type Extract<T, U> = T extends U ? T : never
  type T = Extract<"a" | "b" | "c", "a"> // => 'a'

  // 取接口类型交集的工具类型
  type Intersect<T, U> = {
    [K in Extract<keyof T, keyof U>]: T[K]
  }

  interface Person {
    name: string
    age?: number
    weight?: number
  }
  interface NewPerson {
    name: string
    age?: number
  }
  type T1 = Intersect<Person, NewPerson>
}

{
  type NonNullable<T> = T extends null | undefined ? never : T
  type T = NonNullable<string | number | undefined | null> // => string | number
}

{
  type Record<K extends keyof any, T> = {
    // keyof any 指代可以作为对象键的属性  string | number | symbol
    [P in K]: T
  }
  type MenuKey = "home" | "about" | "more"
  interface Menu {
    label: string
    hidden?: boolean
  }
  const menus: Record<MenuKey, Menu> = {
    about: { label: "关于" },
    home: { label: "主页" },
    more: { label: "更多", hidden: true },
  }
}

/**
 * 函数类型
 */
{
  type ConstructorParameters<T extends new (...args: any) => any> =
    T extends new (...args: infer P) => any ? P : never
  class Person {
    constructor(name: string, age?: number) {}
  }
  type T = ConstructorParameters<typeof Person> // [name: string, age?: number | undefined]
}

{
  type Parameters<T extends (...args: any) => any> = T extends (
    ...args: infer P
  ) => any
    ? P
    : never
  type T0 = Parameters<() => void> // []
  type T = Parameters<(x: number, y?: string) => void>
}

{
  type ReturnType<T extends (...args: any) => any> = T extends (
    ...args: any
  ) => infer R
    ? R
    : any
  type T0 = ReturnType<() => void> // => void
  type T = ReturnType<() => string> // => string
}

{
  type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any
    ? U
    : unknown
  type T = ThisParameterType<(this: Number, x: number) => void> // Number
}

{
  // ThisParameterType 无法推断 this 的类型，则会返回 unknown 类型
  type OmitThisParameter<T> = unknown extends ThisParameterType<T>
    ? T
    : T extends (...args: infer A) => infer R
    ? (...args: A) => R
    : T

  type T = OmitThisParameter<(this: Number, x: number) => string> // (x: number) => string
}

/**
 *
 *
 *
 *
 * ThisType 的作用是可以在对象字面量中指定 this 的类型
 */
type ObjectDescriptor<D, M> = {
  data?: D
  methods?: M & ThisType<D & M> // methods 中 this 的类型是 D & M
}

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {}
  let methods: object = desc.methods || {}

  return { ...data, ...methods } as D & M
}

const obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx // this => D & M
      this.y += dy // this => D & M
    },
  },
})

obj.x = 10
obj.y = 20
obj.moveBy(5, 5)

/**
 * 字符串类型 version@4.1 模板字符串
 * 原理使用了 JavaScript 中字符串的 toUpperCase 和 toLowerCase 方法
 */
{
  type Uppercase<S extends string> = intrinsic
  type Lowercase<S extends string> = intrinsic
  type Capitalize<S extends string> = intrinsic
  type Uncapitalize<S extends string> = intrinsic

  type T0 = Uppercase<"Hello"> // => 'HELLO'
  type T1 = Lowercase<T0> // => 'hello'
  type T2 = Capitalize<T1> // => 'Hello'
  type T3 = Uncapitalize<T0> // => 'hELLO'
}

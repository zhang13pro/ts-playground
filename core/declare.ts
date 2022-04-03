declare var val1: string

declare let val2: number

declare const val3: boolean

val1 = "1"

val1 = "2"

val2 = 1

val2 = "2" // TS2322: Type 'string' is not assignable to type 'number'.

val3 = true // TS2588: Cannot assign to 'val3' because it is a constant.

declare function toString(x: number): string

const x = toString(1) // => string

// TS1183: An implementation cannot be declared in ambient contexts.
declare function toString(x: number) {
  return String(x)
}

declare class Person {
  public name: string

  private age: number

  constructor(name: string)

  getAge(): number
}

const person = new Person("Mike")

person.name // => string

person.age // TS2341: Property 'age' is private and only accessible within class 'Person'.

person.getAge() // => number

/**
 * 声明枚举仅用于编译时的检查
 */
declare enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
]

/**
 * 模块
 */
// lodash.d.ts
declare module "lodash" {
  export function first<T extends unknown>(array: T[]): T
}

// index.ts
import { first } from "lodash"

first([1, 2, 3]) // => number;

/**
 * 文件
 */
declare module "*.jpg" {
  const src: string

  export default src
}

declare module "*.png" {
  const src: string

  export default src
}

/**
 * 命名空间
 */
declare namespace $ {
  const version: number
  function ajax(settings?: any): void
}

$.version // => number
$.ajax()

/**
 * 扩充模块
 */
// person.ts

export class Person {}

// index.ts

import { Person } from "./person"

declare module "./person" {
  interface Person {
    greet: () => void
  }
}

Person.prototype.greet = () => {
  console.log("Hi!")
}

/**
 * 扩充全局
 */
declare global {
  interface Array<T extends unknown> {
    getLen(): number
  }
}

Array.prototype.getLen = function () {
  return this.length
}

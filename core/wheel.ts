/**
 * 物料 + 官方内置工具类型结合 = 轮子
 */

/**
 * ReturnTypeOfResolved
 * vs  ReturnType：如果入参 F 的返回类型是泛型 Promise 的实例，则返回 Promise 接收的入参。
 * type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
 */
type ReturnTypeOfResolved<F extends (...args: any) => any> = F extends (
  ...args: any[]
) => Promise<infer R>
  ? R
  : ReturnType<F>

type isNumber = ReturnTypeOfResolved<() => number> // number
type isString = ReturnTypeOfResolved<() => Promise<string>> // string

/**
 * Merge 合并入参
 */
type Merge<A, B> = {
  [key in keyof A | keyof B]: key extends keyof A
    ? key extends keyof B
      ? A[key] | B[key]
      : A[key]
    : key extends keyof B
    ? B[key]
    : never
}
type Merged = Merge<{ id: number; name: string }, { id: string; age: number }>

/**
 * Equal 判断入参是否相同类型
 * 使用 [] 解除条件分配类型和 never “陷阱”
 * any判定：只有 any 和 1 交叉得到的类型（any）是 0 的父类型
 * 原理是只有 any 满足与任何类型交叉得到的都是 any，而 any 是所有类型的父类型（同时也是子类型）
 */
type IsAny<T> = 0 extends 1 & T ? true : false
type EqualV3<S, T> = IsAny<S> extends true
  ? IsAny<T> extends true
    ? true
    : false
  : IsAny<T> extends true
  ? false
  : [S] extends [T]
  ? [T] extends [S]
    ? true
    : false
  : false

type ExampleV31 = EqualV3<1 | (number & {}), number> // true
type ExampleV32 = EqualV3<never, never> // true
type ExampleV34 = EqualV3<any, any> // true
type ExampleV33 = EqualV3<any, number> // false
type ExampleV35 = EqualV3<never, any> // false

/** EqualV3 不能区分Object和object  */
let upperCaseObject: Object
let lowerCaseObject: object
type isLowerCaseObjectExtendsUpperCaseObject = object extends Object
  ? true
  : false // true
type isUpperCaseObjectExtendsLowerCaseObject = Object extends object
  ? true
  : false // true
// @ts-ignore
upperCaseObject = lowerCaseObject // ok
lowerCaseObject = upperCaseObject // ok

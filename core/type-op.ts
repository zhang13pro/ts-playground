/**
 * 类型体操物料
 */
type StringOrNumberArray<E> = E extends string | number ? E[] : E

{
  type BooleanOrString = string | boolean

  // 泛型条件类型将分配
  type WhatIsThis = StringOrNumberArray<BooleanOrString> // boolean | string[]

  type BooleanOrStringGot = BooleanOrString extends string | number
    ? BooleanOrString[]
    : BooleanOrString //  string | boolean
}

{
  // [] 包裹泛型将被当成整体
  type StringOrNumberArray<E> = [E] extends [string | number] ? E[] : E

  type WhatIsThis = StringOrNumberArray<string | boolean> // string | boolean
}

{
  // never 是所有类型的子类型
  type GetSNums = never extends number
    ? number[]
    : never extends string
    ? string[]
    : never // number[]
  // never 是不能分配的底层类型
  type GetNever = StringOrNumberArray<never> // never
}

{
  // never 作为入参以原子形式出现在条件判断 extends 关键字左侧，则实例化得到的类型也是 never
  type UsefulNeverX<T> = T extends {} ? T[] : []

  type UselessNeverX<T, S> = S extends {} ? S[] : []

  type UselessNeverY<T, S> = S extends {} ? T[] : []

  type UselessNeverZ<T> = [T] extends [{}] ? T[] : []

  type ThisIsNeverX = UsefulNeverX<never> // never

  type ThisIsNotNeverX = UselessNeverX<never, string> // string[]

  type ThisIsNotNeverY = UselessNeverY<never, string> // never[]

  type ThisIsNotNeverZ = UselessNeverZ<never> // never[]
}

{
  /**
   * inner 变量提取
   */
  type ElementTypeOfArray<T> = T extends (infer E)[] ? E : never
  type isNumber = ElementTypeOfArray<number[]> // number
  type isNever = ElementTypeOfArray<number> // never

  type ElementTypeOfObj<T> = T extends { name: infer E; id: infer I }
    ? [E, I]
    : never
  type isArray = ElementTypeOfObj<{ name: "name"; id: 1; age: 30 }> // ['name', 1]
  type isNever1 = ElementTypeOfObj<number> // never
}

/**
 * 索引提取接口
 */
{
  interface MixedObject {
    animal: {
      type: "animal" | "dog" | "cat"
      age: number
    }
    [name: number]: {
      type: string
      age: number
      nickname: string
    }
    [name: string]: {
      type: string
      age: number
    }
  }

  type animal = MixedObject["animal"]

  type animalType = MixedObject["animal"]["type"]

  type numberIndex = MixedObject[number]

  type numberIndex0 = MixedObject[0]

  type stringIndex = MixedObject[string]

  type stringIndex0 = MixedObject["string"]
}

{
  /**
   * keyof 提取属性名
   */
  interface MixedObject {
    animal: {
      type: "animal" | "dog" | "cat"
      age: number
    }
    [name: number]: {
      type: string
      age: number
      nickname: string
    }
    [name: string]: {
      type: string
      age: number
    }
  }

  type MixedObjectKeys = keyof MixedObject // string | number
  type animalKeys = keyof animal // 'type' | 'age'
  type numberIndexKeys = keyof numberIndex // "type" | "age" | "nickname"
}

{
  /**
   * typeof
   * 在表达式上下文获取表达式值的类型
   * 在类型上下文中获取变量或者属性的类型——主要用法
   */
  let StrA = "a"
  const unions = typeof StrA // unions 类型是 "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
  const str: typeof StrA = "string" // strs 类型是 string
  type DerivedFromStrA = typeof StrA // string

  // 类型提取
  const animal = {
    id: 1,
    name: "animal",
  }
  type Animal = typeof animal
  const animalFun = () => animal
  type AnimalFun = typeof animalFun
}

/**
 * 索引签名+ in 关键字限定对象属性的范围
 */
{
  type SpecifiedKeys = "id" | "name"
  type TargetType = {
    [key in SpecifiedKeys]: any
  } // { id: any; name: any; }

  type TargetGeneric<O extends string | number | symbol> = {
    [key in O]: any
  }
  type TargetInstance = TargetGeneric<SpecifiedKeys> // { id: any; name: any; }

  // 只能在类型别名定义中使用 in，还记得type和interface的区别吗
  interface ITargetInterface {
    [key in SpecifiedKeys]: any // ts(1169)
  }
}

{
  /**
   * 组合使用——映射类型
   */
  interface SourceInterface {
    readonly id: number
    name?: string
  }

  type TargetType = {
    [key in keyof SourceInterface]: SourceInterface[key]
  } // { readonly id: number; name?: string | undefined }

  type TargetGenericType<S> = {
    [key in keyof S]: S[key]
  }
  type TargetInstance = TargetGenericType<SourceInterface> // { readonly id: number; name?: string | undefined }
}

{
  /**
   * - + 前缀操作
   */
  interface SourceInterface {
    readonly id: number
    name?: string
  }

  type TargetGenericTypeReadonly<S> = {
    readonly [key in keyof S]: S[key]
  }
  type TargetGenericTypeReadonlyInstance =
    TargetGenericTypeReadonly<SourceInterface> // { readonly id: number; readonly name?: string | undefined }

  type TargetGenericTypeOptional<S> = {
    [key in keyof S]?: S[key]
  }
  type TargetGenericTypeOptionalInstance =
    TargetGenericTypeOptional<SourceInterface> // { readonly id?: number; readonly name?: string | undefined }

  type TargetGenericTypeRemoveReadonly<S> = {
    -readonly [key in keyof S]: S[key]
  }
  type TargetGenericTypeRemoveReadonlyInstance =
    TargetGenericTypeRemoveReadonly<SourceInterface> // { id: number; name?: string | undefined }

  type TargetGenericTypeRemoveOptional<S> = {
    [key in keyof S]-?: S[key]
  }
  type TargetGenericTypeRemoveOptionalInstance =
    TargetGenericTypeRemoveOptional<SourceInterface> // { readonly id: number; name: string }
}

{
  /**
   * 使用 as 重新映射 key
   */
  interface SourceInterface {
    readonly id: number
    name?: string
  }
  type TargetGenericTypeAssertiony<S> = {
    [key in keyof S as Exclude<key, "id">]: S[key]
  }

  type TargetGenericTypeAssertionyInstance =
    TargetGenericTypeAssertiony<SourceInterface> // { name?: string | undefined; }
}

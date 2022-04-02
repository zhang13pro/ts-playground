// Q1 实现 call apply
// Q2 泛型的作用
// tips: 枚举类型不支持泛型。

{
  // 泛型:类型参数化
  function reflect<T>(param: T) {
    return param
  }
  // some diff
  const str = reflect("no string")
  const num = reflect<number>(1)
}

{
  function reflectArray<P>(param: P[]) {
    return param
  }
  const reflectArr = reflectArray([1, "1"]) // reflectArr 是 (string | number)[]
}

{
  const reflectFn: <P>(param: P) => P = reflect // ok

  type ReflectFunction = <P>(param: P) => P
  interface IReflectFunction {
    <P>(param: P): P
  }

  const reflectFn2: ReflectFunction = reflect
  const reflectFn3: IReflectFunction = reflect
}

{
  type GenericReflectFunction<P> = (param: P) => P
  interface IGenericReflectFunction<P> {
    (param: P): P
  }

  const reflectFn4: GenericReflectFunction<string> = reflect // 具象化泛型
  const reflectFn5: IGenericReflectFunction<number> = reflect // 具象化泛型
  const reflectFn3Return = reflectFn4("string") // 入参和返回值都必须是 string 类型
  const reflectFn4Return = reflectFn5(1) //  入参和返回值都必须是 number 类型
}

{
  // 类型编程
  type StringOrNumberArray<E> = E extends string | number ? E[] : E
  type StringArray = StringOrNumberArray<string> // 类型是 string[]
  type NumberArray = StringOrNumberArray<number> // 类型是 number[]
  type NeverGot = StringOrNumberArray<boolean> // 类型是 boolean

  // 分配条件类型（Distributive Conditional Types）
  type BooleanOrString = string | boolean
  type WhatIsThis = StringOrNumberArray<BooleanOrString> // 好像应该是 string | boolean ?
  type BooleanOrStringGot = BooleanOrString extends string | number
    ? BooleanOrString[]
    : BooleanOrString //  string | boolean
  // 只有泛型 + extends 三元，才会触发分配条件类型
  type BooleanOrStringGot1 = StringOrNumberArray<BooleanOrString> // boolean | string[]
}

{
  function reflectSpecified<P extends number | string | boolean>(param: P): P {
    return param
  }

  reflectSpecified("string") // ok
  reflectSpecified(1) // ok
  reflectSpecified(true) // ok
  reflectSpecified(null) // ts(2345) 'null' 不能赋予类型 'number | string | boolean'
}

{
  interface ReduxModelSpecified<State extends { id: number; name: string }> {
    state: State
  }

  type ComputedReduxModel1 = ReduxModelSpecified<{ id: number; name: string }> // ok
  type ComputedReduxModel2 = ReduxModelSpecified<{
    id: number
    name: string
    age: number
  }> // ok
  type ComputedReduxModel3 = ReduxModelSpecified<{ id: string; name: number }> // ts(2344)
  type ComputedReduxModel4 = ReduxModelSpecified<{ id: number }> // ts(2344)
}

{
  interface ReduxModel<State> {
    state: State
    reducers: {
      [action: string]: (state: State, action: any) => State
    }
  }

  type ModelInterface = { id: number; name: string }
  const model: ReduxModel<ModelInterface> = {
    state: { id: 1, name: "乾元" }, //  ok 类型必须是 ModelInterface

    reducers: {
      setId: (state, action: { payload: number }) => ({
        ...state,
        id: action.payload, // ok must be number
      }),
      setName: (state, action: { payload: string }) => ({
        ...state,
        name: action.payload, // ok must be string
      }),
    },
  }
}

{
  // 泛型约束
  interface ObjSetter {
    <O extends {}, K extends keyof O, V extends O[K]>(
      obj: O,
      key: K,
      value: V
    ): V
  }

  const setValueOfObj: ObjSetter = (obj, key, value) => (obj[key] = value)

  setValueOfObj({ id: 1, name: "name" }, "id", 2) // ok
  setValueOfObj({ id: 1, name: "name" }, "name", "new name") // ok
  setValueOfObj({ id: 1, name: "name" }, "age", 2) // ts(2345)
  setValueOfObj({ id: 1, name: "name" }, "id", "2") // ts(2345)
}

{
  // 默认类型 泛型入参指定默认值
  interface ReduxModelSpecified2<State = { id: number; name: string }> {
    state: State
  }

  type ComputedReduxModel5 = ReduxModelSpecified2 // ok
  type ComputedReduxModel6 = ReduxModelSpecified2<{ id: number; name: string }> // ok

  interface ReduxModelMixed<State extends {} = { id: number; name: string }> {
    state: State
  }
}

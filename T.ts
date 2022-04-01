// 泛型:类型参数化
function reflect<T>(param: T) {
  return param
}
// some diff
const str = reflect("no string")
const num = reflect<number>(1)

{
  function reflectArray<P>(param: P[]) {
    return param
  }
  const reflectArr = reflectArray([1, "1"]) // reflectArr 是 (string | number)[]
}

{
  function useState<S>(state: S, initialValue?: S) {
    return [state, (s: S) => void 0] as unknown as [S, (s: S) => void]
  }
}

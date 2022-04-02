# ts-playground

## Base

```ts
{
  "鹿" as any as "马"
  let a: "鹿" = "鹿"
  let b: "马" = "马"
  // a as any as b
}

// 类型断言&字面量类型

{
  const specifiedStr: "this is string" = "this is string" // 类型是 '"this is string"'
  let str2 = specifiedStr // 即便使用 let 定义，类型是 'this is string'
}

{
  let x = null // 类型拓宽成 any
  let y = undefined // 类型拓宽成 any
  /** -----分界线------- */
  const z = null // 类型是 null
  /** -----分界线------- */
  let anyFun = (param = null) => param // 形参类型是 null
  let z2 = z // 类型是 null
  let x2 = x // 类型是 null
  let y2 = y // 类型是 undefined
}
```

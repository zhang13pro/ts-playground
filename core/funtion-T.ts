// 函数类型兼容   变型
{
  // 协变保持一致的子类型关系
  type isChild<Child, Par> = Child extends Par ? true : false

  interface Animal {
    name: string
  }
  interface Dog extends Animal {
    woof: () => void
  }

  type Covariance<T> = T
  type isCovariant = isChild<Covariance<Dog>, Covariance<Animal>> // true
  type isPropAssignmentCovariant = isChild<{ type: Dog }, { type: Animal }> // true
  type isArrayElementCovariant = isChild<Dog[], Animal[]> // true
  type isReturnTypeCovariant = isChild<() => Dog, () => Animal> // true
}

{
  // 逆变与协变相反，思考为什么参数类型是逆变的？
  type isChild<Child, Par> = Child extends Par ? true : false

  interface Animal {
    name: string
  }
  interface Dog extends Animal {
    woof: () => void
  }

  type Contravariance<T> = (param: T) => void
  type isNotContravariance = isChild<
    Contravariance<Dog>,
    Contravariance<Animal>
  > // false;
  type isContravariance = isChild<Contravariance<Animal>, Contravariance<Dog>> // true;
}

{
  // TypeScript 严格模式下，函数参数类型是逆变
  // 如果是协变将通过静态检测，从设计考虑是为了类型安全
  interface Animal {
    name: string
  }
  interface Dog extends Animal {
    woof: () => void
  }

  const visitDog = (animal: Dog) => {
    animal.woof()
  }
  interface Cat extends Animal {
    miao: () => void
  }

  const C: Cat = {
    name: "xCat",
    miao: () => void 0,
  }

  let animals: Animal[] = [C]
  animals.forEach(visitDog) // ts(2345)
}

{
  // TypeScript 非严格模式下，函数参数类型就是双向协变：即是协变，也是逆变
  interface Event {
    timestamp: number
  }

  interface MouseEvent extends Event {
    x: number
    y: number
  }

  // function addEventListener(handler: (n: Event) => void) {}
  addEventListener((e: MouseEvent) => console.log(e.x + "," + e.y)) // ts(2769)

  function addEventListener<E extends Event>(handler: (n: E) => void) {}
  addEventListener((e: MouseEvent) => console.log(e.x + "," + e.y)) // ok
}

{
  // 更安全的场景，不变(注意数组默认===协变)
  interface Animal {
    name: string
  }
  interface Dog extends Animal {
    woof: () => void
  }

  interface Cat extends Animal {
    miao: () => void
  }

  const cat: Cat = {
    name: "Cat",
    miao: () => void 0,
  }
  const dog: Dog = {
    name: "Dog",
    woof: () => void 0,
  }

  const visitDog = (animal: Dog) => {
    animal.woof()
  }

  let dogs: Dog[] = [dog]
  let animals: Animal[]
  animals = dogs // ok
  animals.push(cat) // ok
  dogs.forEach(visitDog) // 类型 ok，但运行时会抛出错误
}

{
  // 参数个数兼容
  let lessParams = (one: number) => void 0
  let moreParams = (one: number, two: string) => void 0

  lessParams = moreParams // ts(2322)
  moreParams = lessParams // ok
}

{
  let optionalParams = (one?: number, tow?: number) => void 0
  let requiredParams = (one: number, tow: number) => void 0
  let restParams = (...args: number[]) => void 0

  requiredParams = optionalParams // ok
  restParams = optionalParams // ok

  optionalParams = restParams // ts(2322)
  optionalParams = requiredParams // ts(2322)

  restParams = requiredParams // ok 安全的
  requiredParams = restParams // ok 不安全但是便捷
}

{
  let requiredParams = (one: number, tow: number) => void 0
  let restParams = (...args: number[]) => void 0

  type GetFun<F extends (...args: number[]) => any> = Parameters<F>
  type GetRequiredParams = GetFun<typeof requiredParams>
  type GetRestParams = GetFun<typeof restParams>
  type GetEmptyParams = GetFun<() => void>
}

{
  type Day = "SUNDAY" | "MONDAY"
  const SUNDAY: Day = "SUNDAY"
}
// number
{
  enum Day {
    SUNDAY, // Day['SUNDAY'] = 0
    MONDAY,
  }
}
// string
{
  enum Day {
    SUNDAY = "sunday", // Day['SUNDAY'] = 'sunday'
    MONDAY = "monday",
  }
}

{
  enum Day {
    SUNDAY,
    MONDAY,
  }
  enum MyDay {
    SUNDAY,
    MONDAY = Day.MONDAY,
  }
  const mondayIsDay: Day.MONDAY = Day.MONDAY // ok: 字面量枚举成员既是值，也是类型
  const mondayIsSunday = MyDay.SUNDAY // ok: 类型是 MyDay，MyDay.SUNDAY 仅仅是值
  const mondayIsMyDay2: MyDay.MONDAY = MyDay.MONDAY // ts(2535)，MyDay 包含非字面量值成员，所以 MyDay.MONDAY 不能作为类型
}

{
  enum Day {
    MONDAY,
  }
  const mondayIsDay: Day = Day.MONDAY // ok
  const mondayIsDay1: Day.MONDAY = mondayIsDay as Day // ok
}

{
  enum Day {
    SUNDAY = +"1",
    MONDAY = "aa".length,
  }

  const work = (x: Day) => {
    if (x !== Day.SUNDAY || x !== Day.MONDAY) {
      // ok
    }
  }
}
;("VS")
{
  enum Day {
    SUNDAY,
    MONDAY,
  }

  const work = (x: Day) => {
    if (x !== Day.SUNDAY || x !== Day.MONDAY) {
      // ok
    }
  }
}

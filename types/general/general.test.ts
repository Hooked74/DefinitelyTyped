const value1: int = -1;
const value2: float = -1.2;
const value3: uint = 1;
const value4: ufloat = 1.2;

const summer1: KeysOfUnion<{ summer: number; winter: number }> = "summer";
const summer2: PickField<string[], 0> = "summer";

const promise: Promise<void> = new Promise((resolve: PromiseResolve, reject: PromiseReject) => {
  //
});

class Season {}

const SeasonConstructor1: Constructor<Season> = Season;
const SeasonConstructor2: SafeConstructor<Season> = Season;

const SeasonDecorator: SafeDecorator<Season, { summer: int }> = <T extends object>(
  Entity: SafeConstructor<T>
) =>
  class extends Season {
    public summer: int = 1;
  };

type ReadonlyObject = ReadonlyPartial<{ field1: string; field2: string }>;

const readonlyObject: ReadonlyObject = {
  field1: "value"
};

const writableObject: Writable<ReadonlyObject> = readonlyObject;
writableObject.field1 = "";

const handler: Handler<int> = () => 1;

const dictionary: Dictionary<string> = { field1: "value", field2: "value" };
const readonlyDictionary: ReadonlyDictionary<string> = { field1: "value", field2: "value" };
const tuple: Tuple<string> = ["value1", "value2"];

switch (process.env.NODE_ENV) {
  case "test":
  case "production":
  case "development":
}

export type Operation = "multiply" | "add" | "divide";

export const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case "add":
      return a + b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

try {
  console.log(calculator(1, 5, "divide"));
} catch (error: unknown) {
  // Anything is assignable to unknown but unknown is not assignable to anything except for unknown and any
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    // the type is narrowed here so we can refer to error.message
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

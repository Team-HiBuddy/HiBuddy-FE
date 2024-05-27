export function convertToTitleCase(input: string) {
  const step1 = input.replace(/_/g, " ");

  const step2 = step1.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });

  return step2;
}

export function convertToUpperSnakeCase(input: string) {
  const step1 = input.toUpperCase();

  const step2 = step1.replace(/ /g, "_");

  return step2;
}

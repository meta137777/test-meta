export function convertToArraysOfSpecificIndex({
  array = [],
  uniquePropertyName = "",
  indexLengths = 6,
}: {
  array: any[];
  uniquePropertyName?: string;
  indexLengths?: number;
}) {
  const result = [];
  const seenImageGuides = new Set();

  for (let i = 0; i < array?.length; i += indexLengths) {
    const subarray = array.slice(i, i + indexLengths);
    const imageGuide = subarray.find((item: any) =>
      item.hasOwnProperty(uniquePropertyName)
    );

    if (imageGuide && !seenImageGuides.has(imageGuide[uniquePropertyName])) {
      seenImageGuides.add(imageGuide[uniquePropertyName]);
      result.push(subarray);
    }
  }

  return result;
}

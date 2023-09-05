
export function menepulative(text) {
  if (text) {
      const firstSpaceIndex = text.indexOf(" ");
      if (firstSpaceIndex !== -1) {
          const part1 = text.substring(0, firstSpaceIndex);
          const part2 = text.substring(firstSpaceIndex + 1);
          return [part1, part2];
      } else {
          // Handle the case where there is no space in the text
          return [text, ""];
      }
  } else {
      // Handle the case where 'text' is undefined or empty
      return ["", ""];
  }
}


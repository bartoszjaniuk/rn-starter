export function capitalizeFirstLetter(text: string) {
  if (!text) return '';
  return text
    .split(' ')
    .map((char) => char.charAt(0).toUpperCase() + char.slice(1))
    .join(' ');
}

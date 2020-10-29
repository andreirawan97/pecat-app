// Hapus &nbsp; <br /> \n dari API BMKG
export default function sanitizeDesc(word: string) {
  return word
    .replace(/&nbsp;/g, ' ')
    .replace(/<br \/>/g, '')
    .replace(/\n/, '');
}

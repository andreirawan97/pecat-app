import { LOKASI_PERAIRAN } from '../data/lokasiTambang';

export default function findPerairanFromCode(code: string) {
  return LOKASI_PERAIRAN.find((tambang) => tambang.code === code);
}

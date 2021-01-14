const randInts = `19857	14153	15315	19098	19809
17186	12254	12779	16728	13210
12381	12482	19456	15583	16013
11906	17756	19053	14962	13154`.split(/\s/);

const seeds = randInts.reduce((m, i, n) => {
  m.push({prodId: `${n + 1}`});
  return m;
}, [])

module.exports = seeds;
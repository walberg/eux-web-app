const sektor = [
  {
    kode: 'AD',
    term: 'Administrative',
  },
  {
    kode: 'AW',
    term: 'Yrkesskade og yrkessykdom',
  },
  {
    kode: 'FB',
    term: 'Familieytelser',
  },
];

const sedtyper = [
  {
    kode: 'F001',
    term: 'Anmodning om avgjørelse av kompetanse',
  },
  {
    kode: 'F002',
    term: 'Svar om avgjørelse av kompetanse',
  },
  {
    kode: 'F003',
    term: 'Vedtak om utbetaling vedrørende fortrinnsrett',
  },
];

const buctyper = [
  {
    kode: 'FB_BUC_01',
    term: 'Beslutte kompetent myndighet',
  },
  {
    kode: 'FB_BUC_02',
    term: 'Overføring av familieytelser',
  },
  {
    kode: 'FB_BUC_03',
    term: 'Tilleggsytelser for foreldreløse barn',
  },
  {
    kode: 'FB_BUC_04',
    term: 'Informasjon om utbetaling angående fortrinnsrett',
  },
];

const institusjoner = [
  {
    institusjonsID: 'NO:GFFTEST',
    navn: 'Guarantee Fund for Fishermen',
    landkode: 'NO',
    buctype: 'UB_BUC_01',
  },
  {
    institusjonsID: 'DU:GIFTEST',
    navn: 'Guarantee Fund for Bears',
    landkode: 'DU',
    buctype: 'UB_BUC_02',
  }];

const fagsaker = [
  {
    saksID: '34243232223',
    sakstype: 'Dagpenger',
    temakode: 'DAG',
    fagsystem: 'Arena',
    opprettet: '2018-10-15',
    status: 'Avsluttet',
  },
  {
    saksID: 'a2873465',
    sakstype: 'Generell',
    temakode: 'GEN',
    fagsystem: 'Gosys',
    opprettet: '2018-10-15',
    status: 'Ikke påbegynt',
  },
];

const landkoder = [{
  kode: 'CH',
  term: 'Sveits',
},
{
  kode: 'BE',
  term: 'Belgia',
},
{
  kode: 'BG',
  term: 'Bulgaria',
},
{
  kode: 'DK',
  term: 'Danmark',
},
{
  kode: 'EE',
  term: 'Estland',
},]

export default { buctyper, sektor, sedtyper, institusjoner, fagsaker, landkoder };
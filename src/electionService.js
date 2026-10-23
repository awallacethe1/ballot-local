// This module provides official resource links, not live election data.
export const STATES = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',DE:'Delaware',DC:'District of Columbia',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming'
};
export const stateOptions = Object.entries(STATES).map(([code,name]) => ({code,name}));
export function getVotingResources(state) {
  const code = String(state || '').toUpperCase();
  if (!STATES[code]) return null;
  return {
    registration: { label:'Register or check registration', url:`https://vote.gov/register/${code.toLowerCase()}/` },
    electionOffice: { label:'Find your election office', url:'https://www.usa.gov/state-election-office' },
    voting: { label:'How and where to vote', url:'https://www.usa.gov/voting' },
    ballot: { label:'Find ballot and election information', url:'https://www.usa.gov/voter-research' },
    accessibility: { label:'Voting accessibility resources', url:'https://www.usa.gov/voter-accessibility-laws' }
  };
}

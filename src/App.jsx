
import React, { useMemo, useState } from "react";
import "./styles.css";

const STATES = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"],
  ["AR", "Arkansas"], ["CA", "California"], ["CO", "Colorado"],
  ["CT", "Connecticut"], ["DE", "Delaware"], ["FL", "Florida"],
  ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"],
  ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"],
  ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"],
  ["ME", "Maine"], ["MD", "Maryland"], ["MA", "Massachusetts"],
  ["MI", "Michigan"], ["MN", "Minnesota"], ["MS", "Mississippi"],
  ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"],
  ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"],
  ["NM", "New Mexico"], ["NY", "New York"], ["NC", "North Carolina"],
  ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"],
  ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"],
  ["SC", "South Carolina"], ["SD", "South Dakota"],
  ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"],
  ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"],
  ["WV", "West Virginia"], ["WI", "Wisconsin"],
  ["WY", "Wyoming"], ["DC", "District of Columbia"]
];

const RESOURCES = [
  {
    title: "Register to Vote",
    description: "Find your state's official voter registration instructions.",
    url: "https://vote.gov/"
  },
  {
    title: "Voting and Elections",
    description: "Learn about voting rules, eligibility, and election procedures.",
    url: "https://www.usa.gov/voting"
  },
  {
    title: "Find Your Election Office",
    description: "Locate the election officials responsible for your area.",
    url: "https://www.usa.gov/state-election-office"
  },
  {
    title: "Find Your Polling Place",
    description: "Use official resources to find where to vote.",
    url: "https://www.usa.gov/find-polling-place"
  },
  {
    title: "Absentee and Early Voting",
    description: "Explore voting options and state-specific requirements.",
    url: "https://www.usa.gov/absentee-voting"
  },
  {
    title: "Voter ID Requirements",
    description: "Check identification requirements before Election Day.",
    url: "https://www.usa.gov/voter-id"
  }
];

// Add verified public election information here.
// Do not add dates or candidates without confirming official sources.
const ELECTIONS = [
  // Example structure:
  // {
  //   id: "unique-election-id",
  //   state: "SC",
  //   city: "Charleston",
  //   title: "Official election name",
  //   date: "2027-11-02",
  //   source: "https://official-election-source.gov",
  //   updated: "2026-10-23",
  //   races: [],
  //   measures: []
  // }
];

function App() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [searched, setSearched] = useState(false);
  const [tab, setTab] = useState("elections");

  const stateName =
    STATES.find(([code]) => code === state)?.[1] || "";

  const location = [city.trim(), stateName]
    .filter(Boolean)
    .join(", ");

  const matches = useMemo(() => {
    if (!state) return [];

    return ELECTIONS.filter((election) => {
      const sameState = election.state === state;
      const sameCity =
        !city.trim() ||
        !election.city ||
        election.city.toLowerCase() === city.trim().toLowerCase();

      return sameState && sameCity;
    });
  }, [city, state]);

  const races = matches.flatMap((election) =>
    (election.races || []).map((race) => ({
      ...race,
      electionTitle: election.title
    }))
  );

  const measures = matches.flatMap((election) =>
    (election.measures || []).map((measure) => ({
      ...measure,
      electionTitle: election.title
    }))
  );

  const handleSearch = (event) => {
    event.preventDefault();
    if (!state) return;
    setSearched(true);
    setTab("elections");
  };

  const panels = {
    elections: matches,
    candidates: races,
    measures: measures
  };

  const activeItems = panels[tab];

  return (
    <div className="site">
      <header className="header">
        <a className="brand" href="#home">
          <span className="brand-mark">✳</span>
          Ballot Local
        </a>

        <nav>
          <a href="#explore">Explore</a>
          <a href="#resources">Resources</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="eyebrow">YOUR COMMUNITY. YOUR VOICE.</div>
          <h1>
            Voting starts
            <br />
            <em>with knowing.</em>
          </h1>
          <p>
            Discover election information, explore your voting options,
            and connect with official resources in your community.
          </p>

          <form className="search-card" onSubmit={handleSearch}>
            <label>
              City
              <input
                type="text"
                placeholder="Enter your city"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                  setSearched(false);
                }}
              />
            </label>

            <label>
              State
              <select
                value={state}
                onChange={(event) => {
                  setState(event.target.value);
                  setSearched(false);
                }}
                required
              >
                <option value="">Select state</option>
                {STATES.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit">Explore my area →</button>
          </form>

          <p className="helper">
            No account required. No personal information stored.
          </p>
        </section>

        <section className="explore section" id="explore">
          <div className="section-heading">
            <div>
              <div className="eyebrow">LOCAL CIVIC INFORMATION</div>
              <h2>
                {searched
                  ? `Explore ${location}`
                  : "Know what's on the ballot."}
              </h2>
            </div>
            <p>
              Browse verified election information and follow
              official sources for details.
            </p>
          </div>

          {!searched ? (
            <div className="empty-panel">
              <span className="empty-icon">⌕</span>
              <h3>Start with your location</h3>
              <p>
                Select your state above to explore local voting information.
              </p>
            </div>
          ) : (
            <>
              <div className="tabs">
                {[
                  ["elections", "Elections"],
                  ["candidates", "Candidates & Races"],
                  ["measures", "Ballot Measures"]
                ].map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    className={tab === key ? "tab active" : "tab"}
                    onClick={() => setTab(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {activeItems.length > 0 ? (
                <div className="results-grid">
                  {activeItems.map((item, index) => (
                    <article
                      className="result-card"
                      key={item.id || index}
                    >
                      <span className="result-label">
                        {tab === "elections"
                          ? "Election"
                          : tab === "candidates"
                          ? "Race"
                          : "Ballot measure"}
                      </span>

                      <h3>{item.title || item.name}</h3>

                      {item.date && (
                        <p>
                          Date:{" "}
                          {new Date(
                            `${item.date}T12:00:00`
                          ).toLocaleDateString()}
                        </p>
                      )}

                      {item.description && (
                        <p>{item.description}</p>
                      )}

                      {item.updated && (
                        <small>Verified: {item.updated}</small>
                      )}

                      {item.source && (
                        <a
                          href={item.source}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View official source ↗
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-panel">
                  <span className="empty-icon">✳</span>
                  <h3>
                    {tab === "elections"
                      ? "No verified elections added yet"
                      : tab === "candidates"
                      ? "No verified races added yet"
                      : "No verified ballot measures added yet"}
                  </h3>
                  <p>
                    This section hasn't been populated with verified
                    information for {location}. Check your official
                    election office for the latest details.
                  </p>
                  <a
                    className="text-link"
                    href="https://www.usa.gov/state-election-office"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Find your election office ↗
                  </a>
                </div>
              )}
            </>
          )}
        </section>

        <section className="resources section" id="resources">
          <div className="section-heading">
            <div>
              <div className="eyebrow">TRUSTED RESOURCES</div>
              <h2>Everything you need to get started.</h2>
            </div>
            <p>
              Official government resources for registration,
              voting options, and election information.
            </p>
          </div>

          <div className="resources-grid">
            {RESOURCES.map((resource, index) => (
              <a
                className="resource-card"
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                key={resource.title}
              >
                <div className="resource-top">
                  <span>0{index + 1}</span>
                  <span>↗</span>
                </div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="about section" id="about">
          <div className="eyebrow">ABOUT BALLOT LOCAL</div>
          <h2>Make civic information more accessible.</h2>
          <p>
            Ballot Local is an independent civic information project
            designed to make it easier to discover voting resources,
            understand elections, and engage with your community.
          </p>
          <p>
            Ballot Local is not a government agency. Election information
            should be confirmed through official election offices.
          </p>
        </section>
      </main>

      <footer>
        <span>✳ Ballot Local</span>
        <span>Independent civic information platform</span>
        <span>© {new Date().getFullYear()} Ballot Local</span>
      </footer>
    </div>
  );
}

export default App;

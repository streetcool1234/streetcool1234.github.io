// Enter each player's MCSR Ranked profile URL ONCE.
// The same URL is automatically reused everywhere their name appears.

const players = [
  { name:"Nova",   rank:"Gold 1", profile:"https://mcsrranked.com/players/nova",   seed:1,  wins:0, losses:0, mapsWon:0, mapsLost:0, status:"Advancing" },
  { name:"Kairo",  rank:"Gold 1", profile:"https://mcsrranked.com/players/kairo",  seed:2,  wins:0, losses:0, mapsWon:0, mapsLost:0, status:"Advancing" },
  { name:"Vex",    rank:"Gold 1", profile:"https://mcsrranked.com/players/vex",    seed:3,  wins:0, losses:0, mapsWon:0, mapsLost:0, status:"Advancing" },
  { name:"Ashen",  rank:"Gold 1", profile:"https://mcsrranked.com/players/ashen",  seed:4,  wins:0, losses:0, mapsWon:0, mapsLost:0, status:"Eliminated" },
  { name:"Milo",   rank:"Iron 3", profile:"https://mcsrranked.com/players/milo",   seed:5,  wins:0, losses:0, mapsWon:0, mapsLost:0, status:"Advancing" },
  { name:"Quartz", rank:"Iron 3", profile:"https://mcsrranked.com/players/quartz", seed:6,  wins:0, losses:0, mapsWon:0, mapsLost:0, status:"Advancing" },
  { name:"Riven",  rank:"Iron 3", profile:"https://mcsrranked.com/players/riven",  seed:7,  wins:0, losses:0, mapsWon:0, mapsLost:0, status:"Advancing" },
  { name:"Orbit",  rank:"Iron 3", profile:"https://mcsrranked.com/players/orbit",  seed:8,  wins:0, losses:0, mapsWon:0, mapsLost:0, status:"Eliminated" },
  { name:"Frost",  rank:"Iron 2", profile:"https://mcsrranked.com/players/frost",  seed:9,  wins:0, losses:0, mapsWon:0, mapsLost:0, status:"Advancing" },
  { name:"Jolt",   rank:"Iron 2", profile:"https://mcsrranked.com/players/jolt",   seed:10, wins:0, losses:0, mapsWon:0, mapsLost:0, status:"Eliminated" },
  { name:"Pico",   rank:"Iron 2", profile:"https://mcsrranked.com/players/pico",   seed:11, wins:0, losses:0, mapsWon:0, mapsLost:0, status:"Eliminated" },
  { name:"Ember",  rank:"Iron 2", profile:"https://mcsrranked.com/players/ember",  seed:12, wins:0, losses:0, mapsWon:0, mapsLost:0, status:"Eliminated" },
  { name:"Wisp",   rank:"Iron 1", profile:"https://mcsrranked.com/players/wisp",   seed:13, wins:0, losses:0, mapsWon:0, mapsLost:0, status:"Advancing" },
  { name:"Cobalt", rank:"Iron 1", profile:"https://mcsrranked.com/players/cobalt", seed:14, wins:0, losses:0, mapsWon:0, mapsLost:0, status:"Eliminated" },
  { name:"Rune",   rank:"Iron 1", profile:"https://mcsrranked.com/players/rune",   seed:15, wins:0, losses:0, mapsWon:0, mapsLost:0, status:"Eliminated" },
  { name:"Sage",   rank:"Iron 1", profile:"https://mcsrranked.com/players/sage",   seed:16, wins:0, losses:0, mapsWon:0, mapsLost:0, status:"Eliminated" }
];

const playerMap = Object.fromEntries(players.map(p => [p.name, p]));
function rankClass(rank){ return rank.toLowerCase().replace(" ",""); }

function playerLink(name){
  const p = playerMap[name];
  if (!p || name === "TBD" || name.startsWith("SF ")) {
    return `<span class="player-name eliminated">${name}</span>`;
  }
  return `<a class="player-name" href="${p.profile}" target="_blank" rel="noopener noreferrer">${name}</a>`;
}

// BO5 through the semifinals and 3rd-place match; Grand Final is BO7.
const rounds = [
  {
    title:"Round of 16", format:"BO5", cls:"r1",
    matches:[
      [["Nova","3",true],["Sage","0",false]],
      [["Kairo","3",true],["Rune","1",false]],
      [["Vex","3",true],["Cobalt","0",false]],
      [["Ashen","1",false],["Wisp","3",true]],
      [["Milo","3",true],["Ember","0",false]],
      [["Quartz","3",true],["Pico","1",false]],
      [["Riven","3",true],["Jolt","0",false]],
      [["Orbit","1",false],["Frost","3",true]]
    ]
  },
  {
    title:"Quarterfinals", format:"BO5", cls:"r2",
    matches:[
      [["Nova","—",false],["Kairo","—",false]],
      [["Vex","—",false],["Wisp","—",false]],
      [["Milo","—",false],["Quartz","—",false]],
      [["Riven","—",false],["Frost","—",false]]
    ]
  },
  {
    title:"Semifinals", format:"BO5", cls:"r3",
    matches:[
      [["TBD","—",false],["TBD","—",false]],
      [["TBD","—",false],["TBD","—",false]]
    ]
  }
];

const finals = {
  title:"Grand Finals",
  grandFormat:"BO7",
  thirdFormat:"BO5",
  grand:[["SF Winner 1","—",false],["SF Winner 2","—",false]],
  third:[["SF Loser 1","—",false],["SF Loser 2","—",false]]
};

function matchHTML(match, extraClass=""){
  return `<div class="match ${extraClass}">
    ${match.map(([name,score,won]) => {
      const p = playerMap[name];
      return `<div class="match-row">
        <div class="player">
          <span class="seed">${p?.seed ?? "—"}</span>
          ${playerLink(name)}
          ${p ? `<span class="tier ${rankClass(p.rank)}">${p.rank.toUpperCase()}</span>` : ""}
        </div>
        <span class="score ${won ? "winner" : ""}">${score}</span>
      </div>`;
    }).join("")}
  </div>`;
}

const bracket = document.querySelector("#bracket");
if (bracket) {
  bracket.innerHTML = `
    ${rounds.map(round => `
      <div class="round ${round.cls}">
        <p class="round-title">${round.title}<span class="series-format">${round.format}</span></p>
        <div class="round-stack">${round.matches.map(matchHTML).join("")}</div>
      </div>
    `).join("")}

    <div class="round r4">
      <p class="round-title">Grand Finals</p>
      <div class="final-stack">
        <div class="final-block grand" data-final-type="grand">
          <div class="final-label"><h3>Grand Finals</h3><span class="series-format">${finals.grandFormat}</span></div>
          ${matchHTML(finals.grand, "final-match grand")}
        </div>

        <div class="final-block third" data-final-type="third">
          <div class="final-label"><h3>3rd Place</h3><span class="series-format">${finals.thirdFormat}</span></div>
          ${matchHTML(finals.third, "final-match")}
        </div>
      </div>
    </div>
  `;

  function relativeBox(element){
    const a = element.getBoundingClientRect();
    const b = bracket.getBoundingClientRect();
    return {
      left:a.left-b.left, right:a.right-b.left,
      top:a.top-b.top, bottom:a.bottom-b.top,
      midX:(a.left+a.right)/2-b.left, midY:(a.top+a.bottom)/2-b.top
    };
  }

  function addPath(svg, d){
    const path = document.createElementNS("http://www.w3.org/2000/svg","path");
    path.setAttribute("d", d);
    path.setAttribute("class","connector");
    svg.appendChild(path);
  }

  function connectPair(svg, sourceA, sourceB, target){
    const a = relativeBox(sourceA), b = relativeBox(sourceB), t = relativeBox(target);
    const midX = Math.round((a.right + t.left) / 2);
    const pairMidY = Math.round((a.midY + b.midY) / 2);

    addPath(svg, `M ${a.right} ${a.midY} H ${midX} V ${b.midY} H ${b.right}`);
    addPath(svg, `M ${midX} ${pairMidY} H ${t.left}`);
  }

  function addHtmlLine(className, left, top, width, height) {
    const line = document.createElement("div");
    line.className = `final-connector ${className}`;
    line.style.left = `${Math.round(left)}px`;
    line.style.top = `${Math.round(top)}px`;
    line.style.width = `${Math.max(0, Math.round(width))}px`;
    line.style.height = `${Math.max(0, Math.round(height))}px`;
    bracket.appendChild(line);
  }

  function drawConnectors(){
    bracket.querySelectorAll(".connector-layer, .final-connector").forEach(el => el.remove());

    const r1 = [...bracket.querySelectorAll(".round.r1 .match")];
    const r2 = [...bracket.querySelectorAll(".round.r2 .match")];
    const r3 = [...bracket.querySelectorAll(".round.r3 .match")];
    const grand = bracket.querySelector('[data-final-type="grand"] .match');
    const third = bracket.querySelector('[data-final-type="third"] .match');

    const relativeBox = (element) => {
      const a = element.getBoundingClientRect();
      const b = bracket.getBoundingClientRect();
      return {
        left:a.left-b.left, right:a.right-b.left,
        top:a.top-b.top, bottom:a.bottom-b.top,
        midX:(a.left+a.right)/2-b.left,
        midY:(a.top+a.bottom)/2-b.top
      };
    };

    // Standard round-to-round lines.
    function connectPair(sourceA, sourceB, target) {
      const a = relativeBox(sourceA), b = relativeBox(sourceB), t = relativeBox(target);
      const x = Math.round((a.right + t.left) / 2);
      const midY = Math.round((a.midY + b.midY) / 2);
      const h = 4;

      addHtmlLine("pair-a", a.right, a.midY - h/2, x - a.right, h);
      addHtmlLine("pair-b", b.right, b.midY - h/2, x - b.right, h);
      addHtmlLine("pair-trunk", x - h/2, Math.min(a.midY,b.midY), h, Math.abs(b.midY-a.midY));
      addHtmlLine("pair-target", x, midY - h/2, t.left - x, h);
    }

    for(let i=0;i<4;i++) connectPair(r1[i*2], r1[i*2+1], r2[i]);
    for(let i=0;i<2;i++) connectPair(r2[i*2], r2[i*2+1], r3[i]);

    if(r3.length === 2 && grand && third){
      const a = relativeBox(r3[0]);
      const b = relativeBox(r3[1]);
      const g = relativeBox(grand);
      const t = relativeBox(third);
      const h = 4;

      // The requested style: an ordinary DIV with the vertical finals trunk.
      // These are explicit coordinates inside the fixed-width bracket canvas.
      const finalsTrunk = document.createElement("div");
      finalsTrunk.className = "final-connector sf-final-trunk";
      finalsTrunk.style.cssText = "left: 901px; top: 284px; width: 4px; height: 512px;";
      bracket.appendChild(finalsTrunk);

      // Feed the fixed trunk from the two semifinal cards.
      const trunkX = 903;
      addHtmlLine("sf-top-feed", a.right, a.midY - h/2, trunkX - a.right, h);
      addHtmlLine("sf-bottom-feed", b.right, b.midY - h/2, trunkX - b.right, h);

      // Feed Grand Finals and 3rd Place from the fixed trunk.
      addHtmlLine("grand-feed", trunkX, g.midY - h/2, g.left - trunkX, h);
      addHtmlLine("third-place-feed", trunkX, t.midY - h/2, t.left - trunkX, h);
    }
  }

  requestAnimationFrame(drawConnectors);
  window.addEventListener("resize", () => requestAnimationFrame(drawConnectors));
}

const upcoming = [
  ["3rd Place","SF Loser 1","SF Loser 2","22:00","BO5"],
  ["Grand Final","SF Winner 1","SF Winner 2","23:00","BO7"]
];

const upcomingTarget = document.querySelector("#upcoming");
if (upcomingTarget) {
  upcomingTarget.innerHTML = upcoming.map(([round,a,b,time,format]) => `
    <div class="upcoming-row">
      <div><div class="match-time">${time}</div><div class="match-sub">${round}</div></div>
      <div class="match-players">${playerLink(a)}<br>${playerLink(b)}</div>
      <div class="right"><div class="match-sub">HEAD-TO-HEAD</div><div class="vs">${format}</div></div>
    </div>
  `).join("");
}

const standingsBody = document.querySelector("#standings-body");
if (standingsBody) {
  const standings = [...players].sort((a,b) => {
    if (a.status !== b.status) return a.status === "Advancing" ? -1 : 1;
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (a.losses !== b.losses) return a.losses - b.losses;
    return a.seed - b.seed;
  });

  standingsBody.innerHTML = standings.map((p,i) => `
    <tr>
      <td>${i+1}</td>
      <td><a class="standings-player" href="${p.profile}" target="_blank" rel="noopener noreferrer">${p.name}</a></td>
      <td>${p.rank}</td>
      <td>${p.wins}</td>
      <td>${p.losses}</td>
      <td>${p.mapsWon}-${p.mapsLost}</td>
      <td><span class="status ${p.status === "Advancing" ? "advancing" : "eliminated"}">${p.status}</span></td>
    </tr>
  `).join("");

  const count = document.querySelector("#standings-count");
  if (count) count.textContent = players.length;
}

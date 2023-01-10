const http = require("http");
const system = require("os");
const toRupiah = require("rupiah-format");
console.log("memory: ", system.freemem());

const myName = "Dicky Arya";

function getName() {
  return myName;
}

const player = {
  // key: value
  id: 1,
  name: getName(),
  total_match: 200,
  win: 170,
  lose: 30,
  age: 20,
  saldo: 50000,
};

const items = [
  {
    item_id: 111,
    item_name: "miya",
    item_damage: 450,
    item_drop: true,
  },
  {
    item_id: 112,
    item_name: "alucard",
    item_damage: 300,
    item_drop: false,
  },
];

const playerItems = Object.assign(player, items[1]);

function generatAge() {
  if (player.age >= 6 && player.age <= 10) {
    return "anak-anak";
  } else if (player.age >= 11 && player.age <= 17) {
    return "remaja";
  } else if (player.age >= 17 && player.age <= 45) {
    return "Dewasa";
  } else if (player.age >= 45 && player.age <= 50) {
    return "Orang tua";
  } else {
    return "Balita";
  }
}

function generateWinRate() {
  const win_rate = (player.win / player.total_match) * 100;

  return win_rate;
}

function hero(id, name, atk, def) {
  return { id, name, atk, def };
}

function interaction(request, response) {
  console.log("url yang di akses: ", request.url);
  if (request.url == "/") {
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(`<html>
  <head>
  <title>NODE JS</title>
  </head>
  <body style="background: #666; color: #fff; height: 100vh;
   width: 100%;">
  <h1><marquee>I'am ${myName}</marquee>
  </h1>
  <h3><marquee>Usia saya ${player.age} </marquee></h3>
  <h3><marquee>Saya Golongan ${generatAge()} </marquee> </h3>
  </body>
  </html>`);
  } else if (request.url == "/player") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(`<html>
    <head>
    <title>PLAYER</title>
    </head>
    <body style="background: #666; color: #fff; height: 100vh;
     width: 100%;">
    <h1>
    <marquee>DATA PLAYER</marquee>
    </h1>
    <h3>id ${player.id}</h3>
    <h3>nama pemain ${player.name}</h3>
    <h3>total macth ${player.total_match}</h3>
    <h3>total win ${player.win}</h3>
    <h3>total lose ${player.lose}</h3>
    <h3>winrate ${generateWinRate()} </h3>
    <h3>saldo user ${toRupiah.convert(player.saldo)} </h3>
    </body>
    </html>`);
  } else if (request.url == "/items") {
    response.writeHead(200, { "Content-Type": "application/json" });
    const itemsList = JSON.stringify(items);
    response.write(itemsList);
  } else if (request.url == "/hero") {
    response.writeHead(200, { "Content-Type": "application/json" });
    const heroList = JSON.stringify(hero(1, "balmond", 80, 60));
    response.write(heroList);
  } else {
    response.writeHeader(404, { "Content-Type": "text/html" });
    response.write("<html><body><h1 style='text-align: center;'><marquee>404 Maaf Tidak Bisa Di Akses!!</marquee></h1></body></html>");
  }
  return response.end();
}

const port = 3000;
const server = http.createServer(interaction);

server.listen(port, function (error) {
  if (error) {
    return console.log("maaf server sedang error");
  }
  console.log("server nyala");
});

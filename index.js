require("dotenv").config();

const server = require("./server");

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(process.env.FRONTLINE_KEY);
  console.log(`\n==== Server is on port ${PORT} ====\n`);
});

// ${trigger.text}
// ${trigger.sourceNumber}
// ${trigger.date.time}
// ${recipient.nameOrMobile}
// ${recipient.mobile}
// ${trigger.contact.nameOrMobile}
// ${trigger.sourceNumber}
// ${trigger.getWord(1)}
// ${trigger.textWithoutFirstWord()}

const { readFileSync } = require('fs')
const ohm = require('ohm-js')

const data = readFileSync(__filename.replace('js', 'txt')).toString().replace(/\r\n/g, '\n').split('\n')

const myGrammar = ohm.grammar(`
Arithmetic {
    Exp = Exp "+" PriExp  -- plus
        | Exp "-" PriExp  -- minus
        | Exp "*" PriExp  -- times
        | PriExp
        | number

    PriExp
      = "(" Exp ")"  -- paren
      | "+" PriExp   -- pos
      | "-" PriExp   -- neg
      | ident
      | number

    ident  (an identifier)
      = letter alnum*

    number = digit+
  }
`);

const semantics = myGrammar.createSemantics().addOperation('interpret', {
    Exp: function (e) { return e.interpret(); },
    Exp_plus: function (x, _, y) { return x.interpret() + y.interpret(); },
    Exp_minus: function (x, _, y) { return x.interpret() - y.interpret(); },
    Exp_times: function (x, _, y) { return x.interpret() * y.interpret(); },
    PriExp: function (e) { return e.interpret(); },
    PriExp_paren: function (_l, e, _r) { return e.interpret(); },
    PriExp_pos: function (_, e) { return e.interpret(); },
    PriExp_neg: function (_, e) { return -e.interpret(); },
    number(chars) { return parseInt(this.sourceString); },
});

let sum = 0
for (let d of data)
    sum += semantics(myGrammar.match(d)).interpret()

console.log('Sum', sum)

// Part two

const myGrammar2 = ohm.grammar(`
Arithmetic {
    Exp = Exp "*" AddExp  -- times
        | AddExp
        | PriExp
        | number

    AddExp = AddExp "+" PriExp  -- plus
        | AddExp "-" PriExp  -- minus
        | PriExp

    PriExp
      = "(" Exp ")"  -- paren
      | "+" PriExp   -- pos
      | "-" PriExp   -- neg
      | ident
      | number

    ident  (an identifier)
      = letter alnum*

    number = digit+
  }
`);

const semantics2 = myGrammar2.createSemantics().addOperation('interpret', {
    Exp: function (e) { return e.interpret(); },
    AddExp_plus: function (x, _, y) { return x.interpret() + y.interpret(); },
    AddExp_minus: function (x, _, y) { return x.interpret() - y.interpret(); },
    Exp_times: function (x, _, y) { return x.interpret() * y.interpret(); },
    PriExp: function (e) { return e.interpret(); },
    PriExp_paren: function (_l, e, _r) { return e.interpret(); },
    PriExp_pos: function (_, e) { return e.interpret(); },
    PriExp_neg: function (_, e) { return -e.interpret(); },
    number(chars) { return parseInt(this.sourceString); },
});

sum = 0
for (let d of data)
    sum += semantics2(myGrammar2.match(d)).interpret()

console.log('Sum part two', sum)
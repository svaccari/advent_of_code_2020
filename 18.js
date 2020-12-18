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
    Exp: function (e) {
        return e.interpret();
    },
    Exp_plus: function (x, _, y) {
        return x.interpret() + y.interpret();
    },
    Exp_minus: function (x, _, y) {
        return x.interpret() - y.interpret();
    },
    Exp_times: function (x, _, y) { return x.interpret() * y.interpret(); },
    PriExp: function (e) { return e.interpret(); },
    PriExp_paren: function (_l, e, _r) { return e.interpret(); },
    PriExp_pos: function (_, e) { return e.interpret(); },
    PriExp_neg: function (_, e) { return -e.interpret(); },

    number(chars) {
        return parseInt(this.sourceString);
    },
});

console.log(semantics(myGrammar.match('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')).interpret())